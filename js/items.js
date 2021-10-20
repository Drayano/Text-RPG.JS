function getItem(identifier) {
    document.getElementById(`item${identifier}`).style.display = "block";

    // Consumables
    if (identifier === 1) {
        items_inventory[identifier - 1] += 1;
    }
    
    // Equipped
    else {
        items_inventory[identifier - 1] = 1;

        if (identifier === sword_index + 1) {
            sword_found = true;
        }

        else if (identifier === shield_index + 1) {
            shield_found = true;
        }
    }

    document.getElementById(`item${identifier}-number`).innerHTML = items_inventory[identifier - 1];
}

function useItem(e) {
    if (e.target.id === "potion") {
        if (items_inventory[potion_index] > 0) {
            let healed = 0;

            if (player1.health <= 0) {
                log_text("You can't drink a potion while dead !");
                return;
            }

            else if (player1.health === player1.max_health) {
                log_text("You're already full HP !");
                return;
            }

            else if (player1.max_health - player1.health >= potion_healing) {
                healed = potion_healing;
                player1.heal(potion_healing);  
            }

            else if (player1.max_health - player1.health < potion_healing) {
                healed = player1.max_health - player1.health;
                player1.heal(player1.max_health - player1.health);
            }
            
            items_inventory[potion_index] -= 1;
            document.getElementById(`item1-number`).innerHTML = items_inventory[potion_index];

            log_text(`You drank a potion and restored ${healed} HP`);
            stats();
        }

        else {
            return;
        }
    }

    if (e.target.id === "sword") {
        if (items_inventory[sword_index] === 1) {
            items_inventory[sword_index] = 0;
            document.getElementById(`item2-number`).innerHTML = items_inventory[sword_index];

            player1.strength += sword_strength;
            log_text("Sword Equipped");
            stats();
        }

        else {
            items_inventory[sword_index] = 1;
            document.getElementById(`item2-number`).innerHTML = items_inventory[sword_index];

            player1.strength -= sword_strength;
            log_text("Sword Unequipped");
            stats();
        }
    }

    if (e.target.id === "shield") {
        if (items_inventory[shield_index] === 1) {
            items_inventory[shield_index] = 0;
            document.getElementById(`item3-number`).innerHTML = items_inventory[shield_index];

            player1.max_health += shield_defense;
            log_text("Shield Equipped");
            stats();
        }

        else {
            items_inventory[shield_index] = 1;
            document.getElementById(`item3-number`).innerHTML = items_inventory[shield_index];

            player1.max_health -= shield_defense;
            log_text("Shield Unequipped");
            stats();
        }
    }
}

function buyItem(e) {
    if (e.target.id === "potion-shop") {
        document.getElementById("potion-shop").disabled = true;
        document.getElementById("sword-shop").disabled = true;
        document.getElementById("shield-shop").disabled = true;

        document.getElementById("yes").disabled = true;
        document.getElementById("no").disabled = true;
        document.getElementById("next").disabled = false;

        if (player1.money >= potion_price) {
            log_text("\nYou bought a Health Potion !\n");
            player1.money -= potion_price;
            getItem(potion_index + 1);

            stats();
        }
        
        else {
            log_text("Oh no, you don't have enough Gold...");
        }
    }
    
    if (e.target.id === "sword-shop") {
        document.getElementById("potion-shop").disabled = true;
        document.getElementById("sword-shop").disabled = true;
        document.getElementById("shield-shop").disabled = true;

        document.getElementById("yes").disabled = true;
        document.getElementById("no").disabled = true;
        document.getElementById("next").disabled = false;

        if (!sword_found && player1.money >= sword_price) {
            log_text("\nYou bought a Sword !\n");
            player1.money -= sword_price;
            getItem(sword_index + 1);
            sword_found = true;

            stats();
        }

        else if (sword_found) {
            log_text("You already have a sword...");
        }
        
        else {
            log_text("Oh no, you don't have enough Gold...");
        }
    }

    if (e.target.id === "shield-shop") {
        document.getElementById("potion-shop").disabled = true;
        document.getElementById("sword-shop").disabled = true;
        document.getElementById("shield-shop").disabled = true;

        document.getElementById("yes").disabled = true;
        document.getElementById("no").disabled = true;
        document.getElementById("next").disabled = false;

        if (!shield_found && player1.money >= shield_price) {
            log_text("\nYou bought a Shield !\n");
            player1.money -= shield_price;
            getItem(shield_index + 1);
            shield_found = true;

            stats();
        }

        else if (shield_found) {
            log_text("You already have a shield...");
        }
        
        else {
            log_text("Oh no, you don't have enough Gold...");
        }

    }
}