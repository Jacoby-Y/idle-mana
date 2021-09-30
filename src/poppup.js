const poppup_wrapper = $("#poppup-wrapper");
const upgrade_temp = $("#upgrade-temp");
const tip = $("#tip");
const tip_txt = $("#tip-txt");
// console.log(upgrade_temp.content.children);

let tip_out = false;

const tip_texts = [
    ()=>`Ay, you got ${mana} mana!\nKinda epic`,
    ()=>`and... this is another tool tip!`,
]

const load_menu = (id)=>{
    while (poppup_wrapper.firstChild) {
        poppup_wrapper.removeChild(poppup_wrapper.firstChild);
    } 
    poppup_wrapper.style.opacity = "1";
    for (let i = 0; i < $(`#${id}`).content.children.length; i++) {
        console.log("loading elem to poppup");
        const elem = $(`#${id}`).content.children[i].cloneNode(true);
        poppup_wrapper.appendChild(elem);
    }
}
const set_tip = (txt)=>{
    if (!tip_out) tip.style.transform = "translate(0, 0)";
    if (txt[0] == "#") {
        const num = Number(txt.slice(1));
        tip_txt.innerText = tip_texts[num]();
    } else {
        tip_txt.innerText = txt;
    }
}
const toggle_tip = (bool)=>{
    if (bool) {
        tip.style.transform = "translate(0, 0)";
    } else {
        tip.style.transform = "translate(0, -100%)";
    }
    tip_out = bool;
}

document.body.onclick = (e)=>{
    if (e.target == document.body) {
        poppup_wrapper.innerHTML = "";
        poppup_wrapper.style.opacity = "0";
    }
}