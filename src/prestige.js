const loading = $("#loading");
let prest_cin = false;

data.prest_lvl = get_or("prest_lvl", 0); defaults.prest_lvl = 0; 
data.prest_cost = get_or("prest_cost", 10000);
data.last_max = get_or("last_max", 0); defaults.last_max = 0; 

const prestige_click = ()=>{
    console.log("prestiging!");
    if (data.max_mana < 10000 || data.mana < data.max_mana) return;
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
        if (data.last_max < data.max_mana) {
            data.lapis += Math.floor(data.max_mana/10000);
        } else {
            data.lapis += Math.ceil(data.upgr1_lvl/5);
        }
        
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

    for (const key in defaults) {
        if (Object.hasOwnProperty.call(defaults, key)) {
            const val = defaults[key];
            data[key] = val;
        }
    }

    local.store();
}