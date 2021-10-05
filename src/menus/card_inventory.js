const card_inv = $("#card-inventory");
const card_holder = $("#card-holder")

card_inv.onclick = ()=>{
    card_inv.style.opacity = "0";
    card_inv.style.pointerEvents = "none";
}

const card_order = ["upgr0","upgr1", "upgr2", "upgr3", "minion0","minion1","minion2","minion3","minion4","minion5","lapis0"]

const find_card = (str)=>{
    for (let i = 0; i < cards.length; i++) {
        const c = cards[i];
        if (c.id == str) {
            return c;
        }
    }
}

const open_inv = ()=>{
    card_inv.style.opacity = "1";
    card_inv.style.pointerEvents = "auto";
    
    for (let i = 0; i < card_order.length; i++) {
        const str = card_order[i];
        if (data.cards[str] > 0) {
            const c = new Card(find_card(str));
            card_holder.insertAdjacentHTML("beforeend", c.html);
        }
    }
}

// open_inv();