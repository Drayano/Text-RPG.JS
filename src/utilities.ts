// Reset
function game_reset() {
    logs.innerHTML = "";
    //                      Name       HP       Strength       Speed
    player1 = new Character(player_name, base_hp, base_strength, base_speed, base_evasion);
    monster_reset();
    kills_number = 0;
    healing_cost = 10 + getRandomInt(15);
    health_gain = 0;

    stats();

    (document.getElementById("yes") as HTMLInputElement).disabled = false;
    (document.getElementById("no") as HTMLInputElement).disabled = false;
    (document.getElementById("next") as HTMLInputElement).disabled = true;

    (document.getElementById("item1") as HTMLElement).style.display = "none";
    (document.getElementById("item2") as HTMLElement).style.display = "none";
    (document.getElementById("item3") as HTMLElement).style.display = "none";

    (document.getElementById("potion-shop") as HTMLInputElement).style.display = "none";
    (document.getElementById("sword-shop") as HTMLInputElement).style.display = "none";
    (document.getElementById("shield-shop") as HTMLInputElement).style.display = "none";

    items_inventory = [0, 0, 0];

    encounter(player1, monster1);
}

function monster_reset() {
    monster1.monsterType(player1.level);
}

// Save and Load
function save_game() {
    player_profile = [
        {
            "name": player1.name,
            "health": player1.health,
            "strength": player1.strength,
            "speed": player1.speed,
            "evasion": player1.evasion,
            "experience": player1.experience,
            "money": player1.money,
            "level": player1.level,
            "max_health": player1.max_health,
            "items": items_inventory,
            "sword_found": sword_found,
            "shield_found": shield_found,
            "kills": kills_number,
        }
    ];

    localStorage.setItem(`${player1.name}`, JSON.stringify(player_profile))
    logs.innerHTML = "";
    log_text("Game Succesfully saved");

    (document.getElementById("yes") as HTMLInputElement).disabled = true;
    (document.getElementById("no") as HTMLInputElement).disabled = true;
    (document.getElementById("next") as HTMLInputElement).disabled = true;


    // Date format
    let today: Date = new Date();
    let dd: string = String(today.getDate()).padStart(2, '0');
    let mm: string = String(today.getMonth() + 1).padStart(2, '0'); // January is 0 !
    let yyyy: number = today.getFullYear();
    let time: string = today.getHours().toString() + today.getMinutes().toString() + today.getSeconds().toString();

    let current_time: string = yyyy + mm + dd + "-" + time;

    // Download JSON file on save
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(player_profile));
    let dlAnchorElem = document.getElementById('downloadJSON');
    (dlAnchorElem as HTMLElement).setAttribute("href",     dataStr     );
    (dlAnchorElem as HTMLElement).setAttribute("download", `${player_profile[0].name}-TextRPG-${current_time}.json`);
    (dlAnchorElem as HTMLElement).click();
}

function load_game() {
    if (localStorage.getItem(`${player1.name}`) === null) {
        return;
    }

    else {
        let item: any = localStorage.getItem(player1.name);
        player_profile = JSON.parse(item);

        player1.health = player_profile[0].health;
        player1.strength = player_profile[0].strength;
        player1.speed = player_profile[0].speed;
        player1.evasion = player_profile[0].evasion;
        player1.experience = player_profile[0].experience;
        player1.money = player_profile[0].money;
        player1.level = player_profile[0].level;
        player1.max_health = player_profile[0].max_health;
        items_inventory = player_profile[0].items;
        sword_found = player_profile[0].sword_found;
        shield_found = player_profile[0].shield_found;
        kills_number = player_profile[0].kills;

        logs.innerHTML = "";
        log_text("Game Succesfully loaded");

        (document.getElementById("yes") as HTMLInputElement).disabled = true;
        (document.getElementById("no") as HTMLInputElement).disabled = true;
        (document.getElementById("next") as HTMLInputElement).disabled = false;

        if (items_inventory[potion_index] === 0) {
            (document.getElementById("item1") as HTMLElement).style.display = "none";
        }

        else {
            (document.getElementById("item1") as HTMLElement).style.display = "block";
            (document.getElementById(`item1-number`) as HTMLElement).innerHTML = `${items_inventory[potion_index]}`;
        }

        if (sword_found || items_inventory[sword_index] > 0) {
            (document.getElementById("item2") as HTMLElement).style.display = "block";
            (document.getElementById(`item2-number`) as HTMLElement).innerHTML = `${items_inventory[sword_index]}`;
        }

        else {
            (document.getElementById("item2") as HTMLElement).style.display = "none";
        }
        
        if (shield_found || items_inventory[shield_index] > 0) {
            (document.getElementById("item3") as HTMLElement).style.display = "block";
            (document.getElementById(`item3-number`) as HTMLElement).innerHTML = `${items_inventory[shield_index]}`;
        }

        else {
            (document.getElementById("item3") as HTMLElement).style.display = "none";
        }

        (document.getElementById("potion-shop") as HTMLInputElement).style.display = "none";
        (document.getElementById("sword-shop") as HTMLInputElement).style.display = "none";
        (document.getElementById("shield_shop") as HTMLInputElement).style.display = "none";

        healing_cost = player1.level * 10 + 10 + getRandomInt(15);

        stats();
    }
}

function player_setup() {
    let item1: any = localStorage.getItem("Player Name");
    let item2: any = localStorage.getItem("item1");
    player_profile = JSON.parse("item2");
    // player_profile = JSON.parse(localStorage.getItem(localStorage.getItem("Player Name")));

    player1.name = player_profile[0].name;
    player1.health = player_profile[0].health;
    player1.strength = player_profile[0].strength;
    player1.speed = player_profile[0].speed;
    player1.evasion = player_profile[0].evasion;
    player1.experience = player_profile[0].experience;
    player1.money = player_profile[0].money;
    player1.level = player_profile[0].level;
    player1.max_health = player_profile[0].max_health;
    items_inventory = player_profile[0].items;
    sword_found = player_profile[0].sword_found;
    shield_found = player_profile[0].shield_found;
    kills_number = player_profile[0].kills;

    logs.innerHTML = "";
    log_text("Game Succesfully loaded");

    (document.getElementById("yes") as HTMLInputElement).disabled = true;
    (document.getElementById("no") as HTMLInputElement).disabled = true;
    (document.getElementById("next") as HTMLInputElement).disabled = false;

    if (items_inventory[potion_index] === 0) {
        (document.getElementById("item1") as HTMLElement).style.display = "none";
    }

    else {
        (document.getElementById("item1") as HTMLElement).style.display = "block";
        (document.getElementById(`item1-number`) as HTMLElement).innerHTML = `${items_inventory[potion_index]}`;
    }

    if (sword_found || items_inventory[sword_index] > 0) {
        (document.getElementById("item2") as HTMLElement).style.display = "block";
        (document.getElementById(`item2-number`) as HTMLElement).innerHTML = `${items_inventory[sword_index]}`;
    }

    else {
        (document.getElementById("item2") as HTMLElement).style.display = "none";
    }
    
    if (shield_found || items_inventory[shield_index] > 0) {
        (document.getElementById("item3") as HTMLElement).style.display = "block";
        (document.getElementById(`item3-number`) as HTMLElement).innerHTML = `${items_inventory[shield_index]}`;
    }

    else {
        (document.getElementById("item3") as HTMLElement).style.display = "none";
    }

    (document.getElementById("potion-shop") as HTMLInputElement).style.display = "none";
    (document.getElementById("sword-shop") as HTMLInputElement).style.display = "none";
    (document.getElementById("shield_shop") as HTMLInputElement).style.display = "none";

    healing_cost = player1.level * 10 + 10 + getRandomInt(15);
    stats();
};

// General
function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max) + 1;
}

function log_text(text: string): void {
    logs.innerHTML += text + "\n";
    logs.scrollTop = logs.scrollHeight;
}

function stats() {
    if (player1.health > player1.max_health) {
        player1.health = player1.max_health;
    }

    (player_stats as HTMLElement).innerHTML = `Name : ${player1.name}<br>Level : ${player1.level}<br>XP : ${player1.experience} / ${experience_array[player1.level - 1]}<br>HP : ${player1.health} / ${player1.max_health}<br>Strength : ${player1.strength}<br>Speed : ${player1.speed}<br>Evasion : ${player1.evasion}<br>Gold : ${player1.money}<br><br><br>Score : ${kills_number}`;
}