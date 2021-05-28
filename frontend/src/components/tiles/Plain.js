import {
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    MeshPhongMaterial,
    TextureLoader,
} from 'three';
import texture from '../assets/tiles/plain.png';

export default class Plain extends Mesh {
    constructor() {
        const textures = new TextureLoader().load(texture);
        super(new BoxGeometry(10, 10, 10), new MeshPhongMaterial({ color: 0x679267 }));
        //map: textures
    }
}