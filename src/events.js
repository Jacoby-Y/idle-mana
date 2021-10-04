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

// Save loop
setInterval(() => {
    console.log("storing data");
    local.store();
}, 5000);

const cine = $("#cinematic");
const cine_txt = $("#cine-txt");

if (!local.can_load()) {
    setTimeout(() => {
        cine_txt.style.opacity = "1";
        setTimeout(() => {
            cine_txt.style.opacity = "0";
            setTimeout(() => {
                cine_txt.innerText = "A game made with love"
                cine_txt.style.opacity = "1";
                setTimeout(() => {
                    cine_txt.style.opacity = "0";
                    setTimeout(() => {
                        cine_txt.innerText = "[ insert epic name here ]"
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
} else {
    setTimeout(() => {
        cine_txt.innerText = "Welcome back"
        cine_txt.style.opacity = "1";
        setTimeout(() => {
            cine_txt.style.opacity = "0";
            setTimeout(() => {
                cine.style.opacity = "0";
                setTimeout(() => {
                    cine.style.pointerEvents = "none";
                }, 1000);
            }, 1000);
        }, 2000);
    }, 1000);
}