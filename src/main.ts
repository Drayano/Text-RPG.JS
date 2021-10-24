class Unit {
    health: number;
    strength: number;
    speed: number;
    evasion: number;
    level: number;
    experience: number;
    money: number;

    constructor(health: number, strength: number, speed: number, evasion: number, experience: number = 0, money: number = 0, level: number = 1) {
        this.health = health;
        this.strength = strength;
        this.speed = speed;
        this.evasion = evasion;
        this.level = level;
        this.experience = experience;
        this.money = money;
    }

    takeDamage(strength: number): void {
        this.health -= strength;
        // return this.health
    }
}

class Character extends Unit {
    name: string;
    max_health: number;

    constructor(name: string, health: number, strength: number, speed: number, evasion: number, experience: number = 0, money: number = 0, level: number = 1) {
        super(health, strength, speed, evasion, experience, money, level);
        this.name = name;
        this.max_health = base_hp;
    }

    levelUP(): void {
        while (this.experience >= experience_array[this.level - 1]) {
            this.experience -= experience_array[this.level - 1];
            this.level += 1;

            log_text(`${player1.name} has reached level ${player1.level} !`);

            health_gain = Math.floor(this.level * 2 + 5 + getRandomInt(5));
            this.strength += getRandomInt(5);
            this.speed += getRandomInt(4);
            this.evasion = this.level * 7 + 8 + getRandomInt(5);
            this.health += health_gain;
            this.max_health += health_gain;
        }
    }

    gainXP(xp: number): void {
        this.experience += xp;
    }

    gainMoney(money: number): void {
        this.money += money;
    }

    heal(HP: number): void {
        this.health += HP;
    }
}

class Monster extends Unit {
    type: string;

    constructor(health: number = 10, strength: number = 10, speed: number = 10, evasion: number = 10, experience: number = 10, money: number = 0, level: number = 1, type: string = "Goblin") {
        super(health, strength, speed, evasion, experience, money, level);
        this.type = type;
    }

    monsterType(player_level: number): void {
        if (player_level >= 3) {
            let random_number: number = getRandomInt(100);

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

        if (getRandomInt(100) < 85) {
            this.type = "Goblin";
            this.health = Math.floor(this.level * 1.25 + (10 + getRandomInt(5)));
            this.strength = Math.floor(this.level * 0.8 + getRandomInt(5));
            this.speed = Math.floor(this.level * 2.75 + (15 + getRandomInt(8)));
            this.evasion = Math.floor(this.level * 5 + 25 + getRandomInt(5));
            this.experience = Math.floor(this.level * 7 + (10 + getRandomInt(10)));
            this.money = Math.floor(this.level * 4 + 5 + getRandomInt(5));
        }
    
        else {
            this.type = "Ogre";
            this.health = Math.floor(this.level * 9 + (25 + getRandomInt(10)));
            this.strength = Math.floor(this.level * 2.2 + (5 + getRandomInt(8)));
            this.speed = Math.floor(this.level * 0.85 + 5 + getRandomInt(5));
            this.evasion = Math.floor(this.level * 8 + 1);
            this.experience = Math.floor(this.level * 12 + (25 + getRandomInt(15)));
            this.money = Math.floor(this.level * 5 + 10 + getRandomInt(10));
        }
    }
}

// Grab Logs and Stats Elements
let logs = document.getElementById("gameLog") as HTMLTextAreaElement;
let player_stats = document.getElementById("player-info");

// Actions Listeners
(document.getElementById("yes") as HTMLInputElement).addEventListener("click", fight_decision);
(document.getElementById("no") as HTMLInputElement).addEventListener("click", fight_decision);
(document.getElementById("next") as HTMLInputElement).addEventListener("click", game_loop);
(document.getElementById("reset") as HTMLInputElement).addEventListener("click", game_reset);

// Items Listeners
(document.getElementById("potion") as HTMLInputElement).addEventListener("click", useItem);
(document.getElementById("sword") as HTMLInputElement).addEventListener("click", useItem);
(document.getElementById("shield") as HTMLInputElement).addEventListener("click", useItem);

(document.getElementById("potion-shop") as HTMLInputElement).addEventListener("click", buyItem);
(document.getElementById("sword-shop") as HTMLInputElement).addEventListener("click", buyItem);
(document.getElementById("shield-shop") as HTMLInputElement).addEventListener("click", buyItem);

// Save and Load Listeners
(document.getElementById("save") as HTMLInputElement).addEventListener("click", save_game);
(document.getElementById("load") as HTMLInputElement).addEventListener("click", load_game);

// Initialize Player and Monster
let player_name: string = `${localStorage.getItem("Player Name")}`;

let base_hp: number = 100;
let base_strength: number = 5 + getRandomInt(5);
let base_speed: number = 7 + getRandomInt(8);
let base_evasion: number = 10 + getRandomInt(10);

let player1 = new Character(player_name, base_hp, base_strength, base_speed, base_evasion);
let monster1 = new Monster();


// Items Variables
// Potions / Sword / Shield
let items_inventory: number[] = [0, 0, 0];

// Items Positions
let potion_index: number = 0;
let sword_index: number = 1;
let shield_index: number = 2;

// Items Values
let potion_healing: number = 50;
let sword_strength: number = 25;
let shield_defense: number = 25;

// Items Prices
let potion_price: number = 35;
let sword_price: number = 50;
let shield_price: number = 50;

// Items Utilities Variables
let item_found: number = getRandomInt(3);
let sword_found: boolean = false;
let shield_found: boolean = false;


// Events Variables
// Event Values
let fight_event: number = 85;
let inn_event: number = fight_event + 5;
let item_event: number = inn_event + 5;
let item_shop_event: number = item_event + 5;

let random_event: number = 0;
let ambush_event: number = 0;


// Utilities Variables
let kills_number: number = 0;
let healing_cost: number = 10 + getRandomInt(15);
let health_gain: number = 0;
let player_profile: any;

// Level-up Values
let experience_array: number[] = [];
for (let i = 1; i <= 100; i++) {
    experience_array.push(i * 50);
}

game_reset();
player_name = `${localStorage.getItem("Player Name")}`;

if (player_name == "null") {
    player_setup();
}

// TODO : Lower Goblin chances of appearing depending on player level
// TODO : Add more monsters types (dragon boss and other normal monsters)
// TODO : Add more texts to make the game more interesting
// TODO : Make the website look better (index.html) (game.html : some light touches) (and add media queries for mobile)