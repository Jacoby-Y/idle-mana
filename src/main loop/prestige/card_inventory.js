// const card_inv = $("#card-inventory");
// const card_holder = $("#card-holder");

const card_inv = cui.get("#card-inventory");
const card_holder = cui.get("#card-holder");

card_inv.elem.onclick = ()=>{
    card_inv.css("opacity", "0");
    card_inv.css("pointerEvents", "none");
}

const card_order = ["upgr0","upgr1", "upgr2", "upgr3", "minion0","minion1","minion2","minion3","minion4","minion5","lapis0"]

const find_card = (str)=>{
    for (let i = 0; i < card_loot0.length; i++) {
        const c = card_loot0[i];
        if (c.id == str) {
            return c;
        }
    }
}

const open_inv = ()=>{
    card_inv.css("opacity", "1");
    card_inv.css("pointerEvents", "auto");

    card_holder.abandon();
    
    for (let i = 0; i < card_order.length; i++) {
        const str = card_order[i];
        if (data.cards[str] > 0) {
            const c = find_card(str);
            card_holder.elem.insertAdjacentHTML("beforeend", 
            `<div class="flip-card-back" style="transform: rotate(0deg); width: 16rem; height: 25rem; position: relative; float: left; margin: 0.5rem;">
                <h3 class="card-title" style="text-align: center;">${c.title}</h3>
                <div class="card-img" style="background-image: url(${c.url});"></div>
                <h3 class="card-desc" style="padding: 0.5rem 1rem; font-size: 1rem;">${c.desc}</h3>
                <h3 class="card-amount">${data.cards[str]}</h3>
            </div>`);
        }
    }
}