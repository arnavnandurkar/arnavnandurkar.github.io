import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { marked } from 'marked';
let scene, camera, renderer, controls, labelRenderer;
let narsil, anduril, pen;
let currentCategory = 'All';
let currentSort = 'latest';
let photoGroup;
let projectList = [];
let projectGroup;

gsap.registerPlugin(ScrollTrigger);
const literaturePosts = [
    {
        id: 'test',
        title: "test",
        date: "29 June 2026",
        excerpt: "test",
        file: '/literature/test.md' 
    }
];

const otherPosts = [
    {
        id: 'test',
        title: "test",
        date: "29 June 2026",
        excerpt: "test",
        file: '/other/test.md'
    }
];
const tooltips = [];
const clickableObjects = []; 
const photoGalleries = [
    {
        id: 'Bhigwan',
        title: "Aquatic birds at Bhigwan, Maharashtra",
        date: "22 February 2022",
        excerpt: "A collection of photos of water birds taken at Bhigwan, Maharashtra.",
        images: ['/photos/bhigwan/1.jpg', '/photos/bhigwan/2.JPG', '/photos/bhigwan/3.JPG', '/photos/bhigwan/4.JPG', '/photos/bhigwan/5.jpg', '/photos/bhigwan/6.jpg', '/photos/bhigwan/7.jpg', '/photos/bhigwan/8.jpg',
            '/photos/bhigwan/9.jpg', '/photos/bhigwan/10.jpg', '/photos/bhigwan/11.JPG', '/photos/bhigwan/12.JPG', '/photos/bhigwan/13.JPG', '/photos/bhigwan/14.JPG', '/photos/bhigwan/15.JPG', '/photos/bhigwan/16.JPG',
            '/photos/bhigwan/17.JPG'
        ] 
    },
    {
        id: 'Ranthambore',
        title: "Ranthambore National Park 2024",
        date: "May 2024",
        excerpt: "Tigers and other Indian wildlife and birds in Ranthambore National Park, Rajasthan",
        images: ['/photos/ranthambore/1.JPG', '/photos/ranthambore/2.JPG', '/photos/ranthambore/3.JPG', '/photos/ranthambore/4.JPG', '/photos/ranthambore/5.JPG', '/photos/ranthambore/6.JPG', '/photos/ranthambore/7.JPG', '/photos/ranthambore/8.JPG',
            '/photos/ranthambore/9.JPG', '/photos/ranthambore/10.JPG', '/photos/ranthambore/11.JPG', '/photos/ranthambore/12.JPG', '/photos/ranthambore/13.JPG', '/photos/ranthambore/14.JPG', '/photos/ranthambore/15.JPG', '/photos/ranthambore/16.JPG',
            '/photos/ranthambore/17.JPG', '/photos/ranthambore/18.JPG'
        ]
    },
     {
        id: 'Pune',
        title: "The best of Pune urban wildlife",
        date: "2020-2025",
        excerpt: "A selection of my best shots of birds in Pune, India, mostly taken from my house.",
        images: ['photos/pune1/1.jpg', 'photos/pune1/2.JPG', 'photos/pune1/3.JPG']
    },
    {
        id: 'Tadoba',
        title: "Tadoba National Park 2022",
        date: "May 2022",
        excerpt: "Tigers and other Indian wildlife at Tadoba National Park, Maharashtra.",
        images: ['/photos/tadoba/1.JPG', '/photos/tadoba/2.JPG', '/photos/tadoba/3.JPG', '/photos/tadoba/4.JPG',
            '/photos/tadoba/5.JPG', '/photos/tadoba/6.JPG', '/photos/tadoba/7.JPG', '/photos/tadoba/8.JPG',
            '/photos/tadoba/9.JPG'
        ]
    },
    {
        id: 'Tamhini',
        title: "Tamhini Valley, the Sahyadri Ranges",
        date: "9 April 2023",
        excerpt: "Birds of the Sahyadri Ranges. These were taken at a photography hide around a pond in the Tamhini Valley near Pune.",
        images: ['/photos/tamhini/1.jpg', '/photos/tamhini/2.jpg', '/photos/tamhini/3.jpg','/photos/tamhini/4.jpg',
            '/photos/tamhini/5.jpg','/photos/tamhini/6.jpg','/photos/tamhini/7.jpg',
            '/photos/tamhini/8.jpg','/photos/tamhini/9.jpg','/photos/tamhini/10.jpg'
        ]
    }
];

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
    controls.target.set(70, -80, -1103);
    window.controls = controls;
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.zIndex = '-1';
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
        { text: 'BLOG', isLink: true, url: '#blog', x: 8.5, y: -78, z: -1115.1, rx: 0, ry: 1.3, rz: 0 },
        { text: 'PHOTO<br>GRAPHY', isLink: true, url: '#photography', x: 8.9, y: -78, z: -1117.5, rx: 0, ry: 1.4, rz: 0 },
        { text: 'HOME', isLink: true, url: '#home', x: 9.8, y: -78, z: -1120.19, rx: 0, ry: 1.3, rz: 0 },
        { text: 'PROJECTS', isLink: true, url: '#projects', x: 10.5, y: -78, z: -1122.9, rx: 0, ry: 1.25, rz: 0 },
        { text: 'ABOUT', isLink: true, url: '#about', x: 11.5, y: -78, z: -1125.592, rx: 0, ry: 1.3, rz: 0 }
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
      scene.environment = texture;
      
    });
const swordflash = new THREE.PointLight(0xffaa00, 0, 20);
swordflash.position.set(0.6, -81.7, -1135.3); 
scene.add(swordflash);

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
loader.setDRACOLoader(dracoLoader);

let modelsLoaded = 0;
    function checkandkilldracomalfoy() {
        modelsLoaded++;
        if (modelsLoaded === 8) { 
            dracoLoader.dispose();
        }
    }

loader.load('./rivendell.glb', function (gltf) {
        const house = gltf.scene;
        house.position.set(0, -80, -1110); 
        house.scale.set(0.3, 0.3, 0.3); 
        house.rotation.set(0,0,0);
        scene.add(house);
        checkandkilldracomalfoy();
    }); 
    loader.load('./narsil.glb', function (gltf) {
        narsil = gltf.scene;
        narsil.position.set(0.6, -81.7, -1135.3); 
        narsil.scale.set(0.35, 0.35, 0.35);
        narsil.rotation.set(0,1.8,0)
        scene.add(narsil);
        narsil.children.forEach((shard) => {
            tourTimeline.to(shard.position, { x: 0, y: 1, z: 0, duration: 0.3, ease: "back.out(1.2)" }, 2);
            tourTimeline.to(swordflash, { intensity: 100, duration: 0.1, yoyo: true, repeat: 1 }, 2.4);
        });
        tourTimeline.to(narsil.scale, { x: 0, y: 0, z: 0, duration: 0.01 }, 2.4); 
        checkandkilldracomalfoy();
    });
    loader.load('./anduril.glb', function (gltf) {
        anduril = gltf.scene;
        anduril.position.set(0.4, -81.4, -1136.5); 
        anduril.scale.set(0, 0, 0); 
        anduril.rotation.set(-1.6,0,0.15);
        scene.add(anduril);
        tourTimeline.to(anduril.scale, { x: 0.021, y: 0.021, z: 0.021, duration: 0.01 }, 2.4);
        tourTimeline.to(anduril.rotation, {x: -1.6, y: 1, z: 0, duration: 0.1}, 2.45)
        tourTimeline.to(anduril.scale, { x: 0, y: 0, z: 0, duration: 0.1, ease: "power2.in" }, 2.5);
        checkandkilldracomalfoy();
    });
    loader.load('./pen.glb', function (gltf) {
        pen = gltf.scene;
        pen.position.set(1.2, -81.5, -1135.7); 
        pen.rotation.set(0,0.5,0);
        pen.scale.set(0, 0, 0); 
        scene.add(pen);
        const hitboxGeometry = new THREE.BoxGeometry(4, 4, 4); 
        const hitboxMaterial = new THREE.MeshBasicMaterial({ visible: false, color: 0xff0000 }); 
        const hitbox = new THREE.Mesh(hitboxGeometry, hitboxMaterial);
        hitbox.userData.targetPage = 'blog';
        pen.add(hitbox);
        clickableObjects.push(hitbox);
        tourTimeline.to(pen.scale, { x: 0.15, y: 0.15, z: 0.15, duration: 0.2, ease: "back.out(1.7)" }, 2.6);
        gsap.to(pen.position, { 
        y: "-=0.3",       
        duration: 1.5,    
        yoyo: true,       
        repeat: -1,       
        ease: "sine.inOut", 
        delay: 3.5        
    });
        ScrollTrigger.refresh();
        checkandkilldracomalfoy();
    });

    loader.load('./camera.glb', function (gltf) {
        const cameraModel = gltf.scene;
        cameraModel.position.set(30, -74.5, -1130); 
        cameraModel.scale.set(6, 6, 6);
        cameraModel.rotation.set(0, 4, 0);
        scene.add(cameraModel);
        cameraModel.traverse((child) => {
            if (child.isMesh) {
                child.userData.isExternalLink = true;
                child.userData.url = 'https://instagram.com/nandurkararnav';
                clickableObjects.push(child);
            }
        });
        gsap.to(cameraModel.position, { y: "-=0.4", duration: 1.8, yoyo: true, repeat: -1, ease: "sine.inOut", delay: Math.random() * 2 });
        checkandkilldracomalfoy();
    });
    loader.load('./scroll.glb', function (gltf) {
        const scrollModel = gltf.scene;
        scrollModel.position.set(30, -75, -1130);
        scrollModel.rotation.set(0, 5, 1.4);
        scrollModel.scale.set(0.1, 0.1, 0.1);
        scene.add(scrollModel);

        scrollModel.traverse((child) => {
            if (child.isMesh) {
                child.userData.targetPage = 'credits'; 
                clickableObjects.push(child)
            }
        });
        gsap.to(scrollModel.position, { y: "-=0.4", duration: 1.8, yoyo: true, repeat: -1, ease: "sine.inOut", delay: Math.random() * 2 });
        checkandkilldracomalfoy();
    });
    loader.load('./globe.glb', function (gltf) {
        const globeModel = gltf.scene;
        globeModel.position.set(31, -75, -1132);
        globeModel.scale.set(0.2, 0.2, 0.2);
        globeModel.rotation.set(0, 1, 0);
        scene.add(globeModel);

        globeModel.traverse((child) => {
            if (child.isMesh) {
                child.userData.targetPage = 'location';
                clickableObjects.push(child);
            }
        });
        gsap.to(globeModel.position, { y: "-=0.4", duration: 1.8, yoyo: true, repeat: -1, ease: "sine.inOut", delay: Math.random() * 2 });
        checkandkilldracomalfoy();
    });
    loader.load('./phone.glb', function (gltf) {
        const phoneModel = gltf.scene;
        phoneModel.position.set(31, -76, -1133);
        phoneModel.scale.set(10, 10, 10);
        phoneModel.rotation.set(0, 1.3, 0);
        scene.add(phoneModel);

        phoneModel.traverse((child) => {
            if (child.isMesh) {
                child.userData.targetPage = 'contact';
                clickableObjects.push(child);
            }
        });
        gsap.to(phoneModel.position, { y: "-=0.4", duration: 1.8, yoyo: true, repeat: -1, ease: "sine.inOut", delay: Math.random() * 2 });
        checkandkilldracomalfoy();
    });

   
    photoGroup = new THREE.Group();
    photoGroup.position.set(26.7, -77, -1119.2);
    photoGroup.userData.globalOpacity = 0; 
    scene.add(photoGroup);

    const archMat = new THREE.MeshBasicMaterial({ visible: false, color: 0xff0000, wireframe: true }); 
    const archGeo = new THREE.BoxGeometry(0.5, 0.8, 0.5); 
    const githubArch = new THREE.Mesh(archGeo, archMat);
    githubArch.position.set(9.95, -68.1, -1107.3); 
    githubArch.userData.targetPage = 'github';
    clickableObjects.push(githubArch);
    scene.add(githubArch);
    const litArch = new THREE.Mesh(archGeo, archMat);
    litArch.position.set(10.7, -68.1, -1107.3); 
    litArch.rotation.y = -0.5; 
    litArch.userData.targetPage = 'literature';
    clickableObjects.push(litArch);
    scene.add(litArch);
    const otherArch = new THREE.Mesh(archGeo, archMat);
    otherArch.position.set(9.2, -68.1, -1107.3); 
    otherArch.rotation.y = 0.5; 
    otherArch.userData.targetPage = 'other';
    clickableObjects.push(otherArch);
    scene.add(otherArch);

    photoGalleries.slice(0, 4).forEach((gallery, index) => {
        const maxPhotos = Math.min(photoGalleries.length, 4);
        const angle = (index / maxPhotos) * Math.PI * 2;
        const texture = textureloader.load(gallery.images[0]);
        const planeGeo = new THREE.PlaneGeometry(2, 1.6);
        const planeMat = new THREE.MeshStandardMaterial({ 
            map: texture, side: THREE.DoubleSide, 
            roughness: 0.8, metalness: 0.1, transparent: true,
            opacity: 0
        });
        const photoMesh = new THREE.Mesh(planeGeo, planeMat);
        photoMesh.position.x = Math.cos(angle) * 2.5; 
        photoMesh.position.z = Math.sin(angle) * 2.5;
        photoMesh.rotation.y = -angle + Math.PI / 2;
        photoMesh.userData.targetPage = 'photography';
        clickableObjects.push(photoMesh);
        photoGroup.add(photoMesh);
    });

createTooltip("blog-prompt", "Click on the pen!", 1.2, -81, -1135.7); 
createTooltip("photo-prompt", "Click on the photos!", 26.5, -75.5, -1119.5);
createTooltip("github-prompt", "Software", 9.8, -68.4, -1105.6); 
createTooltip("lit-prompt", "Literature", 12, -68.4, -1104); 
createTooltip("other-prompt", "Other", 7.4, -68.4, -1104);
createTooltip("insta-prompt", "Instagram", 30, -73.5, -1130); 
createTooltip("credits-prompt", "Credits", 29, -75.2, -1130); 
createTooltip("location-prompt", "Location", 31, -74, -1132); 
createTooltip("contact-prompt", "Contact", 32, -75, -1133);

fetchGitHubRepos();

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

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

function animate() {
    if (renderer.getContext().isContextLost()) return; 
    requestAnimationFrame(animate);
    if (photoGroup) photoGroup.rotation.y += 0.002;
    tooltips.forEach(tag => tag.lookAt(camera.position));
    controls.update(); 
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);

    if (photoGroup) {
        photoGroup.rotation.y += 0.0015; 
        const time = Date.now() * 0.001;
        photoGroup.position.y = -77 + Math.sin(time * 1.5) * 0.1; 
        photoGroup.children.forEach(child => {
            child.material.opacity = photoGroup.userData.globalOpacity;
            child.visible = photoGroup.userData.globalOpacity > 0.01;
        });
    }
}

const tourTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".scroll-container", 
        start: "top top",      
        end: "bottom bottom", 
        scrub: 1,              
    }
});

init();

controls.enablePan = false;
controls.enableZoom = false;
controls.enableRotate = false; 

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('pointerup', (event) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const modal = document.querySelector('.websitecontentmodal');
    if (modal && modal.style.display === 'block') return;
    const intersects = raycaster.intersectObjects(clickableObjects, true);
    if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        if (clickedObject.userData.isExternalLink) {
            window.open(clickedObject.userData.url, '_blank');
            return;
        }
        const targetPage = clickedObject.userData.targetPage;
        if (targetPage === 'project-single') {
            window.openSingleProject(clickedObject.userData.projectId);
        } else if (targetPage === 'photography-single') {
            window.openGallery(clickedObject.userData.galleryId);
        } else if (targetPage) {
            window.openModal(targetPage); 
        }
    }
});

window.addEventListener('pointerup', (event) => {
    const modalOverlay = document.querySelector('.websitecontentmodal');
    if (!modalOverlay || modalOverlay.style.display !== 'block') return;
    const clickedCloseBtn = event.target.id === 'closemodal' || event.target.classList.contains('closebutton') || event.target.classList.contains('back');
    const clickedInsideContent = event.target.closest('.blogcontent');
    if (clickedCloseBtn || !clickedInsideContent) {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = 'auto'; 
    }
});

const blogPosts = [
    {
        id: 'indiancosmology',
        title: "Ancient Indian Cosmology and Metaphysics",
        date: "18 May 2025",
        timestamp: new Date('2025-05-18').getTime(),
        category: "Sanskrit",
        excerpt: "My views on the cosmological theories of ancient Indian scriptures, and how they are relevant to the modern scientific viewpoint.",
        file: '/posts/indiancosmology.md'
    },
    {
        id: 'fermi',
        title: "The Paradox of Loneliness",
        date: "20 July 2025",
        timestamp: new Date('2025-07-20').getTime(),
        category: "Physics",
        excerpt: "'Where is everybody'? An essay on the Fermi Paradox.",
        file: '/posts/fermi.md'
    }
];

function renderLocationIndex() {
    return `
        <button class="closebutton" id="closemodal">X</button>
        <div class="blogcontent" style="text-align: center;">
            <h2 class="blogtitle">My Location</h2>
            <p style="font-size: 1.3rem; margin-bottom: 2rem;">I am based in Pune, Maharashtra, India.</p>
            
            <div style="border: 4px solid #b8b8b8; border-radius: 5px; overflow: hidden; height: 350px; background: #e8dcc7; box-shadow: inset 0 0 20px rgba(0,0,0,0.5);">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04360434316!2d73.7805654!3d18.5246036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                    width="100%" height="100%" style="border:0; filter: sepia(0.8) contrast(1.1) opacity(0.8);" 
                    allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                </iframe>
            </div>
        </div>
    `;
}
function renderContactIndex() {
    return `
        <button class="closebutton" id="closemodal">X</button>
        <div class="blogcontent" style="text-align: center; margin-top: 5vh;">
            <h2 class="blogtitle">Contact</h2>
            
            <div style="display: flex; flex-direction: column; gap: 5px; flex-wrap: wrap;">
                <a href="mailto:arnavnandurkar3@gmail.com">
                    <button class="readmore" style="font-size: 1.5rem; padding: 15px 40px; text-decoration:none">
                        Email: arnavnandurkar3@gmail.com →
                    </button>
                </a><br>
                <a href="https://linkedin.com/in/arnav-nandurkar-700260324" target="_blank">
                    <button class="readmore" style="font-size: 1.5rem; padding: 15px 40px; text-decoration:none">
                        LinkedIn → 
                    </button>
                </a><br>
                <a href="https://github.com/arnavnandurkar" target="_blank">
                    <button class="readmore" style="font-size: 1.5rem; padding: 15px 40px; text-decoration:none">
                        GitHub → 
                    </button>
                </a>
            </div>
        </div>
    `;
}

function renderCreditsIndex() {
    return `
        <button class="closebutton" id="closemodal">X</button>
        <div class="blogcontent" style="text-align: center;">
            <h2 class="blogtitle">Credits</h2>
            <h3 class="blogitem" style="font-weight:normal">This website was made using Three.js. It is open source and available on my GitHub profile.<br>
            I made this 3D model in Blender with the help of the following assets:</h3>
                <div style="text-align: left; max-width: 600px; margin: 0 auto; line-height: 1.8; font-size: 1rem;">
                <ul style="list-style-type: none; padding: 0;">
                    <li style="margin-bottom: 10px;"><strong>Rivendell Architecture:</strong> "Rivendell" (https://skfb.ly/6W6zz) by Mitro123 is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Banners:</strong>"Banners" (https://skfb.ly/oSpQO) by Adam Little is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Pedestal:</strong>"Concrete Pedestal Photoscan" (https://skfb.ly/6ZHF6) by Martin Ibbett is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Arches:</strong>"Arch stones" (https://skfb.ly/oF9CB) by vadim92.34 is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Shards of Narsil:</strong>"Shards Of Narsil" (https://skfb.ly/DuyX) by Martin Wörister is licensed under CC Attribution-NonCommercial-NoDerivs (http://creativecommons.org/licenses/by-nc-nd/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Narsil:</strong>"Narsil" (https://skfb.ly/6qVKQ) by grimren13 is licensed under Creative Commons Attribution-NonCommercial (http://creativecommons.org/licenses/by-nc/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Pen:</strong>"Old Pen" (https://skfb.ly/Oq9p) by djetty is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Stairs:</strong>"Stone_Stair_Case" (https://skfb.ly/oo87n) by GetDeadEntertainment is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Fountain:</strong>"Fountain" (https://skfb.ly/CKZN) by Horniman Museum is licensed under CC Attribution-NonCommercial-NoDerivs (http://creativecommons.org/licenses/by-nc-nd/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Stone Bridge:</strong>"Bridge" (https://skfb.ly/6pL87) by Nikolayy is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Mountains:</strong>"Mountain" (https://skfb.ly/6VXLv) by dario scaramuzza is licensed under CC Attribution-NonCommercial-NoDerivs (http://creativecommons.org/licenses/by-nc-nd/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Rocks:</strong>"Rocks" (https://skfb.ly/ooQzW) by gelmi.com.br is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Tree:</strong>"Tree" (https://skfb.ly/onxWu) by Epic_Tree_Store is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Trees:</strong>"Trees Low Poly" (https://skfb.ly/6YpAS) by Igor_K. is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Rocks:</strong>"Rocks set2" (https://skfb.ly/6AXuS) by DJMaesen is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Roof:</strong>"Seamless_Slate_Roof (Free Model)" (https://skfb.ly/oA96t) by Ataru Hinata is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Roof triangle:</strong>"Triangulium - obscure triangle object" (https://skfb.ly/psyMI) by Samuel F. Angrick-Johanns (Oneironauticus) is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Gazebo:</strong>"Gazebo (Sketchfab export)" (https://skfb.ly/ptoKp) by dbPieter is licensed under Creative Commons Attribution-ShareAlike (http://creativecommons.org/licenses/by-sa/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Circular carving:</strong>"Gothic window" (https://skfb.ly/AIJ6) by ramonscortanu is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>House lower door:</strong>"Castle Style Door" (https://skfb.ly/pt7Dn) by Visthétique is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>House upper door:</strong>"Door_ Wooden_18_MB" (https://skfb.ly/p8xVp) by Mehdi Shahsavan is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Sierpinski triangle:</strong>"Sierpinski Triangle" (https://skfb.ly/6SwQT) by wareFLO is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Window:</strong>"Window" (https://skfb.ly/o6oPy) by 捺/nuts is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Balcony:</strong>"Balcony" (https://skfb.ly/CxK7) by Xan San is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Oak trees:</strong>"oak trees" (https://skfb.ly/6TGAC) by DJMaesen is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Camera:</strong>"Vintage Camera Exakta VX 1954" (https://skfb.ly/ovH8G) by Ilgis (Dolgov) Fatykhov is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Scroll:</strong>"Scroll" (https://skfb.ly/op9LV) by Yuli.Enders is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Globe:</strong>"Globe" (https://skfb.ly/6TSsK) by padmadev2005 is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Telephone:</strong>"Retro Telephone "Bordstelefon Tunnan"" (https://skfb.ly/o89y8) by Happymiel4 is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).</li>
                    <li style="margin-bottom: 10px;"><strong>Skybox image:</strong>"Quarry 04" Jarod Guest, Sergej Majboroda, polyhaven.com. CC0 license.</li>
                </ul>
            </div>
        </div>
    `;
}
function renderBlogIndex() {
    let html = `
        <h2 class="blogtitle">Blog</h2>
        <div class="filter-bar">
            <select id="category-filter" onchange="applyFilters()">
                <option value="All" ${currentCategory === 'All' ? 'selected' : ''}>All Categories</option>
                <option value="Physics" ${currentCategory === 'Physics' ? 'selected' : ''}>Physics</option>
                <option value="Sanskrit" ${currentCategory === 'Sanskrit' ? 'selected' : ''}>Sanskrit</option>
            </select>
            
            <select id="sort-filter" onchange="applyFilters()">
                <option value="latest" ${currentSort === 'latest' ? 'selected' : ''}>Latest First</option>
                <option value="oldest" ${currentSort === 'oldest' ? 'selected' : ''}>Oldest First</option>
            </select>
        </div>
        <div class="list">
    `;
    let filteredPosts = blogPosts.filter(post => {
        if (currentCategory === 'All') return true;
        return post.category === currentCategory;
    });
    filteredPosts.sort((a, b) => {
        if (currentSort === 'latest') return b.timestamp - a.timestamp;
        if (currentSort === 'oldest') return a.timestamp - b.timestamp;
    });
    if (filteredPosts.length === 0) {
        html += `<p style="text-align:center; font-family:'Skyrim2';">No posts found for this category.</p>`;
    } else {
        filteredPosts.forEach(post => {
            html += `
                <div class="blogitem" data-id="${post.id}">
                    <div class="blogmeta">${post.date} | ${post.category}</div>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <button class="readmore" onclick="openArticle('${post.id}')">Read Blog →</button>
                </div>
            `;
        });
    }
    
    html += `</div>`;
    return html;
}
window.applyFilters = function() {
    currentCategory = document.getElementById('category-filter').value;
    currentSort = document.getElementById('sort-filter').value;
    const modalContent = document.getElementById('modalcontent');
    modalContent.innerHTML = renderBlogIndex();
};
window.openArticle = async function(articleId) {
    const post = blogPosts.find(p => p.id === articleId);
    if (!post) return;
    const modalContent = document.getElementById('modalcontent');
    modalContent.innerHTML = `
        <button class="back" onclick="returnToIndex()">← Return to List</button>
        <div class="blogcontent" style="text-align: center; margin-top: 3rem;">
            <p style="font-style: italic; color: #aaaaaa;">Loading...</p>
        </div>
    `;

    try {
        const response = await fetch(post.file);
        if (!response.ok) throw new Error("Could not find blog.");
        const markdownText = await response.text();
        const parsedHTML = marked.parse(markdownText);
        modalContent.innerHTML = `
            <button class="back" onclick="returnToIndex()">← Return to List</button>
            <div class="blogcontent">
                <h2 class="blogtitle">${post.title}</h2>
                <div class="metadata">Written on ${post.date} | Category: ${post.category}</div>
                ${parsedHTML} 
            </div>
        `;
        document.querySelector('.websitecontentmodal').scrollTop = 0; 
        
    } catch (error) {
        console.error(error);
        modalContent.innerHTML = `
            <button class="back" onclick="returnToIndex()">← Return to List</button>
            <div class="manuscript-content">
                <p style="color: #8b0000; text-align: center;">Error loading post.</p>
            </div>
        `;
    }
};

window.returnToIndex = function() {
    const modalContent = document.getElementById('modalcontent');
    modalContent.innerHTML = renderBlogIndex();
};

function renderPhotographyIndex() {
    let html = `<h2 class="blogtitle">Photography</h2><div class="list">`;
    
    if (photoGalleries.length === 0) {
        html += `<p style="text-align:center; font-family:'Skyrim2';">No photos.</p>`;
    } else {
        photoGalleries.forEach(gallery => {
            const previewImg = gallery.images[0]; 
            html += `
                <div class="blogitem" style="display: flex; gap: 20px; align-items: center; padding-bottom: 1.5rem; margin-bottom: 1.5rem;">
                    <div style="flex-shrink: 0; width: 120px; height: 80px; overflow: hidden; border-radius: 4px; border: 2px solid #c2c2c2;">
                        <img src="${previewImg}" style="width: 100%; height: 100%; object-fit: cover;" alt="${gallery.title}">
                    </div>
                    
                    <div>
                        <div class="blogmeta">${gallery.date}</div>
                        <h3>${gallery.title}</h3>
                        <p>${gallery.excerpt}</p>
                        <button class="readmore" onclick="openGallery('${gallery.id}')">View Gallery →</button>
                    </div>
                </div>
            `;
        });
    }
    html += `</div>`;
    return html;
}
window.openGallery = function(galleryId) {
    const gallery = photoGalleries.find(g => g.id === galleryId);
    if (!gallery) return;
    
    const modalContent = document.getElementById('modalcontent');
    const firstImg = gallery.images[0]; 
    
    let html = `
        <button class="back" onclick="returnToGalleryIndex()">← Return to Galleries</button>
        <div class="blogcontent">
            <h2 class="blogtitle">${gallery.title}</h2>
            <div class="metadata">${gallery.date}</div>
            
            <div style="display: flex; justify-content: center; margin-bottom: 20px;">
                <img id="main-gallery-image" src="${firstImg}" 
                style="max-width: 100%; max-height: 50vh; 
                border: 2px solid #e2e2e2; 
                border-radius: 4px; 
                box-shadow: 0 4px 15px rgba(0,0,0,0.3); 
                transition: opacity 0.2s ease-in-out;">
            </div>
            
            <div style="display: flex; gap: 10px; overflow-x: auto; padding: 10px 0; justify-content: center; flex-wrap: wrap;">
    `;
    gallery.images.forEach(imgSrc => {
        html += `
            <img src="${imgSrc}" onclick="changeMainImage('${imgSrc}')" 
                 style="height: 60px; width: 90px; object-fit: cover; border: 2px solid transparent; border-radius: 4px; cursor: pointer; transition: transform 0.2s;" 
                 onmouseover="this.style.transform='scale(1.1)'; this.style.borderColor='#ffffff';" 
                 onmouseout="this.style.transform='scale(1)'; this.style.borderColor='transparent';">
        `;
    });
    
    html += `</div></div>`;
    modalContent.innerHTML = html;
    document.querySelector('.websitecontentmodal').scrollTop = 0; 
};

window.changeMainImage = function(src) {
    const mainImg = document.getElementById('main-gallery-image');
    mainImg.style.opacity = 0;
    setTimeout(() => {
        mainImg.src = src;
        mainImg.style.opacity = 1;
    }, 200);
};

window.returnToGalleryIndex = function() {
    document.getElementById('modalcontent').innerHTML = renderPhotographyIndex();
};
window.openModal = function(pageName) {
    const modalOverlay = document.querySelector('.websitecontentmodal'); 
    const modalContent = document.getElementById('modalcontent');
    if (!modalOverlay || !modalContent) return;
    if (pageName === 'blog') {
        modalContent.innerHTML = renderBlogIndex();
    } else if (pageName === 'photography') {
        modalContent.innerHTML = renderPhotographyIndex();
    } else if (pageName === 'github') {
        modalContent.innerHTML = renderGithubIndex();
    } else if (pageName === 'literature') {
        modalContent.innerHTML = renderprojectList("Literature", literaturePosts, 'literature');
    } else if (pageName === 'other') {
        modalContent.innerHTML = renderprojectList("Other Projects", otherPosts, 'other');
    } else if (pageName === 'location') {
        modalContent.innerHTML = renderLocationIndex(); 
    } else if (pageName === 'contact') {
        modalContent.innerHTML = renderContactIndex();
    } else if (pageName === 'credits') {
        modalContent.innerHTML = renderCreditsIndex();
    } else {
        modalContent.innerHTML = '<p>Page not found.</p>';
    }
    modalOverlay.style.display = 'block'; 
    document.body.style.overflow = 'hidden'; 
};

function disposeMaterial(mat) {
    mat.dispose();
    if (mat.map) mat.map.dispose();           
    if (mat.normalMap) mat.normalMap.dispose(); 
}

function createTooltip(id, text, x, y, z) {
    const div = document.createElement('div');
    div.id = id;
    div.style.opacity = '0'; 
    div.style.transition = 'opacity 0.3s ease'; 
    div.style.fontFamily = "'Skyrim2', serif";
    div.style.color = "#ffffff"; 
    div.style.fontSize = "100px"; 
    div.style.letterSpacing = "2px";
    div.style.textShadow = "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000"; 
    div.style.pointerEvents = "none"; 
    div.innerHTML = text;

    const labelObject = new CSS3DObject(div);
    labelObject.position.set(x, y, z);
    labelObject.scale.set(0.0035, 0.0035, 0.0035); 
    
    scene.add(labelObject);
    tooltips.push(labelObject); 
}
let githubRepos = [];
fetchGitHubRepos();

async function fetchGitHubRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/arnavnandurkar/repos?sort=updated&per_page=10`);
        if (!response.ok) throw new Error('Failed to fetch GitHub data');
        
        const repos = await response.json();
        githubRepos = repos.map(repo => ({
            id: repo.name,
            title: repo.name.replace(/-/g, ' ').toUpperCase(),
            description: repo.description || 'No description provided.',
            link: repo.html_url,
            stars: repo.stargazers_count,
            branch: repo.default_branch 
        }));
    } catch (error) {
        console.error("GitHub API Error:", error);
    }
}
function renderGithubIndex() {
    let html = `<h2 class="blogtitle">Software Projects: GitHub Repositories</h2><div class="list">`;
    githubRepos.forEach(repo => {
        html += `
            <div class="blogitem">
                <div class="blogmeta">★ ${repo.stars} Stars</div>
                <h3>${repo.title}</h3>
                <p>${repo.description}</p>
                <button class="readmore" onclick="openGithubReadme('${repo.id}')">Read Documentation →</button>
            </div>
        `;
    });
    html += `</div>`;
    return html;
}

window.openGithubReadme = async function(repoId) {
    const repo = githubRepos.find(r => r.id === repoId);
    if (!repo) return;
    
    const modalContent = document.getElementById('modalcontent');
    modalContent.innerHTML = `<button class="back" onclick="openModal('github')">← Back to Repositories</button><div class="blogcontent" style="text-align: center;"><p>Loading README</p></div>`;
    try {
        const response = await fetch(`https://raw.githubusercontent.com/arnavnandurkar/${repo.id}/${repo.branch}/README.md`);
        if (!response.ok) throw new Error("README not found.");
        
        const markdownText = await response.text();
        const parsedHTML = marked.parse(markdownText);
        
        modalContent.innerHTML = `
            <button class="back" onclick="openModal('github')">← Back to Repositories</button>
            <div class="blogcontent">
                <h2 class="blogtitle">${repo.title}</h2>
                ${parsedHTML}
                <div style="text-align: center; margin-top: 3rem;">
                    <a href="${repo.link}" target="_blank" style="text-decoration: none;">
                        <button class="readmore" style="font-size: 1.5rem; padding: 10px 30px; border: 1px solid #777;">View on GitHub →</button>
                    </a>
                </div>
            </div>
        `;
        document.querySelector('.websitecontentmodal').scrollTop = 0;
    } catch (error) {
        modalContent.innerHTML = `<button class="back" onclick="openModal('github')">← Back to Repositories</button><div class="blogcontent"><p style="text-align: center;">No README found for this repository.</p></div>`;
    }
};

function renderprojectList(title, array, pageName) {
    let html = `<h2 class="blogtitle">${title}</h2><div class="list">`;
    array.forEach(post => {
        html += `
            <div class="blogitem">
                <div class="blogmeta">${post.date}</div>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <button class="readmore" onclick="openprojectArticle('${post.id}', '${pageName}')">Read →</button>
            </div>
        `;
    });
    html += `</div>`;
    return html;
}

window.openprojectArticle = async function(articleId, sourcePage) {
    const array = sourcePage === 'literature' ? literaturePosts : otherPosts;
    const post = array.find(p => p.id === articleId);
    if (!post) return;
    
    const modalContent = document.getElementById('modalcontent');
    modalContent.innerHTML = `<button class="back" onclick="openModal('${sourcePage}')">← Back</button><p style="text-align:center;">Loading...</p>`;

    try {
        const response = await fetch(post.file);
        if (!response.ok) throw new Error("File not found.");
        const markdownText = await response.text();
        const parsedHTML = marked.parse(markdownText);
        
        modalContent.innerHTML = `
            <button class="back" onclick="openModal('${sourcePage}')">← Back</button>
            <div class="blogcontent">
                <h2 class="blogtitle">${post.title}</h2>
                <div class="metadata">${post.date}</div>
                ${parsedHTML}
            </div>
        `;
        document.querySelector('.websitecontentmodal').scrollTop = 0;
    } catch (error) {
        modalContent.innerHTML = `<button class="back" onclick="openModal('${sourcePage}')">← Back</button><p style="text-align:center;">Error loading file.</p>`;
    }
}; 



tourTimeline.to(camera.position, { x: 15, y: -78.7, z: -1119, ease: "power1.inOut" }, 0)
            .to(controls.target, { x: -19, y: -77, z: -1129, ease: "power1.inOut" }, 0)
            .to('.bridge-label', { opacity: 1, ease: "power1.inOut" }, 0);

tourTimeline.to(camera.position, { x: -2, y: -81, z: -1135.3, ease: "power1.inOut" }, 1)
            .to(controls.target, { x: 50, y: -83, z: -1150, ease: "power1.inOut" }, 1)
            .to('.bridge-label', { opacity: 1, ease: "power1.inOut" }, 1)
            .to('.bridge-label', { opacity: 0, ease: "power1.inOut" }, 1.5);
            
tourTimeline.to('#blog-prompt', { opacity: 1, ease: "power1.inOut" }, 2.5);

tourTimeline.to(camera.position, { x: 23.5, y: -76, z: -1122.5, ease: "power1.inOut" }, 4)
            .to(controls.target, { x: 33, y: -80, z: -1113, ease: "power1.inOut" }, 4)
          
tourTimeline.to('#blog-prompt', { opacity: 0, ease: "power1.inOut" }, 3.5);

tourTimeline.to('#photo-prompt', { opacity: 1, ease: "power1.inOut" }, 4);

tourTimeline.to(photoGroup.userData, { globalOpacity: 1, ease: "power1.inOut" }, 4);

tourTimeline.to(photoGroup.userData, { globalOpacity: 0, ease: "power1.inOut" }, 5);

tourTimeline.to('#photo-prompt', { opacity: 0, ease: "power1.inOut" }, 5);

tourTimeline.to('#github-prompt', { opacity: 1, ease: "power1.inOut" }, 5);
tourTimeline.to('#lit-prompt', { opacity: 1, ease: "power1.inOut" }, 5);
tourTimeline.to('#other-prompt', { opacity: 1, ease: "power1.inOut" }, 5);

tourTimeline.to(camera.position, { x: 10, y: -68, z: -1108.6, ease: "power1.inOut" }, 5)
            .to(controls.target, { x: 10, y: -69, z: -1100, ease: "power1.inOut" }, 5);

tourTimeline.to('#github-prompt', { opacity: 0, ease: "power1.inOut" }, 6);
tourTimeline.to('#lit-prompt', { opacity: 0, ease: "power1.inOut" }, 6);
tourTimeline.to('#other-prompt', { opacity: 0, ease: "power1.inOut" }, 6);

tourTimeline.to(camera.position, { x: 28, y: -75, z: -1133, ease: "power1.inOut" }, 6)
            .to(controls.target, { x: 38, y: -75, z: -1125, ease: "power1.inOut" }, 6);
tourTimeline.to('#insta-prompt, #credits-prompt, #location-prompt, #contact-prompt', { opacity: 1, ease: "power1.inOut" }, 6);
