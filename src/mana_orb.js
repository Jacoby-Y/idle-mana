const mana_txt = $("#mana-txt");
const mana_orb = $("#mana-orb");
const holding_bar = $("#holding-bar");
const holding_wrapper = $("#holding-wrapper");

const mouse = {
    holding_orb: false,
    when_down: 0
}
let hold_idle = false;
let idle_speed = 500;
let block_idle = false;

mana_orb.onmousedown = ()=>{
    mouse.holding_orb = true;
    data.mana++;
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
    holding_bar.style.transitionDuration = "0.5s";
    holding_bar.style.width = "100%";
    setTimeout(() => {
        // console.log("run_idle_bar, timed out");
        holding_bar.style.transitionDuration = "0s";
        holding_bar.style.width = "20%";
        data.mana++;
        if (mouse.holding_orb) {
            setTimeout(() => { run_idle_bar() }, 50);
        }
    }, 450);
}