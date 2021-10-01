const mana_orb = $("#mana-orb");

data.settings = {
    mana: {display(v) {
        if (v >= data.max_mana) {
            mana_orb.style.border = "2px solid rgb(238, 89, 89)";
        } else {
            mana_orb.style.border = "none";
        }
        return `${Math.floor(v)} / ${data.max_mana}`;
    }},
    upgr1_lvl: {display: v => `${v}%`},
}

data.max_mana = get_or("max_mana", 1000);
data.mana = get_or("mana", 0);