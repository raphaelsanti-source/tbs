import {
    Group
} from 'three';
import Plain from './tiles/Plain';
export default class Map extends Group {
    constructor() {
        super()
        for (let i = 0; i < 13; i++) {
            for (let j = 0; j < 13; j++) {
                let square = new Plain();
                square.position.z = 10 * i;
                square.position.x = 10 * j;
                this.add(square);
            }
        }
        this.position.z -= 60;
        this.position.x -= 60;
    }
}