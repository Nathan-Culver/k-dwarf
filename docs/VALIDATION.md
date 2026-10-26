# Validation — 0.1.0 alpha

## Automated checks

`npm test`: 76 tests pass across five files:
- 18 core polyhedral dice/combat/recon/morale tests.
- 23 Orders specification tests.
- 16 nested save/import validation tests.
- 8 terrain/map tests.
- 11 cross-system integration tests covering real shot-ray endpoints, camouflage/discovery, program prevalidation/Counterware/control, vehicle crews/passengers, succession, scoped retention, double skill pools, protection and hazards.

`npm run build`: passes. Native ESM runtime and bundled Three.js are copied to static output.

`node tests/kd-campaigns.mjs`: three seeded patrol battles reach winners without errors, with periodic save/load. Results in [PLAYTHROUGHS.json](PLAYTHROUGHS.json). These small deterministic matches are smoke tests, not an exhaustive AI/rules audit.

## Browser checks

Observed in the browser against the current local build:
- 390×844 phone: no horizontal document overflow; visible map width 353 px.
- 844×390 landscape Full Screen: map 844×390, no horizontal document overflow, controls in drawers.
- Recon supremacy manual roll-off, marker locking, automatic legal markers/edge deployment, Begin Operation and manual Command Dice flow.
- Force Forge adds platoon and armored independent unit and returns to setup with updated totals.

The environment has WebGL disabled; visual verification uses the software 3D fallback. Hardware WebGL and actual Android/iOS gesture/orientation behavior remain unverified. Native fullscreen/orientation-lock permission is browser-dependent.

- Physical rally dice entered as 6,4,1,1; one die discarded, natural 6 explodes. Reopened the game in a new tab; it resumed the saved explosion batch with one previously recorded batch, then accepted 2 and cleared Suppression.

GitHub Pages deployment succeeded and the live 0.1.0 alpha interface was opened. Live hotseat setup reached battle through recon, marker placement and deployment. A final UI check found edge labels under the persistent top control bar; label placement was adjusted to reserve control margins.
