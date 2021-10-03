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
                    <div style="width:auto; height:60%; margin: 10px 10px 5px 10px; background-image: url(${this.card.url});"></div>
                    <h3 class="card-desc">${this.card.desc}</h3>
                </div>
            </div>
        </div>`;
    }
}

const card_wrapper = $("#card-wrapper");

const con_card = (id, desc, url)=>{ return { id: id, desc: desc, url: url } }
const cards = [
    con_card("upgr0", "Gives a bonus to your clicking abilities!", "./assets/cards/upgr0.svg")
];

data.cards = get_or("cards", []);
data.lapis = get_or("lapis", 0);
data.card0_cost = get_or("card0_cost", 5);
data.card1_cost = get_or("card1_cost", 5);
data.card2_cost = get_or("card2_cost", 5);

data.prest_lvl = get_or("prest_lvl", 0);
data.prest_cost = get_or("prest_cost", 1000);
check_funcs.prest = (v)=>{
    if (data.max_mana < 10000 || data.mana < data.max_mana) return false;
    return true;
}

let cards_up = 0;

const buy_card = (type)=>{
    while (card_wrapper.firstChild) { card_wrapper.removeChild(card_wrapper.firstChild); }

    if (data.lapis < data[`${type}_cost`]) return;

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
    for (let i = 0; i < data.cards.length; i++) {
        const c = data.cards[i];
        if (c.id == id) {
            c.num++;
            return;
        }
    }
    data.cards.push( { id: id, num: 1 } );
}
const rand_card = ()=>{
    return cards[Math.floor(Math.random()*cards.length)];
}
const flip_card = (card)=>{
    const st = card.getElementsByClassName("flip-card-inner")[0].style;
    if (st.transform != "rotateY(180deg)") {
        cards_up -= 1;
        st.transform = "rotateY(180deg)";
    }
}

card_wrapper.onclick = function(){
    if (cards_up == 0) {
        cards_up--; 
        return;
    }
    if (cards_up >= 0) return;
    this.style.opacity = "0";
    this.style.pointerEvents = "none";
}
