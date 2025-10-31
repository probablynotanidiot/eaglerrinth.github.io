ModAPI.require("settings");

(function() {
    var gamma = 1000;
    var normalGamma = 1;
    var toggled = false;

    function setGamma(value) {
        try {
            if ("gammaSetting" in ModAPI.settings)
                ModAPI.settings.gammaSetting = value;
            else if ("gamma" in ModAPI.settings)
                ModAPI.settings.gamma = value;
            else if (typeof ModAPI.settings.setGamma === "function")
                ModAPI.settings.setGamma(value);

            if (typeof ModAPI.settings.reload === "function")
                ModAPI.settings.reload();
        } catch(e) {
            console.error("[Fullbright] Failed to set gamma:", e);
        }
    }

    function notify(msg) {
        console.log("[Fullbright] " + msg);
    }

    function addButton() {
        try {
            var videoMenu = document.querySelector("#video-settings"); // adjust selector if needed
            if (!videoMenu) {
                console.warn("[Fullbright] Video settings menu not found, retrying...");
                setTimeout(addButton, 500);
                return;
            }

            var btn = document.createElement("button");
            btn.innerText = "Fullbright: OFF";
            btn.style.display = "block";
            btn.style.marginTop = "10px"; // spacing

            btn.onclick = function() {
                toggled = !toggled;
                if (toggled) {
                    setGamma(gamma);
                    btn.innerText = "Fullbright: ON";
                    notify("Enabled.");
                } else {
                    setGamma(normalGamma);
                    btn.innerText = "Fullbright: OFF";
                    notify("Disabled.");
                }
            };

            // Append at the bottom of the menu
            videoMenu.appendChild(btn);
            notify("Fullbright button added to video settings.");
        } catch(e) {
            console.error("[Fullbright] Failed to add button:", e);
        }
    }

    // Wait for ModAPI.settings and menu to be ready
    function waitUntilReady(callback) {
        if (ModAPI && ModAPI.settings) callback();
        else setTimeout(function() { waitUntilReady(callback); }, 500);
    }

    waitUntilReady(function() {
        setGamma(normalGamma);
        notify("Fullbright mod loaded. Use F key or button in settings.");
        addButton();

        document.addEventListener("keydown", function(ev) {
            if (ev.keyCode === 70) { // F key
                toggled = !toggled;
                if (toggled) setGamma(gamma);
                else setGamma(normalGamma);
            }
        });
    });
})();
