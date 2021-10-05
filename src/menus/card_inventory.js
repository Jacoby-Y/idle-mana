const card_inv = $("#card-inventory");

card_inv.onclick = ()=>{
    card_inv.style.opacity = "0";
    card_inv.style.pointerEvents = "none";
}

const open_inv = ()=>{
    card_inv.style.opacity = "1";
    card_inv.style.pointerEvents = "auto";
}

// open_inv();