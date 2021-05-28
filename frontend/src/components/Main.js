import {
    GridHelper,
    LineBasicMaterial,
    Ray,
    Raycaster,
    Scene,
    Vector3,
    Vector2,
    BufferGeometry,
    Line,
    AxesHelper,
    Object3D,
    Mesh,
    DirectionalLight,
    AmbientLight,
    Fog
} from 'three';
import Renderer from './Renderer';
import Camera from './Camera';
import Skybox from './Skybox';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Keyboard from './Keyboard';
import Config from './KeysConfig';
import Map from './Map';
import Layout from './Layout';
import Game from './game/Game';

export default class Main {
    constructor(container) {
        //!! Mapa
        let jsoned = [
            ["plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain"],
            ["plain", "baseRed", "plain", "ore", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain"],
            ["plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain"],
            ["plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain"],
            ["plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain"],
            ["plain", "plain", "plain", "plain", "hill", "plain", "ore", "plain", "plain", "plain", "plain", "plain", "plain"],
            ["plain", "plain", "plain", "plain", "ore", "plain", "hill", "plain", "ore", "plain", "plain", "plain", "plain"],
            ["plain", "plain", "plain", "plain", "plain", "plain", "ore", "plain", "hill", "plain", "plain", "plain", "plain"],
            ["plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain"],
            ["plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain"],
            ["plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain"],
            ["plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "ore", "plain", "baseBlue", "plain"],
            ["plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain"]
        ]



        this.panel = document.getElementById("panel");
        this.panel.style.display = "none";
        this.axesHelper = new AxesHelper(200)
        this.gridHelper = new GridHelper(500, 10)
        this.container = container;
        this.scene = new Scene();
        this.renderer = new Renderer(container);
        this.camera = new Camera(75, window.screen.width, window.screen.height);
        this.keyboard = new Keyboard(window, this.camera)
        const orbitControl = new OrbitControls(this.camera, this.container)

        this.test = new Map(jsoned);
        this.scene.add(this.test)

        //!! Klasa logiczna gry

        this.game = new Game(jsoned, this.scene, this.test);

        this.layout = new Layout();
        this.scene.add(this.layout);

        this.light = new DirectionalLight(0xffffff, 1.25);
        this.light.position.set(0, 100, 0)
        this.scene.add(this.light)
        //this.scene.add(this.axesHelper)
        //this.scene.add(this.gridHelper)
        this.fog = new Fog(0x000000, 100, 200)
        this.scene.fog = this.fog

        this.lastRaycasted = null;
        this.raycast();

        this.renderer.setClearColor(0x000000)
        this.render();

    }

    render() {

        if (this.camera) {
            //
            if (Config.moveLeft) {
                this.camera.translateX(-3)
            }
            if (Config.moveRight) {
                this.camera.translateX(3)
            }
            if (Config.moveForward) {
                this.camera.position.z += 3
            }
            if (Config.moveBack) {
                this.camera.position.z -= 3
            }
        }
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
    raycast() {
        window.addEventListener("click", (e) => {
            let raycaster = new Raycaster();
            let mouseVector = new Vector2();
            mouseVector.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouseVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouseVector, this.camera);
            let intersects = raycaster.intersectObjects(this.layout.children);
            if (intersects.length > 0) {
                if (this.lastRaycasted != null) {
                    this.lastRaycasted.object.material.color.set(0xffffff);
                }
                intersects[0].object.material.color.set(0xffc1cc)
                this.panel.style.display = "block";
                this.lastRaycasted = intersects[0];
                //console.log(`${intersects[0].object.position.z / 10} ${intersects[0].object.position.x / 10}`)
                let pointed = this.game.whatsThere(intersects[0].object.position.z / 10, intersects[0].object.position.x / 10);
                this.game.changeDisplayInfo(pointed)
            } else {
                this.lastRaycasted.object.material.color.set(0xffffff);
                this.lastRaycasted = null;
                this.panel.style.display = "none";
            }
        });
    }
}