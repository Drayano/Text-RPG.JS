(document.getElementById("submit") as HTMLInputElement).addEventListener("click", save_name);
(document.getElementById("importJSON") as HTMLInputElement).addEventListener("click", register_name);

function save_name(): void {
    if ((document.getElementById("player-name") as HTMLInputElement).value === "") {
        (document.getElementById("player-name") as HTMLInputElement).value = "player";
    }

    localStorage.setItem("Player Name", (document.getElementById("player-name") as HTMLInputElement).value);
}

function register_name(): boolean {
    let files = (document.getElementById('selectFiles') as HTMLInputElement).files;

    if (files === null || files.length <= 0) {
        return false;
    }

    let fr = new FileReader();
    let player_profile;

    fr.onload = function(e: any) {
        let result = JSON.parse(e.target.result);
        player_profile = result;

        (document.getElementById("player-name") as HTMLInputElement).value = player_profile[0].name;
        localStorage.setItem(player_profile[0].name, JSON.stringify(player_profile));
    }

    // fr.readAsText(files.item(0));
    // TODO : FIX THIS LATER
    fr.readAsText(files.item(0)!);

    return true;
}