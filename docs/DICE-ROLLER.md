# Dice table — v0.2.0

Open **Operations → 3D dice table / bags & presets**. Every manual game roll opens the same table with its required pool already prepared. Automatic rolls remain available; the Dispatch panel can reopen the last result in the tray.

The visual direction and feature checklist reference [Fantasy Dice — 3D Dice Roller by Acid Sheep Games](https://play.google.com/store/apps/details?id=com.AcidSheepGames.FantasyDice&hl=en_US), inspected October 26, 2026. K-Dwarf uses original interface/art, browser voices, generated ambient sound and its own rules. It does not contain that app's proprietary skins, recordings, music library or purchase catalog, and undisclosed app-specific options are not claimed to be identical.

| Feature | Implementation |
| --- | --- |
| 3D physical dice | Original convex D4/D6/D8/D10/D12/D20 meshes; Cannon-es rigid bodies, floor, walls, friction, angular motion, collisions and impact sound; software rendering works without WebGL |
| D2 / D100 | Coin; percentile tens/ones D10 pair, with 00 interpreted as100 |
| Game pools | Engine supplies the exact type, count, target, characteristic modifier, ADV/DIS retention and next explosion batch for shooting, melee, Skills, rally, smoke, reactions, command bowls and recon roll-offs |
| Protected results | Game batch is committed and saved before its animation. Dragging, holding, changing a skin or reloading cannot reroll accepted game results. Physics randomness affects visual motion only; upper-face labels are mapped to the authoritative accepted values |
| Kept / discarded | Discard extra ADV/DIS roots before retained maxima explode; show kept/discarded count, dim discarded dice, request each subsequent explosion batch |
| Free dice | Mix D2,D4,D6,D8,D10,D12,D20,D100; +/- counts, per-entry colors, held dice, unheld rerolls, recursive explosions; free rolls do not alter the battle |
| Custom dice | Choose a supported shape and comma-separated face labels with optional numeric values, e.g. Miss=0,Pin=1,Suppress=2 |
| Calculations | Sum, target hits, highest, lowest, drop highest/lowest, keep highest/lowest, modifier and target; summary also shows sum/high/low/hits |
| Bags | 30 local named presets, save/load/delete, JSON bag import/export with validation |
| Boards / finishes | Arcane, wood, velvet, starship; obsidian, bone, copper, crystal; custom die and ink colors |
| Audio | Generated impact sounds, volume, device text-to-speech voice selection, 32 synthesized ambient score settings; no external audio request |
| Motion | Separate shake-to-roll and tilt-gravity switches; deliberate sensor enabling; drag and tap/hold; optional vibration; reduced-motion preference respected |
| History | Last30 local rolls, detailed individual values and summaries, clear history |
| Large game bowls | Every required die resolves; page visual displays in groups of64 to keep mobile performance practical. Free bags have120-root limit and explicit runaway-explosion guards |

Sensors, vibration, speech voices and autoplay permission depend on device/browser support. Actual Android motion sensors, audio output and native orientation locking have not been hardware-tested in the cloud browser. Software dice geometry, physical contacts, computations, saved batches and responsive Chrome UI have targeted checks.

The original game save format remains separate from dice-bag files. Normal v0.1 battles migrate to v0.2 with battle progress preserved and obsolete symbol-command resources cleared. A legacy save with already accepted old-style command rolls is rejected explicitly, rather than silently changing those rolls.

Third-party components: Three.js and Cannon-es0.20.0, MIT licenses in `vendor/`. Cannon-es is bundled for offline use; no runtime CDN is required.
