"use strict";
document.getElementById("submit").addEventListener("click", save_name);
document.getElementById("importJSON").addEventListener("click", register_name);
function save_name() {
    if (document.getElementById("player-name").value === "") {
        document.getElementById("player-name").value = "player";
    }
    localStorage.setItem("Player Name", document.getElementById("player-name").value);
}
function register_name() {
    let files = document.getElementById('selectFiles').files;
    if (files === null || files.length <= 0) {
        return false;
    }
    let fr = new FileReader();
    let player_profile;
    fr.onload = function (e) {
        let result = JSON.parse(e.target.result);
        player_profile = result;
        document.getElementById("player-name").value = player_profile[0].name;
        localStorage.setItem(player_profile[0].name, JSON.stringify(player_profile));
    };
    // fr.readAsText(files.item(0));
    // TODO : FIX THIS LATER
    fr.readAsText(files.item(0));
    return true;
}
