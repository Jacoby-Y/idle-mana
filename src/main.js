data.settings = {
    mana: {display: v => `${v} / ${data.max_mana}`},
}

data.max_mana = get_or("max_mana", 1000);
data.mana = get_or("mana", 0);