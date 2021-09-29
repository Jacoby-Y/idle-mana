const $ = (str, arrayify=true)=>{
    const beg = str[0];
    const end = str.length - 1;
    const rest = str.slice(1);
    if (beg == "#") {
        return document.getElementById(rest);
    } else if (beg == ".") {
        if (arrayify)
            return [].slice.call(document.getElementsByClassName(rest));
        return document.getElementsByClassName(rest);
    } else {
        if (arrayify)
            return [].slice.call(document.getElementsByTagName(str));
        return document.getElementsByTagName(str);
    }
}