/*
    Cards:
    card0: Random 3 card pack
    card1: Random 6 card pack
    card2: Random 10 card pack
*/

class Card {
    constructor() {
        this.card = rand_card();
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
const cards = [
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

const cards_default = { "upgr0": 0, "upgr1": 0, "upgr2": 0, "upgr3": 0, "minion0": 0, "minion1": 0, "minion2": 0, "minion3": 0, "minion4": 0, "minion5": 0, "lapis0": 0 };
data.cards = get_or("cards", cards_default); // defaults.cards = cards_default;
data.lapis = get_or("lapis", 0); // defaults.lapis = 0;
data.card0_cost = get_or("card0_cost", 10); defaults.card0_cost = 10;
data.card1_cost = get_or("card1_cost", 18); defaults.card1_cost = 18;
data.card2_cost = get_or("card2_cost", 25); defaults.card2_cost = 25;

let cards_up = 0;

const buy_card = (type)=>{
    // while (card_wrapper.firstChild) { card_wrapper.removeChild(card_wrapper.firstChild); }

    if (data.lapis < data[`${type}_cost`]) return;
    data.lapis -= data[`${type}_cost`];

    card_wrapper.style.opacity = "1";
    card_wrapper.style.pointerEvents = "auto";

    setTimeout(() => {
        if (type == "card0") {
            cards_up = 3;
            card_wrapper.style.gridTemplateColumns = "auto auto auto";
            for (let i = 0; i < 3; i++) {
                const new_card = new Card();
                store_card(new_card.card.id);
                card_wrapper.insertAdjacentHTML("beforeend", new_card.html);
            }
        }
        else if (type == "card1") {
            cards_up = 6;
            card_wrapper.style.gridTemplateColumns = "auto auto auto";
            for (let i = 0; i < 6; i++) {
                const new_card = new Card();
                store_card(new_card.card.id);
                card_wrapper.insertAdjacentHTML("beforeend", new_card.html);
            }
        }
        else if (type == "card2") {
            cards_up = 10;
            card_wrapper.style.gridTemplateColumns = "auto auto auto auto auto";
            for (let i = 0; i < 10; i++) {
                const new_card = new Card();
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

    for (let i = 0; i < cards.length; i++) {
        const c = cards[i];
        max += c.weight;
    }

    let num = Math.floor(Math.random()*max);

    for (let i = 0; i < cards.length; i++) {
        const c = cards[i];
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
    this.style.opacity = "0";
    this.style.pointerEvents = "none";
    while (card_wrapper.firstChild) { card_wrapper.removeChild(card_wrapper.firstChild); }
}
