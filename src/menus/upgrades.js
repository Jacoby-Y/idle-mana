/*
    Upgrades info:
    upgr0 = mana per click
    upgr1 = chance for critical click
    upgr2 = mana per hold wait
    upgr3 = faster hold wait
    upgr4 = Increase max mana
*/

data.upgr0 = get_or("upgr0", 1);
data.upgr0_cost = get_or("upgr0_cost", 5);
data.upgr0_lvl = get_or("upgr0_lvl", 1);

data.upgr1 = get_or("upgr1", 0);
data.upgr1_cost = get_or("upgr1_cost", 5);
data.upgr1_lvl = get_or("upgr1_lvl", 0);

data.upgr2 = get_or("upgr2", 0);
data.upgr2_cost = get_or("upgr2_cost", 5);
data.upgr2_lvl = get_or("upgr2_lvl", 1);

data.upgr3 = get_or("upgr3", 0);
data.upgr3_cost = get_or("upgr3_cost", 5);
data.upgr3_lvl = get_or("upgr3_lvl", 0);

data.upgr4 = get_or("upgr4", 0);
data.upgr4_cost = get_or("upgr4_cost", 5);
data.upgr4_lvl = get_or("upgr4_lvl", 0);


menu_funcs.upgr0_click = ()=>{
    data.upgr0_cost = Math.round(data.upgr0_cost*1.2);
}
menu_funcs.upgr1_click = ()=>{
    data.upgr1_cost = Math.round(data.upgr1_cost*1.2);
}
menu_funcs.upgr2_click = ()=>{
    data.upgr2_cost = Math.round(data.upgr2_cost*1.2);
}
menu_funcs.upgr3_click = ()=>{
    data.upgr3_cost = Math.round(data.upgr3_cost*1.2);
    data.hold_time = Math.round((1000 * (1/(data.upgr3_lvl+1)))+400)-data.upgr3_lvl*5;
}
menu_funcs.upgr4_click = ()=>{
    data.upgr4_cost = Math.round(data.upgr4_cost*1.2);
    data.max_mana = Math.round( data.max_mana * 1.5 / 100) *100;
    data.mana = data.mana;
}