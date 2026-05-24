import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#87CEEB'); 
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    window.camera = camera;
    camera.position.set(76, -24, -1050); 
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.set(72, -27, -1058);
    window.controls = controls;
   
    document.body.appendChild(renderer.domElement); 
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); 
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2); 
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    const loader = new GLTFLoader();
    loader.load('/skippers1.glb', function (gltf) {
    const valley = gltf.scene;
    valley.scale.set(1,1,1);
    valley.position.set(0, 0, 0); 
    scene.add(valley);
});

loader.load('/scene.gltf', function (gltf) {
    const house = gltf.scene;
    house.position.set(0, -80, -1110); 
    house.scale.set(0.3, 0.3, 0.3); 
    house.rotation.set(0,0,0)
    scene.add(house);
});

loader.load('/tree.glb', function (gltf) {
    const treehouse = gltf.scene;
    treehouse.position.set(60, -120, -920);
    scene.add(treehouse);
});
    animate();
}
function animate() {
    requestAnimationFrame(animate);
    controls.update(); 
    renderer.render(scene, camera);
}
init();

