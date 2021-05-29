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
import model from '../assets/models/buildings/factory/build.fbx';
import text_red from '../assets/models/buildings/factory/build_red.tga';
import text_blue from '../assets/models/buildings/factory/build_blue.tga';

export default class Factory extends Group {
    constructor(player) {
        super()
        const textureLoader = new TGALoader();
        let texture;
        if (player == "Red") {
            texture = textureLoader.load(text_red);
        } else {
            texture = textureLoader.load(text_blue);
        }
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