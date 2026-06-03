import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';


let scene, camera, renderer, controls, labelRenderer;
<<<<<<< HEAD
let narsil, anduril, pen;
=======
>>>>>>> e906274e8c31ad97b2b4762938134443d53cdff7
gsap.registerPlugin(ScrollTrigger);

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#ffffff'); 
    scene.fog = new THREE.Fog('#a4bacf', 20, 90);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    window.camera = camera;
    camera.position.set(-9, -76, -1105); 
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = true;
    controls.enableZoom = true;
    controls.target.set(70, -80, -1103);
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
<<<<<<< HEAD
    const menuItems = [                       
        { text: 'BLOG', isLink: true, url: '#blog', x: 8.5, y: -78, z: -1115.1, rx: 0, ry: 1.3, rz: 0 },
        { text: 'PHOTO<br>GRAPHY', isLink: true, url: '#photography', x: 8.9, y: -78, z: -1117.5, rx: 0, ry: 1.4, rz: 0 },
        { text: 'HOME', isLink: true, url: '#home', x: 9.8, y: -78, z: -1120.19, rx: 0, ry: 1.3, rz: 0 },
        { text: 'PROJECTS', isLink: true, url: '#projects', x: 10.5, y: -78, z: -1122.9, rx: 0, ry: 1.25, rz: 0 },
        { text: 'ABOUT', isLink: true, url: '#about', x: 11.5, y: -78, z: -1125.592, rx: 0, ry: 1.3, rz: 0 }
=======
    const menuItems = [
        { text: 'BLOG', isLink: true, url: '#blog', x: 9, y: -78, z: -1117.4, rx: 0, ry: 1.3, rz: 0 },
        { text: 'PHOTO<br>GRAPHY', isLink: true, url: '#photography', x: 8.5, y: -78, z: -1114.9, rx: 0, ry: 1.4, rz: 0 },
        { text: 'HOME', isLink: true, url: '#home', x: 9.5, y: -78, z: -1120.2, rx: 0, ry: 1.3, rz: 0 },
        { text: 'PROJECTS', isLink: true, url: '#projects', x: 10.1, y: -78, z: -1123.2, rx: 0, ry: 1.25, rz: 0 },
        { text: 'ABOUT', isLink: true, url: '#about', x: 10.9, y: -78, z: -1126.9, rx: 0, ry: 1.3, rz: 0 }
>>>>>>> e906274e8c31ad97b2b4762938134443d53cdff7
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
<<<<<<< HEAD

createBridgeMenu();
=======
createBridgeMenu();

>>>>>>> e906274e8c31ad97b2b4762938134443d53cdff7
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
<<<<<<< HEAD
const loader = new GLTFLoader();
    
    loader.load('./final.glb', function (gltf) {
        const house = gltf.scene;
        house.position.set(0, -80, -1110); 
        house.scale.set(0.3, 0.3, 0.3); 
        house.rotation.set(0,0,0);
        scene.add(house);
    }); 
    loader.load('./narsil.glb', function (gltf) {
        narsil = gltf.scene;
        narsil.position.set(0, -81.7, -1135.5); 
        narsil.scale.set(0.3, 0.3, 0.3);
        narsil.rotation.set(0,1.8,0)
        scene.add(narsil);

        narsil.children.forEach((shard) => {
            tourTimeline.to(shard.position, { x: 0, y: 0, z: 0, duration: 0.3, ease: "back.out(1.2)" }, 2);
            tourTimeline.to(shard.rotation, { x: 0, y: 0, z: 0, duration: 0.3, ease: "power2.inOut" }, 2);
        });
        tourTimeline.to(narsil.scale, { x: 0, y: 0, z: 0, duration: 0.01 }, 2.4);
    });
    loader.load('./anduril.glb', function (gltf) {
        anduril = gltf.scene;
        anduril.position.set(0, -81.6, -1135.5); 
        anduril.scale.set(0, 0, 0); 
        scene.add(anduril);
        tourTimeline.to(anduril.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 0.01 }, 2.4);
        tourTimeline.to(anduril.scale, { x: 0, y: 0, z: 0, duration: 0.2, ease: "power2.in" }, 2.5);
    });
    loader.load('./pen.glb', function (gltf) {
        pen = gltf.scene;
        pen.position.set(0, -81.5, -1135.5); 
        pen.scale.set(0, 0, 0); 
        scene.add(pen);
        clickableObjects.push(pen);
        tourTimeline.to(pen.scale, { x: 0.1, y: 0.1, z: 0.1, duration: 0.2, ease: "back.out(1.7)" }, 2.8);
        ScrollTrigger.refresh();
    });
=======
    const loader = new GLTFLoader();
    
loader.load('/test.glb', function (gltf) {
    const house = gltf.scene;
    house.position.set(0, -80, -1110); 
    house.scale.set(0.3, 0.3, 0.3); 
    house.rotation.set(0,0,0)
    scene.add(house);
});
>>>>>>> e906274e8c31ad97b2b4762938134443d53cdff7
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

<<<<<<< HEAD
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const clickableObjects = []; 

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(clickableObjects, true);

    if (intersects.length > 0) {
        openModal('blog'); 
    }
});
const pageData = {
    'blog': `<h2>Blog</h2><p>Lorem ipsum</p>`,
    'photography': `<h2>Photography</h2><p>Lorem ipsum</p>`
};

function openModal(pageName) {
    const modalOverlay = document.querySelector('.parchment'); 
    const modalContent = document.getElementById('modalcontent');
    if (!modalOverlay || !modalContent) {
        console.error("ERROR: JavaScript cannot find the .parchment or #modalcontent HTML tags!");
        return; 
    }
    modalContent.innerHTML = pageData[pageName];
    modalOverlay.style.display = 'block'; 
    document.body.style.overflow = 'hidden'; 
}
window.addEventListener('click', (event) => {
    if (event.target.id === 'closemodal') {
        const modalOverlay = document.querySelector('.parchment');
        if (modalOverlay) {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = 'auto'; 
        }
    }
});

=======
>>>>>>> e906274e8c31ad97b2b4762938134443d53cdff7
tourTimeline.to(camera.position, { x: 15, y: -78.7, z: -1119, ease: "power1.inOut" }, 0)
            .to(controls.target, { x: -19, y: -77, z: -1129, ease: "power1.inOut" }, 0)
            .to('.bridge-label', { opacity: 1, ease: "power1.inOut" }, 0);

tourTimeline.to(camera.position, { x: -2, y: -81, z: -1135, ease: "power1.inOut" }, 1)
            .to(controls.target, { x: 12, y: -83, z: -1140, ease: "power1.inOut" }, 1)
            .to('.bridge-label', { opacity: 1, ease: "power1.inOut" }, 1);

<<<<<<< HEAD
tourTimeline.to(camera.position, { x: 23, y: -75, z: -1123, ease: "power1.inOut" }, 4)
            .to(controls.target, { x: 33, y: -80, z: -1113, ease: "power1.inOut" }, 4)
            .to('.bridge-label', { opacity: 0, ease: "power1.inOut" }, 4);

tourTimeline.to(camera.position, { x: 30, y: -73.8, z: -1110, ease: "power1.inOut" }, 5)
            .to(controls.target, { x: 40, y: -78.8, z: -1100, ease: "power1.inOut" }, 5);

tourTimeline.to(camera.position, { x: -20, y: -140, z: -600, ease: "power1.inOut" }, 6)
            .to(controls.target, { x: -22, y: -140, z: -620, ease: "power1.inOut" }, 6);

=======
tourTimeline.to(camera.position, { x: 23, y: -75, z: -1123, ease: "power1.inOut" }, 2)
            .to(controls.target, { x: 33, y: -80, z: -1113, ease: "power1.inOut" }, 2)
            .to('.bridge-label', { opacity: 0, ease: "power1.inOut" }, 2);

tourTimeline.to(camera.position, { x: 30, y: -73.8, z: -1110, ease: "power1.inOut" }, 3)
            .to(controls.target, { x: 40, y: -78.8, z: -1100, ease: "power1.inOut" }, 3);

tourTimeline.to(camera.position, { x: -20, y: -140, z: -600, ease: "power1.inOut" }, 4)
            .to(controls.target, { x: -22, y: -140, z: -620, ease: "power1.inOut" }, 4);
>>>>>>> e906274e8c31ad97b2b4762938134443d53cdff7
