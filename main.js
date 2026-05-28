import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';


let scene, camera, renderer, controls, labelRenderer;
gsap.registerPlugin(ScrollTrigger);

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#ffffff'); 
    scene.fog = new THREE.Fog('#7fb6e9', 10, 500);
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

    labelRenderer = new CSS3DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'fixed';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.left = '0px'; 
    labelRenderer.domElement.style.pointerEvents = 'none';
    labelRenderer.domElement.style.zIndex = '10';
    labelRenderer.domElement.style.pointerEvents = 'none'; 
    document.body.appendChild(labelRenderer.domElement);

function createBridgeMenu() {
    const menuItems = [
        { text: 'Blog', isLink: true, url: '#blog', x: 9, y: -78, z: -1118.5, rx: 0, ry: 1.3, rz: 0 },
        { text: 'Photo<br>graphy', isLink: true, url: '#photography', x: 8.5, y: -78, z: -1116.5, rx: 0, ry: 1.4, rz: 0 },
        { text: 'Home', isLink: true, url: '#home', x: 9.5, y: -78, z: -1120.5, rx: 0, ry: 1.3, rz: 0 },
        { text: 'Projects', isLink: true, url: '#projects', x: 10.1, y: -78, z: -1122.5, rx: 0, ry: 1.25, rz: 0 },
        { text: 'About', isLink: true, url: '#about', x: 10.9, y: -78, z: -1124.5, rx: 0, ry: 1.3, rz: 0 }
    ];
    menuItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'bridge-label';
        div.style.pointerEvents = 'auto'; 

        if (item.isLink) {
            div.innerHTML = `<a href="${item.url}">${item.text}</a>`;
        } else {
            div.innerHTML = `<h2>${item.text.split('\n')[0]}</h2><p>${item.text.split('\n')[1]}</p>`;
        }

        const labelObject = new CSS3DObject(div);
        
        labelObject.position.set(item.x, item.y, item.z);
        labelObject.rotation.set(item.rx, item.ry, item.rz);
        labelObject.scale.set(0.02, 0.02, 0.02); 
        
        scene.add(labelObject);
    });
}
createBridgeMenu();

    const ambientLight = new THREE.AmbientLight(0xffffff, 1); 
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2); 
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    const textureloader = new THREE.TextureLoader();
    const texture = textureloader.load(
    '/sky.jpg',
    () => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      texture.colorSpace = THREE.SRGBColorSpace;
      scene.background = texture;
    });
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

    labelRenderer.render(scene, camera);
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
            .to(controls.target, { x: -10, y: -84, z: -1128, ease: "power1.inOut" }, 0)
            .to('.bridge-label', { opacity: 1, ease: "power1.inOut" }, 0);

tourTimeline.to(camera.position, { x: -2, y: -81, z: -1135, ease: "power1.inOut" }, 1)
            .to(controls.target, { x: 12, y: -83, z: -1140, ease: "power1.inOut" }, 1)
            .to('.bridge-label', { opacity: 1, ease: "power1.inOut" }, 1);

tourTimeline.to(camera.position, { x: 23, y: -75, z: -1123, ease: "power1.inOut" }, 2)
            .to(controls.target, { x: 33, y: -80, z: -1113, ease: "power1.inOut" }, 2);

tourTimeline.to(camera.position, { x: -20, y: -140, z: -800, ease: "power1.inOut" }, 3)
            .to(controls.target, { x: -22, y: -140, z: -820, ease: "power1.inOut" }, 3);

tourTimeline.to(camera.position, { x: -20, y: -140, z: -600, ease: "power1.inOut" }, 4)
            .to(controls.target, { x: -22, y: -140, z: -620, ease: "power1.inOut" }, 4);