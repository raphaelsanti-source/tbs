import Extractor from '../buildings/Extractor';
export default class Game {
    constructor(map, scene, modelMap) {
        this.player = "Red"
        this.scene = scene;
        this.raw = map;
        this.modelMap = modelMap
        this.map = [];
        for (let i = 0; i < 13; i++) {
            this.map[i] = [];
            for (let j = 0; j < 13; j++) {
                switch (this.raw[i][j]) {
                    case 'plain':
                        this.map[i][j] = {
                            name: 'Plain',
                            occupied: false,
                            owner: null,
                            type: null,
                            i: i,
                            j: j
                        }
                        break
                    case 'baseRed':
                        this.map[i][j] = {
                            name: 'Base',
                            occupied: true,
                            owner: 'Red',
                            type: 'base',
                            i: i,
                            j: j
                        }
                        break
                    case 'baseBlue':
                        this.map[i][j] = {
                            name: 'Base',
                            occupied: true,
                            owner: 'Blue',
                            type: 'base',
                            i: i,
                            j: j
                        }
                        break
                    case 'hill':
                        this.map[i][j] = {
                            name: 'Hill',
                            occupied: true,
                            owner: null,
                            type: 'hill',
                            i: i,
                            j: j
                        }
                        break
                    case 'ore':
                        this.map[i][j] = {
                            name: 'Ore',
                            occupied: true,
                            owner: null,
                            type: 'ore',
                            i: i,
                            j: j
                        }
                }
            }
        }
    }
    whatsThere(i, j) {
        return this.map[i][j];
    }
    changeDisplayInfo(info) {
        document.getElementById("currentName").innerText = info.name;
        this.changeOptions(info)
    }
    build(structure, info) {
        switch (structure) {
            case 'extractor':
                //console.log(this.modelMap.modelMap[info.i][info.j])
                this.map[info.i][info.j].owner = this.player;
                this.map[info.i][info.j].name = 'Extractor';
                this.modelMap.remove(this.modelMap.modelMap[info.i][info.j])
                let square = new Extractor(this.player);
                square.position.z = 10 * info.i;
                square.position.x = 10 * info.j;
                this.modelMap.add(square);
                this.modelMap.modelMap[info.i][info.j] = square;
                break
        }
    }
    changeOptions(info) {
        let tab = document.getElementById("options")
        switch (info.type) {
            case 'base':
                if (info.owner == this.player) {
                    tab.innerHTML = "<p>siema mordo</p>"
                } else {
                    tab.innerHTML = "<p>nie twoja baza kozaku</p>"
                }
                break
            case 'ore':
                tab.innerHTML = "";
                if (info.owner == null) {
                    let btn = document.createElement("button")
                    btn.innerText = "Build Extractor"
                    btn.addEventListener("click", (e) => {
                        this.build('extractor', info)
                    });
                    tab.appendChild(btn)
                } else {
                    tab.innerHTML = `<p>Occupied by ${info.owner}</p>`
                }
                break
            case 'hill':
                tab.innerHTML = "<p>High hill</p>"
                break
            case null:
                tab.innerHTML = "";
                break
        }
    }
}