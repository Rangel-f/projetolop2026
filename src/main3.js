import * as THREE from "three";

//MAPA DE TECLAS
let keymap = []; //armazenando apenas as teclas que estão sendo pressionadas no momento

//EVENTOS
let flag_scene = false;
//let flag_x = 0;
//let flag_z = 0;

document.addEventListener('keydown', (event) => 
{
    //console.log(event);
    if(event.key == 'b') //a ser futuramente estendido também para a tecla 'b'
    {
        flag_scene = !flag_scene;
    }

    else if(keymap.indexOf(event.key) == -1)
    {
        keymap.push(event.key);
        console.log(keymap);
    } 


    /*
    if(event.key == 'ArrowUp')
    {
        flag_x = 1;
    }
    else if(event.key == "ArrowDown")
    {
        flag_x = -1;
    }
    else flag_x = 0;

    if(event.key == "ArrowRight")
    {
        flag_z = 1;
    }
    else if(event.key == "ArrowLeft")
    {
        flag_z = -1;
    }
    else flag_z = 0;
    */
});

document.addEventListener('keyup', (event) => {

    keymap.splice(keymap.indexOf(event.key), 1);
    //flag_x = 0;
    //flag_z = 0;
    console.log(keymap);
})
//




//SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);
const scene2 = new THREE.Scene();
scene2.background = new THREE.Color(0xffffff);
//

//CAMERA
const camera_far = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
const camera_pov = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
camera_far.position.set(5, 5, 5);
camera_far.lookAt(0, 0, 0);
camera_pov.position.set(-7, 2.5, 0);
camera_pov.lookAt(0, 0, 0);
//

//RENDER
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setAnimationLoop(animate);
//

//LIGHTS
const light1 = new THREE.AmbientLight(0xffffff, 5);
const light2 = new THREE.PointLight(0xffffff, 2, 0, 0);
const light3 = new THREE.AmbientLight(0xffffff, 5);
const light4 = new THREE.PointLight(0xffffff, 2, 0, 0);

light2.position.set(5, 5, 5);
light4.position.set(5, 5, 5);

scene.add(light1);
scene.add(light2);

scene2.add(light3);
scene2.add(light4);
//




//CREATE MATERIALS
let materials_standart = {};
function create_standart(color, atributo)
{
    const mm = new THREE.MeshStandardMaterial({color, roughness:1});
    materials_standart[atributo] = mm;
}
//

//STANDART MATERIALS
create_standart(0x00ff00, 'verde'); //criando um material verde no atributo 'verde' do objeto materials_standart
create_standart(0x000000, 'preto'); //preto
create_standart(0xffffff, 'branco'); //branco
create_standart(0x0000ff, 'azul'); //azul
create_standart(0xffff00, 'amarelo'); //amarelo
create_standart(0x404040, 'cinza'); //cinza
//


//CREATE MATRIZ
const matriz_onibus = [];
//


//TEXTURES
const texture_load = new THREE.TextureLoader();

const texture_ground = texture_load.load('./textures/grama_textura.jpg');
texture_ground.colorSpace = THREE.SRGBColorSpace;

const texture_rua = texture_load.load('./textures/rua_textura.jpg');
texture_rua.colorSpace = THREE.SRGBColorSpace;
//




//CREATE OBJECTS
let boxes = {};
function create_box(dim_x, dim_y, dim_z, material, pos_x, pos_y, pos_z, atributo)
{
    const box_g = new THREE.BoxGeometry(dim_x, dim_y, dim_z);
    const box = new THREE.Mesh(box_g, material);
    box.position.set(pos_x, pos_y, pos_z);
    boxes[atributo] = box;
    scene.add(box);
}
let spheres = {};
function create_sphere(radius, widthSegments, heightSegments, material, pos_x, pos_y, pos_z, atributo)
{
    const sphere_g = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const sphere = new THREE.Mesh(sphere_g, material);
    sphere.position.set(pos_x, pos_y, pos_z);
    spheres[atributo] = sphere;
    scene.add(sphere);
}
let cylinders = {};
function create_cylinder(radiusTop, radiusBottom, height, radialSegments, material, pos_x, pos_y, pos_z, atributo)
{
    const cylinder_g = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
    const cylinder = new THREE.Mesh(cylinder_g, material);
    cylinder.position.set(pos_x, pos_y, pos_z);
    cylinders[atributo] = cylinder;
    scene.add(cylinder);
}
//

//BOXES
create_box(2, 1, 1, materials_standart.verde, 0, 0, 0, 'carcaca');                          matriz_onibus.push(boxes.carcaca); //adicionando na matriz
create_box(0.25, 0.5, 0.95, materials_standart.branco, 0.90, 0.2, 0, 'janela_frente');      boxes.carcaca.add(boxes.janela_frente); //filho
create_box(0.35, 0.5, 1.05, materials_standart.branco, 0.80, 0.2, 0, 'janela_lateral');     boxes.carcaca.add(boxes.janela_lateral); //filho
create_box(0.5, 0.5, 0.5, materials_standart.cinza, 0, 0.35, 0, 'antena_base');             boxes.carcaca.add(boxes.antena_base); //filho
create_box(0.2, 0.5, 0.2, materials_standart.cinza, 0, 0.5, 0, 'antena_top1');              boxes.antena_base.add(boxes.antena_top1); //filho //filho
create_box(0.15, 0.15, 0.6, materials_standart.cinza, 0, 0, 0.3, 'antena_top2');            
create_box(0.5, 10, 0.5, materials_standart.preto, 4, 0, -100, 'parada');                              
//

//SPHERES
create_sphere(0.20, 100, 100, materials_standart.azul, 0, 0.2, 0, 'azul');                  boxes.antena_top1.add(spheres.azul); spheres.azul.name = "esfera_azul";
                                                                                            spheres.azul.add(boxes.antena_top2);
//

//CYLINDERS
create_cylinder(0.25, 0.25, 0.4, 10, materials_standart.preto, 0.55, -0.5, -0.5, 'roda1');  boxes.carcaca.add(cylinders.roda1); //filho
create_cylinder(0.25, 0.25, 0.4, 10, materials_standart.preto, -0.55, -0.5, -0.5, 'roda2'); boxes.carcaca.add(cylinders.roda2); //filho
create_cylinder(0.25, 0.25, 0.4, 10, materials_standart.preto, 0.55, -0.5, 0.5, 'roda3');   boxes.carcaca.add(cylinders.roda3); //filho
create_cylinder(0.25, 0.25, 0.4, 10, materials_standart.preto, -0.55, -0.5, 0.5, 'roda4');  boxes.carcaca.add(cylinders.roda4); //filho

create_cylinder(0.10, 0.10, 0.2, 6, materials_standart.branco, 0.55, -0.5, -0.63, 'calota1');  boxes.carcaca.add(cylinders.calota1); //filho
create_cylinder(0.10, 0.10, 0.2, 6, materials_standart.branco, -0.55, -0.5, -0.63, 'calota2'); boxes.carcaca.add(cylinders.calota2); //filho
create_cylinder(0.10, 0.10, 0.2, 6, materials_standart.branco, 0.55, -0.5, 0.63, 'calota3');   boxes.carcaca.add(cylinders.calota3); //filho
create_cylinder(0.10, 0.10, 0.2, 6, materials_standart.branco, -0.55, -0.5, 0.63, 'calota4');  boxes.carcaca.add(cylinders.calota4); //filho

create_cylinder(0.10, 0.10, 0.2, 6, materials_standart.amarelo, 0.95, -0.2, 0.35, 'farol1');   boxes.carcaca.add(cylinders.farol1); //filho
create_cylinder(0.10, 0.10, 0.2, 6, materials_standart.amarelo, 0.95, -0.2, -0.35, 'farol2');  boxes.carcaca.add(cylinders.farol2); //filho

cylinders.roda1.rotation.x = 3.1415 / 2;
cylinders.roda2.rotation.x = 3.1415 / 2;
cylinders.roda3.rotation.x = 3.1415 / 2;
cylinders.roda4.rotation.x = 3.1415 / 2;

cylinders.calota1.rotation.x = 3.1415 / 2;
cylinders.calota2.rotation.x = 3.1415 / 2;
cylinders.calota3.rotation.x = 3.1415 / 2;
cylinders.calota4.rotation.x = 3.1415 / 2;

cylinders.farol1.rotation.z = 3.1415 / 2;
cylinders.farol2.rotation.z = 3.1415 / 2;
//

//OTHERS
const ground_geometry = new THREE.BoxGeometry(1000, 1, 1000);
const ground_material = new THREE.MeshBasicMaterial({map: texture_ground});
const ground = new THREE.Mesh(ground_geometry, ground_material);
ground.position.set(0, -1.3, 0);
ground.rotation.y = -3.1415 / 2;
scene2.add(ground);

const rua_geometry = new THREE.BoxGeometry(3, 0.2, 1000);
const rua_material = new THREE.MeshBasicMaterial({map: texture_rua});
const rua = new THREE.Mesh(rua_geometry, rua_material);
rua.position.set(0, 0.5, 0);
scene2.add(rua);
ground.add(rua);
scene2.add(boxes.parada);
ground.add(boxes.parada);


const matriz_onibus_2 = matriz_onibus.map(mesh => mesh.clone()); //matriz clone para os elementos mesh funcionarem em outra scene
matriz_onibus_2.forEach(mesh => scene2.add(mesh));
console.log(matriz_onibus_2);

const esf_blue = matriz_onibus_2[0].getObjectByName("esfera_azul");
//


function animate(time)
{
    time *= 0.001;
/*    
    matriz_onibus.forEach(element => {
        element.rotation.y = time;
    });
*/
    boxes.carcaca.rotation.y = time;
    //boxes.antena_top2.rotation.x = time;
    //boxes.antena_top2.rotation.z = time;


    if(!flag_scene)
    {
        //boxes.antena_top2.lookAt(5, 5, 5);
        //spheres.azul.lookAt(5, 0, 0);
        renderer.render(scene, camera_far);
        //console.log(matriz_onibus[1]); //não existe posição diferente de 0, pois o vetor só possui 1 elemento (pai). pego durante a clonagem
    } 
    else
    {
        const parada_position = new THREE.Vector3();
        boxes.parada.getWorldPosition(parada_position); //capturando a posição espacial da parada de ônibus
        esf_blue.lookAt(parada_position);


        if(keymap.indexOf('ArrowUp') != -1) ground.position.x -= 0.2;
        if(keymap.indexOf('ArrowDown') != -1) ground.position.x += 0.2;
        if(keymap.indexOf('ArrowRight') != -1) ground.position.z -= 0.2;
        if(keymap.indexOf('ArrowLeft') != -1) ground.position.z += 0.2;
/*
        if(flag_x != 0) if()
        {
            if(flag_x == 1) ground.position.x -= 0.2;
            else if(flag_x == -1) ground.position.x += 0.2;
        }

        if(flag_z != 0)
        {
            if(flag_z == 1) ground.position.z -= 0.2;
            else if(flag_z == -1) ground.position.z += 0.2;
        }
*/
        renderer.render(scene2, camera_pov);
    } 
}