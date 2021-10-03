/*
    Spell info:
    spell0: per click multiplier
    spell1: idle hold multiplier
    spell2: Minion power
    spell3: shop discout for # purchases
    spell4: cut spell cooldowns 
*/

const casts = {
    cast0: { cast(elem){ if (can_cast(this, elem)) { 
        cast_anim(elem, this);
        spell0_mult = 3;
    } }, post(){
        spell0_mult = 1;
    }, cooldown: 0.02, duration: 1, last: 0, running: false },

    cast1: { cast(elem){ if (can_cast(this, elem)) {
        cast_anim(elem, this);
        spell1_mult = 3;
    } }, post(){
        spell1_mult = 1;
    }, cooldown: 3, duration: 30, last: 0, running: false },

    cast2: { cast(elem){ if (can_cast(this, elem)) {
        cast_anim(elem, this);
        spell2_mult = 3;
    } }, post(){
        spell2_mult = 1;
    }, cooldown: 5, duration: 30, last: 0, running: false },

    cast3: { cast(elem){ if (can_cast(this, elem)) {
        cast_anim(elem, this);
    } }, post(){
        // ~
    }, cooldown: 10, duration: 30, last: 0, running: false },

    cast4: { cast(elem){ if (can_cast(this, elem)) {
        cast_anim(elem, this);
    } }, post(){
        // ~
    }, cooldown: 60, duration: 3, last: 0, running: false },
}
const cast_anim = (elem, obj)=>{
    const st = elem.children[0].style;
    st.transitionDuration = `${obj.duration}s`;
    st.clipPath = "polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)";
}
const can_cast = (obj, elem)=>{
    if (obj.running) return false;

    const now = Math.floor(Date.now()/1000);
    const ell = now - obj.last;

    if (ell < obj.cooldown*60) return false;

    obj.last = now;
    obj.running = true;

    setTimeout(() => {
        obj.running = false;
        const st = elem.children[0].style;
        st.transitionDuration = `${obj.cooldown*60}s`;
        st.clipPath = "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)";
        elem.children[1].style.display = "block";
        obj.post();
        setTimeout(() => {
            elem.children[1].style.display = "none";
        }, obj.cooldown*60*1000);
    }, obj.duration*1000);

    return true;
}

const cast_spell = (cast, elem)=>{
    casts[cast].cast(elem);
}