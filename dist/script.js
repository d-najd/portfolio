window.focus(); // Capture keys right away (by default focus is on editor)

let camera, scene, renderer; // ThreeJS globals
let world; // CannonJs world
let lastTime; // Last timestamp of animation
let statObjs; // Objects that are not affected by gravity
let physObjs; // Objects that are affected by gravity
const originalBoxSize = 3; // Original width and height of a box
let colors;


init();




function init(){
  statObjs = [];
  physObjs = [];
  // Initialize CannonJS
  world = new CANNON.World();
  world.gravity.set(0, -10, 0); // Gravity pulls things down
  world.broadphase = new CANNON.NaiveBroadphase();
  world.solver.iterations = 40;

  defineColors();

  // Initialize ThreeJs
  const aspect = window.innerWidth / window.innerHeight;
  const width = 10;
  const height = width / aspect;

  camera = new THREE.OrthographicCamera(
      width / -2, // left
      width / 2, // right
      height / 2, // top
      height / -2, // bottom
      0, // near plane
      100 // far plane
  );

  camera.position.set(4, 4, 4);
  camera.lookAt(0, 0, 0);

  scene = new THREE.Scene();

  const floor = createBox(0, 0, 0, 3, 1, 3, false, colors.get("green"))
  statObjs.push(floor)

  const box = createBox(0, 5, 0, 1, 1, 1, true, colors.get("red"))
  physObjs.push(box)

  // Set up lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
  dirLight.position.set(10, 20, 0);
  scene.add(dirLight);

  // Set up renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(animation);
  document.body.appendChild(renderer.domElement);
}

function createBox(x, y, z, width, height, depth, falls, color){
  const geometry = new THREE.BoxGeometry(width, height, depth);
  const material = new THREE.MeshLambertMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);
  scene.add(mesh);

  // CannonJS
  const shape = new CANNON.Box(
      new CANNON.Vec3(width / 2, height / 2, depth / 2)
  );
  let mass = falls ? width * height * depth : 0; // 0 means its stationary
  const body = new CANNON.Body({ mass, shape });
  body.position.set(x, y, z);
  world.addBody(body);

  return {
    threejs: mesh,
    cannonjs: body,
    width,
    depth
  };
}

function animation(time) {
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
  world.step(timePassed / 1000); // Step the physics world

  // Copy coordinates from Cannon.js to Three.js
  // for physics simulation
  physObjs.forEach((element) => {
    element.threejs.position.copy(element.cannonjs.position);
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

function defineColors() {
  colors = new Map()

  const red = new THREE.Color(`hsl(${0}, 100%, 50%)`)
  const green = new THREE.Color(`hsl(${120}, 100%, 50%)`)
  const blue = new THREE.Color(`hsl(${240}, 100%, 50%)`)
  const white = new THREE.Color(`hsl(${0}, 0%, 50%)`)

  colors.set("red", red);
  colors.set("green", green);
  colors.set("blue", blue);
  colors.set("white", white);
}