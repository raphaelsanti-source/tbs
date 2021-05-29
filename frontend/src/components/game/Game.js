import Extractor from '../buildings/Extractor';
import Factory from '../buildings/Factory';
import Car from '../units/Car';
import Tank from '../units/Tank';
export default class Game {
    constructor(map, scene, modelMap) {
        this.selected = null;
        this.moves = false;
        this.turn = "Red"
        this.player = "Red"
        this.ore = 0;
        this.gold = 100;
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
                            j: j,
                            health: 500,
                        }
                        break
                    case 'baseBlue':
                        this.map[i][j] = {
                            name: 'Base',
                            occupied: true,
                            owner: 'Blue',
                            type: 'base',
                            i: i,
                            j: j,
                            health: 500,
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
                        break
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
    train(unit, info) {
        let canTrain = false;
        let unitCord = {
            i: null,
            j: null
        }
        for (let i = info.i - 1; i < info.i + 2; i++) {
            for (let j = info.j - 1; j < info.j + 2; j++) {
                if (!canTrain) {
                    if (this.map[i] !== undefined) {
                        if (this.map[i][j] !== undefined) {
                            if (!this.map[i][j].occupied) {
                                canTrain = true;
                                unitCord.i = i;
                                unitCord.j = j;
                            }
                        }
                    }
                }
            }
        }
        if (canTrain) {
            let square;
            switch (unit) {
                case 'car':
                    //if (this.gold >= 150) {
                    if (true) {
                        this.map[unitCord.i][unitCord.j].owner = this.player;
                        this.map[unitCord.i][unitCord.j].name = 'Car';
                        this.map[unitCord.i][unitCord.j].occupied = true;
                        this.map[unitCord.i][unitCord.j].type = 'car';
                        this.map[unitCord.i][unitCord.j].health = 150;
                        this.map[unitCord.i][unitCord.j].moves = 2;
                        //this.modelMap.remove(this.modelMap.modelMap[unitCord.i][unitCord.j])
                        square = new Car(this.player);
                        square.position.z = 10 * unitCord.i;
                        square.position.x = 10 * unitCord.j;
                        this.modelMap.add(square);
                        this.modelMap.modelMap[unitCord.i][unitCord.j] = square;
                        console.log(this.map)
                        this.gold -= 150
                    } else {
                        alert("not enough resources")
                    }
                    break
                case 'tank':
                    //if (this.gold >= 0 && this.ore >= 0) {
                    if (true) {
                        this.map[unitCord.i][unitCord.j].owner = this.player;
                        this.map[unitCord.i][unitCord.j].name = 'Tank';
                        this.map[unitCord.i][unitCord.j].occupied = true;
                        this.map[unitCord.i][unitCord.j].type = 'tank';
                        this.map[unitCord.i][unitCord.j].health = 300;
                        this.map[unitCord.i][unitCord.j].moves = 1;
                        //this.modelMap.remove(this.modelMap.modelMap[unitCord.i][unitCord.j])
                        square = new Tank(this.player);
                        square.position.z = 10 * unitCord.i;
                        square.position.x = 10 * unitCord.j;
                        this.modelMap.add(square);
                        this.modelMap.modelMap[unitCord.i][unitCord.j] = square;
                        console.log(this.map)
                        this.gold -= 200;
                        this.ore -= 100;
                    } else {
                        alert("not enough resources")
                    }
                    break
            }
        } else {
            alert("no space to train unit")
        }
        this.changeOptions(info)
    }
    build(structure, info) {
        let canBuild = false;
        for (let i = info.i - 2; i < info.i + 3; i++) {
            for (let j = info.j - 2; j < info.j + 3; j++) {
                if (this.map[i] !== undefined) {
                    if (this.map[i][j] !== undefined) {
                        if (this.map[i][j].owner == this.player) {
                            canBuild = true;
                        }
                    }
                }
            }
        }
        if (canBuild) {
            let square;
            switch (structure) {
                case 'extractor':
                    //console.log(this.modelMap.modelMap[info.i][info.j])
                    if (this.gold >= 100) {
                        this.map[info.i][info.j].owner = this.player;
                        this.map[info.i][info.j].name = 'Extractor';
                        this.map[info.i][info.j].occupied = true;
                        this.map[info.i][info.j].health = 100;
                        this.modelMap.remove(this.modelMap.modelMap[info.i][info.j])
                        square = new Extractor(this.player);
                        square.position.z = 10 * info.i;
                        square.position.x = 10 * info.j;
                        this.modelMap.add(square);
                        this.modelMap.modelMap[info.i][info.j] = square;
                        console.log(this.map)
                        this.gold -= 100
                    } else {
                        alert("not enough resources")
                    }
                    break
                case 'factory':
                    //if (this.gold >= 150 && this.ore >= 50) {
                    if (true) {
                        this.map[info.i][info.j].owner = this.player;
                        this.map[info.i][info.j].name = 'Factory';
                        this.map[info.i][info.j].type = 'factory';
                        this.map[info.i][info.j].occupied = true;
                        this.map[info.i][info.j].health = 250;
                        this.modelMap.remove(this.modelMap.modelMap[info.i][info.j])
                        square = new Factory(this.player);
                        square.position.z = 10 * info.i;
                        square.position.x = 10 * info.j;
                        this.modelMap.add(square);
                        this.modelMap.modelMap[info.i][info.j] = square;
                        console.log(this.map)
                        this.gold -= 150
                        this.ore -= 50
                    } else {
                        alert("not enough resources")
                    }
                    break
            }
        } else {
            alert("cant build here")
        }
        this.changeOptions(info)
    }
    changeOptions(info) {
        let tab = document.getElementById("options")
        switch (info.type) {
            case 'base':
                tab.innerHTML = "";
                if (info.owner == this.player) {
                    tab.innerHTML = `<p>Your Base</p><p>Health ${info.health}/500</p>`
                } else {
                    tab.innerHTML = `<p>${info.owner}'s Base</p><p>Health ${info.health}/500</p>`
                }
                break
            case 'ore':
                tab.innerHTML = "";
                if (info.owner == null) {
                    let btn = document.createElement("button")
                    btn.innerText = "Build Extractor"
                    btn.addEventListener("click", (e) => {
                        this.build('extractor', info)
                        this.updateResc()
                    });
                    tab.appendChild(btn)
                } else {
                    tab.innerHTML = `<p>Occupied by ${info.owner}</p><p>Health ${info.health}/100</p>`
                }
                break
            case 'hill':
                tab.innerHTML = "<p>High hill</p>"
                break
            case 'factory':
                tab.innerHTML = "";
                if (info.owner == this.player) {
                    let btn1 = document.createElement("button")
                    btn1.innerText = "Build Car"
                    btn1.addEventListener("click", (e) => {
                        this.train('car', info)
                        this.updateResc()
                    });
                    tab.appendChild(btn1);
                    let btn2 = document.createElement("button")
                    btn2.innerText = "Build Tank";
                    btn2.addEventListener("click", (e) => {
                        this.train('tank', info)
                        this.updateResc()
                    });
                    tab.appendChild(btn2);
                    let infomator = document.createElement("p");
                    infomator.innerText = `Health ${info.health}/250`
                } else {
                    tab.innerHTML = `<p>Occupied by ${info.owner}</p><p>Health ${info.health}/250</p>`
                }
                break
            case null:
                tab.innerHTML = "";
                if (info.owner == null) {
                    let btn = document.createElement("button")
                    btn.innerText = "Build Factory"
                    btn.addEventListener("click", (e) => {
                        this.build('factory', info)
                        this.updateResc()
                    });
                    tab.appendChild(btn)
                } else {
                    tab.innerHTML = `<p>Occupied by ${info.owner}</p>`
                }
                break
            case 'car':
                tab.innerHTML = "";
                if (info.owner == this.player) {
                    let btn1 = document.createElement("button");
                    btn1.id = "moveOption";
                    let infomator = document.createElement("p");
                    let movesCount = document.createElement("p")
                    movesCount.innerText = `Moves ${info.moves}/2`
                    infomator.innerText = `Health ${info.health}/150`;
                    btn1.innerText = "Move"
                    btn1.addEventListener("click", (e) => {
                        if (info.moves != 0) {
                            if (this.moves) {
                                this.moves = false;
                                btn1.style.backgroundColor = ""
                                btn1.style.color = ""
                                this.selected = null;
                            } else {
                                this.moves = true;
                                btn1.style.backgroundColor = "red"
                                btn1.style.color = "white"
                                this.selected = info;
                            }
                        } else {
                            alert("no moves avalible for that unit")
                        }
                    });

                    tab.appendChild(btn1);
                    tab.appendChild(infomator);
                    tab.appendChild(movesCount);
                } else {
                    tab.innerHTML = `<p>${info.owner}'s Car</p><p>Health ${info.health}/150</p>`
                }
                break
            case 'tank':
                tab.innerHTML = "";
                if (info.owner == this.player) {
                    let btn1 = document.createElement("button");
                    btn1.id = "moveOption";
                    let infomator = document.createElement("p");
                    infomator.innerText = `Health ${info.health}/300`;
                    let movesCount = document.createElement("p")
                    movesCount.innerText = `Moves ${info.moves}/1`
                    btn1.innerText = "Move"
                    btn1.addEventListener("click", (e) => {
                        if (info.moves != 0) {
                            if (this.moves) {
                                this.moves = false;
                                btn1.style.backgroundColor = ""
                                btn1.style.color = ""
                                this.selected = null;
                            } else {
                                this.moves = true;
                                btn1.style.backgroundColor = "red"
                                btn1.style.color = "white"
                                this.selected = info;
                            }
                        } else {
                            alert("no moves avalible for that unit")
                        }
                    });

                    tab.appendChild(btn1);
                    tab.appendChild(infomator);
                    tab.appendChild(movesCount);
                } else {
                    tab.innerHTML = `<p>${info.owner}'s Tank</p><p>Health ${info.health}/300</p>`
                }
                break
        }
    }
    updateResc() {
        document.getElementById("resources").innerHTML = `<p>Gold: ${this.gold}, Ore: ${this.ore}</p>`
    }
    skipTurn() {
        if (this.turn == this.player) {
            this.turn = "Blue";
        } else {
            this.turn = this.player;
            this.gold += 100;
            let extractors = 0;
            for (let i = 0; i < this.map.length; i++) {
                for (let j = 0; j < this.map[i].length; j++) {
                    if (this.map[i][j].name == "Extractor" && this.map[i][j].owner == this.player) {
                        extractors += 1;
                    }
                }
            }
            this.ore += 50 * extractors;
            this.updateResc();
        }
        console.log(this.turn);
    }
    move(direction, info) {
        // console.log(direction)
        // console.log(info)
        // console.log(this.modelMap.modelMap);
        let canMove = false;
        let attacking = false;
        // for (let i = info.i - 1; i < info.i + 2; i++) {
        //     for (let j = info.j - 1; j < info.j + 2; j++) {
        //         if (i == direction.i && j == direction.j) {
        //             canMove = true;
        //         }
        //     }
        // }
        if (direction.i - info.i == 1 && direction.j == info.j) {
            canMove = true;
        }
        if (direction.i - info.i == -1 && direction.j == info.j) {
            canMove = true;
        }
        if (direction.j - info.j == -1 && direction.i == info.i) {
            canMove = true;
        }
        if (direction.j - info.j == 1 && direction.i == info.i) {
            canMove = true;
        }
        if (direction.occupied) {
            if (direction.owner != this.player && direction.owner != null) {
                attacking = true;
            } else {
                canMove = false
            }
        }
        if (canMove) {
            if (attacking) {
                // console.log("atacking:")
                // console.log(info)
                switch (info.type) {
                    case 'car':
                        direction.health -= 25;
                        break
                    case 'tank':
                        direction.health -= 50;
                        break
                }
                info.moves -= 1;
                this.moves = false;
                document.getElementById("moveOption").style.backgroundColor = ""
                document.getElementById("moveOption").style.color = ""
                console.log(direction)
            } else {
                // square.position.z = 10 * info.i;
                // square.position.x = 10 * info.j;
                //this.modelMap.modelMap[direction.i][direction.j]
                let moving = this.modelMap.modelMap[info.i][info.j]
                this.modelMap.remove(this.modelMap.modelMap[info.i][info.j])
                moving.position.z = 10 * direction.i;
                moving.position.x = 10 * direction.j;
                this.modelMap.add(moving);
                this.modelMap.modelMap[direction.i][direction.j] = moving;
                this.modelMap.modelMap[info.i][info.j] = null;
                let movingObj = this.map[info.i][info.j]
                this.map[info.i][info.j] = {
                    name: 'Plain',
                    occupied: false,
                    owner: null,
                    type: null,
                    i: movingObj.i,
                    j: movingObj.j
                }
                this.map[direction.i][direction.j] = {
                    name: movingObj.name,
                    occupied: movingObj.occupied,
                    owner: movingObj.owner,
                    type: movingObj.type,
                    i: direction.i,
                    j: direction.j,
                    health: movingObj.health,
                    moves: movingObj.moves // -1
                }
                this.selected = null;
                this.moves = false;
                document.getElementById("moveOption").style.backgroundColor = ""
                document.getElementById("moveOption").style.color = ""
                //console.log(this.map)
                this.changeDisplayInfo(this.map[info.i][info.j])
                console.log(this.map[info.i][info.j])
            }
        } else {
            alert("invalid movement")
        }
    }
}