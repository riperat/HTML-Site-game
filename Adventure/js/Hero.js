let hero;

function skill(classType){
switch(classType){
    case "Warrior":
                return "";
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

}

function Hero(classType, health, mana, defence, dmg, gold) {
    this.classType = classType;
    this.health = health;
    this.mana = mana;
    this.defence = defence;
    this.dmg = dmg;
    this.gold = gold;
}

