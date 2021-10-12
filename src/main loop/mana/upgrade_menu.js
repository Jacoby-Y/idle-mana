/*
    Upgrades info:
    upgr0 = mana per click
    upgr1 = chance for critical click
    upgr2 = mana per hold wait
    upgr3 = faster hold wait
    upgr4 = Increase max mana
*/

data.upgr0 = get_or("upgr0", 1); defaults.upgr0 = 1;
data.upgr0_cost = get_or("upgr0_cost", 20); defaults.upgr0_cost = 20;
data.upgr0_lvl = get_or("upgr0_lvl", 1); defaults.upgr0_lvl = 1;
check_funcs.upgr0 = (v)=>{return true};

data.upgr1 = get_or("upgr1", 0); defaults.upgr1 = 0;
data.upgr1_cost = get_or("upgr1_cost", 10); defaults.upgr1_cost = 10;
data.upgr1_lvl = get_or("upgr1_lvl", 0); defaults.upgr1_lvl = 0;
check_funcs.upgr1 = (v)=>{return true};

data.upgr2 = get_or("upgr2", 0); defaults.upgr2 = 0;
data.upgr2_cost = get_or("upgr2_cost", 20); defaults.upgr2_cost = 20;
data.upgr2_lvl = get_or("upgr2_lvl", 1); defaults.upgr2_lvl = 1;
check_funcs.upgr2 = (v)=>{return true};

data.upgr3 = get_or("upgr3", 0); defaults.upgr3 = 0;
data.upgr3_cost = get_or("upgr3_cost", 25); defaults.upgr3_cost = 25;
data.upgr3_lvl = get_or("upgr3_lvl", 0); defaults.upgr3_lvl = 0;
check_funcs.upgr3 = (v)=>{return true};

data.upgr4 = get_or("upgr4", 0); defaults.upgr4 = 0;
data.upgr4_cost = get_or("upgr4_cost", 500); defaults.upgr4_cost = 500;
data.upgr4_lvl = get_or("upgr4_lvl", 0); defaults.upgr4_lvl = 0;
check_funcs.upgr4 = (v)=>{return true};


menu_funcs.upgr0_click = ()=>{
    data.upgr0_cost = Math.round(data.upgr0_cost*1.2);
    on_poppup_open["upgrade-temp"]();
}
menu_funcs.upgr1_click = ()=>{
    data.upgr1_cost = Math.round(data.upgr1_cost*1.2);
    on_poppup_open["upgrade-temp"]();
}
menu_funcs.upgr2_click = ()=>{
    data.upgr2_cost = Math.round(data.upgr2_cost*1.2);
    on_poppup_open["upgrade-temp"]();
}
menu_funcs.upgr3_click = ()=>{
    data.upgr3_cost = Math.round(data.upgr3_cost*1.2);
    on_poppup_open["upgrade-temp"]();
    data.hold_time = Math.round((1000 * (1/(data.upgr3_lvl+1)))+400)-data.upgr3_lvl*5;
}
menu_funcs.upgr4_click = ()=>{
    data.max_mana = Math.round(data.max_mana*1.75/100)*100;
    on_poppup_open["upgrade-temp"](); set_points(shown_points());
    data.upgr4_cost = Math.round(data.max_mana/3/100)*100;
    data.mana = data.mana;
}