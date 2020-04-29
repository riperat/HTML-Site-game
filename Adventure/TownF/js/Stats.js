
function showStats() {
    player = JSON.parse(localStorage.getItem('Hero'));
    let getInterface = document.querySelector(".interface");
    getInterface.innerHTML = '<div><h3>' + player.classType + '</h3>' + ' <h3> health: ' + player.health + ' </h3>'
        + '<h3> mana: ' + player.mana + ' </h3>' +
        '<h3> Attack: ' + player.dmg + ' </h3>' +
        '<h3> Defence: ' + player.defence + ' </h3>' +
        '<h3> Gold: ' + player.gold + ' </h3></div>'
        ;


    console.log(player);

}
