
document.body.onclick = (e)=>{
    if (e.target == document.body) {
        // poppup_wrapper.innerHTML = "";
        // poppup_wrapper.style.opacity = "0";

        // if (menu_out) menu_btn.onclick();
    }
}
window.onresize = ()=>{
    set_points(shown_points());
    set_spells();
}

const load_site = (url)=>{
    window.open(url, '_blank').focus();
}
// Save loop
const save_loop = setInterval(() => {
    // console.log("storing data");
    data.offline = Math.floor(Date.now()/1000);
    local.store();
}, 5000);

if (data.spell0) $(".spell")[0].style.display = "block";
if (data.spell1) $(".spell")[1].style.display = "block";
if (data.spell2) $(".spell")[2].style.display = "block";
// if (data.spell0) $(".spell")[0].style.display = "block";
// if (data.spell0) $(".spell")[0].style.display = "block";


let secret = "";
let debug = false;
document.addEventListener("keyup", (ev)=>{
    if (flipping_cards) {
        for (let i = 0; i < document.getElementsByClassName("flip-card").length; i++) {
            const fl = document.getElementsByClassName("flip-card")[i];
            fl.onclick();
        }
        return;
    }
    secret += ev.key;
    if (ev.key == "`" || secret.length > 10) secret = "";
    if (secret == "debug") { debug = true; secret = ""; console.log("Entering debug mode!"); }
    if (secret == "normal") { debug = false; secret = ""; console.log("Leaving debug mode!"); }
    if (window.location.hostname == "127.0.0.1" || debug) {
        if (ev.key == " ") {
            data.mana = data.max_mana;
        }
        else if (ev.key == "R") {
            localStorage.clear();
            window.location.reload();
        }
    }
})

search_tip_attr();
setup_menu_points();
style_shown_points();

// go_to_shop();