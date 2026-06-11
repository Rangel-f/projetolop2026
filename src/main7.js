import * as THREE from "three";

// ==> MAPA DE TECLAS <==
let keymap = []; //armazenando apenas as teclas que estão sendo pressionadas no momento
//

// ==> EVENTOS <==
let flag_scene = false;
const raio_da_curva = 3;

document.addEventListener('keydown', (event) => 
{

    let event_key = event.key;
    event_key = event_key.toUpperCase();

    if(event_key == 'B')
    {
        flag_scene = !flag_scene;
    }

    else if(keymap.indexOf(event_key) == -1)
    {
        keymap.push(event_key);
        console.log(keymap);
    } 
});

document.addEventListener('keyup', (event) => {

    keymap.splice(keymap.indexOf(event.key.toUpperCase()), 1);
})
//





// ==> SCENE <==
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const scene2 = new THREE.Scene();
scene2.background = new THREE.Color(0xffffff);
//

// ==> CAMERA <== 
const camera_far = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
const camera_pov = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);
camera_far.position.set(5, 5, 5);
camera_far.lookAt(0, 0, 0);
camera_pov.position.set(-10, 4, 0);
camera_pov.lookAt(0, 0, 0);
//

// ==> RENDER <==
const canvas = document.querySelector('#canvas1');
const renderer = new THREE.WebGLRenderer({antialias: true, canvas});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setAnimationLoop(animate);

/*
function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}
*/
//

// ==> LIGHTS <==
const light1 = new THREE.AmbientLight(0xffffff, 5);
const light2 = new THREE.PointLight(0xffffff, 2, 0, 0);
const light3 = new THREE.AmbientLight(0xffffff, 5);
const light4 = new THREE.PointLight(0xffffff, 2, 0, 0);

light2.position.set(5, 5, 5);
light4.position.set(5, 5, 5);

scene.add(light1, light2);
scene2.add(light3, light4);
//





// ==> CREATE MATERIALS <== (FUNCTION)
let materials_standart = {};
function create_standart(color, atributo)
{
    const mm = new THREE.MeshStandardMaterial({color, roughness:1});
    materials_standart[atributo] = mm;
}
//


// ==> STANDART MATERIALS <==
create_standart(0x00ff00, 'verde'); //criando um material verde no atributo 'verde' do objeto materials_standart
create_standart(0x000000, 'preto'); //preto
create_standart(0xffffff, 'branco'); //branco
create_standart(0x0000ff, 'azul'); //azul
create_standart(0xffff00, 'amarelo'); //amarelo
create_standart(0x404040, 'cinza'); //cinza
//

// ==> TEXTURES <==
const texture_load = new THREE.TextureLoader();

import groundtextura from './textures/grama_textura.jpg'
const texture_ground = texture_load.load(groundtextura);
texture_ground.colorSpace = THREE.SRGBColorSpace;

import ruatextura from './textures/rua_textura.jpg'
const texture_rua = texture_load.load(ruatextura);
texture_rua.colorSpace = THREE.SRGBColorSpace;

import moedastextura from './textures/moedas_textura.png'
import { element } from "three/tsl";
const texture_moedas = texture_load.load(moedastextura);
texture_moedas.colorSpace = THREE.SRGBColorSpace;
//


// ==> OBJETOS MESH <==
const matriz_onibus = [];
let matriz_onibus_2 = [];

    // ==> caixas de colisão <==
    let moedas_Box3 = []; //moedas
    let carcaca_box_helper = new THREE.Box3(); //carcaça
    const Box3Helper_carcaca = new THREE.Box3(); //carcaça
    //

//


// ==> CREATE OBJECTS <== (FUNCTION)
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
    // ==> randomização de posições para elementos <== (function)
function randomize_elements_position(min, max)
{
    let random = Math.random() * (max - min + 1) + min;
    return random;
}
//


// ==> BOXES <==
create_box(2, 1, 1, materials_standart.verde, 0, 0, 0, 'carcaca');                          matriz_onibus.push(boxes.carcaca); //adicionando na matriz
boxes.carcaca.name = "carcaca";

create_box(2, 1, 1, materials_standart.verde, 0, 0, 0, 'carcaca_clone'); 
boxes.carcaca_clone.name = "carcaca_clone"; //criando um clone para servir de BoxHelper
boxes.carcaca.add(boxes.carcaca_clone);

create_box(0.25, 0.5, 0.95, materials_standart.branco, 0.90, 0.2, 0, 'janela_frente');      boxes.carcaca.add(boxes.janela_frente); //filho
create_box(0.35, 0.5, 1.05, materials_standart.branco, 0.80, 0.2, 0, 'janela_lateral');     boxes.carcaca.add(boxes.janela_lateral); //filho
create_box(0.5, 0.5, 0.5, materials_standart.cinza, 0, 0.35, 0, 'antena_base');             boxes.carcaca.add(boxes.antena_base); //filho
create_box(0.2, 0.5, 0.2, materials_standart.cinza, 0, 0.5, 0, 'antena_top1');              boxes.antena_base.add(boxes.antena_top1); //filho //filho
create_box(0.15, 0.15, 0.6, materials_standart.cinza, 0, 0, 0.3, 'antena_top2');            
create_box(0.5, 10, 0.5, materials_standart.preto, 4, 0, -100, 'parada');                              
//

// ==> SPHERES <==
create_sphere(0.20, 100, 100, materials_standart.azul, 0, 0.2, 0, 'azul');                  boxes.antena_top1.add(spheres.azul); spheres.azul.name = "esfera_azul";
                                                                                            spheres.azul.add(boxes.antena_top2);
//

// ==> CYLINDERS <==
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

    // ==> Moedas <==

let moedas = [];

for(let j = 0; j < 10; j ++)
{
    texture_moedas.center.set(0.5, 0.5);
    texture_moedas.rotation = 3.1415/2;

    let moedas_geometry = new THREE.CylinderGeometry(1.5, 1.5, 0.5, 30);
    let moedas_material = new THREE.MeshBasicMaterial({map: texture_moedas});
    let moedas_mesh = new THREE.Mesh(moedas_geometry, moedas_material);

    let random_x_pos = randomize_elements_position(-500, 500);
    let random_z_pos = randomize_elements_position(-500, 500);

    moedas_mesh.position.set(random_x_pos, 1, random_z_pos);
    moedas_mesh.rotation.x = 3.1415/2;

    let moeda_box_helper = new THREE.BoxHelper(moedas_mesh, 0x00ff00);
    //scene2.add(moeda_box_helper);
    scene2.add(moedas_mesh);

    let moeda_box3 = new THREE.Box3();
    moeda_box3.setFromObject(moedas_mesh);

    moedas.push(moedas_mesh);
    moedas_Box3.push(moeda_box3);

} let contador_moedas = 0; //contagem da quantidade de moedas coletadas

    //
//

// ==> LINES <==
const line_x_points = [];
line_x_points.push( new THREE.Vector3(0, 0, 0) );
line_x_points.push( new THREE.Vector3(10, 0, 0) );

const line_zL_points = [];
line_zL_points.push( new THREE.Vector3(0, 0, 0) );
line_zL_points.push( new THREE.Vector3(0, 0, -raio_da_curva) );

const line_zR_points = [];
line_zR_points.push( new THREE.Vector3(0, 0, 0) );
line_zR_points.push( new THREE.Vector3(0, 0, raio_da_curva) );


const line_x_geometry = new THREE.BufferGeometry().setFromPoints( line_x_points );
const line_zL_geometry = new THREE.BufferGeometry().setFromPoints( line_zL_points );
const line_zR_geometry = new THREE.BufferGeometry().setFromPoints( line_zR_points );

const line_x = new THREE.Line(line_x_geometry, (new THREE.LineBasicMaterial({color: 0xff0000})));

const line_zL = new THREE.Line(line_zL_geometry, (new THREE.LineBasicMaterial({color: 0x0000ff})));

const line_zR = new THREE.Line(line_zR_geometry, (new THREE.LineBasicMaterial({color: 0x0000ff})));

line_x.visible = false;
line_zL.visible = false;
line_zR.visible = false;
//


// ==> ÓRBITAS <==
const orbit_geometry = new THREE.SphereGeometry(0, 10, 10);
const central_orbit = new THREE.Mesh(orbit_geometry, materials_standart.preto);

central_orbit.position.set(0, 0, 0);
scene2.add(central_orbit);
//


// ==> OUTROS ELEMENTOS DA CENA <==
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
//


// ==> VARIÁVEIS EM ANIMATE <==

    // ==> bandeiras e iterações <==
    let inative = 0;
    let flag_inatividade = 0;
    let k = 0;
    let box3_index = 0;
    let camera_locked = 0; 
    let indice_moeda_mais_perto = 0;
    let menor = 0;
    //

    // ==> sistema de aceleração e frenagem <==
    const d_sensibility = 4;
    let v_sensibility = 5 / Math.pow(10, d_sensibility); //d_sensibility casas decimais
    let increase_velocidade = 0;
    let velocidade = v_sensibility * 300;
    //

//





// ==> TROCA DE CENAS <==

matriz_onibus_2 = matriz_onibus.map(mesh => mesh.clone()); //matriz clone para os elementos mesh funcionarem em outra scene
matriz_onibus_2.forEach(mesh => scene2.add(mesh));

console.log(matriz_onibus_2[0]); //elementos relacionados a carcaça
console.log(matriz_onibus_2[3]); //linhas

    // ==> compreenda a hierarquia <==

    const esf_blue = matriz_onibus_2[0].getObjectByName("esfera_azul");
    const carcaca = matriz_onibus_2[0].getObjectByName("carcaca");
    const carcaca_clone = carcaca.getObjectByName('carcaca_clone');

    carcaca.add(line_x, line_zL, line_zR);
    console.log(carcaca);

    central_orbit.add(camera_pov);
    camera_pov.position.set(-10, 4, 0);
    camera_pov.lookAt(0, 0, 0);

    //

    carcaca_box_helper = new THREE.BoxHelper(carcaca_clone, 0x0000ff);
    //scene2.add(carcaca_box_helper);

//


// ==> CALCULANDO POSIÇÕES <==

    const parada_position = new THREE.Vector3();
    boxes.parada.getWorldPosition(parada_position); //capturando a posição espacial da parada de ônibus


    const moedas_positions = []; //capturando as posições de cada moeda no espaço
    moedas.forEach(element => {

        const moeda_position = new THREE.Vector3();
        element.getWorldPosition(moeda_position);

        moedas_positions.push(moeda_position);
    });

//





// ==> FUNÇÃO PRINCIPAL DE RENDERIZAÇÃO DAS CENAS <==
function animate(time)
{
    time *= 0.001;

    /*
    if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }
    */



    // ==> Atualização da Posição das Caixas de Colisão <==
    carcaca_box_helper.update();
    Box3Helper_carcaca.setFromObject(carcaca_clone);
    //


    if(!flag_scene) // ==> cena 1
    {
        boxes.carcaca.rotation.y = time;
        renderer.render(scene, camera_far);
        //console.log(matriz_onibus[1]); //não existe posição diferente de 0, pois o vetor só possui 1 elemento (pai). pego durante a clonagem
    } 
    else // ==> cena 2
    {
        moedas.forEach(element => {
            element.rotation.z = time;
            
        });

        box3_index++;

        if(box3_index == moedas_Box3.length) box3_index = 0;

        const Box3Helper_parada = new THREE.Box3();
        Box3Helper_parada.setFromObject(boxes.parada);


        const line_x_position = new THREE.Vector3();
        const line_x_position_x = -Math.sin(carcaca.rotation.y)*10;
        const line_x_position_z = Math.cos(carcaca.rotation.y)*10;
        line_x.getWorldPosition(line_x_position); //posição da linha de origem do carro

        const line_x2_position = new THREE.Vector3((line_x_position.x + line_x_position_z), 0, (line_x_position.z + line_x_position_x)); //posição da linha de referência do movimento do carro

        //esf_blue.lookAt(parada_position);

        if(moedas.length > 0)
        {
            if(Box3Helper_carcaca.intersectsBox(moedas_Box3[box3_index]))
            {
                console.log(box3_index);
                scene2.remove(moedas[box3_index]);

                moedas_Box3.splice(box3_index, 1);
                moedas.splice(box3_index, 1);
                moedas_positions.splice(box3_index, 1);

                console.log("MOEDA COLETADA!");
                console.log(moedas);
                console.log(box3_index);
                box3_index = 0;
                contador_moedas++;
                document.getElementById('quantidade_de_moedas').innerHTML = contador_moedas;
            }
        } 

                central_orbit.position.x = line_x_position.x;
                central_orbit.position.z = line_x_position.z;


// ================== CONTROLE DA CÂMERA ==================

        if(keymap.indexOf('ARROWRIGHT') != -1)
        {
            central_orbit.rotation.y += 0.02;
        }
        if(keymap.indexOf('ARROWLEFT') != -1)
        {
            central_orbit.rotation.y -= 0.02;
        }
        if(keymap.indexOf('X') != -1) // ==> botão para a câmera alinhar-se ao veículo
        {
            let cos_ = Math.cos(carcaca.rotation.y);
            let sin_ = Math.sin(carcaca.rotation.y);

            if(Math.abs(cos_) < Math.sqrt(2)/2)
            {
                if(sin_ <= 0) central_orbit.rotation.y = -3.1415/2;
                else central_orbit.rotation.y = 3.1415/2;
            }
            else if(cos_ > 0) central_orbit.rotation.y = 0;
            else if(cos_ < 0) central_orbit.rotation.y = 3.1415;

            console.log(carcaca.rotation.y);
        }
        /* /POSTERIORMENTE FAZER UMA FUNÇÃO DE TRAVAMENTO DA CÂMERA
        if(keymap.indexOf('L') != -1)
        {

            camera_locked = !camera_locked;
            if(camera_locked)
            {
                //const moeda_position = new THREE.Vector3();
                //moedas_Box3.getWorldPosition(moeda_position);
                //esf_blue.lookAt(moedas_positions[indice_moeda_mais_perto]);
                //console.log(menor);


            }
        }
        */

                    if(moedas.length > 0)
                    {
                        let dist_x = Math.abs(moedas_positions[0].x - line_x_position.x);
                        let dist_y = Math.abs(moedas_positions[0].y - line_x_position.y);
                        let dist_z = Math.abs(moedas_positions[0].z - line_x_position.z);

                        menor = Math.sqrt( (dist_x*dist_x) + (dist_y*dist_y) + (dist_z*dist_z) );

                        moedas_positions.forEach(position => {
                            
                            
                                //console.log("bom dia!");
                                dist_x = Math.abs(position.x - line_x_position.x);
                                dist_y = Math.abs(position.y - line_x_position.y);
                                dist_z = Math.abs(position.z - line_x_position.z);

                                let distancia_nova = Math.sqrt( (dist_x*dist_x) + (dist_y*dist_y) + (dist_z*dist_z) );

                                if(distancia_nova < menor) 
                                {
                                    menor = distancia_nova;
                                    indice_moeda_mais_perto = moedas_positions.indexOf(position);
                                }

                                //console.log("Antiga: "+ menor);
                                //console.log("Nova: "+ distancia_nova);
                                
                                //console.log(position);
                                //console.log(line_x_position);

                        });
                    
                        console.log(moedas_positions);
                        console.log("id: "+ indice_moeda_mais_perto);
                            
                                esf_blue.lookAt(moedas_positions[indice_moeda_mais_perto]);
                            
                        indice_moeda_mais_perto = 0;
                    }
                    else esf_blue.lookAt(parada_position);


// ================== CONTROLE DO CARRO ==================

        if(keymap == 0 && !flag_inatividade)
            {
                if(inative == 0)
                {
                    inative = time;
                }
                else if(time - inative >= 10)
                {
                    console.log("Inatividade detectada!");
                    
                    flag_inatividade = 1;
                    k = 0;
                    inative = carcaca.rotation.y;
                }
            } 

        else if(keymap != 0 && !flag_inatividade)
            {
                flag_inatividade = 0;  
                inative = 0;
            } 


        if(!flag_inatividade)
        {

            if(keymap.indexOf('W') != -1)
                {
                    carcaca.position.lerpVectors(line_x_position, line_x2_position, increase_velocidade);

                    if(increase_velocidade < velocidade) //aceleração
                    {
                        if(increase_velocidade <= 0) increase_velocidade += 2*v_sensibility; //acelerando mais rapidamente quando ArrowUp está pressionado
                        else increase_velocidade += v_sensibility;
                    }
                }
            else
                {
                    if(increase_velocidade > 0 && keymap.indexOf('S') == -1) //frenagem
                    {
                        if(increase_velocidade > 0 && increase_velocidade < v_sensibility) increase_velocidade = 0; //Correção do arredondamento da variável 

                        else
                            {
                                increase_velocidade -= v_sensibility;
                                carcaca.position.lerpVectors(line_x_position, line_x2_position, increase_velocidade);
                            }
                        
                    }
                    
                }
                
            let flag_down_arrow = 0;

            if(keymap.indexOf('S') != -1)
                {
                    carcaca.position.lerpVectors(line_x_position, line_x2_position, increase_velocidade);
                    flag_down_arrow = 1;

                    if(increase_velocidade > -velocidade)
                    {
                        if(increase_velocidade >= 0) increase_velocidade -= 2*v_sensibility; //desacelerando mais rapidamente quando ArrowDown está pressionado
                        else increase_velocidade -= v_sensibility;
                    }
                } 
            else
                {
                    flag_down_arrow = 0;
                
                    if(increase_velocidade < 0 && keymap.indexOf('W') == -1)
                    {
                            increase_velocidade += v_sensibility;
                            carcaca.position.lerpVectors(line_x_position, line_x2_position, increase_velocidade);
                    }
                }
            if(keymap.indexOf('D') != -1)
                {
                    if(flag_down_arrow) carcaca.rotation.y += 0.03;
                    else carcaca.rotation.y -= 0.03;
                } 
            if(keymap.indexOf('A') != -1)
                {
                    if(flag_down_arrow) carcaca.rotation.y -= 0.03;
                    else carcaca.rotation.y += 0.03;
                } 

            renderer.render(scene2, camera_pov);
        }

        else if(flag_inatividade)
        {
            if(carcaca.position.y < 3 && k == 0) carcaca.position.y += 0.10;
            else
            {
                k += 3.1415/50;
                if(k <= 3.1415) carcaca.rotation.y = inative + k;
                else
                    {
                        if(carcaca.position.y > 0) carcaca.position.y -= 0.10;
                        else
                            {
                                inative = 0; 
                                flag_inatividade = 0;
                            }
                    } 
            }
            renderer.render(scene2, camera_pov);
        }
    }

} // ==> fim da função animate
//