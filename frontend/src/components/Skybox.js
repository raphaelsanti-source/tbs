import {
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    TextureLoader,
    DoubleSide
} from 'three';
import texture from './assets/skybox.png';

export default class Skybox extends Mesh {
    constructor() {
        const textures = new TextureLoader().load(texture);
        super(new BoxGeometry(10000, 10000, 10000), new MeshBasicMaterial({ color: 0x301934, side: DoubleSide }));
    }
}