import * as THREE from 'three';
import './style.css';
const texture = new THREE.TextureLoader().load('llama.jpg')
const texture2 = new THREE.TextureLoader().load('1.jpg')

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );

renderer.render(scene, camera);

renderer.setSize( window.innerWidth, window.innerHeight );

const geometry = new THREE.BoxGeometry( 2, 2, 2 );
const material = new THREE.MeshBasicMaterial( { map: texture } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
const donut_geo = new THREE.TorusGeometry(10, 3, 16, 100);
const donut_tex = new THREE.MeshBasicMaterial({ map: texture2 });
const donut = new THREE.Mesh(donut_geo, donut_tex);
scene.add(donut);

camera.position.z = 300;
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  cube.rotation.x += 0.05;
  cube.rotation.z += 0.0;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0000;
  camera.rotation.y = t * -0.0000;

}

document.body.onscroll = moveCamera;
moveCamera();



function animate() {

  donut.rotation.z += 0.08;
  donut.rotation.x += 0.06;
  cube.rotation.y += 0.06;

  renderer.render( scene, camera );
}

animate()
function add_star() {
  const star_geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const star_material = new THREE.MeshBasicMaterial({ color: 0xffffff  });
  const star = new THREE.Mesh(star_geometry, star_material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(add_star);
