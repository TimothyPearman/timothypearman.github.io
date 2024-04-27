//Three.js libary
import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
//Orbit Contol module
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';
//import .gltf files
import { GLTFLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/GLTFLoader.js';

//creating the structuere
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)
const renderer = new THREE.WebGLRenderer({antialias:true})
const controls = new OrbitControls(camera, renderer.domElement);
const pointer = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
//
controls.target = new THREE.Vector3(0, 0, 0);
controls.enableRotate = true;
controls.enablePan = true;
controls.enableDamping = true;
controls.dampingFactor = 0.5;
controls.rotateSpeed = 0.5;
controls.panSpeed = 1.1;
controls.minDistance = 1;
controls.maxDistance = 20;
//controls.minAzimuthAngle = 0;
//controls.maxAzimuthAngle = 0;
//controls.minPolarAngle = 0;
//controls.maxPolarAngle = 0;
//controls.autoRotate = true;
//controls.autoRotateSpeed = 5;

renderer.setSize(window.innerWidth, window.innerHeight)  //make it take up the full screen
renderer.setPixelRatio(devicePixelRatio)  //fix sharp edges
document.body.appendChild(renderer.domElement)  //append to HTML <body>

///////////////////////////////////////////////////////////////////////////////////////////////////

//Hemisphere Light
const hemisphere = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.75);
scene.add(hemisphere);
//Ambient Light
const ambient = new THREE.AmbientLight( 0x404040 );
scene.add(ambient);
//light1
const light1 = new THREE.DirectionalLight(0xFFFFFF, 0.75)
light1.position.set(0, 5, 0)
light1.rotation.set(0, 0, 0)
//scene.add(light1)

//camera
camera.position.set(0, 5, 0)
//camera.rotation.set(0, 0, 0)
camera.lookAt(0, 0, 0);

//skybox
const skyboxgeometry = new THREE.BoxGeometry(10000, 10000, 10000);
const skyboxmaterials = [
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('docs/assets/skybox/1.png'), side: THREE.DoubleSide}),  //right of camera
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('docs/assets/skybox/2.png'), side: THREE.DoubleSide}),  //left of camera
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('docs/assets/skybox/3.png'), side: THREE.DoubleSide}),  //top of camera
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('docs/assets/skybox/4.png'), side: THREE.DoubleSide}),  //bottom of camera
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('docs/assets/skybox/5.png'), side: THREE.DoubleSide}),  //back of camera
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('docs/assets/skybox/6.png'), side: THREE.DoubleSide})  //front of camera
];
const skyboxmaterial = new THREE.MeshFaceMaterial(skyboxmaterials);
const skybox = new THREE.Mesh(skyboxgeometry, skyboxmaterial);
skybox.position.set(0, 0, 0);
skybox.rotation.set(Math.random() * 1, Math.random() * 1, Math.random() * 1);
scene.add(skybox)

//model
const gltfLoader = new GLTFLoader();
gltfLoader.setPath('./docs/assets/model/Room/');
gltfLoader.load('Room.gltf', (gltfScene) => {
    //
    //gltfScene.scene.position.set(-1.75, 0.5, -1.75)
    gltfScene.scene.rotation.set(0, -Math.PI /2 , 0)
    //gltfScene.scene.scale.set(0.02, 0.02, 0.02)
    //
    scene.add(gltfScene.scene);
});
//plane
const planegeometry = new THREE.PlaneGeometry(5, 5);
const planematerial = new THREE.MeshPhongMaterial( {color: 0xe3cad3, side: THREE.DoubleSide} );
const plane = new THREE.Mesh(planegeometry, planematerial);
plane.position.set(0, 0, 0);
plane.rotation.set(270 * (Math.PI / 180), 0, 0);
//scene.add(plane)  
//sphere
const sphereGeometry = new THREE.SphereGeometry(1, 10, 10)
//const spherematerial = new THREE.MeshPhongMaterial({color: 0xcffffb})
const spherematerial = new THREE.MeshPhongMaterial({color: 0xFF0000})
const sphere = new THREE.Mesh(sphereGeometry, spherematerial)
sphere.position.set(0, 2, 0);
sphere.rotation.set(0, 0, 0);
//sphere.material.wireframe = true;
//sphere.material.color.setHex(0xFF0000);
scene.add(sphere)

///////////////////////////////////////////////////////////////////////////////////////////////////

//keys
controls.saveState();
window.addEventListener('keydown', function(e) {
    if(e.code === 'KeyS') //save view
        controls.saveState();
    if(e.code === 'KeyL') //go back to saved view
        for (let i = 0; i < 10; i++) {
            controls.reset();
        }
});

//highlight
let intersects = [];
let firstobject;
let colour;
const onMouseMove = (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
	pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    raycaster.near = 0.1; // Minimum distance
    raycaster.far = 100;  // Maximum distance
    intersects = raycaster.intersectObjects(scene.children);
    console.log(intersects);

    if (intersects[0] != firstobject) {
        if (firstobject != null) {
        firstobject.object.material.color.set(colour);
        console.log('unhighlighted');
        }

        firstobject = intersects[0]
        colour = firstobject.object.material.color.getHex();
        firstobject.object.material.color.set(0xFFFFFF);
        console.log('highlighted');
    }
}
//click
const onMouseClick = (event) => {
    console.log('click');
    //console.log(intersects);

    if (intersects.length > 0) {
        intersects[0].object.material.color.set(Math.random() * 0xFF0000);
    }
}
//
window.addEventListener('mousemove', onMouseMove)
window.addEventListener('click', onMouseClick)

/*
var initialCode = document.documentElement.innerHTML;
// Function to check if the code has been updated
function checkForUpdate() {
    // Get the current code content
    var currentCode = document.documentElement.innerHTML;
    
    // Compare with initial code content
    if (currentCode !== initialCode) {
        // If code has been updated, refresh the page
        location.reload();
    }
}
setInterval(checkForUpdate, 5000);
*/

///////////////////////////////////////////////////////////////////////////////////////////////////

controls.update();
function animate() {  //animation loop
    renderer.render(scene, camera)

    //sphere.rotation.x += 0.01 
    //sphere.rotation.y += 0.01 
    //sphere.rotation.z += 0.01 

    skybox.rotation.x += 0.0003 
    skybox.rotation.y += 0.0003 
    skybox.rotation.z += 0.0003 

    if (animation1 == true) {
        camera.rotation.z += 0.01;
        sphere.rotation.x += 0.01 
        sphere.rotation.y += 0.01 
        sphere.rotation.z += 0.01 
    }
  
    requestAnimationFrame(animate)
}

animate()
