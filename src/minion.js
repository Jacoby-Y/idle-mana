let spell2_mult = 1;

const offline_earnings = ()=>{
    const now = Math.floor(Date.now()/1000);
    const diff = now - data.offline;
    
    let total = 0;
    if (diff > 5) {
        // console.log("earned offline!");
        for (let i = 0; i < minion_len; i++) {
            const add = (data[`minion${i}_lvl`] * data[`minion${i}_pow`]) * diff;
            const card_bonus = 1+(data.cards[`minion${i}`] * 0.05);
            total += add * card_bonus;
            if (isNaN(card_bonus) || isNaN(add)) console.log(`minion${i} is having problems!`);
        }
        if (data.mana + total > data.max_mana) data.mana = data.max_mana;
        else if (data.mana + total < data.max_mana) data.mana += total;
    }
    return total;
}

const idle_loop = setInterval(() => {
    const now = Math.round(Date.now()/1000);
    if (now - data.offline >= 10) {
        //: Needs testing for catching up with lost mana when off the tab.
        // console.log("ay, here's the mana you dropped, king");
    }
    // data.minion0_lvl * data.minion0_pow

    let total = 0;

    for (let i = 0; i < minion_len; i++) {
        const add = (data[`minion${i}_lvl`] * data[`minion${i}_pow`])/4;
        // const card_bonus =  (data.cards[`minion${i}`]>0)? data.cards[`minion${i}`] * 1.05 : 1;
        const card_bonus = 1+(data.cards[`minion${i}`] * 0.05)
        total += add * spell2_mult * card_bonus;
        if (isNaN(card_bonus) || isNaN(add)) console.log(`minion${i} is having problems!`);
    }

    data.per_sec = total;

    if (data.mana + total > data.max_mana) data.mana = data.max_mana;
    else if (data.mana + total < data.max_mana) data.mana += total;
    
    // console.log(total);
}, 250);

// clearInterval(idle_loop);