//#region //> mana_orb.js
// const mana_txt = $("#mana-txt");
// const holding_bar = $("#holding-bar");
// const holding_wrapper = $("#holding-wrapper");

// const mouse = {
//     holding_orb: false,
//     when_down: 0
// }
// let hold_idle = false;
// data.hold_time = get_or("hold_time", 1000); defaults.hold_time = 1000; 
// let block_idle = false;
// let spell0_mult = 1;
// let spell1_mult = 1;

// mana_orb.onmousedown = ()=>{
//     mouse.holding_orb = true;

//     if (data.mana + data.upgr0_lvl <= data.max_mana){
//         const card_bonus = 1+(data.cards.upgr0 * 0.05);
//         data.mana += data.upgr0_lvl * spell0_mult * card_bonus;
//     }
//     else data.mana = data.max_mana;

//     let chance = data.upgr1_lvl
//     while (chance > 0) {
//         const rand = Math.floor(Math.random() * (101 - 1) + 1);
//         if (rand <= chance) {
//             data.mana += (data.upgr0_lvl * 2) * (1+(data.cards.upgr1 * 0.25));
//             chance -= 100;
//             continue;
//         }
//         break;
//     }
    

//     mouse.when_down = Date.now();
//     setTimeout(() => {
//         // console.log("mana_orb mousedown, timeout");
//         if (mouse.holding_orb && Date.now() - mouse.when_down >= 1000) {
//             // console.log("mana_orb mousedown, timeout, if=true");
//             holding_wrapper.style.opacity = "1";
//             block_idle = false;
//             run_idle_bar();
//         }
//     }, 1000);
// }
// document.onmouseup = ()=>{ 
//     mouse.holding_orb = false;
//     block_idle = true;
//     holding_wrapper.style.opacity = "0";
//     holding_bar.style.transitionDuration = "0.5s";
//     holding_bar.style.width = "20%";
//     setTimeout(() => { block_idle = false }, 2000);
// }

// const run_idle_bar = ()=>{
//     if (block_idle) return;
//     // console.log("run_idle_bar!");
//     holding_bar.style.transitionDuration = `${data.hold_time/1000}s`;
//     holding_bar.style.width = "100%";
//     setTimeout(() => {
//         // console.log("run_idle_bar, timed out");
//         holding_bar.style.transitionDuration = "0s";
//         holding_bar.style.width = "20%";
//         // data.mana += data.upgr2_lvl;
//         if (data.mana + data.upgr2_lvl <= data.max_mana)
//             data.mana += data.upgr2_lvl * spell1_mult * (1+(data.cards.upgr2 * 0.05));
//         else data.mana = data.max_mana;

//         const rand = Math.floor(Math.random() * (101 - 1) + 1);
//         if (rand <= data.cards.upgr3) {
//             data.mana += data.upgr2_lvl*2;
//         }

//         if (mouse.holding_orb) {
//             setTimeout(() => { run_idle_bar() }, 50);
//         }
//     }, data.hold_time-50);
// }
//#endregion

//#region //> menu.js
// const circ_menu = $("#circ-menu");
/*
const menu_wrapper = $("#menu-wrapper");
const menu_toggle = $("#menu-toggle");
const points = $(".point");
const poppup_wrapper = $("#poppup-wrapper");
const upgrade_temp = $("#upgrade-temp");

let menu_out = false;

const menu_funcs = {};
const check_funcs = {};

const on_poppup_open = {
    "upgrade-temp": ()=>{
        const upgr_btns = $(".upgr-btn");
        if (data.upgr0_lvl >= 10) upgr_btns[1].style.display = "block"; 
        if (data.upgr1_lvl >= 10) upgr_btns[2].style.display = "block"; 
        if (data.upgr2_lvl >= 10) upgr_btns[3].style.display = "block"; 
        if (data.upgr3_lvl >= 10) upgr_btns[4].style.display = "block"; 
        if (data.upgr4_lvl >= 2) { $("#minion-point").removeAttribute("hide") }
    },
    "minion-temp": ()=>{
        const minion_btns = $(".minion-btn");
        if (data.minion0_lvl >= 25) minion_btns[1].style.display = "block"; 
        if (data.minion1_lvl >= 25) minion_btns[2].style.display = "block"; 
        if (data.minion2_lvl >= 25) minion_btns[3].style.display = "block"; 
        if (data.minion3_lvl >= 25) minion_btns[4].style.display = "block"; 
        if (data.minion4_lvl >= 25) minion_btns[5].style.display = "block"; 
        if (data.minion5_lvl >= 1) { $("#spell-point").removeAttribute("hide"); $("#lapis-point").removeAttribute("hide") }
    },
    "spells-temp": ()=>{
        const spell_btns = $(".spell-btn");
        if (data.spell0) spell_btns[1].style.display = "block"; 
        if (data.spell1) spell_btns[2].style.display = "block"; 
        // if (data.spell2) spell_btns[3].style.display = "block"; 
        // if (data.spell3) spell_btns[4].style.display = "block"; 
        // if (data.spell4) spell_btns[5].style.display = "block"; 
        // if (data.spell5 >= 1) { $("#spell-point").removeAttribute("hide"); $("#lapis-point").removeAttribute("hide") }
    },
    "lapis-shop-temp": ()=>{}
}

const load_menu = (id)=>{
    while (poppup_wrapper.firstChild) {
        poppup_wrapper.removeChild(poppup_wrapper.firstChild);
    } 
    poppup_wrapper.style.opacity = "1";
    for (let i = 0; i < $(`#${id}`).content.children.length; i++) {
        // console.log("loading elem to poppup");
        const elem = $(`#${id}`).content.children[i].cloneNode(true);
        poppup_wrapper.appendChild(elem);
    }

    on_poppup_open[id]();

    local.update_gui(data, data);

    search_tip_attr();
}

const shown_points = ()=>{
    let res = [];
    for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (!p.hasAttribute("hide")) res.push(p);
    }
    return res;
}
const set_points = ()=>{
    menu_wrapper.style.transform = "translate(0%, -50%)";
    menu_toggle.style.right = `${menu_wrapper.clientWidth}px`;

    for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (p.hasAttribute("hide")) {
            p.style.pointerEvents = "none";
            p.style.opacity = "0.4";
            p.style.cursor = "auto";
            p.style.backgroundColor = "black";
        } else {
            p.style.pointerEvents = "auto";
            p.style.opacity = "1";
            p.style.cursor = "pointer";
            p.style.backgroundColor = "aqua";
        }
    }

    menu_out = true;
}
const clear_points = ()=>{
    menu_wrapper.style.transform = "translate(100%, -50%)"; 
    menu_toggle.style.right = "0";

    poppup_wrapper.innerHTML = "";
    poppup_wrapper.style.opacity = "0";

    menu_out = false;
}
const toggle_menu = ()=>{
    if (menu_out) clear_points();
    else set_points();
} 
*/
//#endregion

