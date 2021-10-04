const mana_txt = $("#mana-txt");
// const mana_orb = $("#mana-orb");
const holding_bar = $("#holding-bar");
const holding_wrapper = $("#holding-wrapper");

const mouse = {
    holding_orb: false,
    when_down: 0
}
let hold_idle = false;
data.hold_time = get_or("hold_time", 1000); defaults.hold_time = 1000; 
let block_idle = false;
let spell0_mult = 1;
let spell1_mult = 1;

mana_orb.onmousedown = ()=>{
    mouse.holding_orb = true;

    if (data.mana + data.upgr0_lvl <= data.max_mana){
        const card_bonus = 1+(data.cards.upgr0 * 0.05);
        data.mana += data.upgr0_lvl * spell0_mult * card_bonus;
    }
    else data.mana = data.max_mana;

    let chance = data.upgr1_lvl
    while (chance > 0) {
        const rand = Math.floor(Math.random() * (101 - 1) + 1);
        if (rand <= chance) {
            data.mana += (data.upgr0_lvl * 2) * (1+(data.cards.upgr1 * 0.25));
            chance -= 100;
            continue;
        }
        break;
    }
    

    mouse.when_down = Date.now();
    setTimeout(() => {
        // console.log("mana_orb mousedown, timeout");
        if (mouse.holding_orb && Date.now() - mouse.when_down >= 1000) {
            // console.log("mana_orb mousedown, timeout, if=true");
            holding_wrapper.style.opacity = "1";
            block_idle = false;
            run_idle_bar();
        }
    }, 1000);
}
document.onmouseup = ()=>{ 
    mouse.holding_orb = false;
    block_idle = true;
    holding_wrapper.style.opacity = "0";
    holding_bar.style.transitionDuration = "0.5s";
    holding_bar.style.width = "20%";
    setTimeout(() => { block_idle = false }, 2000);
}

const run_idle_bar = ()=>{
    if (block_idle) return;
    // console.log("run_idle_bar!");
    holding_bar.style.transitionDuration = `${data.hold_time/1000}s`;
    holding_bar.style.width = "100%";
    setTimeout(() => {
        // console.log("run_idle_bar, timed out");
        holding_bar.style.transitionDuration = "0s";
        holding_bar.style.width = "20%";
        // data.mana += data.upgr2_lvl;
        if (data.mana + data.upgr2_lvl <= data.max_mana)
            data.mana += data.upgr2_lvl * spell1_mult * (1+(data.cards.upgr2 * 0.05));
        else data.mana = data.max_mana;

        const rand = Math.floor(Math.random() * (101 - 1) + 1);
        if (rand <= data.cards.upgr3) {
            data.mana += data.upgr2_lvl*2;
        }

        if (mouse.holding_orb) {
            setTimeout(() => { run_idle_bar() }, 50);
        }
    }, data.hold_time-50);
}