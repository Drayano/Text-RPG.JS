function encounter(player, monster) {
    random_event = getRandomInt(100);
    healing_cost = 10 + getRandomInt(15);

    // Force the first event to always be a fight
    if (kills_number === 1) {
        random_event = fight_event;
    }

    // Fight Event
    if (random_event <= fight_event) {
        log_text(`${player.name} encounters a level ${monster.level} ${monster.type} with ${monster.health} HP`);
        log_text(`\nShould ${player.name} fight him ?\n`);
    }

    // Healing Inn Event
    else if (random_event > fight_event && random_event <= inn_event) {
        log_text("You find an Inn, you can heal all your HP if you take the time and rest");
        log_text(`It will cost ${healing_cost} Gold do you want to spend that gold to heal back all you HP ?`);
    }

    // Item Event
    else if (random_event <= item_event) {
        log_text("\nYou find something shinning inside the bushes out there, you try to reach out and...");
        item_found = getRandomInt(3);

        if (!sword_found && item_found === sword_index + 1) {
            log_text("\nYou found a sword !");
            getItem(sword_index + 1);
        }

        else if (!shield_found && item_found === shield_index + 1) {
            log_text("\nYou found a shield !");
            getItem(shield_index + 1);
        }

        else {
            log_text("\nYou found a healing potion !");
            getItem(potion_index + 1);
        }
        
        document.getElementById("yes").disabled = true;
        document.getElementById("no").disabled = true;
        document.getElementById("next").disabled = false;
    }

    // Item Shop Event
    else if (random_event <= item_shop_event) {
        log_text("You find an Item Shop, you can exchange your Gold for useful Items...");
        log_text(`1- Health Potion : ${potion_price} Gold`);
        log_text(`2- Sword : ${sword_price} Gold`);
        log_text(`3- Shield : ${shield_price} Gold`);

        log_text("Which one would you like to purchase ?");

        document.getElementById("potion-shop").style.display = "block";
        document.getElementById("sword-shop").style.display = "block";
        document.getElementById("shield-shop").style.display = "block";

        document.getElementById("potion-shop").disabled = false;
        document.getElementById("sword-shop").disabled = false;
        document.getElementById("shield-shop").disabled = false;

        document.getElementById("yes").disabled = true;
        document.getElementById("no").disabled = true;
        // document.getElementById("next").disabled = false;
    }

    stats();
}

function game_loop() {
    if (player1.health > 0) {
        document.getElementById("yes").disabled = false;
        document.getElementById("no").disabled = false;
        document.getElementById("next").disabled = true;

        document.getElementById("potion-shop").style.display = "none";
        document.getElementById("sword-shop").style.display = "none";
        document.getElementById("shield-shop").style.display = "none";

        encounter(player1, monster1);
    }

    else {
        document.getElementById("yes").disabled = true;
        document.getElementById("no").disabled = true;
        document.getElementById("next").disabled = true;

        document.getElementById("potion-shop").style.display = "none";
        document.getElementById("sword-shop").style.display = "none";
        document.getElementById("shield-shop").style.display = "none";

        log_text(`${player1.name} is dead ! \nYou killed ${kills_number - 1} monsters !`);
    }
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
    healing_cost = 10 + getRandomInt(15);
    health_gain = 0;

    stats();

    document.getElementById("yes").disabled = false;
    document.getElementById("no").disabled = false;
    document.getElementById("next").disabled = true;

    document.getElementById(`item1`).style.display = "none";
    document.getElementById(`item2`).style.display = "none";
    document.getElementById(`item3`).style.display = "none";

    document.getElementById("potion-shop").style.display = "none";
    document.getElementById("sword-shop").style.display = "none";
    document.getElementById("shield-shop").style.display = "none";

    items_inventory = [0, 0, 0];

    encounter(player1, monster1);
}

function log_text(text) {
    logs.innerHTML += text + "\n";
    logs.scrollTop = logs.scrollHeight;
}

function stats() {
    if (player1.health > player1.max_health) {
        player1.health = player1.max_health;
    }

    player_stats.innerHTML = `Name : ${player1.name}<br>Level : ${player1.level}<br>XP : ${player1.experience} / ${experience_array[player1.level - 1]}<br>HP : ${player1.health} / ${player1.max_health}<br>Strength : ${player1.strength}<br>Speed : ${player1.speed}<br>Gold : ${player1.money}`;
}