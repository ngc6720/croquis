import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r122/three.module.min.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.122.0/examples/jsm/loaders/GLTFLoader.js';


// SETUP

let model;

const cnv = document.getElementById('cnv');

const loader = new GLTFLoader();
loader.load('models/sculpture4.glb', function(gltf) {
    model = gltf.scene;
    scene.add(model);
    gltf.scene.traverse(function(node) {
        if (node.isMesh) {node.castShadow = true;}
    });
    }, undefined, function(err) {console.error(err);
});

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xa0a0a0 );
scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 9;
camera.position.y = 3.4;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
cnv.appendChild(renderer.domElement);


// GROUND

const mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(200,200), new THREE.MeshPhongMaterial({color: 0xffffff, depthWrite: false}));
mesh.rotation.x = - Math.PI / 2;
mesh.receiveShadow = true;
scene.add(mesh);


// LIGHTS

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444,0.5);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
dirLight.position.set(3, 5, 10);
dirLight.castShadow = true;
dirLight.shadow.camera.far = 60;
scene.add(dirLight);


// RENDERING

function animate() {
    requestAnimationFrame(animate);
	render();
}
animate();

function render() {
    renderer.render(scene, camera);
}


// INPUTS

let tempInt;

const clearRotation = function() {
    clearInterval(tempInt);
    document.removeEventListener("mouseup", clearRotation);
}

const rotateRight = function() {
    tempInt = setInterval(function() {
        scene.rotation.y -= 0.1;
    }, 50)
    document.addEventListener("mouseup", clearRotation);
}
const rotateLeft = function() {
    tempInt = setInterval(function() {
        scene.rotation.y += 0.1;
    }, 50)
    document.addEventListener("mouseup", clearRotation);
}

let btnleft = document.getElementById("left");
btnleft.onmousedown = rotateLeft;

let btnright = document.getElementById("right");
btnright.onmousedown = rotateRight;

window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
