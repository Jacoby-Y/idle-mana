data.cash = get_or("cash", 0);
data.stock = get_or("stock", 0);
data.max_stock = get_or("max_stock", 100);
data.stock_price = get_or("stock_price", 1);
data.sale_perc = get_or("sale_perc", 1);
data.manifest_perc = get_or("manifest_perc", 0);
data.mana_per = get_or("mana_per", 500);
data.stock_per = get_or("stock_per", 1);
data.market_index = get_or("market_index", 0);
data.market_perc = get_or("market_perc", 0);
data.dimensions = get_or("dimensions", 0);
data.shop_tool_tip = get_or("shop_tool_tip", "Default");
data.manifest_paused = true;

data.settings.sale_perc = { display(v) {
    sale_mask.css("width", `${Math.round(v)}%`);
    if (v>100) return "100.0";
    return v.toFixed(1);
} };
data.settings.max_stock = { display(v) {
    data.stock = data.stock;
    return v;
} };
data.settings.manifest_perc = { display(v) {
    manifest_mask.css("width", `${Math.round(v)}%`);
    if (v>100) return "100.0";
    return v.toFixed(1);
} };
data.settings.stock = { display(v) {
    if (v > data.max_stock) return `${data.max_stock} / ${data.max_stock}`;
    return `${v} / ${data.max_stock}`;
} };
data.settings.market_index = { display(v) {
    if (v >= market_entries.length-1) {
        data.dimensions++;
        return `${market_entries[market_entries.length-1]} (${data.dimensions})`;
    }
    return market_entries[v];
} };
data.settings.market_perc = { display(v) {
    if (v > 50) return v-1;
    return v;
} };

const upgr_click = {
    shop0(){
        data.max_stock = Math.round(100 * (1.2 * data.shop0_lvl)); 
        data.stock = data.stock;
    },
    shop1(){
        data.mana_per = Math.floor(data.mana_per * 0.92);
        // console.log(data.mana_per);
    },
    shop2(){

    },
    shop3(){

    },
    shop4(){
        const perc = get_ad_perc();
        if (perc == 0) data.market_index++;
        data.market_perc = perc;
        ad_mask.css("width", `${perc}%`);
        data.stock_price++;
    },
}

const market_entries = [
    "Hometown",
    "Neighboring towns",
    "Entire Province",
    "Entire Nation",
    "Neighboring Nations",
    "Entire Continent",
    "The Whole Realm",
    "Another Realm",
];

const shop_incr = {
    shop0: 1.2,
    shop1: 1.4,
    shop2: 1.1,
    shop3: 1.1,
    shop4: 1.1, 
};

const upgr_tip = [
    ()=> "Upgrades how much stock you can hold" ,
    ()=> "Decreases mana per tick to manifest stock" ,
    ()=> "How fast you can manifest stock" ,
    ()=> "How fast you sell stock and make money" ,
    ()=> "Increase your target market is\nand how much cash you get per stock" ,
];

const tool_tip_cui = cui.get("#hover-tip");

const back_to_main = cui.create("h3")
    .css_str(`
        position: absolute;
        right: 1rem;
        bottom: 4.5rem;
        border: 2px solid aqua;
        background-color: #121212;
        color: white;
        padding: 0.5rem 0.7rem;
    `).text("Go back")
    .on_hover(
        (self)=>{ self.css("border", "2px solid #00aeff") },
        (self)=>{  }
    )
    .parent($("#shop-wrapper"))
back_to_main.elem.onclick=()=>{
    const st = $("#main-wrapper").style;
    $("#shop-wrapper").style.transform = "translate(-100%, 0)";
    st.transform = "translate(0, 0)";
    
    setTimeout(() => {
        $("#shop-wrapper").style.opacity = "0";
        $("#shop-wrapper").style.display = "none";
        st.display = "block";
        st.pointerEvents = "auto";
    }, 1000);
};

const pause_manifest = cui.create("h3")
    .css_str(`
        position: absolute;
        right: 1rem;
        bottom: 1rem;
        border: 2px solid aqua;
        background-color: #121212;
        color: white;
        padding: 0.5rem 0.7rem;
    `).text("Continue Manifesting")
    .parent($("#shop-wrapper"))
pause_manifest.elem.onclick=()=>{
    data.manifest_paused = !data.manifest_paused;
    if (data.manifest_paused) pause_manifest.text("Continue Manifesting")
    else pause_manifest.text("Pause Manifesting")
};

//> Collection of upgrade buttons
const upgr_btns = cui.get_all(".btn-t3")
    .foreach((elem, i, self)=>{
        const cost = `shop${i}_cost`;
        const lvl = `shop${i}_lvl`;
        elem.elem.onclick = ()=>{
            if (data.cash >= data[cost]) {
                data.cash -= data[cost];
                data[lvl] += 1;
                data[cost] = Math.round(data[cost] * shop_incr[`shop${i}`]);
                upgr_click[`shop${i}`]();
            }
        }
        elem.on_hover(
            (self)=>{
                data.shop_tool_tip = upgr_tip[i]();
                tool_tip_cui.css("opacity", "1");
            },
            (self)=>{
                data.shop_tool_tip = upgr_tip[i]();
                tool_tip_cui.css("opacity", "0");
            }
        );
    });
//
//> Square masks
const ad_mask = cui.get("#market-mask");
//
const sale_mask = cui.get("#next-sale-mask");
sale_mask.elem.parentElement.onclick = ()=>{
    data.sale_perc += 10;
}
//
const manifest_mask = cui.get("#manifest-mask");
manifest_mask.elem.parentElement.onclick = ()=>{
    data.manifest_perc += 10;
}

//> Functions
const sell_stock = ()=>{
    if (data.stock > 0) {
        data.stock -= 1;
        data.cash += data.stock_price;
        return true;
    }
    return false
}
const get_ad_perc = ()=>{
    return Math.round((data.shop4_lvl % 8)/7*100);
}; ad_mask.css("width", `${get_ad_perc()}%`);

const tick_sales = ()=>{
    if (data.sale_perc >= 100) {
        if (sell_stock()) data.sale_perc -= 100;
        else data.sale_perc = 100;
        return;
    }
    data.sale_perc += 1 + (data.shop3_lvl*0.2);
}
const tick_manifest = ()=>{
    if (data.mana < data.mana_per || data.manifest_paused) return;
    if (data.manifest_perc < 100) {
        data.manifest_perc += 1 + (data.shop2_lvl*0.2);
        data.mana -= data.mana_per;
    }
    else if (data.stock < data.max_stock) {
        data.manifest_perc -= 100;
        data.stock += data.stock_per;
    } 
}

setInterval(() => {
    tick_sales();
    tick_manifest();
}, 1000/30);
