function fight_decision(e: any) {
    // Fight or Healing Event
    (document.getElementById("yes") as HTMLInputElement).disabled = true;
    (document.getElementById("no") as HTMLInputElement).disabled = true;
    (document.getElementById("next") as HTMLInputElement).disabled = false;

    if (e.target.innerHTML === "Yes") {
        // Fight Event
        if (random_event <= fight_event) {
            if (player1.speed >= monster1.speed) {
                log_text(`${player1.name} speed (${player1.speed}) is bigger or equal than the ${monster1.type} speed (${monster1.speed}), ${player1.name} attacks first !`);
                
                log_text("The fight begins !");
                while (player1.health > 0 && monster1.health > 0) {
                    fight(player1, monster1);
                }
    
                if (monster1.health <= 0) {
                    kills_number += 1
                }
                    
                monster_reset();
            }
    
            else {
                log_text(`The ${monster1.type} speed (${monster1.speed}) is bigger than ${player1.name} speed (${player1.speed}), the ${monster1.type} attacks ${player1.name} first !`);
    
                log_text("The fight begins !");
                while (player1.health > 0 && monster1.health > 0) {
                    fight(player1, monster1);
                }
    
                if (monster1.health <= 0) {
                    kills_number += 1
                }
                    
                monster_reset();
            }
        }

        // Healing Inn Event
        else if (random_event > fight_event && random_event <= inn_event) {
            if (player1.money >= healing_cost) {
                log_text(`\nYou decide to spend ${healing_cost} Gold and sleep in the Inn. Your HP is fully healed\n`);
                player1.money -= healing_cost;
                player1.health = player1.max_health;
            }
            
            else if (random_event <= item_event) {
                log_text("\nYou do not seem to have enough money...\n")
            }
        }
    }
    
    else if (e.target.innerHTML === "No") {
        // Fight Event
        if (random_event <= fight_event) {
            if (player1.evasion > monster1.evasion) {
                log_text(`${player1.name} evasion (${player1.evasion}) is bigger than the ${monster1.type} evasion (${monster1.evasion}), ${player1.name} manages to flee !`);
    
                monster_reset();
            }
    
            else {
                log_text(`${player1.name} tries to flee but the ${monster1.type} evasion (${monster1.evasion}) is bigger or equal than ${player1.name} evasion (${player1.evasion}), the ${monster1.type} gets a free attack on ${player1.name} !`);
    
                player1.takeDamage(monster1.strength);
    
                log_text(`${player1.name} takes ${monster1.strength} damage, his remaining HP is ${player1.health}`);
    
                if (player1.health <= 0) {
                    return;
                }
    
                log_text("The fight begins !");
                while (player1.health > 0 && monster1.health > 0) {
                    fight(player1, monster1);
                }
    
                if (monster1.health <= 0) {
                    kills_number += 1
                }
                    
                monster_reset();
            }
        }

        // Healing Inn Event
        else if (random_event > fight_event && random_event <= inn_event) {
            log_text(`\nYou decide to not spend any money and continue your journey instead\n`);
        }
    }

    stats();
}

function fight(player: Character, monster: Monster) {
    if (player.speed >= monster.speed) {
        monster.takeDamage(player.strength);

        log_text(`${monster.type} takes ${player.strength} damage, his remaining HP is ${monster.health}`);

        if (monster.health > 0) {
            player.takeDamage(monster.strength);

            log_text(`${player.name} takes ${monster.strength} damage, his remaining HP is ${player.health}`);
        }

        else {
            log_text("\nYou killed the monster !\n");
            log_text(`You gained ${monster.experience} XP and ${monster.money} Gold !\n`);
            player.gainXP(monster.experience);
            player.gainMoney(monster.money);
            player.levelUP();
        }
    }

    else {
        player.takeDamage(monster.strength);

        log_text(`${player.name} takes ${monster.strength} damage, his remaining HP is ${player.health}`);

        if (player.health <= 0) {
            stats();
            return;
        }

        else {
            monster.takeDamage(player.strength);

            log_text(`${monster.type} takes ${player.strength} damage, his remaining HP is ${monster.health}`);

            if (monster.health <= 0) {
                log_text("\nYou killed the monster !\n");
                log_text(`You gained ${monster.experience} XP and ${monster.money} Gold !\n`);
                player.gainXP(monster.experience);
                player.gainMoney(monster.money);
                player.levelUP();
            }
        }
    }
}

function ambush(player: Character, monster: Monster) {
    log_text(`${player.name} tries to flee but the ${monster.type} catches him, the ${monster.type} gets a free attack on ${player.name} !`);
    
    player.takeDamage(monster.strength);

    log_text(`${player.name} takes ${monster.strength} damage, his remaining HP is ${player.health}`);

    if (player.health <= 0) {
        return;
    }

    log_text("The fight begins !");
    while (player.health > 0 && monster.health > 0) {
        fight(player, monster);
    }

    if (monster.health <= 0) {
        kills_number += 1
    }
        
    monster_reset();
}