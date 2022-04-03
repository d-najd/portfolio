import * as THREE from './build/three.module.js';
import {GLTFLoader} from './jsm/loaders/GLTFLoader.js';

console.log(THREE)
console.log(GLTFLoader)
window.focus(); // Capture keys right away (by default focus is on editor)


/*

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import Stats from 'three/examples/jsm/libs/stats.module'
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry'
import * as CANNON from 'cannon-es'
import CannonUtils from './utils/cannonUtils'


 */




//TODO possibly use this to set the hitboxes https://sbcode.net/threejs/convexgeometry/
// ALSO THIS REQUIRES IMPORTING STUFF AND I HAVE TO FIGURE OUT HOW TO DO THAT


let camera, scene, renderer; // ThreeJS globals
let world; // CannonJs world
let lastTime; // Last timestamp of animation
let statObjs; // Objects that are not affected by gravity
let physObjs; // Objects that are affected by gravity
let colors;

let car; // the player

init();

function init() {
    statObjs = [];
    physObjs = [];
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

    const floor = createBox(0, 0, 0, 7, 1, 7, false, colors.get("green"))
    statObjs.push(floor)

    const box = createBox(0, 5, 0, 1, 1, 1, true, colors.get("transparent"))
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
    let gltf = new GLTFLoader();
    gltf.load('./models/car_chassis_hitbox_test.gltf', (gltf) => {
        let carMesh = gltf.scene;
        carMesh.scale.set(0.2, 0.2, 0.2);
        scene.add(carMesh);
        carMesh.position.set(0, 5, 3);

        const shape = new CANNON.Box(
            new CANNON.Vec3(1, 1, 1)
        );
        //shape.position.y += 0.5
        let mass = 100; //wid * hei * depth
        const body = new CANNON.Body({mass, shape});
        body.position.set(0, 5, 3);
        world.addBody(body);

        let offsetPos = [0,-0.754,0];

        car = {
            threejs: carMesh,
            cannonjs: body,
            offsetPos
        };
        car.threejs.rotation.y = 45.4
        //car.cannonjs.position.z += 0.3
        //car.cannonjs.quaternion.x = 1
        physObjs.push(car);
        updateCamera()
    });
}

function createBox(x, y, z, width, height, depth, falls, color) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshLambertMaterial({color});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    scene.add(mesh);

    // CannonJS
    const shape = new CANNON.Box(
        new CANNON.Vec3(width / 2, height / 2, depth / 2)
    );
    let mass = falls ? width * height * depth : 0; // 0 means its stationary
    const body = new CANNON.Body({mass, shape});
    body.position.set(x, y, z);
    world.addBody(body);

    return {
        threejs: mesh,
        cannonjs: body
    };
}

function animation(time) {
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
    let enableCameraControls = true
    if (enableCameraControls)
        cameraControls(event.key.toLowerCase())

    switch (event.key.toLowerCase()){
        case "w":
            break
        case "s":
            break
        case "d":
            break
        case "a":
            break
        case "b":
            break
    }
});


function cameraControls(key){
    const cameraMovSens = 0.15;
    const cameraRotSens = 0.025;
    switch (key){
        case "w":
            camera.position.z -= cameraMovSens;
            break
        case "s":
            camera.position.z += cameraMovSens;
            break
        case "a":
            camera.position.x -= cameraMovSens;
            break
        case "d":
            camera.position.x += cameraMovSens;
            break
        case "q":
            camera.position.y -= cameraMovSens;
            break
        case "e":
            camera.position.y += cameraMovSens;
            break
        case "r": // look at car
            camera.position.x = car.threejs.position.x - 0.85
            camera.position.y = car.threejs.position.y + 2.5
            camera.position.z = car.threejs.position.z + 2.2
            camera.rotation.x = -0.8
            camera.rotation.y = 0
            camera.rotation.z = 0
            break
        case "i":
            camera.rotation.x += cameraRotSens
            break
        case "k":
            camera.rotation.x -= cameraRotSens
            break
        case "u":
            camera.rotation.z -= cameraRotSens
            break
        case "o":
            camera.rotation.z += cameraRotSens
            break
        case "l":
            camera.rotation.y -= cameraRotSens
            break
        case "j":
            camera.rotation.y += cameraRotSens
            break
    }
}

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