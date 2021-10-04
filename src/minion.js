let spell2_mult = 1;

const idle_loop = setInterval(() => {
    
    // data.minion0_lvl * data.minion0_pow

    let total = 0;

    for (let i = 0; i < minion_len; i++) {
        const add = (data[`minion${i}_lvl`] * data[`minion${i}_pow`])/4;
        // const card_bonus =  (data.cards[`minion${i}`]>0)? data.cards[`minion${i}`] * 1.05 : 1;
        const card_bonus = 1+(data.cards[`minion${i}`] * 0.05)
        total += add * spell2_mult * card_bonus;
        if (isNaN(card_bonus) || isNaN(add)) console.log(`minion${i} is having problems!`);
    }

    if (data.mana + total > data.max_mana) {
        data.mana = data.max_mana;
    } else if (data.mana + total < data.max_mana) {
        data.mana += total;
    }
    // console.log(total);
}, 250);

// clearInterval(idle_loop);