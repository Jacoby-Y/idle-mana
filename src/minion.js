let spell2_mult = 1;

const idle_loop = setInterval(() => {
    // data.minion0_lvl * data.minion0_pow

    let total = 0;

    for (let i = 0; i < minion_len; i++) {
        const add = (data[`minion${i}_lvl`] * data[`minion${i}_pow`])/4;
        total += add * spell2_mult;
    }

    if (data.mana + total > data.max_mana) {
        data.mana = data.max_mana;
    } else if (data.mana + total < data.max_mana) {
        data.mana += total;
    }
}, 250);

// clearInterval(idle_loop);