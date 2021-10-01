/**/

data.spell0 = get_or("spell0", false);
data.spell0_cost = get_or("spell0_cost", 50);

const spells = $(".spell");
const set_spells = (i=0)=>{
    // if (!menu_out) return;
    const o = {
        x: window.innerWidth/2-(16*3/2),
        y: window.innerHeight/2-(16*3/2)
    }
    const d = window.innerHeight/4+80;
    const arc = 1.57;
    const off = -1.57;
    const a = (arc/spells.length*(i+1))+off; // ((off / spells.length) * i+((off/(spells.length))-(off/(spells.length*2)))); 
    const x = Math.cos(a)*d;
    const y = Math.sin(a)*d;

    spells[i].style.left = `${o.x-x}px`;
    spells[i].style.top = `${o.y-y}px`;
    spells[i].style.opacity = "1";

    i++;
    if (i < spells.length) set_spells(i);
}
set_spells();

