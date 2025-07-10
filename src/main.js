import { PerspectiveCamera, Scene, WebGLRenderer, Mesh, BoxGeometry, MeshNormalMaterial } from 'three';
import { AxesHelper } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './style.css'


const scene = new Scene();

scene.add(new AxesHelper())

const camera = new PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.01, 
  1000
);
camera.position.z = 2;
camera.position.y = 0.5;
camera.position.x = 0.5;
scene.add(camera);

const cub = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshNormalMaterial()
);
scene.add(cub);

const renderer = new WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
document.body.appendChild(renderer.domElement)
renderer.render(scene, camera)

const controls = new OrbitControls(camera, renderer.domElement);

function tick() {
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(tick);
}

tick();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});