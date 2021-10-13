function encounter(player, monster) {
    random_event = getRandomInt(100);
    healing_cost = 10 + getRandomInt(15);

    // Fight Event
    if (random_event < 95) {
        log_text(`${player.name} encounters a level ${monster.level} ${monster.type} with ${monster.health} HP and ${monster.strength} strength`);
        log_text(`\nShould ${player.name} fight him ?\n`);
    }

    // Healing Inn Event
    else {
        log_text("You find an Inn, you can heal all your HP if you take the time and rest");
        log_text(`It will cost ${healing_cost} Gold do you want to spend that gold to heal back all you HP ?`);
    }

    stats();
}

function game_loop() {
    if (player1.health > 0) {
        document.getElementById("yes").disabled = false;
        document.getElementById("no").disabled = false;
        document.getElementById("next").disabled = true;

        encounter(player1, monster1);
    }

    else {
        document.getElementById("yes").disabled = true;
        document.getElementById("no").disabled = true;
        document.getElementById("next").disabled = true;

        log_text(`${player1.name} is dead ! \nYou killed ${kills_number - 1} monsters !`);
    }
}

function stats() {
    player_stats.innerHTML = `Name : ${player1.name}<br>Level : ${player1.level}<br>XP : ${player1.experience} <br>HP : ${player1.health} / ${max_health}<br>Strength : ${player1.strength}<br>Speed : ${player1.speed}<br>Gold : ${player1.money}`;
}

// General functions

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

function monster_reset() {
    monster1.monsterType(player1.level);
}

function game_reset() {
    logs.innerHTML = ""
    //                      Name        HP  Strength             Speed
    player1 = new Character("Drayano", 100, 5 + getRandomInt(5), 10 + getRandomInt(20));
    monster_reset();
    kills_number = 1;
    max_health = 100;
    random_event = getRandomInt(100);
    healing_cost = 10 + getRandomInt(15);
    health_gain = 0;

    stats();

    document.getElementById("yes").disabled = false;
    document.getElementById("no").disabled = false;
    document.getElementById("next").disabled = true;

    encounter(player1, monster1);
}

function log_text(text) {
    logs.innerHTML += text + "\n";
    logs.scrollTop = logs.scrollHeight;
}