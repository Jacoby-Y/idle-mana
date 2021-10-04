const VERSION = "v0.6";

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
const do_cine = ()=>{
    console.log("running cinematic");
    cine.style.pointerEvents = "auto";
    cine_txt.style.opacity = "0";
    cine_txt.innerText = "";
    setTimeout(() => {
        cine_txt.innerText = "Jacoby Productions presents";
        cine_txt.style.opacity = "1";
        setTimeout(() => {
            cine_txt.style.opacity = "0";
            setTimeout(() => {
                cine_txt.innerText = "A game made with love";
                cine_txt.style.opacity = "1";
                setTimeout(() => {
                    cine_txt.style.opacity = "0";
                    setTimeout(() => {
                        cine_txt.innerText = "[ insert epic name here ]";
                        cine_txt.style.opacity = "1";
                        setTimeout(() => {
                            cine_txt.style.opacity = "0";
                            setTimeout(() => {
                                cine.style.opacity = "0";
                                setTimeout(() => {
                                    cine.style.pointerEvents = "none";
                                }, 1000);
                            }, 2000);
                        }, 2000);
                    }, 2000);
                }, 3000);
            }, 2000);
        }, 3000);
    }, 1000);
}
const load_site = (url)=>{
    window.open(url, '_blank').focus();
}

$("#version").innerText = VERSION;
data.version = get_or("version", VERSION);
data.offline = get_or("offline", Math.floor(Date.now()/1000));

// Save loop
const save_loop = setInterval(() => {
    // console.log("storing data");
    data.offline = Math.floor(Date.now()/1000);
    local.store();
}, 5000);

const cine = $("#cinematic");
const cine_txt = $("#cine-txt");

let no_cine = false;

console.log($("#run-cine"));
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
    }
    setTimeout(() => {
        if (no_cine) return;
        cine_txt.innerText = `Welcome back\nOffline earnings: ${total}`;
        cine_txt.style.opacity = "1";
        setTimeout(() => {
            if (no_cine) return;
            cine_txt.style.opacity = "0";
            setTimeout(() => {
                if (no_cine) return;
                cine.style.opacity = "0";
                setTimeout(() => {
                    cine.style.pointerEvents = "none";
                    cine.onclick = null;
                }, 1000);
            }, 1000);
        }, 2000);
    }, 1000);
}