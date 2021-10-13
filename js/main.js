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
    }

    levelUP() {
        while (this.experience >= experience_array[this.level - 1]) {
            this.experience -= experience_array[this.level - 1];
            this.level += 1;

            log_text(`${player1.name} has reached level ${player1.level} !`);

            // TODO : Find a better formula and print the stat gain
            health_gain = this.level * getRandomInt(5);
            this.strength += this.level * getRandomInt(5);
            this.speed += this.level * getRandomInt(5);
            this.health += health_gain;
            max_health += health_gain;
        }
    }

    gainXP(xp) {
        this.experience += xp;
    }

    gainMoney(money) {
        this.money += money;
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
            this.health = this.level * (10 + getRandomInt(5));
            this.strength = this.level * getRandomInt(5);
            this.speed = this.level * (10 + getRandomInt(15));
            this.experience = this.level * (10 + getRandomInt(10));
            this.money = this.level * getRandomInt(5);
        }
    
        else {
            this.type = "Ogre";
            this.health = this.level * (20 + getRandomInt(5));
            this.strength = this.level * (5 + getRandomInt(5));
            this.speed = this.level * getRandomInt(7);
            this.experience = this.level * (25 + getRandomInt(15));
            this.money = this.level * getRandomInt(15);
        }
    }
}

let logs = document.getElementById("gameLog");
let player_stats = document.getElementById("player-info");
document.getElementById("yes").addEventListener("click", fight_decision);
document.getElementById("no").addEventListener("click", fight_decision);
document.getElementById("next").addEventListener("click", game_loop);
document.getElementById("reset").addEventListener("click", game_reset);

let player1 = new Character("Drayano", 100, 5 + getRandomInt(5), 10 + getRandomInt(20));
let monster1 = new Monster(15, getRandomInt(5), getRandomInt(50));

let kills_number = 1;
let experience_array = [];
let max_health = 100;
let random_event = getRandomInt(100);
let healing_cost = 10 + getRandomInt(15);
let health_gain = 0;

for (let i = 1; i < 101; i++) {
    experience_array.push(i * 50);
}

game_reset();

// TODO : Add random events
// TODO : You find a shop/inn Event
// TODO : Add healing (eg : Inn that charges some money to fully regen HP)
// TODO : Add Items (eg : Healing potions) with Inventory system
// TODO : Add a way to find items (item event in the wild and shop that sells them)
// TODO : Monsters ambush event
// TODO : Find better formulas (leveled up stat gain, monster stats and exp etc...)