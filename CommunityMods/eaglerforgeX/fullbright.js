// ⚡ Universal Fullbright Toggle for EaglerXForge
// Adds a toggle button in Video Settings to enable/disable fullbright

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
            // avoid obsolete reload
        } catch (e) {
            console.error("[Fullbright] Failed to set gamma:", e);
        }
    }

    function notify(msg) {
        console.log("[Fullbright] " + msg);
    }

    function waitUntilReady(callback) {
        if (ModAPI && ModAPI.settings && ModAPI.gui && ModAPI.gui.videoSettings) {
            callback();
        } else {
            setTimeout(function() { waitUntilReady(callback); }, 500);
        }
    }

    waitUntilReady(function() {
        setGamma(normalGamma);
        notify("Loaded! Fullbright toggle added to Video Settings.");

        // Inject a toggle into Video Settings
        var videoSettings = ModAPI.gui.videoSettings;

        if (!videoSettings.addButton) {
            console.warn("[Fullbright] Cannot find addButton in Video Settings.");
            return;
        }

        videoSettings.addButton("Fullbright", toggled ? "ON" : "OFF", function(button) {
            toggled = !toggled;
            if (toggled) {
                setGamma(gamma);
                button.setText("ON");
                notify("Enabled.");
            } else {
                setGamma(normalGamma);
                button.setText("OFF");
                notify("Disabled.");
            }
        });
    });
})();
