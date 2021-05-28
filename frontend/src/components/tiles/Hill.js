import {
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    TextureLoader,
    MeshPhongMaterial,
    ConeGeometry,
    Group
} from 'three';
import texture from '../assets/tiles/plain.png';

export default class Hill extends Group {
    constructor() {
        super()
        const base = new Mesh(new BoxGeometry(10, 10, 10), new MeshPhongMaterial({ color: 0x679267, }));
        const hill = new Mesh(new ConeGeometry(5, 10, 5), new MeshPhongMaterial({ color: 0x808080 }));
        hill.position.y += 7.5;
        this.add(base)
        this.add(hill)
        //{ map: textures }
    }
}