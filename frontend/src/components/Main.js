import {
    GridHelper,
    LineBasicMaterial,
    Ray,
    Raycaster,
    Scene,
    Vector3,
    BufferGeometry,
    Line,
    AxesHelper,
    Object3D,
    Mesh,
    DirectionalLight,
    AmbientLight
} from 'three';
import Renderer from './Renderer';
import Camera from './Camera';
import Skybox from './Skybox';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Keyboard from './Keyboard';
import Config from './KeysConfig';
import Map from './Map';

export default class Main {
    constructor(container) {


        this.axesHelper = new AxesHelper(200)
        this.gridHelper = new GridHelper(500, 10)
        this.container = container;
        this.scene = new Scene();
        this.renderer = new Renderer(container);
        this.skybox = new Skybox();
        this.camera = new Camera(75, window.screen.width, window.screen.height);
        this.keyboard = new Keyboard(window, this.camera)
        const orbitControl = new OrbitControls(this.camera, this.container)

        this.test = new Map();
        this.scene.add(this.test)

        this.light = new DirectionalLight(0xffffff, 1.25);
        //this.light.position.set(100, 100, 100)
        this.scene.add(this.light)
        this.scene.add(this.axesHelper)
        this.scene.add(this.gridHelper)
        this.scene.add(this.skybox)
        this.renderer.setClearColor(0xffffff)
        this.render();

    }

    render() {

        if (this.camera) {
            //
            if (Config.moveLeft) {
                this.camera.translateX(-10)
            }
            if (Config.moveRight) {
                this.camera.translateX(10)
            }
            if (Config.moveForward) {
                this.camera.position.z += 10
            }
            if (Config.moveBack) {
                this.camera.position.z -= 10
            }
        }
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
}