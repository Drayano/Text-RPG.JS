class Unit {
    constructor(health, strength, speed, experience = 0, money = 0, level = 1) {
        this.health = health;
        this.strength = strength;
        this.speed = speed;
        this.level = level;
        this.experience = experience;
        this.money = money;
    }

    takeDamage(strength) {
        this.health -= strength;
        // return this.health
    }
}

class Character extends Unit {
    constructor(name, health, strength, speed, experience = 0, money = 0, level = 1) {
        super(health, strength, speed, experience, money, level);
        this.name = name;
        this.max_health = base_hp;
    }

    levelUP() {
        while (this.experience >= experience_array[this.level - 1]) {
            this.experience -= experience_array[this.level - 1];
            this.level += 1;

            log_text(`${player1.name} has reached level ${player1.level} !`);

            // TODO : Find a better formula and print the stat gain
            health_gain = Math.floor(this.level * 2 + getRandomInt(5));
            this.strength += getRandomInt(5);
            this.speed += getRandomInt(4);
            this.health += health_gain;
            this.max_health += health_gain;
        }
    }

    gainXP(xp) {
        this.experience += xp;
    }

    gainMoney(money) {
        this.money += money;
    }

    heal(HP) {
        this.health += HP;
    }
}

class Monster extends Unit {
    constructor(health, strength, speed, experience, money = 0, level = 1, type = "Goblin") {
        super(health, strength, speed, experience, money, level);
        this.type = type;
    }

    monsterType(player_level) {
        if (player_level >= 3) {
            let random_number = getRandomInt(100);

            // 5% for a 2 level difference, 20% for a one level difference and 50% for the same level
            // Maybe make it slightly more common to find a lower level than a higher level ?
            if (random_number < 5) {
                this.level = player_level + 2;
            }

            else if (random_number < 10) {
                this.level = player_level - 2;
            }

            else if (random_number < 30) {
                this.level = player_level + 1;
            }

            else if (random_number < 50) {
                this.level = player_level - 1;
            }

            else if (random_number > 30) {
                this.level = player_level;
            }
        }

        else {
            this.level = 1;
        }

        // TODO : Try to find a better formula, this one should be good enough for testing
        if (getRandomInt(100) < 95) {
            this.type = "Goblin";
            this.health = Math.floor(this.level * 1.5 + (10 + getRandomInt(5)));
            this.strength = Math.floor(this.level * 0.8 + getRandomInt(5));
            this.speed = Math.floor(this.level * 2.2 + (15 + getRandomInt(8)));
            this.experience = Math.floor(this.level * 1.5 + (10 + getRandomInt(10)));
            this.money = Math.floor(this.level * 1.5 + getRandomInt(5));
        }
    
        else {
            this.type = "Ogre";
            this.health = Math.floor(this.level * 3 + (20 + getRandomInt(5)));
            this.strength = Math.floor(this.level * 3 + (5 + getRandomInt(5)));
            this.speed = Math.floor(this.level * 2 + getRandomInt(5));
            this.experience = Math.floor(this.level * 3 + (25 + getRandomInt(15)));
            this.money = Math.floor(this.level * 3 + getRandomInt(15));
        }
    }
}

// Grab Logs and Stats Elements
let logs = document.getElementById("gameLog");
let player_stats = document.getElementById("player-info");

// Actions Listeners
document.getElementById("yes").addEventListener("click", fight_decision);
document.getElementById("no").addEventListener("click", fight_decision);
document.getElementById("next").addEventListener("click", game_loop);
document.getElementById("reset").addEventListener("click", game_reset);

// Items Listeners
document.getElementById("potion").addEventListener("click", useItem);
document.getElementById("sword").addEventListener("click", useItem);
document.getElementById("shield").addEventListener("click", useItem);

document.getElementById("potion-shop").addEventListener("click", buyItem);
document.getElementById("sword-shop").addEventListener("click", buyItem);
document.getElementById("shield-shop").addEventListener("click", buyItem);

// Save and Load Listeners
document.getElementById("save").addEventListener("click", save_game);
document.getElementById("load").addEventListener("click", load_game);

// Initialize Player and Monster
let base_hp = 1000;
let base_strength = 5 + getRandomInt(5);
let base_speed = 7 + getRandomInt(8);

let player1 = new Character("Drayano", base_hp, base_strength, base_speed);
let monster1 = new Monster(0, 0, 0);


// Items Variables
// Potions / Sword / Shield
let items_inventory = [0, 0, 0];

// Items Positions
let potion_index = 0;
let sword_index = 1;
let shield_index = 2;

// Items Values
let potion_healing = 25;
let sword_strength = 10;
let shield_defense = 10;

// Items Prices
let potion_price = 10;
let sword_price = 20;
let shield_price = 20;

// Items Utilities Variables
let item_found = getRandomInt(3);
let sword_found = false;
let shield_found = false;


// Events Variables
// Event Values
let fight_event = 85;
let inn_event = fight_event + 5;
let item_event = inn_event + 5;
let item_shop_event = item_event + 5;

let random_event = 0;
let ambush_event = 0;


// Utilities Variables
let kills_number = 1;
let healing_cost = 10 + getRandomInt(15);
let health_gain = 0;
let player_profile = 0;

// Level-up Values
let experience_array = [];
for (let i = 1; i < 101; i++) {
    experience_array.push(i * 50);
}

game_reset();

// TODO : Find better formulas (leveled up stat gain, monster stats and exp etc...)
// TODO : Add more monsters types (dragon boss and other normal monsters)
// TODO : Save/load to JSON file locally
// TODO : Rework and add more texts to make the game more interesting