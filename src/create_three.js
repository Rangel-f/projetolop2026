import * as THREE from "three"


export function create_camera(fov, near, far, pos_x, pos_y, pos_z, look_x, look_y, look_z)
{
    const camera = new THREE.PerspectiveCamera(fov, window.innerWidth/window.innerHeight, near, far);
    camera.position.set(pos_x, pos_y, pos_z);
    camera.lookAt(look_x, look_y, look_z);
    return camera;
}

export function create_scene()
{
    const scene = new THREE.Scene();
    return scene;
}

export function create_basic_material(color)
{
    const material = new THREE.MeshBasicMaterial({color});
    return material;
}

export function create_box(dim_x, dim_y, dim_z, material, pos_x, pos_y, pos_z)
{
    const box_g = new THREE.BoxGeometry(dim_x, dim_y, dim_z);
    const box = new THREE.Mesh(box_g, material);
    box.position.set(pos_x, pos_y, pos_z);
    return box;
}

export function create_sphere(radius, widthSegments, heightSegments, material, pos_x, pos_y, pos_z)
{
    const sphere_g = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const sphere = new THREE.Mesh(sphere_g, material);
    sphere.position.set(pos_x, pos_y, pos_z);
    return sphere;
}

Math.sqrt();