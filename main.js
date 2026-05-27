import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

let scene, camera, renderer, controls;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#ffffff'); 
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    window.camera = camera;
    camera.position.set(-19, -75, -1099); 
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.target.set(70, -108, -1103);
    window.controls = controls;
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1';
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
function fly(newPosition, newTarget) {
    gsap.to(camera.position, {
        x: newPosition.x,
        y: newPosition.y,
        z: newPosition.z,
        duration: 3,
        ease: "power2.inOut"
    });

    gsap.to(controls.target, {
        x: newTarget.x,
        y: newTarget.y,
        z: newTarget.z,
        duration: 3,
        ease: "power2.inOut"
    });
}

function animate() {
    requestAnimationFrame(animate);
    controls.update(); 
    renderer.render(scene, camera);
}
init();

controls.enablePan = false;
controls.enableZoom = false;
controls.enableRotate = false; 

const tourTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".scroll-container", 
        start: "top top",      
        end: "bottom bottom", 
        scrub: 1,              
    }
});

tourTimeline.to(camera.position, { x: 15, y: -77, z: -1118, ease: "power1.inOut" }, 0)
            .to(controls.target, { x: -10, y: -84, z: -1128, ease: "power1.inOut" }, 0);

tourTimeline.to(camera.position, { x: -2, y: -81, z: -1135, ease: "power1.inOut" }, 1)
            .to(controls.target, { x: 12, y: -83, z: -1140, ease: "power1.inOut" }, 1);

tourTimeline.to(camera.position, { x: -20, y: -100, z: -800, ease: "power1.inOut" }, 2)
            .to(controls.target, { x: -30, y: -110, z: -790, ease: "power1.inOut" }, 2);