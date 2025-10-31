ModAPI.require("settings");

var gamma = 1000;
var normalGamma = 1;
var toggled = true;

// Start with fullbright on
ModAPI.settings.gammaSetting = gamma;
ModAPI.displayToChat({msg: "Fullbright enabled!"});

// Listen for key press events
ModAPI.addEventListener("key", function(ev) {
    // F key has keyCode 70
    if (ev.key == 70) {
        if (!toggled) {
            ModAPI.settings.gammaSetting = gamma;
            ModAPI.displayToChat({msg: "Fullbright enabled!"});
            toggled = true;
        } else {
            ModAPI.settings.gammaSetting = normalGamma;
            ModAPI.displayToChat({msg: "Fullbright disabled!"});
            toggled = false;
        }
    }
});
