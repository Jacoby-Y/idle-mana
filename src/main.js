const mana_orb = $("#mana-orb");

data.settings = {
    mana: {display(v) {
        return `${v} / ${data.max_mana}`;
    }},
    upgr1_lvl: {display: v => `${v}%`},
}

data.max_mana = get_or("max_mana", 1000);
data.mana = get_or("mana", 0);