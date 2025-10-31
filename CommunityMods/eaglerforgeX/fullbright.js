ModAPI.require("settings");

var gamma = 1000;
var normalGamma = 1;
var toggled = true;

// Wait until the client fully loads
ModAPI.addEventListener("load", function() {
    // Start with fullbright enabled
    ModAPI.settings.gammaSetting = gamma;
    try {
        ModAPI.displayToChat({ msg: "§eFullbright enabled!" });
    } catch (e) {
        console.log("[Fullbright] Chat not ready, skipping message:", e);
    }

    // Listen for key press (F = 70)
    ModAPI.addEventListener("key", function(ev) {
        if (ev.key === 70) {
            if (!toggled) {
                ModAPI.settings.gammaSetting = gamma;
                ModAPI.displayToChat({ msg: "§eFullbright enabled!" });
                toggled = true;
            } else {
                ModAPI.settings.gammaSetting = normalGamma;
                ModAPI.displayToChat({ msg: "§cFullbright disabled!" });
                toggled = false;
            }
        }
    });
});
