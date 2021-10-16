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

            if (player1.health === player1.max_health) {
                return;
            }

            else if (player1.max_health - player1.health >= potion_healing) {
                healed = 25;
                player1.heal(25);  
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
            stats();
        }

        else {
            items_inventory[sword_index] = 1;
            document.getElementById(`item2-number`).innerHTML = items_inventory[sword_index];

            player1.strength -= sword_strength;
            stats();
        }
    }

    if (e.target.id === "shield") {
        if (items_inventory[shield_index] === 1) {
            items_inventory[shield_index] = 0;
            document.getElementById(`item3-number`).innerHTML = items_inventory[shield_index];

            player1.max_health += shield_defense;
            stats();
        }

        else {
            items_inventory[shield_index] = 1;
            document.getElementById(`item3-number`).innerHTML = items_inventory[shield_index];

            player1.max_health -= shield_defense;
            stats();
        }
    }
}