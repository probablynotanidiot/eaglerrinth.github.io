// 🔆 Fullbright setting for EaglerXForge
ModAPI.require("settings");

(function() {
    var gammaOn = 1000;
    var gammaOff = 1;
    var key = "fullbrightEnabled"; // setting name key

    // Register a new checkbox in Video Settings
    ModAPI.addSetting({
        category: "video",
        name: "Fullbright",
        description: "Makes the world fully bright even in darkness.",
        key: key,
        type: "toggle",
        default: false,
        onChange: function(enabled) {
            try {
                ModAPI.settings.gammaSetting = enabled ? gammaOn : gammaOff;
                if (typeof ModAPI.settings.reload === "function")
                    ModAPI.settings.reload();
                console.log("[Fullbright] " + (enabled ? "Enabled" : "Disabled"));
            } catch (e) {
                console.error("[Fullbright] Error applying gamma:", e);
            }
        }
    });

    // Apply state on load
    try {
        var enabled = ModAPI.getSetting(key);
        ModAPI.settings.gammaSetting = enabled ? gammaOn : gammaOff;
        if (typeof ModAPI.settings.reload === "function")
            ModAPI.settings.reload();
    } catch (e) {
        console.error("[Fullbright] Initialization failed:", e);
    }
})();
