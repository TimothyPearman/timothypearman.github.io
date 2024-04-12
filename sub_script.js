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
controls.saveState();

renderer.setSize(window.innerWidth, window.innerHeight)  //make it take up the full screen
renderer.setPixelRatio(devicePixelRatio)  //fix sharp edges
document.body.appendChild(renderer.domElement)  //append to HTML <body>

//skybox
const skyboxgeometry = new THREE.BoxGeometry(10000, 10000, 10000);
const skyboxmaterials = [
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('docs/assets/skybox/1.png'), side: THREE.DoubleSide}),  //right of camera
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('docs/assets/skybox/left.png'), side: THREE.DoubleSide}),  //left of camera
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('docs/assets/skybox/3.png'), side: THREE.DoubleSide}),  //top of camera
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('docs/assets/skybox/4.png'), side: THREE.DoubleSide}),  //bottom of camera
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('docs/assets/skybox/5.png'), side: THREE.DoubleSide}),  //back of camera
    new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load('docs/assets/skybox/6.png'), side: THREE.DoubleSide})  //front of camera
];
const skyboxmaterial = new THREE.MeshFaceMaterial(skyboxmaterials);
const skybox = new THREE.Mesh(skyboxgeometry, skyboxmaterial);
//
skybox.position.set(0, 0, 0);
skybox.rotation.set(0, 0, 0);

//plane
const planegeometry = new THREE.PlaneGeometry(5, 5);
const planematerial = new THREE.MeshBasicMaterial( {color: 0x00FFFF, side: THREE.DoubleSide} );
const plane = new THREE.Mesh(planegeometry, planematerial);
//
plane.position.set(0, 0, 0);
plane.rotation.set(270 * (Math.PI / 180), 0, 0);

/*//box
const boxgeometry = new THREE.BoxGeometry(1, 1, 1);
const boxmaterial = new THREE.WireframeGeometry(boxgeometry);
const box = new THREE.LineSegments(boxmaterial);
box.material.depthTest = false;
box.material.opacity = 1;
box.material.transparent = true;
//
box.position.set(-2, 0.5, -2);
box.rotation.set(0, 0, 0);
*/

//sphere
const sphereGeometry = new THREE.SphereGeometry(1, 10, 10)
const spherematerial = new THREE.MeshPhongMaterial({color: 0x00FF00})
const sphere = new THREE.Mesh(sphereGeometry, spherematerial)
//
sphere.position.set(0, 2, 0);
sphere.rotation.set(0, 0, 0);

//3Dmodel
const gltfLoader = new GLTFLoader();
gltfLoader.setPath('./docs/assets/model/mig-35/');
gltfLoader.load('scene.gltf', (gltfScene) => {
    //
    gltfScene.scene.position.set(-1.75, 0.5, -1.75)
    gltfScene.scene.rotation.set(0, -Math.PI /2 , 0)
    gltfScene.scene.scale.set(0.02, 0.02, 0.02)
    //
    scene.add(gltfScene.scene);
});

//top light1
const light1 = new THREE.DirectionalLight(0xFFFFFF, 0.75)
//
light1.position.set(0, 5, 0)
light1.rotation.set(0, 0, 0)
//top light2
const light2 = new THREE.DirectionalLight(0xFFFFFF, 0.75)
//
light2.position.set(3, 3, -5)
light2.rotation.set(0, 0, 0)

//user camera
camera.position.set(0, 5, 10)
camera.rotation.set(0, 0, 0)
//

camera.lookAt(0, 0, 0);
controls.update();

//creating the scene
scene.add(skybox)
scene.add(plane)  
//scene.add(box);
scene.add(sphere)
scene.add(light1)
scene.add(light2)

window.addEventListener('keydown', function(e) {
    if(e.code === 'KeyS') //save view
        controls.saveState();
    if(e.code === 'KeyL') //go back to saved view
        for (let i = 0; i < 10; i++) {
            controls.reset();
        }
});

/*
const mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
    //
    console.log('move')
    console.log(mouse)
});
*/

const onMouseMove = (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
	pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    raycaster.near = 0.1; // Minimum distance
    raycaster.far = 100;  // Maximum distance
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        intersects[0].object.material.color.set(Math.random() * 0xFF0000);
    }

    console.log(intersects);
}
window.addEventListener('mousemove', onMouseMove)

function animate() {  //animation loop
    renderer.render(scene, camera)

    sphere.rotation.x += 0.01 
    sphere.rotation.y += 0.01 
    sphere.rotation.z += 0.01 

    skybox.rotation.x += 0.0001 
    skybox.rotation.y += 0.0001 
    skybox.rotation.z += 0.0001 
  
    requestAnimationFrame(animate)
}

animate()
