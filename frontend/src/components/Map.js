import {
    Group
} from 'three';
import Plain from './tiles/Plain';
import Hill from './tiles/Hill';
import Base from './tiles/Base';
export default class Map extends Group {
    constructor() {
        const map = [
            ["plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain"],
            ["plain", "base", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain"],
            ["plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain"],
            ["plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain"],
            ["plain", "plain", "plain", "plain", "plain", "plain", "base", "plain", "plain", "plain", "plain", "plain", "plain"],
            ["plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain"],
            ["plain", "plain", "plain", "hill", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain"],
            ["plain", "plain", "hill", "plain", "hill", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain"],
            ["plain", "plain", "plain", "hill", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain"],
            ["plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain"],
            ["plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain"],
            ["plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain"],
            ["plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain", "plain"]
        ]
        super()
        this.map = map;
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                let square;
                switch (this.map[i][j]) {
                    case 'plain':
                        square = new Plain();
                        break
                    case 'hill':
                        square = new Hill();
                        break
                    case 'base':
                        square = new Base();
                        break
                }
                square.position.z = 10 * i;
                square.position.x = 10 * j;
                this.add(square);
            }
        }
        this.position.z -= 60;
        this.position.x -= 60;
    }
}