let player;

function transaction(n){
    if(player.gold >= n){
        alert("Item succesfully bought");
        player.gold -= n;
    }else{
        alert("not enough money");
    }
}

function save() {
    localStorage.setItem('Hero', JSON.stringify(player));
}

function buy(item) {

    player = JSON.parse(localStorage.getItem('Hero'));

    switch (item) {
        case 1:
            transaction(5);
            player.dmg = 5;
            break;
        case 2:
            transaction(10);
            player.dmg = 7;
            break;
        case 3:
            transaction(3);
            player.dmg = 9;
            break;
        case 4:
            transaction(10);
            player.defence = 3;
            break;
        case 5:
            transaction(20);
            player.defence = 5;
            break;
        case 6:
            transaction(30);
            player.defence = 10;
            break;
        default:
            break;
    }
    save();
}