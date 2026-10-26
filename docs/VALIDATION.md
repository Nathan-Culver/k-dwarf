# Validation — v0.2.0 alpha

## Automated verification

`npm test`: **121 passing tests across nine files**. This includes core actions, Orders, nested save validation, terrain, integrated rule interactions, all supplied player rulings, narrow-gap geometry, dice-table calculations/meshes/convex rigid bodies, automatic action-pool metadata and AI progression.

`npm run build`: passes. The native game modules, Three.js tabletop and standalone dice-table bundle are packaged for static hosting. Cannon-es is bundled locally, with its MIT license retained.

`node tests/kd-campaigns.mjs`: five seeded patrol battles reach winners without errors, with periodic portable save/load:

| Difficulty | Quality | Decision steps | Game actions | Winner |
| --- | --- | ---: | ---: | --- |
| Easy | Irregular D4 | 38 | 17 | Red |
| Normal | Regular D6 | 76 | 47 | Blue |
| Hard | Veteran D8 | 49 | 27 | Blue |
| Hard | Elite D10 | 61 | 32 | Red |
| Hard | Super D12 | 23 | 11 | Blue |

Results are in [PLAYTHROUGHS.json](PLAYTHROUGHS.json). The elite test exposed an AI pass loop near protected terrain and a charge endpoint that did not account for smaller commander bases. AI close assault/reserve choices and footprint-aware charge contact were fixed and given regression tests. These are bounded seeded playthroughs, not proof that every possible army/map matchup completes.

Geometry tests find open base-edge rays through gaps missed by all former corner/midpoint samples, and sub-millionth movement windows missed by101 fixed time samples. Whole-base exposure is evaluated across the route for fleeting-gap Disadvantage. Floating-point tolerance and explicit computation budgets remain documented in COVERAGE.md.

## Chrome UI checks

- Phone390×844: no horizontal document overflow; map353px wide; game dice dialog374px wide with no dialog overflow.
- Landscape844×390: no horizontal document or dice-dialog overflow; dialog828px wide. Full-screen battlefield controls were also checked at844×390.
- Manual game rally automatically prepares4D6, three kept with1 ADV. Entering6,4,1,1 displays3 kept/1 discarded and2 successes, then requests the retained six’s1D6 explosion.
- Opening the saved game in a new tab resumes that explosion, with the original batch already recorded. Entering2 completes the rally and clears Suppression, retaining initiative.
- Mixed free dice, rigid-body roll completion, visible per-die results, target totals, individual command-die selection, ability arming and held-trait activation were exercised.
- Explicit fixtures in tests/browser-qa.html navigate away before replacing the test save so pagehide autosave cannot overwrite the requested fixture.

The cloud browser has WebGL disabled; the tabletop uses its software fallback and the dice tray renders physical 3D meshes in software. Actual Android Chrome touch hardware, motion sensors, vibration, voice/audio output and native fullscreen/orientation permission behavior remain unverified. JSON import/export and malformed-save handling have programmatic coverage; the cloud browser file chooser stalled, so a new UI file-picker round-trip is not claimed.

## Scope

See [COVERAGE.md](COVERAGE.md), [DICE-ROLLER.md](DICE-ROLLER.md) and [PLAYER-RULINGS.md](PLAYER-RULINGS.md). The clarified rules and dice update do not complete every remaining K-Dwarf draft system. Individual command prices and authored faction/subfaction traits remain provisional for review.
