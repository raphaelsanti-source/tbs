import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import {
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    TextureLoader,
    MeshPhongMaterial,
    ConeGeometry,
    Group
} from 'three';
import model from '../assets/models/env/rocks/moud/unit.fbx';
import text from '../assets/models/env/rocks/moud/ore.png';

export default class Ore extends Group {
    constructor() {
        super()
        const textureLoader = new TextureLoader();
        const texture = textureLoader.load(text)
        const material = new MeshPhongMaterial({
            map: texture
        });
        const loader = new FBXLoader();
        loader.load(model, (object) => {
            object.scale.set(0.2, 0.2, 0.2);
            object.children.forEach(element => {
                element.material = material
            })
            this.add(object)
        });
    }
}