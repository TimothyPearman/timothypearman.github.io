          // Find the latest version by visiting https://unpkg.com/three.

            import * as THREE from 'https://unpkg.com/three@0.163.0/build/three.module.js';
            //import {OrbitControls} from 'https://unpkg.com/three@0.163.0/examples/jsm/controls/OrbitControls.js';
            //console.log(OrbitControls);  //checking if the orbit controls import worked
            
            const scene = new THREE.Scene()  //declaring the thingys
            const camera = new THREE.PerspectiveCamera(
                75,
                window.innerWidth / window.innerHeight,
                0.1,
                1000
            )
            const renderer = new THREE.WebGLRenderer()
            //console.log(scene);  //checking the thingys work
            //console.log(camera);
            //console.log(renderer);
            
            renderer.setSize(window.innerWidth, window.innerHeight)  //make it take up the full screen
            renderer.setPixelRatio(devicePixelRatio)  //fix sharp edges
            document.body.appendChild(renderer.domElement)
            
            const boxGeometry = new THREE.BoxGeometry(1, 1, 1) //create the box geometry
            const boxmaterial = new THREE.MeshBasicMaterial({color: 0xFFFF00})  //create the box material
            const box = new THREE.Mesh(boxGeometry, boxmaterial)  //create the box mesh using the geometry and material


            const planegeometry = new THREE.PlaneGeometry( 5, 5 );
            const planematerial = new THREE.MeshBasicMaterial( {color: 0x00FF00, side: THREE.DoubleSide} );
            const plane = new THREE.Mesh( planegeometry, planematerial );

            const wiregeometry = new THREE.SphereGeometry( 1, 10, 10);
            const wireframe = new THREE.WireframeGeometry( wiregeometry );
            const wire = new THREE.LineSegments( wireframe );
            wire.material.depthTest = false;
            wire.material.opacity = 1;
            wire.material.transparent = true;
            
            scene.add(box)  //add objects
            scene.add(plane)  
            scene.add( wire );

            box.position.x = -2
            box.position.y = 2
            box.position.z = 0.5

            plane.position.x = 0
            plane.position.y = 0
            plane.position.z = 0
            
            wire.position.x = 0
            wire.position.y = 0
            wire.position.z = 2

            camera.position.x = 0  //move camera away from origin to see the box
            camera.position.y = -10
            camera.position.z = 5
            camera.lookAt(0, 0, 0);
            
            //const controls = new OrbitControls(camera, renderer.domElement);
            
            function animate() {  //animation loop
                renderer.render(scene, camera)

                //camera.rotation.x += 0.01 
                //camera.rotation.y += 0.01
                //camera.rotation.z += 0.01 

                wire.rotation.x += 0.01 
                wire.rotation.y += 0.01 
                wire.rotation.z += 0.01 
              
                requestAnimationFrame(animate)
            }
            
            animate()
