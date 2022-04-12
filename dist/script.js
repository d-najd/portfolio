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
const debug = {enabled: true, collisionWireframe: true};

init();

function init() {
    // Initialize CannonJS
    world = new CANNON.World();
    world.gravity.set(0, -10, 0); // Gravity pulls things down
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 40;

    defineColors();
    loadObjs();

    // Initialize ThreeJs
    const aspect = window.innerWidth / window.innerHeight;
    const width = 10;
    const height = width / aspect;

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100)

    camera.position.set(4, 4, 4);
    camera.rotation.x = -0.8

    scene = new THREE.Scene();

    const floor = createBox(
        {x: 0, y: -3, z: 0}, {width: 15, height: 1, depth: 15},
        false, colors.get("green"), )
    statObjs.push(floor)

    const box = createBox(
        {x: 0, y: 3, z: 0}, {width: 1, height: 1, depth: 1},
        true, colors.get("white"))
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

function loadObjs() {
    //cx, cy, cz are supposted to be offsets for the colliders
    let carSettings = {
        position: {x: .5, y: 0, z: 0},
        offset: {x: .8, y: -.0252, z: 1.234},
        collisionDimension: {x: .4, y: .27, z: 1.053},
        sizeMulti: 5.0,
        color: colors.get("red")};
    console.log(carSettings)
    let gltf = new GLTFLoader();
    gltf.load('./models/car_chassis.gltf', (gltf) => {
        let carMesh = gltf.scene;
        carMesh.scale.set(1/carSettings.sizeMulti, 1/carSettings.sizeMulti, 1/carSettings.sizeMulti);

        scene.add(carMesh);

        const shape = new CANNON.Box(
            new CANNON.Vec3(
                carSettings.collisionDimension.x,
                carSettings.collisionDimension.y,
                carSettings.collisionDimension.z),
        );

        let mass = 100; //wid * hei * depth
        const body = new CANNON.Body({mass, shape});
        body.position.set(carSettings.position.x, carSettings.position.y, carSettings.position.z);
        world.addBody(body);

        if (debug.enabled === true)
            visualizeCollision(body, shape, carMesh, carSettings)

        car = {
            threejs: carMesh,
            cannonjs: body,
            settings: carSettings
        };

        physObjs.push(car);
        updateCamera()
    });
}

function createBox(position, dimension, isRigidbody, color) {
    const geometry = new THREE.BoxGeometry(dimension.width, dimension.height, dimension.depth);
    const material = new THREE.MeshLambertMaterial({color});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(position.x, position.y, position.z);
    scene.add(mesh);

    // CannonJS
    const shape = new CANNON.Box(
        new CANNON.Vec3(dimension.width / 2, dimension.height / 2, dimension.depth / 2)
    );

    let mass = isRigidbody ? dimension.width * dimension.height * dimension.depth : 0; // 0 means its stationary
    const body = new CANNON.Body({mass, shape});
    body.position.set(position.x, position.y, position.z);
    world.addBody(body);

    if (debug.enabled === true) {
        let settings = {position: {x: position.x, y: position.y, z: position.z}}
        visualizeCollision(body, shape, mesh, settings)
    }

    return {
        threejs: mesh,
        cannonjs: body
    };
}

function visualizeCollision(body, shape, mesh, settings){
    let sizeMulti = 1; //default size scale
    let color = 0xffffff; //default color
    let xOff = 0, yOff = 0, zOff = 0; //offsets
    if (settings.offset !== undefined){
        xOff = settings.offset.x;
        yOff = settings.offset.y;
        zOff = settings.offset.z;
    }
    if (settings.sizeMulti !== undefined)
        sizeMulti = settings.sizeMulti
    if (settings.color !== undefined)
        color = settings.color

    let points = []
    let vertices = shape.convexPolyhedronRepresentation.vertices

    for (let i = 0; i < vertices.length; i++){
        points.push(
            new THREE.Vector3(
                ((vertices[i].x * sizeMulti) - settings.position.x) - (xOff * sizeMulti),
                ((vertices[i].y * sizeMulti) - settings.position.y) - (yOff * sizeMulti),
                ((vertices[i].z * sizeMulti) - settings.position.z) - (zOff * sizeMulti))
        )
    }
    let enableWireframe = debug.collisionWireframe

    const convexGeometry = new ConvexGeometry(points)
    let convexHull;
    convexHull = new THREE.Mesh(
        convexGeometry,
        new THREE.MeshBasicMaterial({
            color: color,
            wireframe: enableWireframe,
        })
    )

    convexHull.position.copy(body.position)
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
        let cannonPos = element.cannonjs.position;
        let threePos = element.threejs.position;
        if (element.settings !== undefined) {
            threePos.x = cannonPos.x + element.settings.offset.x
            threePos.y = cannonPos.y + element.settings.offset.y
            threePos.z = cannonPos.z + element.settings.offset.z
        } else
            threePos.copy(element.cannonjs.position);
        element.threejs.quaternion.copy(element.cannonjs.quaternion);
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