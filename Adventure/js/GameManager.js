let ctx;
let canvas;
let maze;
let mazeHeight;
let mazeWidth;
let player;
let enemies;
let difficulty;
let heroCurrHp;
let emyCurrHp;


class Player {

    constructor() {
        this.col = 0;
        this.row = 0;
    }

}


class MazeCell {

    constructor(col, row) {
        this.col = col;
        this.row = row;

        this.eastWall = true;
        this.northWall = true;
        this.southWall = true;
        this.westWall = true;

        this.visited = false;
    }

}

// heroCurrHp;
// let emyCurrHp;

function attack() {

    if (difficulty == 1) {
        enemy = new Enemy("Slime", 10, 0, 3);
    }
    if (difficulty == 2) {
        enemy = new Enemy("Orc", 20, 4, 6);
    }

    emyCurrHp = enemy.health;


    while (emyCurrHp > 0) {

        var damage = hero.dmg * hero.dmg / (hero.dmg + enemy.defence);
        emyCurrHp = emyCurrHp - damage;

        damage = enemy.dmg * enemy.dmg / (enemy.dmg + hero.defence);
        heroCurrHp = heroCurrHp - damage;
        if (heroCurrHp <= 0) {
            alert("You died returning to town");
            backToTown();
            break;

        }
    }
    alert("You killerd the monster gold + 2");
    hero.gold;
    draw();

}

function draw() {
    let getInterface = document.querySelector(".interface");
    getInterface.innerHTML = '<h3> health: ' + heroCurrHp + '/' + hero.health + ' </h3>' + '<h3> mana: ' + hero.mana + ' </h3>';
    document.addEventListener("keydown", this.onKeyDown);
}

function backToTown() {
    localStorage.setItem('Hero', JSON.stringify(hero));
    location.replace("../Adventure/Town.html");
}

let GameMannageer = {
    setGameStart: function (classType) {
        this.chosenPlayer(classType);
        location.replace("../Adventure/Town.html");
    },
    startMaze: function (df) {
        difficulty = df;
        canvas = document.getElementById("mainForm");

        ctx = canvas.getContext("2d");

        let getButton = document.querySelector(".buttons").innerHTML = "";

        hero = JSON.parse(localStorage.getItem('Hero'));
        heroCurrHp = hero.health;
        draw();
        maze = new Maze(20, 20, 25);

        document.addEventListener("keydown", this.onKeyDown);


    }
    ,
    chosenPlayer: function (classType) {

        switch (classType) {

            case "Warrior":
                stat = new Hero(classType, 50, 0, 2, 3, 0);
                break;
            case "Mage":
                stat = new Hero(classType, 25, 30, 0, 7, 0);
                break;
            case "Assasin":
                stat = new Hero(classType, 35, 0, 1, 4, 0);
                break;
            default:
                break;
        }
        localStorage.setItem('Hero', JSON.stringify(stat));
    },
    onKeyDown: function (event) {

        switch (event.keyCode) {
            case 37:
            case 65:
                if (!maze.cells[player.col][player.row].westWall) {
                    player.col -= 1;
                }
                break;
            case 39:
            case 68:
                if (!maze.cells[player.col][player.row].eastWall) {
                    player.col += 1;
                }
                break;
            case 40:
            case 83:
                if (!maze.cells[player.col][player.row].southWall) {
                    player.row += 1;
                }
                break;
            case 38:
            case 87:
                if (!maze.cells[player.col][player.row].northWall) {
                    player.row -= 1;
                }
                break;
            default:
                break;
        }
        for (let i = 0; i < 4; i++) {

            if (player.col == enemies[i][0] && player.row == enemies[i][1]) {
                attack();
            }
        }
        if (player.col == 0 && player.row == 0) {

            alert("You cleared the maze gold + 10");
            hero.gold = hero.gold + 10;
            backToTown();
        }
        maze.redraw();
    }



}