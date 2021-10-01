document.body.onclick = (e)=>{
    if (e.target == document.body) {
        poppup_wrapper.innerHTML = "";
        poppup_wrapper.style.opacity = "0";

        if (menu_out)
            menu_btn.onclick();
    }
}