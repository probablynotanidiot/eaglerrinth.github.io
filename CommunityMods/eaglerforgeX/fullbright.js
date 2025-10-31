// 💎 Clean, simple, and instant X-Ray toggle
(function() {
    ModAPI.require("blocks");

    var enabled = false;
    var targets = [
        "diamond_block", "diamond_ore",
        "gold_block", "gold_ore",
        "iron_block", "iron_ore",
        "coal_block", "coal_ore",
        "emerald_block", "emerald_ore",
        "redstone_block", "redstone_ore",
        "lapis_block", "lapis_ore",
        "chest", "furnace", "lit_furnace", "ender_chest"
    ];

    var allBlocks = Object.keys(ModAPI.blocks);

    function enableXray() {
        ModAPI.displayToChat({msg: "X-Ray Enabled!"});
        allBlocks.forEach(block => {
            let blk = ModAPI.blocks[block];
            if (!blk) return;

            if (targets.includes(block)) {
                blk.noRender = false;
                blk.forceRender = true;
            } else if ("noRender" in blk) {
                blk.noRender = true;
                blk.forceRender = false;
            }
            blk.reload();
        });
        ModAPI.reloadchunks();
    }

    function disableXray() {
        ModAPI.displayToChat({msg: "X-Ray Disabled!"});
        allBlocks.forEach(block => {
            let blk = ModAPI.blocks[block];
            if (!blk) return;

            if ("noRender" in blk) {
                blk.noRender = false;
                blk.forceRender = false;
                blk.reload();
            }
        });
        ModAPI.reloadchunks();
    }

    // Toggle with "X" key (key code 88)
    ModAPI.addEventListener("key", function(ev) {
        if (ev.key == 88) { // "X" key
            enabled = !enabled;
            if (enabled) enableXray();
            else disableXray();
        }
    });
})();
