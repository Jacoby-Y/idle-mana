const mana_orb = $("#mana-orb");

const format_num = (num, round=true)=>{
    if (num < 1000) {
        if (round) return Math.round(num);
        return num;
    }
    num /= 1000;

    if (num < 1000) { 
        return `${num.toFixed(1)}K`
    }
    num /= 1000;

    if (num < 1000) {
        return `${num.toFixed(1)}M`;
    }
    num /= 1000;

    if (num < 1000) {
        return `${num.toFixed(1)}B`;
    }
    num /= 1000;

    if (num < 1000) {
        return `${num.toFixed(1)}T`;
    }
    num /= 1000;

    if (num < 1000) {
        return `${num.toFixed(1)}Q`;
    }
    return `${num.toFixed(1)}Q`;
}

let defaults = {};

data.settings = {
    mana: {display(v) {
        if (v >= data.max_mana) {
            mana_orb.style.border = "2px solid rgb(238, 89, 89)";
        } else {
            mana_orb.style.border = "none";
        }
        return `${format_num(v)} / ${format_num(data.max_mana)}`;
    }},
    lapis: {display: (v) => format_num(v) },
    upgr1_lvl: {display: v => `${v}%`},
    upgr0_cost: {display: v => format_num(v)},
    upgr1_cost: {display: v => format_num(v)},
    upgr2_cost: {display: v => format_num(v)},
    upgr3_cost: {display: v => format_num(v)},
    upgr4_cost: {display: v => format_num(v)},
    minion0_cost: {display: v => format_num(v)},
    minion1_cost: {display: v => format_num(v)},
    minion2_cost: {display: v => format_num(v)},
    minion3_cost: {display: v => format_num(v)},
    minion4_cost: {display: v => format_num(v)},
    minion5_cost: {display: v => format_num(v)},
    prest_cost: {display: v => format_num(v)},
    spell0_cost: {display(v){ if (data.spell0) {return "~"} return v }},
    spell1_cost: {display(v){ if (data.spell1) {return "~"} return v }},
    spell2_cost: {display(v){ if (data.spell2) {return "~"} return v }},
    spell3_cost: {display(v){ if (data.spell3) {return "~"} return v }},
    spell4_cost: {display(v){ if (data.spell4) {return "~"} return v }},
    prest_cost: { display(v){ return `${format_num(v)}` } },
    per_sec: { display(v){ return `${format_num(v)}` } }
}

data.max_mana = get_or("max_mana", 1000); defaults.max_mana = 1000;
data.mana = get_or("mana", 0); defaults.mana = 0;

const clicked_btn = (key)=>{
    const cost = data[`${key}_cost`];
    if (data.mana >= cost) {
        if (check_funcs[key]( data[`${key}_lvl`] ) != true) return;
        data.mana -= cost;
        data[`${key}_lvl`]++;
        const func = menu_funcs[`${key}_click`];
        if (func != undefined) func();
        else console.log(`menu_funcs[${key}_click] == undefined`);
    }
}