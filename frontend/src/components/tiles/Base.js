import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { TGALoader } from 'three/examples/jsm/loaders/TGALoader.js';
import {
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    MeshPhongMaterial,
    TextureLoader,
    ConeGeometry,
    Matrix4,
    Group,
    Scene
} from 'three';
import model from '../assets/models/units/tank/unit.FBX';
import text from '../assets/models/units/tank/unit_blue.tga';

export default class Base extends Group {
    constructor() {
        super()
        const base = new Mesh(new BoxGeometry(10, 10, 10), new MeshPhongMaterial({ color: 0x679267, }));
        this.add(base);
        const textureLoader = new TGALoader();
        const texture = textureLoader.load(text)
        const material = new MeshPhongMaterial({
            map: texture
        });
        const loader = new FBXLoader();
        loader.load(model, (object) => {
            object.position.y += 5;
            console.log(object)
            object.children.forEach(element => {
                element.material = material
            })
            this.add(object)
        });
    }
}