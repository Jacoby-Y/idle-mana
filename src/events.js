const VERSION = "v0.7.3";

document.body.onclick = (e)=>{
    if (e.target == document.body) {
        poppup_wrapper.innerHTML = "";
        poppup_wrapper.style.opacity = "0";

        if (menu_out) menu_btn.onclick();
    }
}
window.onresize = ()=>{
    set_points(shown_points());
    set_spells();
}
const run_timeline = (tl, i=0, sec=true)=>{
    setTimeout(() => {
        tl[i].run();
        if (i+1 >= tl.length) return;
        run_timeline(tl, i+1)
    }, (sec)? tl[i].time*1000 : tl[i].time);
}
const new_time_point = (run, time)=>{
    return { run: run, time: time  };
}
const do_cine = ()=>{
    // console.log("running cinematic");
    cine.style.pointerEvents = "auto";
    const timeline = [
        new_time_point(()=>{
            cine_txt[1].style.opacity = "1";
            cine_txt[1].children[0].style.opacity = "1";
        }, 2),
        new_time_point(()=>{ cine_txt[1].children[1].style.opacity = "1";}, 0.1),
        new_time_point(()=>{ cine_txt[1].children[2].style.opacity = "1";}, 0.1),
        new_time_point(()=>{ cine_txt[1].children[0].style.opacity = "0";}, 2),
        new_time_point(()=>{ cine_txt[1].children[1].style.opacity = "0";}, 0.1),
        new_time_point(()=>{ cine_txt[1].children[2].style.opacity = "0";}, 0.1),

        // Show 3rd h3. show "An"
        new_time_point(()=>{ cine_txt[2].style.opacity = "1"; cine_txt[2].children[0].style.opacity = "1";}, 1),
        // show "idle"
        new_time_point(()=>{ cine_txt[2].children[1].style.opacity = "1";}, 0.1),
        // show "game"
        new_time_point(()=>{ cine_txt[2].children[2].style.opacity = "1";}, 0.1),
        new_time_point(()=>{ cine_txt[2].style.opacity = "0";}, 1),

        // show "about"
        new_time_point(()=>{ cine_txt[2].style.opacity = "1"; cine_txt[2].children[4].style.opacity = "1";}, 1),
        // show "magic"
        new_time_point(()=>{ cine_txt[2].children[5].style.opacity = "1";}, 0.1),
        new_time_point(()=>{ cine_txt[2].style.opacity = "0";}, 1.33),
        
        // show "that"
        new_time_point(()=>{ cine_txt[2].style.opacity = "1"; cine_txt[2].children[7].style.opacity = "1";}, 1),
        // show "works"
        new_time_point(()=>{ cine_txt[2].children[8].style.opacity = "1";}, 0.1),
        new_time_point(()=>{ cine_txt[2].style.opacity = "0";}, 1.66),
        
        // show "I"
        new_time_point(()=>{ cine_txt[2].style.opacity = "1"; cine_txt[2].children[10].style.opacity = "1";}, 1),
        // show "think"
        new_time_point(()=>{ cine_txt[2].children[11].style.opacity = "1";}, 0.1),
        // show "?"
        new_time_point(()=>{ cine_txt[2].children[12].style.opacity = "1";}, 1),
        new_time_point(()=>{ cine_txt[2].style.opacity = "0";}, 1),
        // close it off
        new_time_point(()=>{ 
            cine.style.opacity = "0"; 
            for (let i = 0; i < cine_txt[2].children.length; i++) {
                const ch = cine_txt[2].children[i];
                ch.style.opacity = "0";
            }
        }, 2),
        new_time_point(()=>{ cine.style.pointerEvents = "none"; }, 1),
    ];
    run_timeline(timeline)
}
const load_site = (url)=>{
    window.open(url, '_blank').focus();
}


$("#version").innerText = VERSION;
data.version = get_or("version", VERSION);
data.offline = get_or("offline", Math.floor(Date.now()/1000));

if (data.version != VERSION) {
    // do something, it's a new version!
    data.version = VERSION;
}

// Save loop
const save_loop = setInterval(() => {
    // console.log("storing data");
    data.offline = Math.floor(Date.now()/1000);
    local.store();
}, 5000);

const cine = $("#cinematic");
const cine_txt = $(".cine-txt");

// console.log($("#run-cine"));
$("#run-cine").onclick = ()=>{ cine.style.opacity = "1"; do_cine(); }

if (!local.can_load() || local.get_storage().version == undefined) {
    localStorage.clear();
    do_cine();
} else {
    let total = offline_earnings();
    
    cine.onclick = ()=>{
        no_cine = true;
        cine.style.opacity = "0"; 
        cine.style.pointerEvents = "none";
        cine.onclick = null;
        cine_txt[0].innerText = "";
        cine_txt[0].style.opacity = "0";
    }
    cine_txt[0].innerText = `Welcome back\nOffline earnings: ${format_num(total)} ${(data.mana >= data.max_mana)? "(hit max)" : ""}`;
    cine_txt[0].style.opacity = "1";
}


const check_cards = ()=>{
    for (const key in data.cards) {
        if (Object.hasOwnProperty.call(data.cards, key)) {
            const val = data.cards[key];
            if (val > 0) return true;
        }
    }
    return false;
}
const setup_menu_points = ()=>{
    if (data.upgr4_lvl >= 2) {
        $("#minion-point").removeAttribute("hide");
    }
    if (data.minion5_lvl >= 1) {
        $("#spell-point").removeAttribute("hide");
        $("#lapis-point").removeAttribute("hide");
    }
    if (check_cards()) {
        $("#card-inv-point").removeAttribute("hide");
    }
}
setup_menu_points();

if (data.spell0) $(".spell")[0].style.display = "block";
if (data.spell1) $(".spell")[1].style.display = "block";
if (data.spell2) $(".spell")[2].style.display = "block";
// if (data.spell0) $(".spell")[0].style.display = "block";
// if (data.spell0) $(".spell")[0].style.display = "block";
let secret = "";
let debug = false;
document.addEventListener("keyup", (ev)=>{
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
    // if (card_inv.style.opacity == "1") {
    //     if (ev.key == "Escape") {
    //         console.log("escaping...");
    //         card_inv.style.opacity == "0";
    //         card_inv.style.pointerEvents = "none";
    //     }
    //     if (ev.key == "ArrowLeft") {
    //         card_inv.scrollLeft += 10;
    //         console.log("arrow left");
    //     } else if (ev.key == "ArrowRight") {
    //         card_inv.scrollLeft -= 10;
    //     }
    // }
})

