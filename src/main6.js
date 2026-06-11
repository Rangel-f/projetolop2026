import * as THREE from "three";

//MAPA DE TECLAS
let keymap = []; //armazenando apenas as teclas que estão sendo pressionadas no momento

//EVENTOS
let flag_scene = false;
const raio_da_curva = 3;
//let flag_x = 0;
//let flag_z = 0;

document.addEventListener('keydown', (event) => 
{
    //console.log(event);
    //event.key = event.key.toUpperCase(); //não dá, droga
    let event_key = event.key;
    event_key = event_key.toUpperCase();

    if(event_key == 'B') //a ser futuramente estendido também para a tecla 'b'
    {
        flag_scene = !flag_scene;
    }

    else if(keymap.indexOf(event_key) == -1)
    {
        keymap.push(event_key);
        //keymap.forEach(string => {string = string.toUpperCase();});
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

    keymap.splice(keymap.indexOf(event.key.toUpperCase()), 1);
    //flag_x = 0;
    //flag_z = 0;
    //console.log(keymap);
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
camera_pov.position.set(-10, 4, 0);
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
let matriz_onibus_2 = [];
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
boxes.carcaca.name = "carcaca";

create_box(2, 1, 1, materials_standart.verde, 0, 0, 0, 'carcaca_clone');                          //matriz_onibus.push(boxes.carcaca_clone); //adicionando na matriz
boxes.carcaca_clone.name = "carcaca_clone"; //criando um clone para servir de BoxHelper
boxes.carcaca.add(boxes.carcaca_clone);


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


// => Moedas <=


function randomize_elements_position(min, max)
{
    let random = Math.random() * (max - min + 1) + min;
    return random;
}

let moedas = [];
let moedas_Box3 = [];

for(let j = 0; j < 10; j ++)
{
    let texture_moedas = texture_load.load('./textures/moedas_textura.png');
    texture_moedas.center.set(0.5, 0.5);
    texture_moedas.rotation = 3.1415/2;
    texture_moedas.colorSpace = THREE.SRGBColorSpace;

    let moedas_geometry = new THREE.CylinderGeometry(1.5, 1.5, 0.5, 30);
    let moedas_material = new THREE.MeshBasicMaterial({map: texture_moedas});
    let moedas_mesh = new THREE.Mesh(moedas_geometry, moedas_material);

    let random_x_pos = randomize_elements_position(-500, 500);
    let random_z_pos = randomize_elements_position(-500, 500);

    moedas_mesh.position.set(random_x_pos, 1, random_z_pos);
    moedas_mesh.rotation.x = 3.1415/2;

    let moeda_box_helper = new THREE.BoxHelper(moedas_mesh, 0x00ff00);
    scene2.add(moeda_box_helper);
    scene2.add(moedas_mesh);

    let moeda_box3 = new THREE.Box3();
    moeda_box3.setFromObject(moedas_mesh);

    moedas.push(
        moedas_mesh
        //create_cylinder(2, 2, 0.5, 25, materials_standart.amarelo, randomize_elements_position(10, 50, 'x'), 1, randomize_elements_position(10, 50, 'z'), ('moeda'+j))
    );
    moedas_Box3.push(
        moeda_box3
    );

}

let contador_moedas = 0; //contagem da quantidade de moedas coletadas



//let random_x = Math.random() * (max_x - min_x + 1) + min_x;
//let random_z = Math.random() * (max_z - min_z + 1) + min_z;


//create_cylinder(2, 2, 0.5, 25, materials_standart.amarelo, randomize_elements_position(10, 50, 'x'), 1,randomize_elements_position(10, 50, 'z'), 'moeda1');


//

//LINES
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

//scene2.add(line_x, line_zL, line_zR);
//


//ÓRBITAS
const orbit_geometry = new THREE.SphereGeometry(0, 10, 10);
//const right_orbit = new THREE.Mesh(orbit_geometry, materials_standart.preto);
//const left_orbit = new THREE.Mesh(orbit_geometry, materials_standart.preto);

//const central_orbit = new THREE.Mesh(orbit_geometry, materials_standart.preto);
//central_orbit.position.set(0, 0, 0);

//right_orbit.position.set(0, 0, raio_da_curva);
//left_orbit.position.set(0, 0, -raio_da_curva);

//scene2.add(right_orbit, left_orbit);
//matriz_onibus.push(right_orbit, left_orbit);
//right_orbit.name = "orbita_direita";
//left_orbit.name = "orbita_esquerda";

//matriz_onibus.push(central_orbit);

//central_orbit.add(boxes.carcaca);
//right_orbit.add(boxes.carcaca);

//boxes.carcaca.position.set(0, 0, -raio_da_curva);
//boxes.carcaca.add(camera_pov);

const central_orbit = new THREE.Mesh(orbit_geometry, materials_standart.preto);
central_orbit.position.set(0, 0, 0);
scene2.add(central_orbit);

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

matriz_onibus_2 = matriz_onibus.map(mesh => mesh.clone()); //matriz clone para os elementos mesh funcionarem em outra scene

matriz_onibus_2.forEach(mesh => scene2.add(mesh));
console.log(matriz_onibus_2[0]);
//console.log(matriz_onibus_2[1]);
//console.log(matriz_onibus_2[2]);

//matriz_onibus_2.push(line_x, line_zL, line_zR);
console.log(matriz_onibus_2[3]);

//=============ENTENDA A HIERARQUIA=============

const esf_blue = matriz_onibus_2[0].getObjectByName("esfera_azul");
//const orbita_direita = matriz_onibus_2[1].getObjectByName("orbita_direita");
//const orbita_esquerda = matriz_onibus_2[2].getObjectByName("orbita_esquerda");
const carcaca = matriz_onibus_2[0].getObjectByName("carcaca");
//const carcaca_clone = carcaca.getObjectByName("carcaca_clone");

//carcaca.add(carcaca_clone);
carcaca.add(line_x, line_zL, line_zR);

console.log(carcaca);
//carcaca.add(camera_pov);
//carcaca.add(central_orbit);
central_orbit.add(camera_pov);
camera_pov.position.set(-10, 4, 0);
camera_pov.lookAt(0, 0, 0);
//

let inative = 0;
let flag_inatividade = 0;
let k = 0;
let box3_index = 0;


//Variáveis para o sistema de aceleração e frenagem
const d_sensibility = 4;
let v_sensibility = 5 / Math.pow(10, d_sensibility); //d_sensibility casas decimais
//v_sensibility = v_sensibility.toFixed(d_sensibility); //garantindo que terá a quantidade correta
//v_sensibility = 0.005;
console.log(v_sensibility);
let increase_velocidade = 0;
let velocidade = v_sensibility * 300;


const carcaca_clone = carcaca.getObjectByName('carcaca_clone');

let carcaca_box_helper = new THREE.BoxHelper(carcaca_clone, 0x0000ff);
scene2.add(carcaca_box_helper);

const Box3Helper_carcaca = new THREE.Box3();
//Box3Helper_carcaca.setFromObject(carcaca_clone);


function animate(time)
{
    time *= 0.001;


    //ATUALIZAÇÃO DA POSIÇÃO DAS CAIXAS DE COLISÃO
    //carcaca.updateMatrixWorld(true);
    carcaca_box_helper.update();
    Box3Helper_carcaca.setFromObject(carcaca_clone);
    //console.log(Box3Helper_carcaca);


    //







    //console.log(increase_velocidade);
    //if(path > 1) path = 0;
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
        box3_index++;

        if(box3_index == moedas_Box3.length) box3_index = 0;

        const Box3Helper_parada = new THREE.Box3();
        Box3Helper_parada.setFromObject(boxes.parada);

        const parada_position = new THREE.Vector3();
        boxes.parada.getWorldPosition(parada_position); //capturando a posição espacial da parada de ônibus
        const line_x_position = new THREE.Vector3();
        const line_x_position_x = -Math.sin(carcaca.rotation.y)*10;
        const line_x_position_z = Math.cos(carcaca.rotation.y)*10;
        line_x.getWorldPosition(line_x_position);

        const line_x2_position = new THREE.Vector3((line_x_position.x + line_x_position_z), 0, (line_x_position.z + line_x_position_x));

        //const position_line_vect2 = new THREE.Vector3(line_x_position_z, 0,line_x_position_x);

        //carcaca.lookAt(line_x_position);
        esf_blue.lookAt(parada_position);
        //console.log(parada_position, Box3Helper_carcaca);

        if(moedas.length > 0)
        {
            if(Box3Helper_carcaca.intersectsBox(moedas_Box3[box3_index]))
            {
                console.log(box3_index);
                scene2.remove(moedas[box3_index]);
                //scene2.remove(moedas_Box3[box3_index]);
                moedas_Box3.splice(box3_index, 1);
                moedas.splice(box3_index, 1);
                console.log("MOEDA COLETADA!");
                console.log(moedas);
                console.log(box3_index);
                box3_index = 0;
            }
        } 

                //  camera_pov.position.x = line_x_position.x - 10;
                //  camera_pov.position.z = line_x_position.z;
                central_orbit.position.x = line_x_position.x;
                central_orbit.position.z = line_x_position.z;

        
/*
        function inative_animation()
        {
            for(let j = 1; j <= 3; j += 0.005)
            {
                carcaca.position.y = carcaca.position.y + j; //acréscimo variável
                renderer.render(scene2, camera_pov);
                let delay = time;
                while(time - delay < 1){console.log(time)}
            }
            inative = 0;
        }
*/

// ================== CONTROLE DA CÂMERA ==================

        if(keymap.indexOf('ARROWRIGHT') != -1)
        {
            central_orbit.rotation.y += 0.02;
        }
        if(keymap.indexOf('ARROWLEFT') != -1)
        {
            central_orbit.rotation.y -= 0.02;
        }
        if(keymap.indexOf('X') != -1)
        {
            //if(Math.cos(carcaca.rotation.y) < 0) central_orbit.rotation.y = 3.1415
            //else central_orbit.rotation.y = 0;
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
        /*
        if(keymap.indexOf('ARROWUP') != -1)
        {
            central_orbit.rotation.x -= 0.02;
        }
        if(keymap.indexOf('ARROWDOWN') != -1)
        {
            central_orbit.rotation.x -= 0.02;
        }
        //else central_orbit.rotation.y = 0;

        */
       // SUGESTÃO DE COLOCAR UM BOTÃO QUE FAZ A CÂMERA VOLTAR À POSIÇÃO ORIGINAL



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
                    //inative_animation();
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
                    //path += 0.01;
                    //const line_x_position = line_x.getPointAt(path);
                    carcaca.position.lerpVectors(line_x_position, line_x2_position, increase_velocidade);
                    //carcaca.position.copy(line_x_position);
                    //ground.position.x -= 0.2;
                    //carcaca.rotation.z = 3.1415/2//9.5;
                    //carcaca.position.x += 0.1;
                    //camera_pov.position.set((camera_pov.position.x - 10), camera_pov.position.y, (camera_pov.position.z));
                    //console.log(camera_pov.position);

                    if(increase_velocidade < velocidade) //aceleração
                    {
                        if(increase_velocidade <= 0) increase_velocidade += 2*v_sensibility; //acelerando mais rapidamente quando ArrowUp está pressionado
                        else increase_velocidade += v_sensibility;
                        //console.log("ArrowUp +");
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
                                //console.log("ArrowUp -");
                        //console.log('nessa zona 1');
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
                    
    /*
                    if(increase_velocidade < velocidade)
                    {
                        increase_velocidade += 0.0005;
                    }
                    //ground.position.x += 0.2;
    */
                } 
            else
                {
                    flag_down_arrow = 0;
                    /*
                    if(increase_velocidade > 0 && keymap.indexOf('ArrowUp') == -1)
                    {
                        carcaca.position.lerpVectors(line_x_position, line_x2_position, -increase_velocidade);
                        increase_velocidade -= 0.0005;
                    }
                    */
                    if(increase_velocidade < 0 && keymap.indexOf('W') == -1)
                    {
                            increase_velocidade += v_sensibility;
                            carcaca.position.lerpVectors(line_x_position, line_x2_position, increase_velocidade);
                            //console.log('nessa zona 2');
                    }
                }
            if(keymap.indexOf('D') != -1)
                {
                    //ground.position.z -= 0.2;
                    //orbita_direita.rotation.y -= 0.01;
                    //console.log(line_x_position_x, line_x_position_z);
                    //console.log(line_x_position);
                    //console.log(line_x2_position);
                    //console.log("Seno: " + line_x_position_x + " Cosseno: " + line_x_position_z);
                    if(flag_down_arrow) carcaca.rotation.y += 0.03;
                    else carcaca.rotation.y -= 0.03;
                    //camera_pov.rotateOnAxis(line_x_position, 0.03);

                } 
            if(keymap.indexOf('A') != -1)
                {
                    //ground.position.z += 0.2;
                    if(flag_down_arrow) carcaca.rotation.y -= 0.03;
                    else carcaca.rotation.y += 0.03;
                    //camera_pov.rotateOnAxis -= 0.03;
                } 

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


}