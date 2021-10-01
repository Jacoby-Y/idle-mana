
const idle_loop = setInterval(() => {
    // data.minion0_lvl * data.minion0_pow

    for (let i = 0; i < minion_len; i++) {
        data.mana += (data[`minion${i}_lvl`] * data[`minion${i}_pow`])/4;
    }

}, 250);
clearInterval(idle_loop);