import Config from './KeysConfig';
const KEYS = {
    "left": 65,
    "up": 87,
    "right": 68,
    "down": 83,
};

export default class Keyboard {
    constructor(domElement, modelMesh) {

        this.domElement = domElement;
        this.modelMesh = modelMesh

        // events
        this.domElement.addEventListener('keydown', event => this.onKeyDown(event), false);
        this.domElement.addEventListener('keyup', event => this.onKeyUp(event), false);


    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case KEYS.up:
                Config.moveForward = false;
                break;
            case KEYS.left:
                Config.moveLeft = false;
                break;
            case KEYS.right:
                Config.moveRight = false;
                break;
            case KEYS.down:
                Config.moveBack = false;
                break;

        }
        console.log('onKeyChange', event.keyCode)
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case KEYS.up:
                Config.moveForward = true;
                break;
            case KEYS.left:
                Config.moveLeft = true;
                break;
            case KEYS.right:
                Config.moveRight = true;
                break;
            case KEYS.down:
                Config.moveBack = true;
                break;
        }

    }


}