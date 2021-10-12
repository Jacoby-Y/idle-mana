const loading = cui.get("#loading");
let prest_cin = false;

data.prest_lvl = get_or("prest_lvl", 0); 
data.prest_cost = get_or("prest_cost", 2000000);
data.last_max = get_or("last_max", 0); 

const prestige_click = (debug=false)=>{
    if (data.max_mana < data.prest_cost && !debug) return;
    data.prest_cost += 1000000;
    // console.log("prestiging!");

    $("#card-tip").style.opacity = "0";

    new CuiItem(card_wrapper).css("opacity", "1");
    new CuiItem(card_wrapper).css("pointerEvents", "auto");

    loading.css("opacity", "1");
    loading.css("transitionDuration", "1s, 3s");
    loading.css("transform", "translate(-50%, -50%) rotate(-720deg)");

    poppup_wrapper.elem.innerHTML = "";
    poppup_wrapper.css("opacity", "0");

    // if (menu_out) menu_btn.onclick();
    if (menu_out) clear_points();

    prest_cin = true;
    if (debug) return;
    setTimeout(() => {
        if (data.last_max < data.max_mana) data.lapis += Math.floor(data.max_mana/100000);
        else data.lapis += Math.floor(data.max_mana/500000);

        data.last_max = data.max_mana;
        
        do_prestige();

        new CuiItem(card_wrapper).css("opacity", "0");
        new CuiItem(card_wrapper).css("pointerEvents", "none");
        
        loading.css("opacity", "0");
        loading.css("transitionDuration", "1s, 0s");
        loading.css("transform", "translate(-50%, -50%) rotate(0deg)");

        prest_cin = false;
    }, 3000);
}
const do_prestige = ()=>{
    toggle_tip(false);

    data.prest_lvl++;

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

    $("#minion-point").setAttribute("hide", "");
    $("#spell-point").setAttribute("hide", "");

    local.store();
    setup_menu_points();
}