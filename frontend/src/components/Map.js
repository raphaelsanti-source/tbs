import {
    Group
} from 'three';
import Hill from './buildings/Hill';
import BaseBlue from './buildings/BaseBlue';
import BaseRed from './buildings/BaseRed';
import Ore from './buildings/Ore';
export default class Map extends Group {
    constructor(map) {
        super()
        this.map = map;
        this.modelMap = []
        for (let i = 0; i < this.map.length; i++) {
            this.modelMap[i] = []
            for (let j = 0; j < this.map[i].length; j++) {
                let square;
                switch (this.map[i][j]) {
                    case 'hill':
                        square = new Hill();
                        square.position.z = 10 * i;
                        square.position.x = 10 * j;
                        this.add(square);
                        this.modelMap[i][j] = square;
                        break
                    case 'baseBlue':
                        square = new BaseBlue();
                        square.position.z = 10 * i;
                        square.position.x = 10 * j;
                        this.add(square);
                        this.modelMap[i][j] = square;
                        break
                    case 'baseRed':
                        square = new BaseRed();
                        square.position.z = 10 * i;
                        square.position.x = 10 * j;
                        this.add(square);
                        this.modelMap[i][j] = square;
                        break
                    case 'ore':
                        square = new Ore();
                        square.position.z = 10 * i;
                        square.position.x = 10 * j;
                        this.add(square);
                        this.modelMap[i][j] = square;
                        break
                    case 'plain':
                        square = null;
                        this.modelMap[i][j] = square;
                        break
                }
            }
        }
        this.position.z -= 60;
        this.position.x -= 60;
        this.position.y += 5;
    }
    returnModelMap() {
        return this.map;
    }
}