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

gsap.registerPlugin(ScrollTrigger);

const tooltips = [];
const clickableObjects = []; 
const photoGalleries = [
    {
        id: 'test',
        title: "test",
        date: "22 July 2026",
        excerpt: "test",
        images: ['/photos/1.jpg', '/photos/2.JPG', '/photos/3.JPG'] 
    },
    {
        id: 'test2',
        title: "test2",
        date: "13 April 2026",
        excerpt: "another test",
        images: ['/photos/4.JPG', '/photos/5.jpg']
    }
];

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#a02e2e');
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
        if (modelsLoaded === 4) { 
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
            tourTimeline.to(shard.position, { x: 0, y: 0, z: 0, duration: 0.3, ease: "back.out(1.2)" }, 2);
            tourTimeline.to(shard.rotation, { x: 0, y: 0, z: 0, duration: 0.3, ease: "power2.inOut" }, 2);
            tourTimeline.to(swordflash, { intensity: 100, duration: 0.1, yoyo: true, repeat: 1 }, 2.4);
        });
        tourTimeline.to(narsil.scale, { x: 0, y: 0, z: 0, duration: 0.01 }, 2.4); 
        tourTimeline.call(() => deletemodel(narsil), null, 2.5);
        checkandkilldracomalfoy();
    });
    loader.load('./anduril.glb', function (gltf) {
        anduril = gltf.scene;
        anduril.position.set(0.4, -81.7, -1136.5); 
        anduril.scale.set(0, 0, 0); 
        anduril.rotation.set(-1.6,0,0.15);
        scene.add(anduril);
        tourTimeline.to(anduril.scale, { x: 0.021, y: 0.021, z: 0.021, duration: 0.01 }, 2.4);
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


    photoGroup = new THREE.Group();
    photoGroup.position.set(27, -77, -1118); 
    scene.add(photoGroup);

    photoGalleries.forEach((gallery, index) => {
        const angle = (index / photoGalleries.length) * Math.PI * 2;
        const texture = textureloader.load(gallery.images[0]);
        const planeGeo = new THREE.PlaneGeometry(3, 2.6);
        const planeMat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        const photoMesh = new THREE.Mesh(planeGeo, planeMat);
        photoMesh.position.x = Math.cos(angle) * 4; 
        photoMesh.position.z = Math.sin(angle) * 4;
        photoMesh.rotation.y = -angle + Math.PI / 2;
        photoMesh.userData.targetPage = 'photography';
        clickableObjects.push(photoMesh);
        photoGroup.add(photoMesh);
    });

createTooltip("blog-prompt", "Click for Blog", 1.2, -81, -1135.7); 
createTooltip("photo-prompt", "Click for Gallery", 25, -77, -1117);

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
    if (renderer.getContext().isContextLost()) return; 
    requestAnimationFrame(animate);
    if (photoGroup) photoGroup.rotation.y += 0.002;
    tooltips.forEach(tag => tag.lookAt(camera.position));
    controls.update(); 
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
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

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    
    const intersects = raycaster.intersectObjects(clickableObjects, true);
    if (intersects.length > 0) {
        const targetPage = intersects[0].object.userData.targetPage;
        
        if (targetPage) {
            window.openModal(targetPage); 
        }
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
            <p style="font-style: italic; color: #8b6b4a;">Loading...</p>
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
                <div class="blogitem" style="display: flex; gap: 20px; align-items: center; border-bottom: 1px dashed rgba(139, 69, 19, 0.3); padding-bottom: 1.5rem; margin-bottom: 1.5rem;">
                    
                    <div style="flex-shrink: 0; width: 120px; height: 80px; overflow: hidden; border-radius: 4px; border: 2px solid #c8a97e;">
                        <img src="${previewImg}" style="width: 100%; height: 100%; object-fit: cover;" alt="${gallery.title}">
                    </div>
                    
                    <div>
                        <div class="blogmeta">${gallery.date}</div>
                        <h3 style="margin: 0 0 0.5rem 0; font-family: 'Skyrim2', serif; font-size: 1.8rem; color: #5c3a21;">${gallery.title}</h3>
                        <p style="font-family: 'Skyrim2'; color: #4a3b32; margin-bottom: 1rem; font-size: 1.2rem;">${gallery.excerpt}</p>
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
            <div class="metadata">Published on ${gallery.date}</div>
            
            <div style="display: flex; justify-content: center; margin-bottom: 20px;">
                <img id="main-gallery-image" src="${firstImg}" 
                style="max-width: 100%; max-height: 50vh; 
                border: 2px solid #c8a97e; 
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
                 onmouseover="this.style.transform='scale(1.1)'; this.style.borderColor='#8b0000';" 
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
    } else {
        modalContent.innerHTML = pageData[pageName];
    }
    
    modalOverlay.style.display = 'block'; 
    document.body.style.overflow = 'hidden'; 

};
window.addEventListener('click', (event) => {
    if (event.target.id === 'closemodal') {
        const modalOverlay = document.querySelector('.websitecontentmodal');
        if (modalOverlay) {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = 'auto'; 
        }
    }
});

function deletemodel(modelGroup) {
    modelGroup.traverse((child) => {
        if (child.isMesh) {
            child.geometry.dispose(); 
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(mat => disposeMaterial(mat));
                } else {
                    disposeMaterial(child.material);
                }
            }
        }
    });
    scene.remove(modelGroup);
}

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
    div.style.color = "#d4a373"; 
    div.style.fontSize = "70px"; 
    div.style.letterSpacing = "2px";
    div.style.textShadow = "-2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000"; 
    div.style.pointerEvents = "none"; 
    div.innerHTML = text;

    const labelObject = new CSS3DObject(div);
    labelObject.position.set(x, y, z);
    labelObject.scale.set(0.004, 0.004, 0.004); 
    
    scene.add(labelObject);
    tooltips.push(labelObject); 
}

tourTimeline.to(camera.position, { x: 15, y: -78.7, z: -1119, ease: "power1.inOut" }, 0)
            .to(controls.target, { x: -19, y: -77, z: -1129, ease: "power1.inOut" }, 0)
            .to('.bridge-label', { opacity: 1, ease: "power1.inOut" }, 0);

tourTimeline.to(camera.position, { x: -2, y: -81, z: -1135.3, ease: "power1.inOut" }, 1)
            .to(controls.target, { x: 50, y: -83, z: -1150, ease: "power1.inOut" }, 1)
            .to('.bridge-label', { opacity: 1, ease: "power1.inOut" }, 1);  

tourTimeline.to('#blog-prompt', { opacity: 1, ease: "power1.inOut" }, 2.5);

tourTimeline.to(camera.position, { x: 23, y: -75, z: -1123, ease: "power1.inOut" }, 4)
            .to(controls.target, { x: 33, y: -80, z: -1113, ease: "power1.inOut" }, 4)
            .to('.bridge-label', { opacity: 0, ease: "power1.inOut" }, 4);
tourTimeline.to('#blog-prompt', { opacity: 0, ease: "power1.inOut" }, 3.5);

tourTimeline.to('#photo-prompt', { opacity: 1, ease: "power1.inOut" }, 4);

tourTimeline.to(camera.position, { x: 25, y: -73.8, z: -1137, ease: "power1.inOut" }, 5)
            .to(controls.target, { x: 35, y: -78.8, z: -1127, ease: "power1.inOut" }, 5);

tourTimeline.to(camera.position, { x: -20, y: -140, z: -600, ease: "power1.inOut" }, 6)
            .to(controls.target, { x: -22, y: -140, z: -620, ease: "power1.inOut" }, 6);
tourTimeline.to('#photo-prompt', { opacity: 0, ease: "power1.inOut" }, 6);