import { PerspectiveCamera, Scene, WebGLRenderer, PointsMaterial, BufferGeometry, Float32BufferAttribute, MathUtils } from 'three';
import { AxesHelper } from 'three';
import { Group } from 'three';
import { Points } from 'three';
import { TextureLoader } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import './style.css'


const textureLoader = new TextureLoader();
const ciculeTexture = textureLoader.load('/circle.png');
const alphaMap = textureLoader.load('/alphamap.png');


const scene = new Scene();
const count = 100;
const distance = 2;

//scene.add(new AxesHelper())

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

const points = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);
for (let i = 0; i< points.length; i++) {
  points[i] = MathUtils.randFloatSpread(distance*2);

  colors[i] = Math.random();
}

const geometry = new BufferGeometry();
geometry.setAttribute('position', new Float32BufferAttribute(points, 3));

geometry.setAttribute('color', new Float32BufferAttribute(colors, 3));
const pointMaterial = new PointsMaterial({
  size: 0.1,
  vertexColors: true,
  //map: ciculeTexture,
  alphaTest: 0.5,
  alphaMap: alphaMap,
  transparent: true,
});
const point = new Points(geometry,pointMaterial);

const group = new Group();
group.add(point);
scene.add(group);

const renderer = new WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setClearColor(0x000000, 0);
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