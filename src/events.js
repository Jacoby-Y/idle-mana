const mana_txt = $("#mana-txt");
const mana_orb = $("#mana-orb");
const holding_bar = $("#holding-bar");
const holding_wrapper = $("#holding-wrapper");

const mouse = {
    holding_orb: false
}
let hold_idle = false;
let idle_speed = 500;
let block_idle = false;

mana_orb.onclick = ()=>{
    mana++;
    mana_txt.innerText = `Mana: ${mana}`;
}
mana_orb.onmousedown = ()=>{
    // console.log("mana_orb mousedown");

    mouse.holding_orb = true;
    setTimeout(() => {
        // console.log("mana_orb mousedown, timeout");
        if (mouse.holding_orb) {
            // console.log("mana_orb mousedown, timeout, mouse.holding_orb = true");
            holding_wrapper.style.opacity = "1";
            run_idle_bar();
        }
    }, 1000);
}
document.onmouseup = ()=>{ 
    mouse.holding_orb = false;
    holding_wrapper.style.opacity = "0";
    holding_bar.style.transitionDuration = "1s";
    holding_bar.style.width = "20%";
    block_idle = true;
    setTimeout(() => { block_idle = false }, 1000);
}

const run_idle_bar = ()=>{
    if (block_idle) return;
    // console.log("run_idle_bar!");
    holding_bar.style.transitionDuration = "0.5s";
    holding_bar.style.width = "100%";
    setTimeout(() => {
        console.log("run_idle_bar, timed out");
        holding_bar.style.transitionDuration = "0s";
        holding_bar.style.width = "20%";
        mana++; mana_txt.innerText = `Mana: ${mana}`;
        if (mouse.holding_orb) {
            setTimeout(() => { run_idle_bar() }, 50);
        }
    }, 450);
}