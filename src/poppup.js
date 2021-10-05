const poppup_wrapper = $("#poppup-wrapper");
const upgrade_temp = $("#upgrade-temp");

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
}