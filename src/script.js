import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

let sphere;
let scene;

const sizes = {width: window.innerWidth, height: window.innerHeight}

const camera = new THREE.PerspectiveCamera(90, sizes.width / sizes.height, 0.1, 100)

function init(){
    scene = new THREE.Scene();


    //let sceneObj = new SceneObj("John", 45);
    //let te = sceneObj.test()

    // Objects
    const geometry = new THREE.TorusGeometry( .7, .2, 16, 100);

    // Materials
    const material = new THREE.MeshBasicMaterial();
    material.color = new THREE.Color(0xff0000);

    // Mesh
    sphere = new THREE.Mesh(geometry,material);
    scene.add(sphere);

    // Lights
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6); //TODO this doesnt seem to work fix it and add better lighting
    dirLight.position.set(10, 20, 0);
    scene.add(dirLight);

    /**
     * Camera
     */
    // Base camera

    camera.position.x = 0
    camera.position.y = 0
    camera.position.z = 2
    scene.add(camera)

    // Controls
    // const controls = new OrbitControls(camera, canvas)
    // controls.enableDamping = true
}

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
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 15.0 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

init()
tick()