import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { marked } from 'marked';
let scene, camera, renderer, controls, labelRenderer;
let narsil, anduril, pen;
let currentCategory = 'All';
let currentSort = 'latest';

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
    });
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
        const hitboxGeometry = new THREE.BoxGeometry(4, 4, 4); 
        const hitboxMaterial = new THREE.MeshBasicMaterial({ visible: false, color: 0xff0000 }); 
        const hitbox = new THREE.Mesh(hitboxGeometry, hitboxMaterial);
        pen.add(hitbox);
        clickableObjects.push(hitbox);
        tourTimeline.to(pen.scale, { x: 0.1, y: 0.1, z: 0.1, duration: 0.2, ease: "back.out(1.7)" }, 2.8);
        ScrollTrigger.refresh();
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

const blogPosts = [
    {
        id: 'test1',
        title: "TEST",
        date: "June 4th",
        timestamp: new Date('2026-06-04').getTime(),
        category: "test",
        excerpt: "this is a test",
        file: '/posts/test.md'
    },
    {
        id: 'test2',
        title: "Test",
        date: "October 31",
        timestamp: new Date('2026-10-31').getTime(),
        category: "test2",
        excerpt: "this is also a test",
        file: '/posts/test2.md'
    }
];

const pageData = {
    'photography': `<h2>Photography</h2><p>Lorem Ipsum Dolor Sit Amet</p>`,
    'about': `<h2>About</h2><p>idk</p>`
};

function renderBlogIndex() {
    let html = `
        <h2 class="blogtitle">Blog</h2>
        <div class="filter-bar">
            <select id="category-filter" onchange="applyFilters()">
                <option value="All" ${currentCategory === 'All' ? 'selected' : ''}>All Categories</option>
                <option value="test" ${currentCategory === 'test' ? 'selected' : ''}>test</option>
                <option value="test2" ${currentCategory === 'test2' ? 'selected' : ''}>test2</option>
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
        html += `<p style="text-align:center; font-family:'Skyrim2';">No posts found for this criteria.</p>`;
    } else {
        filteredPosts.forEach(post => {
            html += `
                <div class="blogitem" data-id="${post.id}">
                    <div class="blogmeta">${post.date} | ${post.category}</div>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <button class="readmore" onclick="openArticle('${post.id}')">Read Blog ➔</button>
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
        <button class="back" onclick="returnToIndex()">⟵ Return to List</button>
        <div class="blogcontent" style="text-align: center; margin-top: 3rem;">
            <p style="font-style: italic; color: #8b6b4a;">Loading...</p>
        </div>
    `;

    try {
        const response = await fetch(post.file);
        if (!response.ok) throw new Error("Could not find blog.");
        const markdownText = await response.text();
        const parsedHTML = marked.parse(markdownText);
        modalContent.innerHTML = `
            <button class="back" onclick="returnToIndex()">⟵ Return to List</button>
            <div class="blogcontent">
                <h2 class="blogtitle">${post.title}</h2>
                <div class="metadata">Written on ${post.date} | Category: ${post.category}</div>
                ${parsedHTML} 
            </div>
        `;
        document.querySelector('.parchment').scrollTop = 0; 
        
    } catch (error) {
        console.error(error);
        modalContent.innerHTML = `
            <button class="back" onclick="returnToIndex()">⟵ Return to List</button>
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

function openModal(pageName) {
    const modalOverlay = document.querySelector('.parchment'); 
    const modalContent = document.getElementById('modalcontent');

    if (!modalOverlay || !modalContent) return;
    if (pageName === 'blog') {
        modalContent.innerHTML = renderBlogIndex();
    } else {
        modalContent.innerHTML = pageData[pageName];
    }
    
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

tourTimeline.to(camera.position, { x: 15, y: -78.7, z: -1119, ease: "power1.inOut" }, 0)
            .to(controls.target, { x: -19, y: -77, z: -1129, ease: "power1.inOut" }, 0)
            .to('.bridge-label', { opacity: 1, ease: "power1.inOut" }, 0);

tourTimeline.to(camera.position, { x: -2, y: -81, z: -1135, ease: "power1.inOut" }, 1)
            .to(controls.target, { x: 12, y: -83, z: -1140, ease: "power1.inOut" }, 1)
            .to('.bridge-label', { opacity: 1, ease: "power1.inOut" }, 1);

tourTimeline.to(camera.position, { x: 23, y: -75, z: -1123, ease: "power1.inOut" }, 4)
            .to(controls.target, { x: 33, y: -80, z: -1113, ease: "power1.inOut" }, 4)
            .to('.bridge-label', { opacity: 0, ease: "power1.inOut" }, 4);

tourTimeline.to(camera.position, { x: 30, y: -73.8, z: -1110, ease: "power1.inOut" }, 5)
            .to(controls.target, { x: 40, y: -78.8, z: -1100, ease: "power1.inOut" }, 5);

tourTimeline.to(camera.position, { x: -20, y: -140, z: -600, ease: "power1.inOut" }, 6)
            .to(controls.target, { x: -22, y: -140, z: -620, ease: "power1.inOut" }, 6);

