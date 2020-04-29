
let GameMannageer = {
    setMarket: function () {

    },
    chosenPlayer: function (classType) {

        switch (classType) {

            case "Warrior":
                stat = new Hero(classType, 50, 0, 2, 2);
                break;
            case "Mage":
                stat = new Hero(classType, 25, 30, 0, 2);
                break;
            case "Assasin":
                stat = new Hero(classType, 35, 0, 1, 4);
                break;
            default:
                break;
        }
        localStorage.setItem('Hero', JSON.stringify(stat));
    }


}