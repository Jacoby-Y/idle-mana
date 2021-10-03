/*
    Spell info:
    spell0: per click multiplier
    spell1: idle hold multiplier
    spell2: Minion power
    spell3: shop discout for # purchases
    spell4: cut spell cooldowns 
*/

data.spell0 = get_or("spell0", false);
data.spell0_cost = get_or("spell0_cost", 5);
menu_funcs.spell0_click = ()=>data.spell0_cost = data.spell0_cost;
check_funcs.spell0 = (v)=>{ 
    if (data.spell0) return false
    spells[0].style.display = "block"; 
    data.spell0=true; 
    return true; 
};

data.spell1 = get_or("spell1", false);
data.spell1_cost = get_or("spell1_cost", 5);
menu_funcs.spell1_click = ()=>data.spell1_cost = data.spell1_cost;
check_funcs.spell1 = (v)=>{ 
    if (data.spell1) return false
    spells[1].style.display = "block"; 
    data.spell1=true; 
    return true; 
};

data.spell2 = get_or("spell2", false);
data.spell2_cost = get_or("spell2_cost", 5);
menu_funcs.spell2_click = ()=>data.spell2_cost = data.spell2_cost;
check_funcs.spell2 = (v)=>{ 
    if (data.spell2) return false
    spells[2].style.display = "block"; 
    data.spell2=true; 
    return true; 
};

data.spell3 = get_or("spell3", false);
data.spell3_cost = get_or("spell3_cost", 5);
menu_funcs.spell3_click = ()=>data.spell3_cost = data.spell3_cost;
check_funcs.spell3 = (v)=>{ 
    if (data.spell3) return false
    spells[3].style.display = "block"; 
    data.spell3=true; 
    return true; 
};

data.spell4 = get_or("spell4", false);
data.spell4_cost = get_or("spell4_cost", 5);
menu_funcs.spell4_click = ()=>data.spell4_cost = data.spell4_cost;
check_funcs.spell4 = (v)=>{ 
    if (data.spell4) return false
    spells[4].style.display = "block"; 
    data.spell4=true; 
    return true; 
};

const spells = $(".spell");
const set_spells = (i=spells.length-1)=>{
    // if (!menu_out) return;
    const o = {
        x: window.innerWidth/2-(16*3/2),
        y: window.innerHeight/2-(16*3/2)
    }
    const d = window.innerHeight/4+80;
    const arc = 1.57;
    const off = -arc/spells.length;
    const a = (arc/spells.length*(i+1))+off; // ((off / spells.length) * i+((off/(spells.length))-(off/(spells.length*2)))); 
    const x = Math.cos(-a)*d;
    const y = Math.sin(-a)*d;

    spells[i].style.left = `${o.x-x}px`;
    spells[i].style.top = `${o.y-y}px`;
    spells[i].style.opacity = "1";

    i--;
    if (i >= 0) set_spells(i);
}
set_spells();