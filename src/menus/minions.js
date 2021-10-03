/*
    Minions info:
    minion0 = Zombies
    minion1 = Underwater folk
    minion2 = Wilde Beast
    minion3 = Poltergeist
    minion4 = Golem
    minion5 = Dragon
*/

const minion_len = 6;

data.minion0 = get_or("minion0", 0);
data.minion0_cost = get_or("minion0_cost", 5);
data.minion0_lvl = get_or("minion0_lvl", 0);
data.minion0_pow = get_or("minion0_pow", 1);
check_funcs.minion0 = (v)=>{return true}

data.minion1 = get_or("minion1", 0);
data.minion1_cost = get_or("minion1_cost", 5);
data.minion1_lvl = get_or("minion1_lvl", 0);
data.minion1_pow = get_or("minion1_pow", 2);
check_funcs.minion1 = (v)=>{return true}

data.minion2 = get_or("minion2", 0);
data.minion2_cost = get_or("minion2_cost", 5);
data.minion2_lvl = get_or("minion2_lvl", 0);
data.minion2_pow = get_or("minion2_pow", 5);
check_funcs.minion2 = (v)=>{return true}

data.minion3 = get_or("minion3", 0);
data.minion3_cost = get_or("minion3_cost", 5);
data.minion3_lvl = get_or("minion3_lvl", 0);
data.minion3_pow = get_or("minion3_pow", 8);
check_funcs.minion3 = (v)=>{return true}

data.minion4 = get_or("minion4", 0);
data.minion4_cost = get_or("minion4_cost", 5);
data.minion4_lvl = get_or("minion4_lvl", 0);
data.minion4_pow = get_or("minion4_pow", 15);
check_funcs.minion4 = (v)=>{return true}

data.minion5 = get_or("minion5", 0);
data.minion5_cost = get_or("minion5_cost", 5);
data.minion5_lvl = get_or("minion5_lvl", 0);
data.minion5_pow = get_or("minion5_pow", 20);
check_funcs.minion5 = (v)=>{return true}



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