const circ_menu = $("#circ-menu");
const menu_btn = $("#menu-btn");
const points = $(".point");

let menu_out = false;

menu_btn.onclick = ()=>{
    if (menu_out) {
        circ_menu.style.transform = "translate(50%, -50%) rotate(135deg)";
        clear_points();
    }
    else {
        circ_menu.style.transform = "translate(50%, -50%) rotate(-45deg)";
        set_points();
    }
    menu_out = !menu_out;
}
const set_points = (i=points.length-1)=>{
    setTimeout(() => {
        if (!menu_out) return;
        const o = {
            x: window.innerWidth-10,
            y: window.innerHeight/2-10
        }
        const d = window.innerHeight/4;
        const a = (Math.PI / points.length) * i+((Math.PI/(points.length))-(Math.PI/(points.length*2))); 
        const x = Math.cos(a-(Math.PI/2))*d;
        const y = Math.sin(a-(Math.PI/2))*d;

        points[i].style.left = `${o.x-x}px`;
        points[i].style.top = `${o.y-y}px`;
        points[i].style.opacity = "1";

        i--;
        if (i >= 0) set_points(i);
    }, 500/(points.length+1));
}
const clear_points = (i=0)=>{
    setTimeout(() => {
        if (menu_out) return;
        const p = points[i];

        p.style.opacity = "0";

        i++;
        if (i < points.length) clear_points(i);
    }, 500/(points.length+1));
}