import * as THREE from './three/build/three.module.js';
import { GLTFLoader } from './three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './three/examples/jsm/controls/OrbitControls.js'
import { ConvexGeometry } from './three/examples/jsm/geometries/ConvexGeometry.js'
//import * as CANNON from './cannon/build/cannon.min.js' //the imported object seems to be different somehow?
//import Stats from './three/examples/jsm/libs/stats.module.js'
//import CannonUtils from './utils/cannonUtils.js'

window.focus(); // Capture keys right away (by default focus is on editor)

let camera, scene, renderer; // ThreeJS globals
let world; // CannonJs world
let lastTime; // Last timestamp of animation
let statObjs = []; // Objects that are not affected by gravity
let physObjs = []; // Objects that are affected by gravity
let colors; // list of colors

let car; // the player
const debug = true;

init();

function init() {
    // Initialize CannonJS
    world = new CANNON.World();
    world.gravity.set(0, -10, 0); // Gravity pulls things down
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 40;

    defineColors();
    loadObjs(debug);

    // Initialize ThreeJs
    const aspect = window.innerWidth / window.innerHeight;
    const width = 10;
    const height = width / aspect;

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100)

    camera.position.set(4, 4, 4);
    camera.rotation.x = -0.8

    scene = new THREE.Scene();

    const floor = createBox({x: 0, y: -3, z: 0}, {width: 7, height: 1, depth: 7}, false, colors.get("green"), debug)
    statObjs.push(floor)

    const box = createBox({x: 0, y: 3, z: 0}, {width: 1, height: 1, depth: 1}, true, colors.get("white"), debug)
    physObjs.push(box)

    // Set up lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(10, 20, 0);
    scene.add(dirLight);

    // Set up renderer
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setAnimationLoop(animation);
    document.body.appendChild(renderer.domElement);
}

let pain = THREE.Mesh;

function loadObjs(debug) {
    //cx, cy, cz are supposted to be offsets for the colliders
    let carSettings = {x: 0, y: 0, z: 0, sizeMulti: 5.0, cx: 3, cy: 0, cz: 0, color: colors.get("red")};

    //TODO fix a bug where if you move collider or the car the other one follows

    let gltf = new GLTFLoader();
    gltf.load('./models/car_chassis.gltf', (gltf) => {
        let carMesh = gltf.scene;
        carMesh.scale.set(1/carSettings.sizeMulti, 1/carSettings.sizeMulti, 1/carSettings.sizeMulti);
        carMesh.position.set(carSettings.x, carSettings.y, carSettings.z);
        scene.add(carMesh);

        const shape = new CANNON.Box(
            new CANNON.Vec3(1, 1, 1),
        );
        let mass = 1; //wid * hei * depth
        const body = new CANNON.Body({mass, shape});
        body.position.set((carSettings.x) + (carSettings.cx), (carSettings.y) + (carSettings.cy), (carSettings.z) + (carSettings.cz));
        world.addBody(body);

        if (debug)
            visualizeCollision(body, shape, carMesh, carSettings)

        car = {
            threejs: carMesh,
            cannonjs: body
        };

        physObjs.push(car);
        updateCamera()
    });
}

function createBox(offset, dimension, isRigidbody, color, debug) {
    const geometry = new THREE.BoxGeometry(dimension.width, dimension.height, dimension.depth);
    const material = new THREE.MeshLambertMaterial({color});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(offset.x, offset.y, offset.z);
    scene.add(mesh);

    // CannonJS
    const shape = new CANNON.Box(
        new CANNON.Vec3(dimension.width / 2, dimension.height / 2, dimension.depth / 2)
    );

    let mass = isRigidbody ? dimension.width * dimension.height * dimension.depth : 0; // 0 means its stationary
    const body = new CANNON.Body({mass, shape});
    body.position.set(offset.x, offset.y, offset.z);
    world.addBody(body);

    if (debug)
        visualizeCollision(body, shape, mesh, offset)

    return {
        threejs: mesh,
        cannonjs: body
    };
}

function visualizeCollision(body, shape, mesh, settings){
    let sizeMulti = 1; //default size scale
    let color = 0xffffff; //default color
    let xOff = 0, yOff = 0, zOff = 0;
    if (settings.cx !== undefined){
        xOff = settings.cx;
        yOff = settings.cy;
        zOff = settings.cz;
    }
    if (settings.sizeMulti !== undefined)
        sizeMulti = settings.sizeMulti
    if (settings.color !== undefined)
        color = settings.color

    let points = []
    let cannonPoints = shape.convexPolyhedronRepresentation.vertices

    for (let i = 0; i < cannonPoints.length; i++){
        points.push(
            new THREE.Vector3(
                ((cannonPoints[i].x * sizeMulti) - settings.x) - xOff,
                ((cannonPoints[i].y * sizeMulti) - settings.y) - yOff,
                ((cannonPoints[i].z * sizeMulti) - settings.z) - zOff)
        )
    }
    const convexGeometry = new ConvexGeometry(points)
    let convexHull;
    convexHull = new THREE.Mesh(
        convexGeometry,
        new THREE.MeshBasicMaterial({
            color: color,
            wireframe: true,
        })
    )

    convexHull.position.x = body.position.x;
    convexHull.position.y = body.position.y;
    convexHull.position.z = body.position.z;

    mesh.add(convexHull)
}

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

function animation(time) {
    if (controls != null)
        controls.update()
    if (lastTime) {
        const timePassed = time - lastTime;

        updatePhysics(timePassed);
        renderer.render(scene, camera);

        //updateCamera()
    }
    lastTime = time;
}

function updateCamera() {
    if (car !== undefined) {
        camera.position.x = car.threejs.position.x - 0.85
        camera.position.y = car.threejs.position.y + 2.5
        camera.position.z = car.threejs.position.z + 2.2
    }
}

function updatePhysics(timePassed) {
    //Prevent objects to move 1000 meters below the ground if we change page and return to this one after some time
    timePassed > 200 ? timePassed = 200 : timePassed
    world.step(timePassed / 1000); // Step the physics world

    // Copy coordinates from Cannon.js to Three.js
    // for physics simulation
    physObjs.forEach((element) => {
        element.threejs.position.copy(element.cannonjs.position);
        element.threejs.quaternion.copy(element.cannonjs.quaternion);
        //use the offset so the correct position is set
        if (element.offsetPos !== undefined) {
            element.threejs.position.x += element.offsetPos[0]
            element.threejs.position.y += element.offsetPos[1]
            element.threejs.position.z += element.offsetPos[2]
        }
    });
}

window.addEventListener("resize", () => {
    // Adjust camera
    console.log("resize", window.innerWidth, window.innerHeight);
    const aspect = window.innerWidth / window.innerHeight;
    const width = 10;
    const height = width / aspect;

    camera.top = height / 2;
    camera.bottom = height / -2;

    // Reset renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
});

 // controls
window.addEventListener("keydown", function (event) {
    switch (event.key.toLowerCase()){
        case "w":
            break
    }
});

function defineColors() {
    colors = new Map()

    const red = new THREE.Color(`hsl(${0}, 100%, 50%)`)
    const green = new THREE.Color(`hsl(${120}, 100%, 50%)`)
    const blue = new THREE.Color(`hsl(${240}, 100%, 50%)`)
    const white = new THREE.Color(`hsl(${0}, 0%, 50%)`)
    const transparent = new THREE.MeshLambertMaterial({color: 0x200020, transparent: true, opacity: 0.2});

    colors.set("red", red);
    colors.set("green", green);
    colors.set("blue", blue);
    colors.set("white", white);
    colors.set("transparent", transparent)
}