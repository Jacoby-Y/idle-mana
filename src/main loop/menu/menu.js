// const menu_wrapper = $("#menu-wrapper");
// const menu_toggle = $("#menu-toggle");
// const points = $(".point");
// const poppup_wrapper = $("#poppup-wrapper");
// const upgrade_temp = $("#upgrade-temp");

const menu_wrapper = cui.get("#menu-wrapper");
const menu_toggle = cui.get("#menu-toggle");
const poppup_wrapper = cui.get("#poppup-wrapper");
const upgrade_temp = cui.get("#upgrade-temp");
const points = cui.get_all(".point");


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
const load_menu = (id)=>{ // Converted
    poppup_wrapper.abandon();
    poppup_wrapper.css("opacity", "1");

    for (let i = 0; i < $(`#${id}`).content.children.length; i++) {
        // console.log("loading elem to poppup");
        const elem = $(`#${id}`).content.children[i].cloneNode(true);
        poppup_wrapper.adopt(elem);
    }

    on_poppup_open[id]();

    local.update_gui(data, data);

    search_tip_attr();
}

const shown_points = ()=>{ // Converted
    let res = [];
    points.foreach( (elem, i, self)=>{
        const p = elem.elem;
        if (!p.hasAttribute("hide")) res.push(p);
    });

    return res;
}
const style_shown_points = ()=>{
    points.foreach( (elem, i, self)=>{
        const p = elem;
        if (p.elem.hasAttribute("hide")) {
            p.css("pointerEvents", "none");
            p.css("opacity", "0.4");
            p.css("cursor", "auto");
            p.css("backgroundColor", "black");
        } else {
            p.css("pointerEvents", "auto");
            p.css("opacity", "1");
            p.css("cursor", "pointer");
            p.css("backgroundColor", "aqua");
        }
    });
}
const set_points = ()=>{ // Converted
    menu_wrapper.css("transform", "translate(0%, -50%)");
    menu_toggle.css("right", `${menu_wrapper.width()}px`);

    style_shown_points();

    menu_out = true;
}
const clear_points = ()=>{ // Converted
    menu_wrapper.css("transform", "translate(100%, -50%)"); 
    menu_toggle.css("right", "0");

    poppup_wrapper.elem.innerHTML = "";
    poppup_wrapper.css("opacity", "0");

    menu_out = false;
}
const toggle_menu = ()=>{
    if (menu_out) clear_points();
    else set_points();
} 

const setup_menu_points = ()=>{
    const check_cards = ()=>{
        for (const key in data.cards) {
            if (Object.hasOwnProperty.call(data.cards, key)) {
                const val = data.cards[key];
                if (val > 0) return true;
            }
        }
        return false;
    }
    if (data.upgr4_lvl >= 2) {
        $("#minion-point").removeAttribute("hide");
    }
    if (data.minion5_lvl >= 1) {
        $("#spell-point").removeAttribute("hide");
        $("#lapis-point").removeAttribute("hide");
    } else if (data.prest_lvl > 0) {
        $("#lapis-point").removeAttribute("hide");
    }
    if (check_cards()) $("#card-inv-point").removeAttribute("hide");
    if (data.printer == true) $("#printer-point").removeAttribute("hide");
}
