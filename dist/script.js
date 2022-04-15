import * as THREE from './three/build/three.module.js';
import { GLTFLoader } from './three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './three/examples/jsm/controls/OrbitControls.js'
import { ConvexGeometry } from './three/examples/jsm/geometries/ConvexGeometry.js'
import * as Spawn from './spawn.js'
//import * as CANNON from './cannon/build/cannon.min.js' //the imported object seems to be different somehow?
//import Stats from './three/examples/jsm/libs/stats.module.js'
//import CannonUtils from './utils/cannonUtils.js'

window.focus(); // Capture keys right away (by default focus is on editor)

export let camera, scene, renderer; // ThreeJS globals
export let world; // CannonJs world
let lastTime; // Last timestamp of animation
let statObjs = []; // Objects that are not affected by gravity
export let physObjs = []; // Objects that are affected by gravity
let colors; // list of colors

export const debug = {enabled: true, collisionWireframe: true};
let Spawner;

// car wheels
let wheelBodies = [],
    wheelVisuals = [];
let vehicle

let count = 2500

init();

function init() {
    // Initialize CannonJS
    world = new CANNON.World();
    world.gravity.set(0, -10, 0); // Gravity pulls things down
    world.broadphase = new CANNON.SAPBroadphase(world);
    world.defaultContactMaterial.friction = 0;
    world.solver.iterations = 40;
    scene = new THREE.Scene();

    // Initialize ThreeJs
    const aspect = window.innerWidth / window.innerHeight;
    const width = 10;
    const height = width / aspect;

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 200)
    camera.position.set(2, 0, 4);

    //setup of other scripts
    Spawner = new Spawn.Spawn()
    defineColors();
    const floor = Spawner.spawnFloor(new Spawn.Settings({
            dimensions: {width: 100, depth: 100},
            position: {x: 0, y: -3, z: 0},
            color: colors.get("green")}))
    statObjs.push(floor)

    const box = Spawner.spawnBox(new Spawn.Settings({
        position: {x: 0, y: 3, z: 0},
        dimensions: {width: 1, height: 1, depth: 1},
        color: colors.get("white"),
        isRigidbody: true
    }))
    physObjs.push(box)

    let chassisSettings = {
        position: {x: 0, y: 0, z: 0},
        rotation: {x: 0, y: Math.PI/2 * 2, z: 0},
        offsets: {x: 0, y: 0, z: 0}, //offsets don't work
        colliderDimensions: {x: .65 * Math.PI, y: .545 * Math.PI, z: 1.7 * Math.PI}, // why do I need to use pi here? like seriously?
        sizeMulti: .32,
        mass: 150,
        wireframeColor: colors.get("white"),
        dir: './models/car_chassis.gltf'}
    let wheelSettings = {
        position: {x: 0, y: 0, z: 0},
        offset: {x: 0, y: 0, z: 0},
        collisionDimension: {x: 1, y: 1, z: 1},
        sizeMulti: .32,
        color: colors.get("blue")}
    Spawner.spawnCar(undefined, new Spawn.Settings(chassisSettings), wheelSettings)

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

//#region physics

function animation(time) {
    if (controls != null)
        controls.update()
    if (lastTime) {
        const timePassed = time - lastTime;

        updatePhysics(timePassed);
        renderer.render(scene, camera);
    }
    lastTime = time;
}

function updatePhysics(timePassed) {
    //Prevent objects to move 1000 meters below the ground if we change page and return to this one after some time
    timePassed > 200 ? timePassed = 200 : timePassed
    //world.step(timePassed / 1000); // Step the physics world
    world.step(1 / 60); // Step the physics world

    // Copy coordinates from Cannon.js to Three.js
    // for physics simulation
    physObjs.forEach((element) => {
        let cannonPos = element.cannonjs.position;
        let threePos = element.threejs.position;
        if (element.settings !== undefined) {
            threePos.x = cannonPos.x + element.settings.offsets.x * element.settings.sizeMulti
            threePos.y = cannonPos.y + element.settings.offsets.y * element.settings.sizeMulti
            threePos.z = cannonPos.z + element.settings.offsets.z * element.settings.sizeMulti
        } else
            threePos.copy(element.cannonjs.position);
        element.threejs.quaternion.copy(element.cannonjs.quaternion);
    });
}

// update the wheels to match the physics
world.addEventListener('postStep', function() {
    if (vehicle !== undefined)
    for (let i=0; i<vehicle.wheelInfos.length; i++) {
        vehicle.updateWheelTransform(i);
        let t = vehicle.wheelInfos[i].worldTransform;
        // update wheel physics
        wheelBodies[i].position.copy(t.position);
        wheelBodies[i].quaternion.copy(t.quaternion);
        // update wheel visuals
        wheelVisuals[i].position.copy(t.position);
        wheelVisuals[i].quaternion.copy(t.quaternion);
    }
});

//#endregion

//#region controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

function navigate(e) {
    if (e.type !== 'keydown' && e.type !== 'keyup') return;
    const keyup = e.type === 'keyup';
    vehicle.setBrake(0, 0);
    vehicle.setBrake(0, 1);
    vehicle.setBrake(0, 2);
    vehicle.setBrake(0, 3);

    const engineForce = 800,
        maxSteerVal = 0.3;
    switch(e.key.toLowerCase()) {

        case "w": // forward
            vehicle.applyEngineForce(keyup ? 0 : -engineForce, 2);
            vehicle.applyEngineForce(keyup ? 0 : -engineForce, 3);
            break;

        case "s": // backward
            vehicle.applyEngineForce(keyup ? 0 : engineForce, 2);
            vehicle.applyEngineForce(keyup ? 0 : engineForce, 3);
            break;

        case "d": // right
            vehicle.setSteeringValue(keyup ? 0 : -maxSteerVal, 2);
            vehicle.setSteeringValue(keyup ? 0 : -maxSteerVal, 3);
            break;

        case "a": // left
            vehicle.setSteeringValue(keyup ? 0 : maxSteerVal, 2);
            vehicle.setSteeringValue(keyup ? 0 : maxSteerVal, 3);
            break;
    }
}

window.addEventListener('keydown', navigate)
window.addEventListener('keyup', navigate)

//#endregion

window.addEventListener("resize", () => {
    // Adjust camera
    console.log("resize", window.innerWidth, window.innerHeight);
    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width/height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});

export function setVehicle(vehicle_, wheelBodies_, wheelVisuals_){
    vehicle = vehicle_
    wheelBodies = wheelBodies_
    wheelVisuals = wheelVisuals_
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