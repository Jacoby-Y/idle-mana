const loading = $("#loading");
let prest_cin = false;

data.prest_lvl = get_or("prest_lvl", 0); defaults.prest_lvl = 0; 
data.prest_cost = get_or("prest_cost", 10000);
data.last_max = get_or("last_max", 0); defaults.last_max = 0; 

const prestige_click = ()=>{
    console.log("prestiging!");
    if (data.max_mana < 10000) return;
    data.prest_cost += 5000;

    card_wrapper.style.opacity = "1";
    card_wrapper.style.pointerEvents = "auto";

    loading.style.opacity = "1";
    loading.style.transitionDuration = "1s, 3s";
    loading.style.transform = "translate(-50%, -50%) rotate(-720deg)";

    poppup_wrapper.innerHTML = "";
    poppup_wrapper.style.opacity = "0";

    if (menu_out) menu_btn.onclick();

    prest_cin = true;

    setTimeout(() => {
        if (data.last_max < data.max_mana) data.lapis += Math.floor(data.max_mana/400);
        else data.lapis += Math.floor(data.max_mana/1000);

        data.last_max = data.max_mana;
        
        do_prestige();

        card_wrapper.style.opacity = "0";
        card_wrapper.style.pointerEvents = "none";
        
        loading.style.opacity = "0";
        loading.style.transitionDuration = "1s, 0s";
        loading.style.transform = "translate(-50%, -50%) rotate(0deg)";

        prest_cin = false;
    }, 3000);
}
const do_prestige = ()=>{
    toggle_tip(false);

    spells[0].style.display = "none";
    spells[1].style.display = "none";
    spells[2].style.display = "none";
    // spells[3].style.display = "none";
    // spells[4].style.display = "none";

    for (const key in defaults) {
        if (Object.hasOwnProperty.call(defaults, key)) {
            const val = defaults[key];
            data[key] = val;
        }
    }

    local.store();
}