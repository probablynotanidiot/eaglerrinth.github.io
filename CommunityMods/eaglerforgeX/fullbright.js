// 🔆 Universal Fullbright Toggle for EaglerXForge
// Press F to toggle brightness instantly

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

    // simple logger to console instead of chat (chat GUI is null)
    function notify(msg) {
        console.log("[Fullbright] " + msg);
    }

    // Try to detect readiness by retrying until ModAPI.settings exists
    function waitUntilReady(callback) {
        if (ModAPI && ModAPI.settings) {
            callback();
        } else {
            setTimeout(function() { waitUntilReady(callback); }, 500);
        }
    }

    waitUntilReady(function() {
        setGamma(normalGamma);
        notify("Loaded! Press F to toggle fullbright.");

        ModAPI.addEventListener("key", function(ev) {
            if (ev.key === 70) { // F key
                toggled = !toggled;
                if (toggled) {
                    setGamma(gamma);
                    notify("Enabled.");
                } else {
                    setGamma(normalGamma);
                    notify("Disabled.");
                }
            }
        });
    });
})();
