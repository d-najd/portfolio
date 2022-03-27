import './style.css'
import { SceneObj } from './SceneObj';
import * as THREE from 'three'
//import * as CANNON from 'cannon';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

let scene;
let sceneObject;

const sizes = {width: window.innerWidth, height: window.innerHeight}

const camera = new THREE.PerspectiveCamera(90, sizes.width / sizes.height, 0.1, 100)

function init(){
    scene = new THREE.Scene();
    sceneObject = new SceneObj();

    defineColors()
    defineObjects()
    defineLighting()
    setupCamera()

    function defineColors(){
        const red = new THREE.MeshStandardMaterial();
        const green = new THREE.MeshStandardMaterial();
        const blue = new THREE.MeshStandardMaterial();
        const white = new THREE.MeshStandardMaterial();

        red.color = new THREE.Color(255, 0, 0);
        green.color = new THREE.Color(0, 255, 0);
        blue.color = new THREE.Color(0, 0, 255);
        white.color = new THREE.Color(255, 255, 255);

        sceneObject.materials.set("red", red);
        sceneObject.materials.set("green", green);
        sceneObject.materials.set("blue", blue);
        sceneObject.materials.set("white", white);
    }

    function defineObjects(){
        let tempGeometry = new THREE.BoxGeometry(100, 0.1, 100, 100, 100, 100);
        const ground = new THREE.Mesh(tempGeometry, sceneObject.materials.get("green"));
        //ground.receiveShadow = true;
        ground.translateY(-2);
        scene.add(ground);
        sceneObject.objects.set("floor", ground);

        tempGeometry = new THREE.BoxGeometry(3, 1, 1.2);
        const car = new THREE.Mesh(tempGeometry, sceneObject.materials.get("white"));
        //car.receiveShadow = true
        car.translateZ(-5);
        car.rotation.y = 2.2;
        car.translateY(-.5);
        scene.add(car);
        sceneObject.objects.set("car", car);

        tempGeometry = new THREE.TorusGeometry(.7, .2, 16, 50);
        const donut = new THREE.Mesh(tempGeometry, sceneObject.materials.get("red"));
        //donut.receiveShadow = true
        scene.add(donut);
        sceneObject.objects.set("donut", donut)
    }

    function defineLighting() {
        //TODO maybe ray-casting will solve the problems with lighting?
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.6); //TODO this doesnt seem to work fix it and add better lighting
        dirLight.position.set(10, 20, 0);
        //dirLight.castShadow = true
        //dirLight.shadow.mapSize.set(4096,4096);
        //dirLight.shadow.radius = 1.75
        scene.add(dirLight);

        // Set up lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.0018);
        scene.add(ambientLight);

    }

    function setupCamera() {
        camera.position.x = 0
        camera.position.y = 1.5
        camera.position.z = 2
        scene.add(camera)
    }
}

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
//renderer.shadowMapEnabled = true
//renderer.shadowMap.enabled = true;
//renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    //renderer.updateShadowMap()

    const elapsedTime = clock.getElapsedTime()

    // Update objects

    sceneObject.objects.get("donut").rotation.y = 1.75 * elapsedTime

    //camera.rotation.y = 1.5 * elapsedTime

    //console.log(camera.rotation.y)
    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

init()
tick()