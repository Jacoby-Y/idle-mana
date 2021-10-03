const poppup_wrapper = $("#poppup-wrapper");
const upgrade_temp = $("#upgrade-temp");
const tip = $("#tip");
const tip_txt = $("#tip-txt");

const menu_funcs = {};
const check_funcs = {};

let tip_out = false;

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

    local.update_gui(data, data);
}
const set_tip = (txt)=>{
    if (!tip_out) tip.style.transform = "translate(0, 0)";
    tip_txt.innerText = txt;
}
const toggle_tip = (bool=false)=>{
    if (bool) {
        tip.style.transform = "translate(0, 0)";
    } else {
        tip.style.transform = "translate(0, -100%)";
    }
    tip_out = bool;
}