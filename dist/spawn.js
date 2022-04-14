import * as THREE from './three/build/three.module.js';
import { GLTFLoader } from './three/examples/jsm/loaders/GLTFLoader.js';
import { ConvexGeometry } from './three/examples/jsm/geometries/ConvexGeometry.js'
import * as Main from './script.js'
import {debug, physObjs, scene, world} from "./script.js";
//import * as CANNON from './cannon/build/cannon.min.js' //the imported object seems to be different somehow?
//import Stats from './three/examples/jsm/libs/stats.module.js'
//import CannonUtils from './utils/cannonUtils.js'
const groundMaterial = new CANNON.Material('groundMaterial');
const dDimensions = {width: 1, height: 1, depth: 1}
const dPosition = {x: 0, y: 0, z: 0}
const dColor = 0xffffff
const dRigidbodyState = false
const dOffsets = {x: 0, y: 0, z: 0}
const dCollisionDimensions = {width: 1, height: 1, depth: 1}
const dSizeMulti = 1.0

export class Settings{
    constructor(s) {
        this.position = s.position !== undefined ? s.position : dPosition
        this.dimensions = s.dimensions !== undefined ? s.dimensions : dDimensions
        this.offsets = s.offsets !== undefined ? s.offsets : dOffsets
        this.colliderDimensions = s.colliderDimensions !== undefined ? s.colliderDimensions : dCollisionDimensions
        this.isRigidbody = s.isRigidbody !== undefined ? s.isRigidbody : dRigidbodyState;
        this.sizeMulti = s.sizeMulti !== undefined ? s.sizeMulti : dSizeMulti
        this.color = s.color !== undefined ? s.color : dColor
        this.wireframeColor = s.wireframeColor !== undefined ? s.wireframeColor : dColor
        this.dir = s.dir
        this.mass = s.mass
    }
}

export class Spawn{
    constructor() { }

    spawnFloor(s){
        const geometry = new THREE.PlaneGeometry(s.dimensions.width, s.dimensions.depth, 10);
        const material = new THREE.MeshBasicMaterial({color: s.color, side: THREE.DoubleSide});
        const plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = Math.PI/2;
        plane.position.x = s.position.x;
        plane.position.y = s.position.y;
        plane.position.z = s.position.z
        //plane.position.set(position)
        Main.scene.add(plane);

        const q = plane.quaternion;
        const planeBody = new CANNON.Body({
            mass: 0, // mass = 0 makes the body static
            material: groundMaterial,
            shape: new CANNON.Plane(),
            quaternion: new CANNON.Quaternion(-q._x, q._y, q._z, q._w),
            position: plane.position
        });
        Main.world.add(planeBody)
        return {
            threejs: plane,
            cannonjs: planeBody
        };
    }

    spawnBox(s) {
        const geometry = new THREE.BoxGeometry(
            s.dimensions.width, s.dimensions.height, s.dimensions.depth);
        const material = new THREE.MeshBasicMaterial({color: s.color});
        //const material = new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide});
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(s.position.x, s.position.y, s.position.z);

        Main.scene.add(mesh);

        const shape = new CANNON.Box(
            new CANNON.Vec3(
                s.dimensions.width / 2, s.dimensions.height / 2, s.dimensions.depth / 2)
        );

        // 0 means its stationary

        if (s.mass === undefined)
            s.mass = s.isRigidbody ? s.dimensions.width * s.dimensions.height * s.dimensions.depth * 10 : 0;
        const body = new CANNON.Body({mass: s.mass, shape: shape});
        //const body = new CANNON.Body({mass: mass, material: groundMaterial, shape: shape});
        body.position.set(s.position.x, s.position.y, s.position.z);
        Main.world.addBody(body);

        if (Main.debug.enabled) {
            visualizeCollision(body, shape, mesh, s)
        }

        return {
            threejs: mesh,
            cannonjs: body
        };
    }

    spawnCar(gs, cs, ws) { // general settings, chassis settings, wheel settings
        function loadChassis(s){
            let gltf = new GLTFLoader();
            gltf.load(s.dir, (gltf) => {
                let carMesh = gltf.scene;
                carMesh.scale.set(s.sizeMulti, s.sizeMulti, s.sizeMulti);

                scene.add(carMesh);

                const shape = new CANNON.Box(
                    new CANNON.Vec3(
                        s.colliderDimensions.x * s.sizeMulti,
                        s.colliderDimensions.y * s.sizeMulti,
                        s.colliderDimensions.z * s.sizeMulti),
                );

                if (s.mass === undefined)
                    s.mass = s.colliderDimensions.x * s.colliderDimensions.y * s.colliderDimensions.z * s.sizeMulti * 10; //wid * hei * depth
                console.log(s.mass)
                const body = new CANNON.Body({mass: s.mass, shape});
                body.position.set(s.position.x, s.position.y, s.position.z);
                world.addBody(body);

                if (debug.enabled === true)
                    visualizeCollision(body, shape, carMesh, s)
                car = {
                    threejs: carMesh,
                    cannonjs: body,
                    settings: s
                };
                Main.physObjs.push(car);
                //loadWheels()
            });
        }

        /*
        function loadWheels(){
            let oSettings = {
                position: {x: .5, y: 0, z: 0},
                offset: {x: 4, y: -0.126, z: 6.17},
                collisionDimension: {x: 2, y: 1.35, z: 5.265},
                sizeMulti: .2,
                color: colors.get("blue")};
            let gltf = new GLTFLoader();
            gltf.load('./models/car_wheel.gltf', (gltf) => {
                let carMesh = gltf.scene;
                carMesh.scale.set(oSettings.sizeMulti, oSettings.sizeMulti, oSettings.sizeMulti);

                scene.add(carMesh);
                const shape = new CANNON.Cylinder(
                    new CANNON.Vec3(
                        oSettings.collisionDimension.x * oSettings.sizeMulti,
                        oSettings.collisionDimension.y * oSettings.sizeMulti,
                        oSettings.collisionDimension.z * oSettings.sizeMulti),
                );

                let mass = 100; //wid * hei * depth
                const body = new CANNON.Body({mass, shape});
                body.position.set(oSettings.position.x, oSettings.position.y, oSettings.position.z);
                world.addBody(body);

                if (debug.enabled === true)
                    //visualizeCollision(body, shape, carMesh, oSettings)
                    car = {
                        threejs: carMesh,
                        cannonjs: body,
                        settings: oSettings
                    };

                physObjs.push(car);
            });
        }

         */


        loadChassis(cs)

        let vehicle, wheelBodies = [], wheelVisuals = [];
        const wheelMaterial = new CANNON.Material('wheelMaterial');
        const wheelGroundContactMaterial = new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
            friction: 0.3,
            restitution: 0,
            contactEquationStiffness: 1000,
        });

        Main.world.addContactMaterial(wheelGroundContactMaterial);

        // car physics body
        const chassisShape = new CANNON.Box(new CANNON.Vec3(1, 0.3, 2));
        const chassisBody = new CANNON.Body({mass: 150});
        chassisBody.addShape(chassisShape);
        chassisBody.position.set(0, 0, 0);
        chassisBody.angularVelocity.set(0, 0, 0); // initial velocity

        // car visual body
        const geometry = new THREE.BoxGeometry(2, 0.6, 4); // double chasis shape
        const material = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
        const box = new THREE.Mesh(geometry, material);
        Main.scene.add(box);

        // parent vehicle object
        vehicle = new CANNON.RaycastVehicle({
            chassisBody: chassisBody,
            indexRightAxis: 0, // x
            indexUpAxis: 1, // y
            indexForwardAxis: 2, // z
        });


        // wheel options
        const options = {
            radius: 0.3,
            directionLocal: new CANNON.Vec3(0, -1, 0),
            suspensionStiffness: 45,
            suspensionRestLength: 0.4,
            frictionSlip: 5,
            dampingRelaxation: 2.3,
            dampingCompression: 4.5,
            maxSuspensionForce: 200000,
            rollInfluence: 0.01,
            axleLocal: new CANNON.Vec3(-1, 0, 0),
            chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
            maxSuspensionTravel: 0.25,
            customSlidingRotationalSpeed: -30,
            useCustomSlidingRotationalSpeed: true,
        };

        const axlewidth = 0.7;
        options.chassisConnectionPointLocal.set(axlewidth, 0, -1);
        vehicle.addWheel(options);

        options.chassisConnectionPointLocal.set(-axlewidth, 0, -1);
        vehicle.addWheel(options);

        options.chassisConnectionPointLocal.set(axlewidth, 0, 1);
        vehicle.addWheel(options);

        options.chassisConnectionPointLocal.set(-axlewidth, 0, 1);
        vehicle.addWheel(options);

        vehicle.addToWorld(world);

        vehicle.wheelInfos.forEach(function(wheel) {
            const shape = new CANNON.Cylinder(wheel.radius, wheel.radius, wheel.radius / 2, 20);
            const body = new CANNON.Body({mass: 1, material: wheelMaterial});
            const q = new CANNON.Quaternion();
            q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
            body.addShape(shape, new CANNON.Vec3(), q);
            wheelBodies.push(body);
            // wheel visual body
            const geometry = new THREE.CylinderGeometry(wheel.radius, wheel.radius, 0.4, 32);
            const material = new THREE.MeshPhongMaterial({
                color: 0xd0901d,
                emissive: 0xaa0000,
                side: THREE.DoubleSide,
                flatShading: true,
            });
            const cylinder = new THREE.Mesh(geometry, material);
            cylinder.geometry.rotateZ(Math.PI/2);
            wheelVisuals.push(cylinder);
            scene.add(cylinder);
        });

        Main.setVehicle(vehicle, wheelBodies, wheelVisuals)

        let car = {
            threejs: box,
            cannonjs: chassisBody
        };
        Main.physObjs.push(car)
    }
}

export function visualizeCollision(body, shape, mesh, s){
    let points = []
    let vertices = shape.convexPolyhedronRepresentation.vertices

    for (let i = 0; i < vertices.length; i++){
        points.push(
            new THREE.Vector3(
                ((vertices[i].x / s.sizeMulti) - s.position.x) - s.offsets.x,
                ((vertices[i].y / s.sizeMulti) - s.position.y) - s.offsets.y,
                ((vertices[i].z / s.sizeMulti) - s.position.z) - s.offsets.z)
        )
    }

    const convexGeometry = new ConvexGeometry(points)
    let convexHull;
    convexHull = new THREE.Mesh(
        convexGeometry,
        new THREE.MeshBasicMaterial({
            color: s.wireframeColor,
            wireframe: Main.debug.collisionWireframe,
        })
    )

    convexHull.position.copy(body.position)
    mesh.add(convexHull)
}