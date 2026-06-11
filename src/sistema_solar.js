import * as THREE from "three"
import * as CREATE from "./create_three.js"

const canvas = document.querySelector("#canva1");
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
renderer.setAnimationLoop(animate);


let cameras = {};
let scenes = {};
let boxes = {};
let spheres = {};
let materials = {};

cameras['first'] = CREATE.create_camera(60, 0.1, 1000, 0, 20, 0, 0, 0, 0);

scenes['apresentation'] = CREATE.create_scene();
materials['basic_yellow'] = CREATE.create_basic_material(0xffff00);
materials['basic_blue'] = CREATE.create_basic_material(0x0000ff);
materials['basic_white'] = CREATE.create_basic_material(0xffffff);
//boxes['basic_blue'] = CREATE.create_box(1, 1, 1, materials.basic_green, 0, 0, 0);
spheres['basic_yellow'] = CREATE.create_sphere(2, 10, 10, materials.basic_yellow, 0, 0, 0);
spheres['basic_blue'] = CREATE.create_sphere(0.5, 7, 7, materials.basic_blue, 5, 0, 0);
spheres['basic_white'] = CREATE.create_sphere(0.2, 5, 5, materials.basic_white, 1.5, 0, 0);

const earthOrbit = new THREE.Object3D();
const moonOrbit = new THREE.Object3D();
const solar_system = new THREE.Object3D();

solar_system.position.set(0, 0, 0);
solar_system.add(spheres.basic_yellow);

solar_system.add(earthOrbit);
earthOrbit.position.set(0, 0, 0);
earthOrbit.add(spheres.basic_blue);

spheres.basic_blue.add(moonOrbit);
moonOrbit.position.set(0, 0, 0);
moonOrbit.add(spheres.basic_white);

scenes.apresentation.add(solar_system);




function needSetRenderSize(render)
{
    const canvas = render.domElement;
    const clientW = canvas.clientWidth;
    const clientH = canvas.clientHeight;
    const need = canvas.width != clientW || canvas.height != clientH;
    if(need)
    {
        render.setSize(clientW, clientH, false);
    }
    return need;
}


function animate(time)
{
    if(needSetRenderSize(renderer))
    {
        const tela = renderer.domElement;
        cameras.first.aspect = tela.clientWidth/tela.clientHeight;
        cameras.first.updateProjectionMatrix();
    }

    solar_system.rotation.y = time/2000;
    //earthOrbit.rotation.y = time/500;
    spheres.basic_blue.rotation.y = time/1000;

    renderer.render(scenes.apresentation, cameras.first);
}


