import * as THREE from "three";
//import { PI } from "three/src/nodes/math/MathNode.js";
//const PI = 3.1415;


//const canvas = document.querySelector("#canva1");

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
//const render = new THREE.WebGLRenderer({antialias: true, canvas});
const render = new THREE.WebGLRenderer();

//GEOMETRYS
const geometry_ret1 = new THREE.BoxGeometry(2, 1, 1);
const geometry_whl1 = new THREE.CylinderGeometry(0.25, 0.25, 0.4, 10);
const geometry_calota1 = new THREE.CylinderGeometry(0.10, 0.10, 0.2, 6);
const geometry_window1 = new THREE.BoxGeometry(0.25, 0.5, 0.95);
const geometry_window2 = new THREE.BoxGeometry(0.35, 0.5, 1.05);
//

//MATERIALS
const material_basic = new THREE.MeshStandardMaterial({color: 0x00ff00});
const material_basic_black = new THREE.MeshStandardMaterial({color: 0x000000});
const material_basic_white = new THREE.MeshStandardMaterial({color: 0xffffff});
const material_basic_yellow = new THREE.MeshStandardMaterial({color: 0xffff40});
//

const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 10);

//MESHS
const ret1 = new THREE.Mesh(geometry_ret1, material_basic);
const whl1 = new THREE.Mesh(geometry_whl1, material_basic_black);
const whl2 = new THREE.Mesh(geometry_whl1, material_basic_black);
const whl3 = new THREE.Mesh(geometry_whl1, material_basic_black);
const whl4 = new THREE.Mesh(geometry_whl1, material_basic_black);

const calota1 = new THREE.Mesh(geometry_calota1, material_basic_white);
const calota2 = new THREE.Mesh(geometry_calota1, material_basic_white);
const calota3 = new THREE.Mesh(geometry_calota1, material_basic_white);
const calota4 = new THREE.Mesh(geometry_calota1, material_basic_white);

const window1 = new THREE.Mesh(geometry_window1, material_basic_white);
const window2 = new THREE.Mesh(geometry_window2, material_basic_white);

const farol1 = new THREE.Mesh(geometry_calota1, material_basic_yellow);
const farol2 = new THREE.Mesh(geometry_calota1, material_basic_yellow);

whl1.position.set(0.55, -0.5, -0.5);
whl2.position.set(-0.55, -0.5, -0.5);
whl3.position.set(0.55, -0.5, 0.5);
whl4.position.set(-0.55, -0.5, 0.5);

whl1.rotation.x = 3.1415 / 2; 
whl2.rotation.x = 3.1415 / 2; 
whl3.rotation.x = 3.1415 / 2; 
whl4.rotation.x = 3.1415 / 2; 

calota1.position.set(0.55, -0.5, -0.63);
calota2.position.set(-0.55, -0.5, -0.63);
calota3.position.set(0.55, -0.5, 0.63);
calota4.position.set(-0.55, -0.5, 0.63);

calota1.rotation.x = 3.1415 / 2;
calota2.rotation.x = 3.1415 / 2;
calota3.rotation.x = 3.1415 / 2;
calota4.rotation.x = 3.1415 / 2;

window1.position.set(0.90, 0.2, 0);
window2.position.set(0.80, 0.2, 0);

farol1.position.set(0.95, -0.2, 0.35);
farol2.position.set(0.95, -0.2, -0.35);

farol1.rotation.z = 3.1415 / 2;
farol2.rotation.z = 3.1415 / 2;

//

//LIGHTS
const point_light = new THREE.PointLight(0xffffff, 200, 100);
point_light.position.set(5, 5, 5);

const ambient_light = new THREE.AmbientLight(0xffffff);
//

//SCENES
scene.add(point_light);
scene.add(ambient_light);
scene.add(ret1);
scene.add(whl1);
scene.add(whl2);
scene.add(whl3);
scene.add(whl4);

scene.add(calota1);
scene.add(calota2);
scene.add(calota3);
scene.add(calota4);

scene.add(window1);
scene.add(window2);

scene.add(farol1);
scene.add(farol2);
//

camera.position.z = 5;
camera.position.y = 2;
camera.lookAt(0, 0, 0);


const increase_sensibility = 100*360; //ângulos de rotação da câmera no movimento orbital

const radius = 5; //circunferência nos eixos x e z
let orbital_x = [0];
let orbital_z = [radius];
//let circunferencia = 2*PI*radius;

for(let i=1; i<(increase_sensibility+1); i++) //órbita girando no sentido anti-horário
{
    //let side_c = Math.sqrt( 2*(radius*radius) + 2*(radius*radius)*Math.cos(360/increase_sensibility) );
    let decrease_x = radius*( Math.sin( (360/increase_sensibility)*i ) );
    let decrease_z = radius*( Math.cos( (360/increase_sensibility)*i ) );

/*
    if( (orbital_z[i-1] > 0 && orbital_z[i-1] <= 5) )
    {
      orbital_x.push(decrease_x); //retirando o valor do seno no quarto e no primeiro quadrantes como sendo os novos valores de x;
      orbital_z.push(decrease_z);
    }
*/

    orbital_x.push(decrease_x);
    orbital_z.push(decrease_z);
}

render.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( render.domElement ); //creio que isso signifique a criação automática de uma tela (canvas)

//render.setAnimationLoop(orbit);

const timer = new THREE.Timer();

let i=0;
let delta = 0;

render.setAnimationLoop(orbit);

//timer.update();
let elapsed = 0;

function orbit(time)
{
  //requestAnimationFrame(orbit);

  //camera.position()
  //time *= 0.1;
  //delta = timer.getDelta();
  timer.update(time);
  if( (timer.getElapsed() - elapsed) >= 0.01 ) //velocidade com que gira a órbita
  {
    camera.position.set(orbital_x[i], 2, orbital_z[i]);
    i++;  
    if(i > orbital_x.length) i = 0;
    camera.lookAt(0, 0, 0);
    //elapsed = timer.getElapsed();
    //console.log(delta);
    timer.reset();
    //console.log(timer.update(time));
    elapsed = timer.getElapsed();
  }
  else
  {
    //console.log(timer.getElapsed() - elapsed);
  }

  whl1.rotation.y = -time/500;
  whl2.rotation.y = -time/500;
  whl3.rotation.y = -time/500;
  whl4.rotation.y = -time/500;

  render.render(scene, camera);
  //console.log(delta);
}
//render.render(scene, camera);

//setTimeout(() => orbit, 20);

