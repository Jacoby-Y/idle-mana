const poppup_wrapper = $("#poppup-wrapper");
const upgrade_temp = $("#upgrade-temp");

const menu_funcs = {};
const check_funcs = {};

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