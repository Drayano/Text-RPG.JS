function encounter(player: Character, monster: Monster) {
    random_event = getRandomInt(100);
    ambush_event = getRandomInt(100);
    healing_cost = player.level * 10 + 10 + getRandomInt(15);

    logs.innerHTML = "";

    // Force the first few events to always be a fight
    if (kills_number <= 3) {
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

        if (ambush_event <= 95) {
            log_text(`It will cost ${healing_cost} Gold do you want to spend that gold to heal back all you HP ?`);
        }
        
        else if (ambush_event > 95) {
            log_text("\nYou walk towards the Inn and just as you're trying to get in you get ambushed by a monster !");
            ambush(player, monster);

            if (player.health > 0) {
                log_text("You managed to beat the monster... You can finally enter the Inn now...")
            }

            else {
                return;
            }
        }
    }

    // Item Event
    else if (random_event <= item_event) {
        log_text("You find something shinning inside the bushes out there, you try to reach out and...");

        if (ambush_event <= 95) {
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
            
            (document.getElementById("yes") as HTMLInputElement).disabled = true;
            (document.getElementById("no") as HTMLInputElement).disabled = true;
            (document.getElementById("next") as HTMLInputElement).disabled = false;
        }
        
        else if (ambush_event > 95) {
            log_text("\nOh no, it was a monster hiding inside, you got ambushed !");
            ambush(player, monster);

            if (player.health > 0) {
                log_text("You managed to beat the monster...")
            }

            else {
                return;
            }
        }
    }

    // Item Shop Event
    else if (random_event <= item_shop_event) {
        log_text("You find an Item Shop in the distance, you decide to walk towards it...");

        if (ambush_event <= 95) {
            log_text("\nYou can exchange your Gold for useful Items...");
            log_text(`1- Health Potion : ${potion_price} Gold`);
            log_text(`2- Sword : ${sword_price} Gold`);
            log_text(`3- Shield : ${shield_price} Gold`);

            log_text("\nWhich one would you like to purchase ?");

            (document.getElementById("potion-shop") as HTMLInputElement).style.display = "block";
            (document.getElementById("sword-shop") as HTMLInputElement).style.display = "block";
            (document.getElementById("shield-shop") as HTMLInputElement).style.display = "block";

            (document.getElementById("potion-shop") as HTMLInputElement).disabled = false;
            (document.getElementById("sword-shop") as HTMLInputElement).disabled = false;
            (document.getElementById("shield-shop") as HTMLInputElement).disabled = false;

            (document.getElementById("yes") as HTMLInputElement).disabled = true;
            (document.getElementById("no") as HTMLInputElement).disabled = true;
        }
        
        else if (ambush_event > 95) {
            log_text("\nOh no ! Just as you approach the shop, a monster suddenly appears and ambush you, you're gonna have to fight it !");
            ambush(player, monster);

            if (player.health > 0) {
                log_text("\nYou managed to beat the monster... You can finally enter the Shop now...");

                log_text("\nYou can exchange your Gold for useful Items...");
                log_text(`1- Health Potion : ${potion_price} Gold`);
                log_text(`2- Sword : ${sword_price} Gold`);
                log_text(`3- Shield : ${shield_price} Gold`);

                log_text("\nWhich one would you like to purchase ?");

                (document.getElementById("potion-shop") as HTMLInputElement).style.display = "block";
                (document.getElementById("sword-shop") as HTMLInputElement).style.display = "block";
                (document.getElementById("shield-shop") as HTMLInputElement).style.display = "block";

                (document.getElementById("potion-shop") as HTMLInputElement).disabled = false;
                (document.getElementById("sword-shop") as HTMLInputElement).disabled = false;
                (document.getElementById("shield-shop") as HTMLInputElement).disabled = false;

                (document.getElementById("yes") as HTMLInputElement).disabled = true;
                (document.getElementById("no") as HTMLInputElement).disabled = true;
            }

            else {
                return;
            }
        }
    }

    stats();
}

function game_loop() {
    if (player1.health > 0) {
        (document.getElementById("yes") as HTMLInputElement).disabled = false;
        (document.getElementById("no") as HTMLInputElement).disabled = false;
        (document.getElementById("next") as HTMLInputElement).disabled = true;

        (document.getElementById("potion-shop") as HTMLInputElement).style.display = "none";
        (document.getElementById("sword-shop") as HTMLInputElement).style.display = "none";
        (document.getElementById("shield-shop") as HTMLInputElement).style.display = "none";

        monster_reset();
        encounter(player1, monster1);
    }

    else {
        (document.getElementById("yes") as HTMLInputElement).disabled = true;
        (document.getElementById("no") as HTMLInputElement).disabled = true;
        (document.getElementById("next") as HTMLInputElement).disabled = true;

        (document.getElementById("potion-shop") as HTMLInputElement).style.display = "none";
        (document.getElementById("sword-shop") as HTMLInputElement).style.display = "none";
        (document.getElementById("shield-shop") as HTMLInputElement).style.display = "none";

        log_text(`${player1.name} is dead ! \nYou killed ${kills_number} monsters !`);
    }
}