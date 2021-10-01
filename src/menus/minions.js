/*
    Minions info:
    minion0 = Zombies
    minion1 = Underwater folk
    minion2 = Wilde Beast
    minion3 = Poltergeist
    minion4 = Golem
    minion5 = Dragon
*/

data.minion0 = get_or("minion0", 0);
data.minion0_cost = get_or("minion0_cost", 50);
data.minion0_lvl = get_or("minion0_lvl", 0);
data.minion1 = get_or("minion1", 0);
data.minion1_cost = get_or("minion1_cost", 200);
data.minion1_lvl = get_or("minion1_lvl", 0);
data.minion2 = get_or("minion2", 0);
data.minion2_cost = get_or("minion2_cost", 200);
data.minion2_lvl = get_or("minion2_lvl", 0);
data.minion3 = get_or("minion3", 0);
data.minion3_cost = get_or("minion3_cost", 200);
data.minion3_lvl = get_or("minion3_lvl", 0);
data.minion4 = get_or("minion4", 0);
data.minion4_cost = get_or("minion4_cost", 200);
data.minion4_lvl = get_or("minion4_lvl", 0);
data.minion5 = get_or("minion5", 0);
data.minion5_cost = get_or("minion5_cost", 200);
data.minion5_lvl = get_or("minion5_lvl", 0);


menu_funcs.minion0_click = ()=>{
    data.minion0_cost = Math.round(data.minion0_cost*1.2);
}
menu_funcs.minion1_click = ()=>{
    data.minion1_cost = Math.round(data.minion1_cost*1.2);
}
menu_funcs.minion2_click = ()=>{
    data.minion2_cost = Math.round(data.minion2_cost*1.2);
}
menu_funcs.minion3_click = ()=>{
    data.minion3_cost = Math.round(data.minion3_cost*1.2);
}