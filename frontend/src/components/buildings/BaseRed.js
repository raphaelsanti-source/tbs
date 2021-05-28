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
import model from '../assets/models/buildings/base/build.FBX';
import text from '../assets/models/buildings/base/build_red.tga';

export default class BaseBlue extends Group {
    constructor() {
        super()
        const textureLoader = new TGALoader();
        let texture = textureLoader.load(text);
        const material = new MeshPhongMaterial({
            map: texture
        });
        const loader = new FBXLoader();
        loader.load(model, (object) => {
            object.children.forEach(element => {
                element.material = material
            })
            this.add(object)
        });
    }
}