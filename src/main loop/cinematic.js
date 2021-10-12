const cine = cui.get("#cinematic");
const cine_txt = cui.get_all(".cine-txt");

const new_time_point = (run, time)=>{
    return { run: run, time: time  };
}

const run_timeline = (tl, i=0, sec=true)=>{
    setTimeout(() => {
        tl[i].run();
        if (i+1 >= tl.length) return;
        run_timeline(tl, i+1)
    }, (sec)? tl[i].time*1000 : tl[i].time);
}

const do_cine = ()=>{
    // console.log("running cinematic");
    cine.css("pointerEvents", "auto");
    cine_txt.index(0).css("opacity", "0");
    const txt1 = cine_txt.index(1);
    const txt2 = cine_txt.index(2);
    const txt3 = cine_txt.index(3);

    const cinema = new EventRunner();
        cinema.wait(1000)
        .callback(()=>{
            txt1.css("top", "50%");
        }).wait(10).callback(()=>{ txt1.css("transition-timing-function", "ease-out"); })
        .wait(3000)
        .callback(()=>{
            txt1.css("top", "-10%");
        }).wait(1000)
        .callback(()=>{
            txt2.css("top", "50%");
        }).wait(10).callback(()=>{ txt2.css("transition-timing-function", "ease-out"); })
        .wait(3000)
        .callback(()=>{
            txt2.css("top", "-10%");
        }).wait(1000)
        .callback(()=>{
            txt3.css("transition-duration", "2s");
            txt3.css("opacity", "1");
        }).wait(3000).callback(()=>{ cine.css_str("opacity: 0; pointer-events: none;") })
        .wait(1000).callback(()=>{cine.css("display", "none")});
    cinema.run();

    // console.log(cinema);
}

if ($("#run-cine") != null) $("#run-cine").onclick = ()=>{ cine.style.opacity = "1"; do_cine(); }

if (!local.can_load() || local.get_storage().version == undefined) {
    localStorage.clear();
    do_cine();
} else {
    let total = offline_earnings();
    
    cine.elem.onclick = ()=>{
        no_cine = true;
        cine.css("opacity", "0"); 
        cine.css("pointerEvents", "none");
        cine.elem.onclick = null;
        cine_txt[0].innerText = "";
        cine_txt[0].style.opacity = "0";
    }
    cine_txt[0].innerText = `Welcome back\nOffline earnings: ${format_num(total)} ${(data.mana >= data.max_mana)? "(hit max)" : ""}`;
    cine_txt[0].style.opacity = "1";
}