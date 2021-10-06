/*
    Cards:
    card0: Random 3 card pack
    card1: Random 6 card pack
    card2: Random 10 card pack
*/

class Card {
    constructor(card) {
        this.card = card;
        // this.html = `<div class="card"> <div class="card-content"> <div class="card-img" style="background-image: url(${this.card.url});"></div> <h3 class="card-desc">${this.card.desc}</h3></div> </div>`;
        
        this.html = `<div class="flip-card" onclick="flip_card(this)">
            <div class="flip-card-inner">
                <div class="flip-card-front"></div>
                <div class="flip-card-back">
                    <h3 class="card-title">${this.card.title}</h3>
                    <div class="card-img" style="background-image: url(${this.card.url});"></div>
                    <h3 class="card-desc">${this.card.desc}</h3>
                </div>
            </div>
        </div>`;
    }
}

const card_wrapper = $("#card-wrapper");

const con_card = (weight, id, title, desc, url)=>{ return { weight: weight, id: id, title: title, desc: desc, url: url } }
const card_loot0 = [ // General Card Pack
    con_card(20, "upgr0", "Midas Touch", "Gives a bonus to your clicking abilities", "./assets/cards/upgr0.svg"),
    con_card(5, "upgr1", "Lightning Conduit", "Critical clicks are more powerful", "./assets/cards/upgr1.svg"),
    con_card(7, "upgr2", "Double Time", "Gives a bonus to your manual idle abilities", "./assets/cards/upgr2.svg"),
    con_card(5, "upgr3", "Rhythmic Strike", "Gives a chance to get a critical when you manually idle", "./assets/cards/upgr3.svg"),
    con_card(15, "minion0", "Undead Lord", "Zombie minions are more effective", "./assets/cards/minion0.svg"),
    con_card(9, "minion1", "Hydration", "Aquatic minions are more effective", "./assets/cards/minion1.svg"),
    con_card(7, "minion2", "Filling Meal", "Beast minion are more effective", "./assets/cards/minion2.svg"),
    con_card(5, "minion3", "Ectoplasm", "Ghostly minions are more effective", "./assets/cards/minion3.svg"),
    con_card(3, "minion4", "Tasty Stones", "Rock golem minions are more effective", "./assets/cards/minion4.svg"),
    con_card(1, "minion5", "Dragonium Mana", "Dragon minions are more effective", "./assets/cards/minion5.svg"),
    con_card(1, "lapis0", "Magic Mastery", "Get extra lapis after prestige", "./assets/cards/lapis0.svg"),
];
const card_loot1 = [ // Upgrade Card Pack
    con_card(10, "upgr0", "Midas Touch", "Gives a bonus to your clicking abilities", "./assets/cards/upgr0.svg"),
    con_card(4, "upgr1", "Lightning Conduit", "Critical clicks are more powerful", "./assets/cards/upgr1.svg"),
    con_card(10, "upgr2", "Double Time", "Gives a bonus to your manual idle abilities", "./assets/cards/upgr2.svg"),
    con_card(5, "upgr3", "Rhythmic Strike", "Gives a chance to get a critical when you manually idle", "./assets/cards/upgr3.svg"),
];
const card_loot2 = [ // Minion Card Pack
    con_card(11, "minion0", "Undead Lord", "Zombie minions are more effective", "./assets/cards/minion0.svg"),
    con_card(9, "minion1", "Hydration", "Aquatic minions are more effective", "./assets/cards/minion1.svg"),
    con_card(7, "minion2", "Filling Meal", "Beast minion are more effective", "./assets/cards/minion2.svg"),
    con_card(5, "minion3", "Ectoplasm", "Ghostly minions are more effective", "./assets/cards/minion3.svg"),
    con_card(3, "minion4", "Tasty Stones", "Rock golem minions are more effective", "./assets/cards/minion4.svg"),
    con_card(1, "minion5", "Dragonium Mana", "Dragon minions are more effective", "./assets/cards/minion5.svg"),
];
const card_loot3 = [ // Epic Card Pack
    // con_card(20, "upgr0", "Midas Touch", "Gives a bonus to your clicking abilities", "./assets/cards/upgr0.svg"),
    con_card(5, "upgr1", "Lightning Conduit", "Critical clicks are more powerful", "./assets/cards/upgr1.svg"),
    con_card(5, "upgr2", "Double Time", "Gives a bonus to your manual idle abilities", "./assets/cards/upgr2.svg"),
    con_card(5, "upgr3", "Rhythmic Strike", "Gives a chance to get a critical when you manually idle", "./assets/cards/upgr3.svg"),
    // con_card(15, "minion0", "Undead Lord", "Zombie minions are more effective", "./assets/cards/minion0.svg"),
    // con_card(9, "minion1", "Hydration", "Aquatic minions are more effective", "./assets/cards/minion1.svg"),
    con_card(5, "minion2", "Filling Meal", "Beast minion are more effective", "./assets/cards/minion2.svg"),
    con_card(4, "minion3", "Ectoplasm", "Ghostly minions are more effective", "./assets/cards/minion3.svg"),
    con_card(3, "minion4", "Tasty Stones", "Rock golem minions are more effective", "./assets/cards/minion4.svg"),
    con_card(3, "minion5", "Dragonium Mana", "Dragon minions are more effective", "./assets/cards/minion5.svg"),
    con_card(3, "lapis0", "Magic Mastery", "Get extra lapis after prestige", "./assets/cards/lapis0.svg"),
];

const cards_default = { "upgr0": 0, "upgr1": 0, "upgr2": 0, "upgr3": 0, "minion0": 0, "minion1": 0, "minion2": 0, "minion3": 0, "minion4": 0, "minion5": 0, "lapis0": 0 };
data.cards = get_or("cards", cards_default); // defaults.cards = cards_default;
data.lapis = get_or("lapis", 0); // defaults.lapis = 0;
data.card0_cost = get_or("card0_cost", 10); defaults.card0_cost = 10; // 3
data.card1_cost = get_or("card1_cost", 18); defaults.card1_cost = 18; // 6
data.card2_cost = get_or("card2_cost", 25); defaults.card2_cost = 25; // 10

// Upgrades Card Pack
data.card3_cost = get_or("card3_cost", 15); defaults.card3_cost = 15; // 6
data.card4_cost = get_or("card4_cost", 25); defaults.card4_cost = 25; // 10

// Minion Card Pack
data.card5_cost = get_or("card5_cost", 25); defaults.card5_cost = 25; // 6
data.card6_cost = get_or("card6_cost", 45); defaults.card6_cost = 45; // 10

// Epic Card Pack
data.card7_cost = get_or("card7_cost", 100); defaults.card7_cost = 100; // 3
data.card8_cost = get_or("card8_cost", 200); defaults.card8_cost = 200; // 6
data.card9_cost = get_or("card9_cost", 450); defaults.card9_cost = 450; // 10

// data.card10_cost = get_or("card10_cost", ); defaults.card10_cost = ;
// data.card11_cost = get_or("card11_cost", ); defaults.card11_cost = ;

let cards_up = 0;

const buy_card = (type)=>{
    // while (card_wrapper.firstChild) { card_wrapper.removeChild(card_wrapper.firstChild); }

    if (data.lapis < data[`${type}_cost`]) return;
    data.lapis -= data[`${type}_cost`];

    $("#card-inv-point").removeAttribute("hide");
    set_points(shown_points());

    card_wrapper.style.opacity = "1";
    card_wrapper.style.pointerEvents = "auto";

    setTimeout(() => {
        if (type == "card0") {
            cards_up = 3;
            card_wrapper.style.gridTemplateColumns = "auto auto auto";
            for (let i = 0; i < 3; i++) {
                const new_card = new Card(rand_card());
                store_card(new_card.card.id);
                card_wrapper.insertAdjacentHTML("beforeend", new_card.html);
            }
        }
        else if (type == "card1") {
            cards_up = 6;
            card_wrapper.style.gridTemplateColumns = "auto auto auto";
            for (let i = 0; i < 6; i++) {
                const new_card = new Card(rand_card());
                store_card(new_card.card.id);
                card_wrapper.insertAdjacentHTML("beforeend", new_card.html);
            }
        }
        else if (type == "card2") {
            cards_up = 10;
            card_wrapper.style.gridTemplateColumns = "auto auto auto auto auto";
            for (let i = 0; i < 10; i++) {
                const new_card = new Card(rand_card());
                store_card(new_card.card.id);
                card_wrapper.insertAdjacentHTML("beforeend", new_card.html);
            }
        }
    }, 1000);
}
const store_card = (id)=>{

    if (data.cards[id] == undefined) data.cards[id] = 1;
    else data.cards[id]++;

    // for (let i = 0; i < data.cards.length; i++) {
    //     const c = data.cards[i];
    //     if (c.id == id) {
    //         c.num++;
    //         return;
    //     }
    // }
    // data.cards.push( { id: id, num: 1 } );
}
const rand_card = ()=>{
    let max = 1;

    for (let i = 0; i < card_loot0.length; i++) {
        const c = card_loot0[i];
        max += c.weight;
    }

    let num = Math.floor(Math.random()*max);

    for (let i = 0; i < card_loot0.length; i++) {
        const c = card_loot0[i];
        num -= c.weight;

        if (num <= 0) {
            return c;
        }
    }

    // return cards[Math.floor(Math.random()*cards.length)];
}
const flip_card = (card)=>{
    const st = card.getElementsByClassName("flip-card-inner")[0].style;
    if (st.transform != "rotateY(180deg)") {
        cards_up -= 1;
        st.transform = "rotateY(180deg)";
    }
}

card_wrapper.onclick = function(){
    if (prest_cin) return;
    if (cards_up == 0) {
        cards_up--; 
        return;
    }
    if (cards_up >= 0) return;

    const fcards = $(".flip-card");
    const card_objs = [];
    const x_push = 20;
    const y_push = -10;
    
    for (let i = 0; i < fcards.length; i++) {
        const st = fcards[i].style;
        card_objs.push( {elem: fcards[i], x: 0, y: 0, vect: { x: 10+( Math.floor(Math.random()*x_push)-2 ), y: -10+( Math.floor(Math.random()*y_push)-10 ) }} )
        st.transform = `translate(${0}px, ${0}px)`;
    }

    const grav = 2;
    const drag = 0.98;
    const simulation_loop = setInterval(() => {
        for (let i = 0; i < card_objs.length; i++) {
            const obj = card_objs[i];
            obj.x += obj.vect.x;
            obj.y += obj.vect.y;
            obj.vect.y += grav;

            obj.vect.x *= drag;
            obj.vect.y *= drag;

            obj.elem.style.transform = `translate(${obj.x}px, ${obj.y}px)`;
        }
    }, 1000/30);

    
    setTimeout(() => {
        clearInterval(simulation_loop);
        this.style.opacity = "0";
        this.style.pointerEvents = "none";
        while (card_wrapper.firstChild) { card_wrapper.removeChild(card_wrapper.firstChild); }
    }, 2500);
}
