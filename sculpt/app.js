import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r122/three.module.min.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.122.0/examples/jsm/loaders/GLTFLoader.js';


// SETUP

const cnv = document.getElementById('cnv');

const ui = {
    caption: document.querySelectorAll(".caption"),
    orbit: document.querySelector(".orbit"),
    arrows: document.querySelectorAll(".arrow"),
    material: document.querySelector(".material"),
    sound: document.querySelector(".sound"),
}

const interfaces = {};

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xa0a0a0);
scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 12;
camera.position.y = 0.6;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
cnv.appendChild(renderer.domElement);


// GROUND

const mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(200,200), new THREE.MeshPhongMaterial({color: 0x949597, depthWrite: false}));
mesh.rotation.x = - Math.PI / 2;
mesh.receiveShadow = true;
scene.add(mesh);


// LIGHTS

const hemiLight = new THREE.HemisphereLight(0xbbbbbb, 0xDDF0FC, 0.5);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

const dirLight1 = new THREE.DirectionalLight(0xDDF0FC, 0.5);
dirLight1.position.set(-3, 5, -10);
dirLight1.castShadow = true;
scene.add(dirLight1);

const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
dirLight2.position.set(3, 5, 18);
scene.add(dirLight2);


let materials = [];

materials[0] = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe : true});
materials[1] = new THREE.MeshLambertMaterial({color: 0xfffffe}); 
materials[2] = new THREE.MeshPhongMaterial({color: 0x040404, specular: 0x222222, shininess: 20, flatShading : THREE.FlatShading}); 
materials[3] = new THREE.MeshNormalMaterial();


// INIT

let models = [];

let captions = [
    ["model_0", "Version 0"], 
    ["model_1", "Variation 1"],
    ["model_2", "Pieds 1"],
    ["model_3", "Pieds 2"],
    ["model_4", "Pieds 3"],
    ["model_5", "Pieds 4"],
    ["model_6", "Pieds 5"],
    ["model_7", "Pieds 6"],
    ["model_8", "Pieds 7"],
    ["model_9", "Pieds 8"],
    ["model_10", "Pieds 9"]
];

let promises = []
for (let i = 0; i <= 10; i++) promises.push(loadModel(`models/model_${i}.glb`).then(gltf => {models[i] = gltf.scene;}));

function promiseAllProgress(proms, progress_callback) {

    let d = 0;
    progress_callback(d);

    for (let prom of proms) {
        prom.then(()=> {    
        d++;
        progress_callback((d * 100) / proms.length);
      });
    }

    return Promise.all(proms).then(init);
}

function init() {

    for (let i = 0; i < models.length; i++) {
        models[i].name = "maquette";
        models[i].caption = captions[i];
        addShadows(models[i]);
    }
    
    switchMaterial(materials[1]);
    addModel(models[0]);
    updateCaption(models[0].caption)
    
    scene.rotation.y = -2;
    scene.rotation.x = 0.08;
    
    animate();
    generateInterface();
    discardOverlay();
}

promiseAllProgress(promises, (current_progress) => {
    document.querySelector(".progress").style.width = `${current_progress * 0.9 + 10}%`
});


// LOOP

function animate() {   
    requestAnimationFrame(animate);
	render();
}

function render() {
    renderer.render(scene, camera);
}


// INPUTS

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

const bindOrbit = () => {
    let OFFSET;
    interfaces.orbit = new Interface(ui.orbit);
    
    interfaces.orbit.down = function(loc) {
        OFFSET = {x: loc.x, y: loc.y};
    }
    interfaces.orbit.move = function(loc) {
        let deltaX = (loc.x - OFFSET.x) * 0.004;
        let deltaY = (loc.y - OFFSET.y) * 0.004;
        scene.rotation.y += deltaX;
        scene.rotation.x += deltaY;
        OFFSET = {x: loc.x, y: loc.y};
    }
}

const bindArrows = () => {
    interfaces.arrows = [];
    [-1, 1].forEach((el, i) => {
        interfaces.arrows[i] = new Interface(ui.arrows[i]).down = () => {
            let current = models.find(model => model.isDisplayed);
            let next = models.carousel(models.indexOf(current) + el);
            removeModel(current);
            addModel(next);
            updateCaption(next.caption);
        };
    });
}

const bindMaterial = () => {
    interfaces.material = new Interface(ui.material).down = () => {
        let current = materials.find(material => material.isDisplayed);
        let next = materials.carousel(materials.indexOf(current) + 1);
        switchMaterial(next);
    };
}

const bindSound = () => {
    interfaces.sound = new Interface(ui.sound).down = () => {
        ui.sound.classList.toggle("playing");
        sample.paused ? (sample.play()) : sample.pause(), sample.currentTime = 0;
    };
}


// AUDIO

const sample = new Audio("media/audio.mp3");

sample.addEventListener('canplay', function showSndBtn() {
    sample.removeEventListener('canplay', showSndBtn);
    sample.loop = true;
    ui.sound.style.display = "block";
});


// FUNCTIONS

function loadModel(url) {
    return new Promise(resolve => {
        new GLTFLoader().load(url, resolve);
    });
}

function discardOverlay() {
 document.querySelector(".loading").style.display = "none";
}

function generateInterface() {
    bindInterface();
    displayInterface();
}

function  bindInterface() {
    bindOrbit();
    bindArrows();
    bindMaterial();
    bindSound();
}

function displayInterface() {
    models.length < 2 && (document.querySelector(".arrow-wrap").style.display = "none");
    document.querySelector(".interface").style.display = "block";
}

function updateCaption(caption) {
    caption = caption || [];
    ui.caption[0].innerHTML = caption[0];
    ui.caption[1].innerHTML = caption[1];
}

function switchMaterial(newMaterial) {
    for (let ma of materials) {
        ma.dispose();
        ma.isDisplayed = false;
    }
    for (let mo of models) mo.traverse(node => {node.isMesh && (node.material = newMaterial)});
    newMaterial.isDisplayed = true;
}

function addShadows(obj) {
    obj.traverse(node => {node.isMesh && (node.castShadow = true)});
}

function removeModel(model) {
    scene.remove(model);
    model.traverse(node => {node.geometry?.dispose();});
    model.isDisplayed = false;
}

function addModel(model) {
    scene.add(model);
    model.isDisplayed = true;
}


// UTILS

Array.prototype.carousel = function(id) {
    id >= this.length && (id = 0); 
    id < 0 && (id = this.length-1); 
    return this[id]
};

THREE.Object3D.prototype.isDisplayed = false;
THREE.Material.prototype.isDisplayed = false;

document.addEventListener("keydown", e => {
    e.key === "a" &&
    console.log(`programs: ${renderer.info.programs.length}
    memory:
    geometries: ${renderer.info.memory.geometries}
    textures: ${renderer.info.memory.textures}`
    )
});

document.addEventListener("contextmenu", e => {e.preventDefault();}, false);