const VERSION = "v0.8";

$("#version").innerText = VERSION;
data.version = get_or("version", VERSION);
data.offline = get_or("offline", Math.floor(Date.now()/1000));

if (data.version != VERSION) {
    // do something, it's a new version!
    data.version = VERSION;
}