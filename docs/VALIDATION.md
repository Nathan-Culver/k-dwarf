# Validation — v0.3.0 alpha

## Automated verification

`npm test`: **170 passing tests**. This includes core actions, Orders, nested save validation, terrain, integrated rule interactions, all supplied player rulings, narrow-gap geometry, dice-table calculations/meshes/convex rigid bodies, automatic action-pool metadata and AI progression.

`npm run build`: passes. The native game modules, Three.js tabletop and standalone dice-table bundle are packaged for static hosting. Cannon-es is bundled locally, with its MIT license retained.

`node tests/kd-campaigns.mjs`: five seeded patrol battles reach winners without errors, with periodic portable save/load and exact Undo/Redo round trips:

| Difficulty | Quality | Decision steps | Game actions | Winner |
| --- | --- | ---: | ---: | --- |
| Easy | Irregular D4 | 70 | 38 | Blue |
| Normal | Regular D6 | 61 | 30 | Blue |
| Hard | Veteran D8 | 36 | 18 | Red |
| Hard | Elite D10 | 50 | 29 | Blue |
| Hard | Super D12 | 48 | 31 | Blue |

Twelve in-campaign Undo/Redo round trips restored identical game state, followed by validated portable save/import. Decision history reached its forty-entry bound without changing seeded outcomes. Results are in [PLAYTHROUGHS.json](PLAYTHROUGHS.json). The elite test exposed an AI pass loop near protected terrain and a charge endpoint that did not account for smaller commander bases. AI close assault/reserve choices and footprint-aware charge contact were fixed and given regression tests. These are bounded seeded playthroughs, not proof that every possible army/map matchup completes.

Geometry tests find open base-edge rays through gaps missed by all former corner/midpoint samples, and sub-millionth movement windows missed by101 fixed time samples. Whole-base exposure is evaluated across the route for fleeting-gap Disadvantage. Floating-point tolerance and explicit computation budgets remain documented in COVERAGE.md.

## Current interaction checks

- The player and AI each moved recon markers twice before contact; one finished side no longer ends the other side’s patrol.
- Enemy battle units advanced toward an uncaptured objective, paused for the player’s reaction, and changed position when the reaction was declined.
- Canvas paint instrumentation confirmed identical die labels in the final moving frame, settled frame, and result redraw.
- Game action dice use a transparent battlefield overlay with physical dice entry and cancellation before recording. Desktop and phone layouts were verified without JavaScript errors.

- Native browser fullscreen, in-place Force Forge and embedded rules, action-log search, and fullscreen exit were verified.
- Action-log drawers can open over an active dice sequence without recreating the dice canvas.
- Portrait 390×844 and landscape 844×390 play layouts have no horizontal overflow; the log drawer remains inside the viewport.
- Fullscreen helper tests cover hidden navigation requests, denied requests, optional orientation lock, and native exit; action-log tests cover filtering, escaping, and validated save/reload.

## Earlier Chrome UI checks

- Phone390×844: no horizontal document overflow; map353px wide; game dice dialog374px wide with no dialog overflow.
- Landscape844×390: no horizontal document or dice-dialog overflow; dialog828px wide. Full-screen battlefield controls were also checked at844×390.
- Manual game rally automatically prepares4D6, three kept with1 ADV. Entering6,4,1,1 displays3 kept/1 discarded and2 successes, then requests the retained six’s1D6 explosion.
- Opening the saved game in a new tab resumes that explosion, with the original batch already recorded. Entering2 completes the rally and clears Suppression, retaining initiative.
- Mixed free dice, rigid-body roll completion, visible per-die results, target totals, individual command-die selection, ability arming and held-trait activation were exercised.
- Explicit fixtures in tests/browser-qa.html navigate away before replacing the test save so pagehide autosave cannot overwrite the requested fixture.

The cloud browser has WebGL disabled; the tabletop uses its software fallback and the dice tray renders physical 3D meshes in software. Actual Android Chrome touch hardware, motion sensors, vibration, voice/audio output and native fullscreen/orientation permission behavior remain unverified. JSON import/export and malformed-save handling have programmatic coverage; the cloud browser file chooser stalled, so a new UI file-picker round-trip is not claimed.

## Scope

See [COVERAGE.md](COVERAGE.md), [DICE-ROLLER.md](DICE-ROLLER.md) and [PLAYER-RULINGS.md](PLAYER-RULINGS.md). The clarified rules and dice update do not complete every remaining K-Dwarf draft system. Individual command prices and authored faction/subfaction traits remain provisional for review.

## New version 0.3 checks

- Desktop Shift-click selected two friendly units; Command Fire generated two separately identified CROSSFIRE lines and persistent Dispatch entries to their shared target.
- Standard fire generated a persistent FIRED 0-0-recon / TARGET 1-0-recon pair with an animated directional tracer. Undo returned to the pending enemy response with an unhurt target and no firing record; Redo restored the exact Suppression and shot pair. AI stayed paused.
- Landscape full-screen 844×390 used the whole 844×390 viewport with no horizontal overflow; Undo/Redo remained reachable above the bottom camera controls.
- Phone 390×844 manual Rally prepared 4D6 / three kept / one Advantage. Physical faces 4,1,1,1 yielded one success. Undo/Redo preserved that batch and Resume Saved Dice proceeded to the opposing command-bowl roll without requesting or changing the accepted Rally faces. Finishing the bowl left Blue Pinned and automatically gave Red initiative two.
- Phone game dialog width was374px with no horizontal dialog overflow. Browser viewport and touch-sized layout were checked; physical touch hardware was not simulated.
- Automated checks cover standard/group/crossfire pair lifetimes, simultaneous opposing fire, reactive shots during a continuing move, concealed recon contacts, overlay escaping, mandatory low Rally/Skill and compulsory-Rally passes even with Heroism, branch truncation, bounded history, invalid paths, save migration, and accepted manual explosion batches.
- Searchable rules page finds the firing-marker procedure. The Word manual was rendered and all21 pages were inspected for readable text, table continuation, margins, and clipping. Runtime-derived tables include23 weapons,13 armors,13 terrain types, and38 command abilities/traits.

The rules review used local executable code only, without a PDF or external rulebook. Its observed discrepancies are in IMPLEMENTED-RULES.md. Documentation does not silently change those pre-existing mechanics.

Recon independence regression: both factions can move out of friendly marker LOS, including when that friendly marker is already locked. Existing enemy-contact locking tests still pass.

LOS display verification: all nine blocking terrain types reject direct shots in both directions when both stands are outside; smoke blocks as well. Direct firing markers use straight legal rays, and convex/concave terrain clipping keeps visible geometry inside rules footprints. Chrome verified blocking woods, named/highlighted blockers, and rejected declarations in 2D and 3D. An independent rectangle-intersection audit verified 1,706 clear witnesses across 2,500 randomized fields without finding a ray through an intervening blocker. This does not establish that the user’s exact reported saved position has been reproduced.

Firing-effects QA: trajectory tests cover fast straight projectiles, arcing indirect projectiles, brief flash timing, drifting/expanding smoke and complete burst termination. Chrome/WebGL verified the scene-space burst becomes active and finishes without JavaScript errors. Reduced-motion settings suppress animated scene effects.


## Interaction performance update (2026-10-28)

Selection, targeting and tool-button updates retain the 3D viewport, canvas and GPU scene. Unchanged state no longer clones retained history entries. Shadow maps refresh when stands or terrain change, status meshes are cached, and static terrain matrices are frozen. Camera wheel events coalesce per animation frame. Gunfire frames update the 3D effects without rebuilding the static SVG overlay or labels. Dice trajectory planning yields to input in small batches; playback uses requestAnimationFrame and wall-clock time, while face numbering and accepted results stay fixed.

Touch devices cap rendering at 1.25 device pixels per CSS pixel and use 1024px shadow maps, compared with the previous 1.6 cap and 2048px shadows. HUD backdrop blur is disabled for coarse pointers. These reduce mobile rendering cost without changing game rules or miniature geometry.

Local Chrome, 1280×900, seeded patrol fixture, 4× CPU throttling, before/after samples:

| Synchronous input handler | Previous | Updated |
| --- | ---: | ---: |
| Select miniature (8 samples) | 19.5–57.8 ms | 2.6–7.5 ms |
| Move/LOS/fire tool (4 samples) | 19.5–20.9 ms | 2.4–3.4 ms |
| Pass initiative (4 samples) | 29.0–42.0 ms | 19.3–35.5 ms |

These are local samples, not an Android hardware benchmark or a frame-rate guarantee. Browser checks verify persistent viewport identity across selection/tool changes, 50 wheel events coalescing into one overlay update, real drag/drop followed by reaction completion, windowed controls, repeated patrol movement, LOS blocker displays, fullscreen HUD/log/Forge/rules, and stable dice results. Responsive Chrome touch emulation checks phone layout and touch interactions; physical-device validation remains necessary.
