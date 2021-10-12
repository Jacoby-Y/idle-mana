data.hold_time = get_or("hold_time", 1000); defaults.hold_time = 1000; 
let spell0_mult = 1;
let spell1_mult = 1;

const polygon = {
    full: "polygon(100% 0px, 0px 0px, 0px 100%, 100% 100%)",
    clipped: "polygon(0px 0px, 0px 0px, 0px 100%, 0% 100%)",
}
const hold_bar_end = function(){
    if (this.style["clip-path"] == polygon.full) {
        data.mana += data.upgr2_lvl * spell1_mult * (1+(data.cards.upgr2 * 0.05));
        if (data.mana >= data.max_mana) data.mana = data.max_mana;

        // const rand = Math.floor(Math.random() * (101 - 1) + 1);
        // if (rand <= data.cards.upgr3) {
        //     data.mana += data.upgr2_lvl*2;
        // }

        let chance = data.cards.upgr3;
        while (chance > 0) {
            const rand = Math.floor(Math.random() * (101 - 1) + 1);
            if (rand <= chance) {
                data.mana += data.upgr2_lvl*2;
                chance -= 100;
                continue;
            }
            break;
        }

        this.style.transitionDuration = "0s";
        this.style["clip-path"] = polygon.clipped;
        setTimeout(() => {
            this.style.transitionDuration = `${data.hold_time}ms`;
            this.style["clip-path"] = polygon.full;
        }, 10);
    }
}

const main_orb = cui.create("div")
    .css_str(`
        background: radial-gradient(rgb(0, 215, 215) 0%, rgb(0, 235, 235) 50%, rgb(0, 255, 255) 100%); 
        box-shadow: 0px 0px 15px 5px rgba(0, 219, 219, .75);
        border-radius: 50%; 
        height: 40vh; width: 40vh; 
        position: absolute;
        left: 50%; top: 50%;
        transform: translate(-50%, -50%);
        transition-duration: 1s;
    `)
    .prop("last_held", 0)
    .on_hover(
        (self)=>{ hold_bar.elem.ontransitionend = hold_bar_end; hold_bar_wrapper.css("opacity", "1"); },
        (self)=>{ hold_bar.elem.ontransitionend = null; hold_bar_wrapper.css("opacity", "0"); }, false
    )
    .on_active((self)=>{
        if (data.mana + data.upgr0_lvl <= data.max_mana){
            const card_bonus = 1+(data.cards.upgr0 * 0.05);
            data.mana += data.upgr0_lvl * spell0_mult * card_bonus;
        }
        else data.mana = data.max_mana;
    
        let chance = data.upgr1_lvl
        while (chance > 0) {
            const rand = Math.floor(Math.random() * (101 - 1) + 1);
            if (rand <= chance) {
                data.mana += (data.upgr0_lvl * 2) * (1+(data.cards.upgr1 * 0.25));
                chance -= 100;
                continue;
            }
            break;
        }

        self.css("transform", "translate(-50%, -50%) scale(0.9)");
        self.data.last_held = Date.now();
        setTimeout(() => {
            if (self.data.last_held == 0) return;
            if (Date.now() - self.data.last_held >= data.hold_time) {
                hold_bar.css("transition-duration", `${data.hold_time}ms`);
                hold_bar.css("clip-path", polygon.full);
            }
        }, data.hold_time);
    }, (self)=>{ 
        self.data.last_held = 0; 
        hold_bar.css("clip-path", polygon.clipped);
    }).parent($("#main-wrapper"));
//

const hold_bar_wrapper = cui.create("div")
    .css_str(`
        border: 2px solid #00d9d9; 
        border-radius: 10px; 
        height: 1rem; width: 5rem; 
        position: absolute;
        left: 50%; top: 25%;
        transform: translate(-50%, -50%);
        overflow: hidden;
        transition-duration: 0.5s;
        opacity: 0;
    `).parent($("#main-wrapper"));
//

const hold_bar = cui.create("div")
    .css_str(`
        background-color: aqua;
        width: 100%; height: 100%;
        clip-path: polygon(0px 0px, 0px 0px, 0px 100%, 0% 100%);
        transition-duration: ${data.hold_time}ms;
    `).parent(hold_bar_wrapper);
// 