import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let scene, camera, renderer, controls;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#87CEEB'); 
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 5); 
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls = new OrbitControls(camera, renderer.domElement);
    document.body.appendChild(renderer.domElement); 
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); 
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2); 
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    const loader = new GLTFLoader();
    loader.load(
        '/Fox.gltf',
        function (gltf) {
            const model = gltf.scene;
            model.scale.set(0.02, 0.02, 0.02); 
            model.position.set(0, 0, 0);
            scene.add(model);
        },
        function (xhr) {
            console.log((Math.round(xhr.loaded / xhr.total * 100)) + '% loaded');
        },
    );

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update(); 
    renderer.render(scene, camera);
}
init();