# K-Dwarf: Operations

Nathan Culver's science-fiction tabletop browser game, adapted from his K-Dwarf design document using the [Crossfire digital tabletop](https://github.com/Nathan-Culver/crossfire) foundation.

**Version 0.1.0 alpha.** The core operation can reach a victory result. This is an unfinished implementation, with [explicit rule coverage and remaining work](docs/COVERAGE.md). It is not an exhaustive or certified reproduction of the draft.

## Play

GitHub Pages is intended to serve this repository's root. Until hosting is enabled, run the local build below.

1. Open **Operations → New operation**. Choose solo Easy/Normal/Hard or same-device hotseat.
2. Use **Force Forge** to build both forces and **Battlefield fabrication** to draw terrain, generate a map, or load one of ten saved maps.
3. Resolve recon supremacy, move/lock recon markers, place deployment markers, and deploy. Legal automatic marker/edge arrangement is available.
4. Begin the operation. Select a friendly team, then an enemy to plan fire. Choose **Declare fire**; the opponent gets its reaction before rolls resolve.
5. Drag ready teams for movement and a route preview. Shift-click or touch **Multi** selects groups. Pending reactions, routs and special cards appear in **Orders**.

**Dice:** Irregular d4, Regular d6, Veteran d8, Elite d10, Super d12. Three kept action dice; each 4+ succeeds. A retained maximum explodes recursively. Attack successes 0/1/2/3/4+ cause no effect/Pin/Suppression/Rout/Destruction. Destruction requires an explosion. Advantage cancels Disadvantage, then extra roots are discarded before explosions. Command dice and recon roll-offs use their own displayed procedures.

**Saves:** automatic local save, separate checkpoint, portable JSON export/import, saved manual-dice batches, and separate force/map files. Browser storage belongs to the device/browser; export a file to move it. Saves contain referee/private force information and are not encrypted.

**Camera:** Full Screen keeps controls in translucent drawers. Two fingers pan/pinch/twist; desktop right-drag orbits, Space/middle-drag pans, WASD pans, Q/E rotates, R/F tilts. Camera tab offers projection, rotation, tilt and height. Native fullscreen/orientation lock depends on browser support.

Question-mark buttons open contextual help. **Field Manual** explains the current action rules and links to the coverage ledger.

## Development

```sh
npm ci
npm test
node tests/kd-campaigns.mjs
npm run build
```

Native ES modules and locally bundled Three.js; no runtime CDN. Root files and `dist/` are equivalent static builds. `npm test` contains K-Dwarf tests only. `tests/browser-qa.html` provides explicit development fixtures for phone, landscape and desktop checks; it replaces the test origin's autosave when opened.

The source document is [K-dwarf: Operations](https://docs.google.com/document/d/11W8BBr9D3J0fkVOdEOABGfhBlMCzVLUzG3uNhxfYPJM/edit). Nathan's later direct dice instructions take priority over its old four-d12 tables. [Adaptation decisions](docs/KDWARF-DECISIONS.md) and [validation evidence](docs/VALIDATION.md) distinguish tested behavior from unfinished rules. Crossfire's published repository remains unchanged.

Third-party library notices: [Three.js](vendor/THREE-LICENSE.txt).
