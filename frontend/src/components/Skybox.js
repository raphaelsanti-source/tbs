import {
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    TextureLoader,
    BackSide,
    MeshPhongMaterial,
} from 'three';
import texture from './assets/skybox.png';

export default class Skybox extends Mesh {
    constructor() {
        const textures = new TextureLoader().load(texture);
        super(new BoxGeometry(10000, 10000, 10000), new MeshPhongMaterial({ map: textures, side: BackSide }));
    }
}