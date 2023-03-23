function createRepeatingTexture(fileName, repeatX, repeatY, rot) {
    var textureLoader = new THREE.TextureLoader();
    var texture = textureLoader.load(fileName);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( repeatX, repeatY);
    texture.rotation = rot;
    return texture;
}


var textureLoader = new THREE.TextureLoader();
var wall_texture = textureLoader.load('https://dnl03.github.io/projecttreejs/bulding_texture.jpg');
var roof_texture = textureLoader.load('https://dnl03.github.io/projecttreejs/roof_texture.jpg');
var door_texture = textureLoader.load('https://dnl03.github.io/projecttreejs/door.jpg');
var background = textureLoader.load('https://dnl03.github.io/projecttreejs/background.jpg');
var window_texture = textureLoader.load('https://dnl03.github.io/projecttreejs/window.jpg');

const scene = new THREE.Scene();
scene.background = background;
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

//camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.x = 5;
camera.position.y = 8;
camera.rotation.x = -(Math.PI/6)
camera.position.z = 26;
// camera.position.x = 0;
// camera.position.y = 5;
// camera.rotation.x = -(Math.PI/3)
// camera.position.z = 5;
scene.add(camera);

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(2000, 2000),
    new THREE.MeshStandardMaterial({ color: '#a9c388', map: createRepeatingTexture("https://dnl03.github.io/projecttreejs/grass.jpg", 250, 250, 1) })
);
floor.rotation.x = - Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

//drzewa
function createTree(tri_x, tri_y){
    var tree = new THREE.Group();
    var trunkG = new THREE.CylinderGeometry(0.2, 0.2, 1);
    var trunkM = new THREE.MeshPhongMaterial({ color: 0x49311c });
    var trunk = new THREE.Mesh(trunkG, trunkM);
    tree.add(trunk);

    var levG = new THREE.ConeGeometry(1, 1, 6);
    var levM = new THREE.MeshPhongMaterial({ color: 0x3d5e3a });
    var levBot = new THREE.Mesh(levG, levM);
    levBot.position.y = 0.6;
    tree.add(levBot);

    var levMid = new THREE.Mesh(levG, levM);
    levMid.position.y = 1.2;
    tree.add(levMid);

    var levTop = new THREE.Mesh(levG, levM);
    levTop.position.y = 1.7;
    tree.add(levTop);

    tree.position.y = 0.5;
    tree.position.x = tri_x;
    tree.position.z = tri_y;

    scene.add(tree);
}



createTree(-20, -9); createTree(-17, -3);
createTree(-23, 6); createTree(-22, -11);
createTree(-20, -12); createTree(-24, -3);
createTree(-22, -4); createTree(-20, -3);
createTree(-22, -7); createTree(-20, -7);
createTree(-18, 6); createTree(-22, -2);
createTree(-21, 5); createTree(-18, 4);
createTree(-24, -6); createTree(-22, 11);
createTree(-19, 10); createTree(-17, -8);
createTree(-17, 1); createTree(-18, -12);

createTree(7, 2); createTree(-5, 13);
createTree(-5, -1); createTree(-5, 13);


//way
const way = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 30),
    new THREE.MeshStandardMaterial({ color: '#a9c388', map: createRepeatingTexture("https://dnl03.github.io/projecttreejs/way.jpg", 1, 3, Math.PI)})
)
way.rotation.x = -Math.PI *0.5;
way.position.y = 0.01;
way.position.x = 2.5;
scene.add(way);

const way2 = way.clone();
way2.position.x = 17;
scene.add(way2);

const way3 = way.clone();
way3.position.x = -12;
scene.add(way3);

const way4_1 = way.clone();
way4_1.rotation.z = Math.PI *0.5;
way4_1.position.z = -17.5;
way4_1.position.x = -30;
scene.add(way4_1);

const way4_2 = way.clone();
way4_2.rotation.z = Math.PI *0.5;
way4_2.position.z = -17.5;
way4_2.position.x = 0;
scene.add(way4_2);


const way4_3 = way.clone();
way4_3.rotation.z = Math.PI *0.5;
way4_3.position.z = -17.5;
way4_3.position.x = 30;
scene.add(way4_3);


const way5_1 = way.clone();
way5_1.rotation.z = Math.PI *0.5;
way5_1.position.z = 17.5;
way5_1.position.x = -30;
scene.add(way5_1);

const way5_2 = way.clone();
way5_2.rotation.z = Math.PI *0.5;
way5_2.position.z = 17.5;
way5_2.position.x = 0;
scene.add(way5_2);

const way5_3 = way.clone();
way5_3.rotation.z = Math.PI *0.5;
way5_3.position.z = 17.5;
way5_3.position.x = 30;
scene.add(way5_3);

// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
scene.add(ambientLight);
// Directional light
const moonLight = new THREE.DirectionalLight('#f5eeab', 0.2);
moonLight.position.set(4, 5, 2);
scene.add(moonLight);

const house = new THREE.Group();
scene.add(house);

house.position.x = 2;

//walls
var wall_x = 6;
var wall_y = 2;
var wall_z = 6;
const walls = new THREE.Mesh(
    new THREE.BoxBufferGeometry(wall_x, wall_y, wall_z),
    new THREE.MeshStandardMaterial({ color: '#ac8eAC', map: wall_texture })
);
walls.position.y = wall_y/2;
house.add(walls);

//roof
var roof_x = 5;
var roof_y = 2;
var roof_z = 4;
const roof = new THREE.Mesh(
    new THREE.ConeBufferGeometry(roof_x, roof_y, roof_z),
    new THREE.MeshStandardMaterial({map: createRepeatingTexture("https://dnl03.github.io/projecttreejs/roof_texture.jpg", 10, 2, 3)})
);
roof.position.y = wall_y + roof_y/2;
roof.rotation.y = Math.PI /4;
house.add(roof);

//doors
var door_x=0;
var door_y=0;
var door_z=0;
const door = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0.7, 1.4, 0),
    new THREE.MeshStandardMaterial({map: door_texture})
)
door.position.y = 1.4/2;
door.position.z = wall_z/2+0.01;
door.position.x = -1;
house.add(door);

//window
const w1 = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0.75, 0.7, 0),
    new THREE.MeshStandardMaterial({map: window_texture})
);
w1.position.z = wall_z/2+0.01;
w1.position.y = 1.2;
w1.position.x = 1.5;

house.add(w1);

const w2 = w1.clone();
w2.position.z = -0.9;
w2.rotation.y = Math.PI/2;
w2.position.x = wall_x/2+0.01;
house.add(w2);

const w3 = w1.clone();
w3.position.z = 0.9;
w3.rotation.y = Math.PI/2;
w3.position.x = wall_x/2+0.01;
house.add(w3);

const w4 = w1.clone();
w4.position.z = 0;
w4.rotation.y = Math.PI/2;
w4.position.x = -(wall_x/2)-0.01;
house.add(w4);

const w5 = w1.clone();
w5.position.z = -(wall_z/2)-0.01;
house.add(w5);



const house2 = house.clone();
house2.position.x = 10;
house2.position.z = -7;
scene.add(house2);

const house3 = house.clone();
house3.position.x = 10;
house3.position.z = 7;
house2.rotation.y = Math.PI *0.5
scene.add(house3);

const house4 = house.clone();
house4.position.x = -5;
house4.position.z = 7;
house4.rotation.y = Math.PI 
scene.add(house4);


house.position.x = -5;
house.position.z = -7;

ctr = new THREE.OrbitControls( camera);
ctr.addEventListener( 'change', renderer.domElement);

function createWheels() {
    const geometry = new THREE.BoxBufferGeometry(1.7, 0.25, 0.25);
    const material = new THREE.MeshLambertMaterial({ color: 0x00000 });
    const wheel = new THREE.Mesh(geometry, material);
    return wheel;
}

//car
function CreateCar(col, x){
    const car = new THREE.Group();

    car.position.z = 12.15;
    car.position.x = x;
    car.position.y = 0;
    const main = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1.4, 0.5, 2.7),
        new THREE.MeshLambertMaterial({ color: col })
    );
    car.add(main);
    main.position.y = 0.5/2+0.1;

    const wheels = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1.7, 0.25, 0.25), 
        new THREE.MeshLambertMaterial({ color: 0x00000 }));
    car.add(wheels);
    wheels.position.y = 0.25/2;
    wheels.position.z = -0.8;

    const wheels_b = wheels.clone();
    car.add(wheels_b);
    wheels_b.position.z = 0.9;

    const cabin = new THREE.Mesh(
        new THREE.BoxBufferGeometry(1.2, 0.6, 1.5),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    );
    car.add(cabin);
    cabin.position.y = 0.8;
    cabin.position.z = 0.4;

    scene.add(car);
    return car;
}
var car = CreateCar(0x78b14b, 3.7);
var car2 = CreateCar(0x22ff2, 1.3);
car2.rotation.y = Math.PI;

k = 1;
k2 = 1;
renderScene();

document.body.appendChild( renderer.domElement );
const axesHelper = new THREE.AxesHelper( 10 );
scene.add( axesHelper );

function compare_f(a, b)
{
    a = Math.round(a)
    if (a==b)
        return true;
    else
        return false;
    }

function rideCar(){
    if (k == 1)
    {
        car.position.z -= 0.1;
        if (compare_f(car.position.z, -19)) {
            car.rotation.y = Math.PI / 2;
            k = 2;
        }
    }
    else if (k == 2)
    {
        car.position.x -= 0.1;
        if (compare_f(car.position.x, -14)) {
            car.rotation.y = Math.PI;
            k = 3;
        }
        
    }
    else if (k == 3)
    {
        car.position.z += 0.1;
        if (compare_f(car.position.z, 19)) {
            car.rotation.y = Math.PI*1.5;
            k = 4;
        }
        
    }
    else if (k == 4)
    {
        car.position.x += 0.15;
        if (compare_f(car.position.x, 19)) {
            car.rotation.y = Math.PI*2;
            k = 1;
        }
        
    }
}
function rideCar2(){
    if (k2 == 1)
    {
        car2.position.z += 0.1;
        if (compare_f(car2.position.z, 17)) {
            car2.rotation.y = Math.PI / 2;
            k2 = 2;
        }
    }
    else if (k2 == 2)
    {
        car2.position.x -= 0.15;
        if (compare_f(car2.position.x, -11)) {
            car2.rotation.y = 0;
            k2 = 3;
        }
        else if (compare_f(car2.position.x, 3)) {
            car2.rotation.y = 0;
            k2 = 3;
        }
    }
    else if (k2 == 3)
    {
        car2.position.z -= 0.1;
        if (compare_f(car2.position.z, -17)) {
            car2.rotation.y = Math.PI/-2;
            k2 = 4;
        }
        
    }
    else if (k2 == 4)
    {
        car2.position.x += 0.1;
        if (compare_f(car2.position.x, 16)) {
            car2.rotation.y = Math.PI;
            k2 = 1;
        }
    }
}

function renderScene() {
    rideCar();
    rideCar2();
    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);
}