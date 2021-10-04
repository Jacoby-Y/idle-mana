const tip = $("#tip");
const tip_txt = $("#tip-txt");

let tip_out = false;

const tips = {
    "": "No tooltip!",
    upgr0: `How much mana you get per click`,
    upgr1: `You chance to do a critical click (x3 mana)`,
    upgr2: `How much mana you get when manually idling\n(Hold mouse button down when over the orb)`,
    upgr3: `How fast you can manually idle`,
    upgr4: `The maximum amount of mana you can hold`,
    minion0: `Raise the dead to help`,
    minion1: `Summon aquatic reinforcements`,
    minion2: `Summon a wilde beast to help`,
    minion3: `Summon a poltergeist to help`,
    minion4: `Create a rock golem to help`,
    minion5: `Call upon a dragon to help`,
    spell0: `Duration: ${casts.cast0.duration}sec, Cooldown: ${casts.cast0.cooldown}min`,
    spell1: `Duration: ${casts.cast1.duration}sec, Cooldown: ${casts.cast1.cooldown}min`,
    spell2: `Duration: ${casts.cast2.duration}sec, Cooldown: ${casts.cast2.cooldown}min`,
    spell3: `Purchases: ${casts.cast3.duration}sec, Cooldown: ${casts.cast3.cooldown}min`,
    spell4: `Duration: ${casts.cast4.duration}sec, Cooldown: ${casts.cast4.cooldown}min`,
    spell0_btn: `Greatly boost your clicking abilities`,
    spell1_btn: `Boosts your manual idling abilies`,
    spell2_btn: `Powers up your minions`,
    spell3_btn: `Gives you a shop discount for a few purchases`,
    spell4_btn: `Cuts your speel cooldowns in half`,
    prest: `Prestiging lets you start over in exchange for "Lapis"`,
    card0: `Buy a pack of 3 cards`,
    card1: `Buy a pack of 6 cards`,
    card2: `Buy a pack of 10 cards`,
}

/*
    Spell info:
    spell0: per click multiplier
    spell1: idle hold multiplier
    spell2: Minion power
    spell3: shop discout for # purchases
    spell4: cut spell cooldowns 
*/

const set_tip = (type)=>{
    // console.log(type);
    if (!tip_out) tip.style.transform = "translate(0, 0)";
    tip_txt.innerText = tips[type];
}
const toggle_tip = (bool=false)=>{
    if (bool) {
        tip.style.transform = "translate(0, 0)";
    } else {
        tip.style.transform = "translate(0, -100%)";
    }
    tip_out = bool;
}