import * as THREE from "three";

const canvas = document.querySelector("#canva1"); //importando do documento HTML o id de uma tela (canva) para passar nos parâmetros do WebGLRender e ter uma versatilidade maior de utilização da tela


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000); //fov, aspect, near, far
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



//Detalhes da geometria do cubo

    const cube_geometry = new THREE.BoxGeometry(1, 1, 1);
    const cube_material = new THREE.MeshNormalMaterial({color: 0xff0000});

    const cube = new THREE.Mesh(cube_geometry, cube_material);

    scene.add(cube)

//Detalhes da geometria do cubo

//Detalhes da geometria das linhas

    const points = [];            //x   y  z

    points.push( new THREE.Vector3(-10, 0, 0) );
    points.push( new THREE.Vector3(0, 10, 0) );
    points.push( new THREE.Vector3(10, 0, 0) );
    //points.push( new THREE.Vector3(0, 10, -10) );

    const lines_geometry = new THREE.BufferGeometry().setFromPoints( points );

    const lines_material = new THREE.LineBasicMaterial({color: 0xff0000});

    const line = new THREE.Line(lines_geometry, lines_material);

    scene.add(line);

    const blue_line_points = [];
    blue_line_points.push( new THREE.Vector3(0, 10, -10) );
    blue_line_points.push( new THREE.Vector2(0, 10) );
    const blue_line_geometry = new THREE.BufferGeometry().setFromPoints( blue_line_points );
    const blue_line_material = new THREE.LineBasicMaterial({color: 0x0000ff});

    const blue_line = new THREE.Line(blue_line_geometry, blue_line_material);
    scene.add(blue_line);
//Detalhes da geometria das linhas


camera.position.set(50, 50, 50);
camera.lookAt(0, 0, 0);
//camera.position.set(3, 0, 10);

//renderer.render(scene, camera); //responsável por renderizar a imagem na tela //IMPORTANTE!

/*
function animate(time) 
{
    cube.rotation.x = time / 3000;
    cube.rotation.y = time / 3000;

    renderer.render(scene, camera);
    //console.log("Opa!");

}
renderer.setAnimationLoop(animate);
*/


function animation(time)
{
    blue_line.rotation.y = time/3000;

    cube.rotation.x = time/1500;
    cube.rotation.y = time/1500;

    renderer.render(scene, camera);
}


renderer.setAnimationLoop(animation);


