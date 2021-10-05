const circ_menu = $("#circ-menu");
const menu_btn = $("#menu-btn");
const points = $(".point");

let menu_out = false;

menu_btn.onclick = ()=>{
    const pts = shown_points();
    if (menu_out) {
        circ_menu.style.transform = "translate(50%, -50%) rotate(135deg)";
        clear_points(pts, pts.length-1);
    }
    else {
        circ_menu.style.transform = "translate(50%, -50%) rotate(-45deg)";
        set_points(pts);
    }
    menu_out = !menu_out;
}
const shown_points = ()=>{
    let res = [];
    for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (!p.hasAttribute("hide")) res.push(p);
    }
    return res;
}
const set_points = (pts, i=0)=>{
    setTimeout(() => {
        if (!menu_out) return;
        const o = {
            x: window.innerWidth-10,
            y: window.innerHeight/2-10
        }
        const d = window.innerHeight/4;
        const sq = 0.5;
        const arc = 0.4;
        const len = pts.length;
        const off = -(0.01 * len);
        const pi2 = Math.PI;
        const a = -((i*arc)-((len-1)*0.5*arc));
        // console.log(a);
        const x = Math.cos(a+off)*d;
        const y = Math.sin(a+off)*d;

        // console.log((i*arc)-((len-1))/(Math.PI/2));

        pts[i].style.display = "block";
        pts[i].style.left = `${o.x-x}px`;
        pts[i].style.top = `${o.y-y}px`;
        pts[i].style.opacity = "1";
        pts[i].children[0].style.color = "aqua";

        i++;
        if (i < len) set_points(pts, i);
    }, 500/(pts.length+1));
}
const clear_points = (pts, i)=>{
    // console.log(pts);
    setTimeout(() => {
        if (menu_out) return;
        const p = pts[i];

        p.style.opacity = "0";
        p.style.display = "none";
        // p.children[0].style.color = "white";

        i--;
        if (i >= 0) clear_points(pts, i);
    }, 500/(points.length+1));
}