class CuiCollection {
    constructor(items=[]) {
        this.items = items;
        for (let i = 0; i < items.length; i++) {
            const elem = items[i];
            this[i] = elem;
        }
        this.length = items.length;
    }
    foreach(func) {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            func( new CuiItem(item), i, this );
        }
        return this;
    }
    index(i) {
        if (i >= this.items.length) return undefined;
        return new CuiItem(this.items[i]);
    }
}
class CuiItem {
    constructor(elem=new HTMLElement()) {
        this.elem = elem;
        this.css_cache = [];
        this.pause_cache = false;
        this.data = {};
        
        return this;
    }

    //> CSS
    css(prop, val) {
        if (prop == "size" && val instanceof Array && val.length == 2) {
            this.elem.style.width = val[0];
            if (!this.pause_cache && val[0] != "") this.css_cache.push( { prop: "width", val: val[0] } )
            this.elem.style.height = val[1];
            if (!this.pause_cache && val[1] != "") this.css_cache.push( { prop: "height", val: val[1] } )
            return this;
        } 
        else if (prop == "place" && val instanceof Array && val.length == 4) {
            // this.elem.style.position = "absolute";
            this.elem.style.top = val[0];
            if (!this.pause_cache && val[0] != "") this.css_cache.push( { prop: "top", val: val[0] } )
            this.elem.style.right = val[1];
            if (!this.pause_cache && val[1] != "") this.css_cache.push( { prop: "right", val: val[1] } )
            this.elem.style.bottom = val[2];
            if (!this.pause_cache && val[2] != "") this.css_cache.push( { prop: "bottom", val: val[2] } )
            this.elem.style.left = val[3];
            if (!this.pause_cache && val[3] != "") this.css_cache.push( { prop: "left", val: val[3] } )
            return this;
        } 
        else {
            this.elem.style[prop] = val;
        }
        
        if (!this.pause_cache) this.css_cache.push( {prop: prop, val: val} );

        return this;
    }
    css_str(str="") {
        if (typeof str != "string") return this;

        if (str == "") {
            let total = "";
            for (let i = 0; i < this.css_cache.length; i++) {
                const c = this.css_cache[i];
                total += `${c.prop}: ${c.val}; `;
            }
            return total;
        }

        const parts = str.split(";");

        if (parts[0] == str || !str.includes(":")) return this;

        for (const part of parts) {
            const part_trim = part.trim();
            if (part_trim == "") continue;

            if (!part_trim.includes(":")) continue;

            const prop_val = part_trim.split(":");
            if (prop_val.length != 2) continue;

            const prop = prop_val[0].trim();
            const val = prop_val[1].trim();

            this.css( prop, val );
        }

        return this;
    }
    clear_cache() {
        this.css_cache = [];
        return this;
    }
    revert_css() {
        /** Loads css to last css_cache */
        for (let i = 0; i < this.css_cache.length; i++) {
            const css = this.css_cache[i];
            this.css(css.prop, css.val);
        }
        return this;
    }

    //> hierarchy 
    parent(elem=document.body) {
        if (elem instanceof CuiItem) {
            elem.elem.appendChild(this.elem);
        } else if (elem instanceof HTMLElement) {
            elem.appendChild(this.elem);
        } else if (elem == null) {
            if (this.elem.parentElement != null) {
                this.elem.parentElement.removeChild(this.elem);
            }
        }
        else {
            console.warn("CuiItem.parent() argument must be of type CuiItem, HTMLElement, or null");
        }
        return this;
    }
    abandon(amount=0) {
        if (typeof amount != "number" || amount < 0) return this;
        if (amount == 0) {
            while (this.elem.firstChild) {
                this.elem.removeChild(this.elem.firstChild);
            }
        } else {
            while (this.elem.firstChild && amount > 0) {
                this.elem.removeChild(this.elem.firstChild);
                amount--;
            }
        }
        return this;
    }
    adopt(elem=new HTMLElement()) {
        if (elem instanceof HTMLElement) this.elem.appendChild(elem);
        else if (elem instanceof CuiItem) this.elem.appendChild(elem.elem);
        return this;
    }

    //> Mouse Events
    on_hover(enter=()=>{}, leave=()=>{}, revert=true) {
        this.elem.onmouseenter = ()=>{
            if (revert) this.pause_cache = true;
            enter(this);
        };
        this.elem.onmouseleave = ()=>{
            leave(this);
            if (revert) { this.revert_css(); this.pause_cache = false; }
        };
        return this;
    }
    on_click(callback=()=>{}) {
        this.elem.onclick = ()=>{
            callback(this);
        }
        return this;
    }
    on_active(down=()=>{}, up=()=>{}) {
        this.elem.onmousedown = ()=>{
            this.pause_cache = true;
            down(this);
        };
        this.elem.onmouseup = ()=>{
            up(this);
            this.revert_css();
            this.pause_cache = false;
        };
        return this;
    }

    //> HTML things
    set_att(name, val) {
        this.elem.setAttribute(name, val);
        return this;
    }
    add_class(name) {
        this.elem.classList.add(name);
        return this;
    }
    set_id(val) {
        this.elem.id = val;
        return this;
    }
    text(str) {
        this.elem.innerText = str;
        return this;
    }
    html(str) {
        this.elem.innerHTML = str;
        return this;
    }

    //> Element info
    width() { return this.elem.clientWidth; }
    height() { return this.elem.clientHeight; }
    
    //> Styling functions
    fadeout(t=1, callback=()=>{}) {
        this.elem.style.transitionDuration = `${t}s`;
        this.elem.style.opacity = "0";
        this.elem.ontransitionend = function(){
            callback();
            this.elem.ontransitionend = null;
        }
        return this;
    }
    fadein(t=1, callback=()=>{}) {
        this.elem.style.transitionDuration = `${t}s`;
        this.elem.style.opacity = "1";
        this.elem.ontransitionend = function(){
            callback();
            this.elem.ontransitionend = null;
        }
        return this;
    }

    //> Data
    prop(key="", val=null) {
        if (key == "" || typeof key != "string") return this;
        if (val == null) return this.data[key];
        else this.data[key] = val;
        return this;
    }
}
class EventRunner {
    constructor() {
        this.waits = [];
        this.callbacks = [];
    }
    wait(t=1000) {
        if (typeof t != "number") return;
        this.waits.push(t);
        return this;
    }
    callback(func=()=>{}) {
        if (typeof func != "function") return;
        this.callbacks.push(func);
        return this;
    }
    run() {
        if (this.waits.length != this.callbacks.length) {
            console.warn("The amount of wait values and callbacks must be equal before running!");
            return;
        }
        let total = 0;
        for (let i = 0; i < this.waits.length; i++) {
            const wait = this.waits[i];
            const call = this.callbacks[i];

            total += wait;
            setTimeout(call, total);
        }
    }
}

const cui = {
    get_all(str="body") {
        /** Get's all elements that match the query */
        if (typeof str != "string" || str == "") return;
        
        return new CuiCollection([].slice.call(document.querySelectorAll(str)));
    },
    get(str="body") {
        /** Get's the first element that matches the query */
        if (typeof str != "string" || str == "") return;
        
        const elem = document.querySelector(str);
        return new CuiItem(elem);
    },
    create(tag="div") {
        return new CuiItem(document.createElement(tag));
    },
}