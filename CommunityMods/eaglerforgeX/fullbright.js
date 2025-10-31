// 🔆 Fullbright Toggle for EaglerXForge (F key = 70)
// Works even if ModAPI.displayToChat or "load" event aren't available
ModAPI.require("settings");

(function() {
    var gamma = 1000;
    var normalGamma = 1;
    var toggled = false;

    function setGamma(value) {
        try {
            if ("gammaSetting" in ModAPI.settings) ModAPI.settings.gammaSetting = value;
            else if ("gamma" in ModAPI.settings) ModAPI.settings.gamma = value;
            else if (typeof ModAPI.settings.setGamma === "function") ModAPI.settings.setGamma(value);
            if (typeof ModAPI.settings.reload === "function") ModAPI.settings.reload();
        } catch (e) {
            console.error("[Fullbright] Failed to set gamma:", e);
        }
    }

    function notify(msg) {
        // Try chat, fallback to console if unavailable
        try {
            ModAPI.displayToChat({msg: msg});
        } catch {
            console.log("[Fullbright] " + msg);
        }
    }

    // Delay initialization slightly so settings exist
    setTimeout(function() {
        setGamma(normalGamma);
        notify("Fullbright script loaded. Press F to toggle.");

        ModAPI.addEventListener("key", function(ev) {
            if (ev.key === 70) { // F key
                toggled = !toggled;
                if (toggled) {
                    setGamma(gamma);
                    notify("Fullbright enabled!");
                } else {
                    setGamma(normalGamma);
                    notify("Fullbright disabled!");
                }
            }
        });
    }, 2000); // Wait 2 seconds after script load for API to initialize
})();
