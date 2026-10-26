# K-Dwarf: Operations — implementation checkpoint

The game is **not published or ready to play yet**. The execution workspace became unavailable during validation. This checkpoint preserves the agreed rules and the verified progress; it is not a completed release.

## Source and user decisions

Design document: https://docs.google.com/document/d/11W8BBr9D3J0fkVOdEOABGfhBlMCzVLUzG3uNhxfYPJM/edit

- Build a separate K-Dwarf game using the Crossfire 0.5.0 digital tabletop foundation.
- Adapt gameplay, rather than only changing visuals.
- Main rulebook body takes precedence over duplicated Resources text.
- LOS runs between base edges. Neither friendly nor enemy units block it.
- Withdrawal is protected inside its initial terrain, then allows reactive fire after exiting.

### Latest dice instruction — authoritative

Use d4, d6, d8, d10 and d12; a standard pool has **three dice**, and **4+** is a success.

| Successes | Attack result |
| --- | --- |
| 0 | No effect |
| 1 | Pinned |
| 2 | Suppressed |
| 3 | Routed |
| 4+ | Destroyed |

An explosion must be needed to have a chance of Destroyed. The new instruction supersedes the document's four-d12 pools and variable target numbers.

Implementation interpretations announced during the work:
- Irregular d4, Regular d6, Veteran d8, Elite d10, Super d12.
- A natural maximum explodes recursively.
- Advantage and Disadvantage cancel one-for-one. Roll extra dice, discard the relevant lowest/highest extras, then explode retained maximums.
- Normalize weapon profiles from the document's four-die baseline to three kept roots. Larger weapon pools contribute Advantage rather than four or more kept roots.
- Apply the new five attack bands to shooting and simultaneous melee. Do not import Crossfire's second-Suppression-kills rule or its earlier optional assault status boosts.

## Draft implementation state

The separate checkout was at /workspace/sites/k-dwarf. Crossfire's published repository was not changed.

Written draft files:
- data.js: five quality dice, 23 source weapon profiles, 13 armor profiles, specialists, sci-fi scenario names.
- catalog.js: source-derived weapon/armor/cost/Orders catalog.
- rolls.js: seeded polyhedral rolls, canceling advantage, discarded roots, recursive explosions, command symbols.
- army.js: force lists, organization, specialists, weapon/armor selection, commanders, mandatory crews, FMR and points.
- engine.js: recon bids/markers, deployment markers, movement/reactions, shooting firefights, rally, rout/reserve handling, smoke, simultaneous melee, morale/events, command assignment/response stack, specialist skills, programs and Counterware.
- dice.js: transactional manual/physical dice, immutable recorded batches, pending-save replay.
- app.js: responsive K-Dwarf console, Orders/Force/Command/Morale/Dispatch/Camera controls, dialogs, roster, force forge, map builder, saves, AI.
- models3d.js / tabletop.js / map.js: armored teams, vehicles, sci-fi structures, alien biome palette, objective overlays, routed markers.
- styles.css / index.html / manifest / service worker: sci-fi identity, mobile layout, landscape tabletop overlays and isolated K-Dwarf storage.
- tests/kdwarf.test.js and tests/kd-campaigns.mjs.

The source draft had not been pushed before the workspace disconnected. These files need recovery from the checkout when it becomes available; this repository currently contains only scaffolding and this checkpoint.

## Verified before disconnection

- Native build succeeded and a browser preview rendered the new interface.
- 18 automated engine tests passed, including all five dice, fixed 4+ target, recursive explosions, destruction requiring an explosion, discarded dice, manual-dice save/replay, damage bands, LOS, firing penalties, rally/morale, command response order and recon phases.
- Seeded patrol AI battles with repeated save/load completed:
  - Easy / Irregular: 36 steps, 22 actions, Blue winner.
  - Normal / Regular: 40 steps, 22 actions, Blue winner.
  - Hard / Veteran: 71 steps, 49 actions, Blue winner.
- The browser's GPU was disabled; the software 3D renderer showed the sci-fi tabletop.
- Later Counterware and modifier refinements passed the same 18 engine tests, but the latest changes still need a fresh build and browser regression checks.

## Remaining work before release

1. Recover the checkout; inspect the latest unpushed changes.
2. Finish/harden save validation for nested morale cards, commands, pending programs, arbitrary coordinates and recorded dice.
3. Check and correct remaining rule integrations:
   - correct actual base-edge ray endpoints in previews and recorded shots;
   - ensure routed markers and recon discs are drawn correctly;
   - armor/quality privacy in target previews;
   - command effect consumption, characteristic modifiers and double-skill semantics;
   - camouflage/decoy rendering and discovery;
   - passenger/crew consequences, engineer recovery and towed-weapon limits;
   - program timing, Counterware, possession expiry and UI/AI decisions.
4. Remove inherited Crossfire-only tests and obsolete documentation from the new checkout. Keep attribution and licenses.
5. Add source-coverage documentation that distinguishes implemented systems, unresolved draft data and incomplete automation. Do not claim exhaustive reproduction.
6. Add mobile/landscape browser harnesses covering full recon-to-battle setup, manual dice/explosions, reaction controls, force/maps, Orders and save/import.
7. Rebuild and run the current tests plus full-operation playthroughs. Inspect desktop/mobile visuals and runtime errors.
8. Push the finished reviewed source to Nathan-Culver/k-dwarf, enable GitHub Pages, verify live version, and capture screenshot proof.
9. Do not represent the README/scaffold or preview as the published playable game.

## Source ambiguities found

- Main text specifies a 70-card morale deck: 9x1, 20x2, 20x4, 9x5, 12 specials. It does not distribute the specials among six types. The draft uses configurable two-of-each.
- Embedded artwork implies a conflicting 106-card deck (including thirty 3s and three of each special). Main text is the chosen default.
- Command face 1 is unspecified; draft treats it as blank.
- Recovered faction board: **The Athenian Order**, 4 Basic + 9 Advanced Orders. Basic: Fire!, Charge!, Regroup!, Do it!. Advanced: Take Cover!, Bad Cover!, Command Control!, Try Again!, Fire at Will!, Incoming Intel!, Miss Fire!, Keep Firing!, Morale Break!.
- Main text wins conflicting artwork effects.
- Ordinary Heavy Armor has a cost but no explicit protection effect. Several attachment FMR values and weapon-mode costs/effects are incomplete.
- Source has no complete faction-board catalog or physical Command Dice supply cap.
- Recon deployment-marker count and “near” distance are not fully defined.
- The draft LOS edge solver checks corners and edge midpoints; narrow-gap visibility and reaction-window completeness need refinement.
- Full historical/faction completeness, secure network hidden information and exhaustive rule certification have not been established.
