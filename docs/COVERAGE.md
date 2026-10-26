# K-Dwarf rule coverage — v0.2.0 alpha

This is a development build. “Implemented” below identifies working draft code; it does not establish that every exception, list, tactic, asset or rulebook interaction has been validated. The game can reach completion through the core systems, while the full source rules remain unfinished.

## Implemented and exercised

| System | Current behavior |
| --- | --- |
| Action dice | Five quality dice d4/d6/d8/d10/d12; three kept roots; fixed4+; canceling ADV/DIS; discard extras before recursive natural-maximum explosions; manual, physical entry or auto rolls; saved immutable batches; automatic game-pool setup in a customizable 3D rigid-body dice table, free D2–D100, bags, custom faces, audio/voice, optional shake/tilt |
| Combat outcomes | No effect, Pin, Suppression, Rout, Destruction at 0/1/2/3/4+; an explosion is necessary for Destruction; repeated Suppression does not kill |
| Initiative | Automatic qualifying failure/pass; shooting reactions and simultaneous pools; tie favors reactive side; context-scoped retention effects |
| Movement | Straight routes, first new terrain stopping, ready/prone requirements, group formation/LOS, drag routes, several reactions along a route, each unit once per moving unit, withdrawal protected only inside initial feature |
| Shooting | Single/group/PC Command Fire; cover/prone/arcs/proximity penalties; weapon/armor modifiers and facings; HE/penetrating/incendiary profiles; mounted weapon pools at a common target; historical actual LOS rays |
| LOS | 2D base-edge rays, no unit blocking; terrain/smoke blocks; structures use center as specified. Continuous critical-event search; numerical limits remain below |
| Rally/rout | Single/coordinated/command rally; commander/program modifiers; morale costs; compulsory rearward rout and rally; reserve handling; surrender while routing; Android/Drone cannot rout |
| Melee | Infantry charges, simultaneous per-stand attack bands, continued contact exchanges; commanders assist; defending vehicles include live crews and passengers |
| Morale/victory | Initial FMR; shared numeric/special deck; strategic loss strictly above FMR; objective control and domination at initiative start; special event choices, first-air-attack morale |
| Recon/deployment | Supremacy/bids/roll-off; recon and deployment markers; deployment restrictions; automatic legal edge setup; saveable pre-battle states |
| Army lists | Platoons, quality, specialist roles, attachments, generated commanders/crews; 23 weapon profiles,13 armor profiles; independent/armored units, extra weapons, armor facings, transport, cyberware, reserves, force import/export |
| Commands | Athenian 4 basic+9 advanced board; mixed d4–d12 success bowl; individual provisional prices; optional provisional faction/subfaction held-die traits; assignment; response priority and LIFO; characteristic, double-pool, morale, protection and retention effects; chosen morale returns |
| Specialists | Medic/engineer recovery, hazards/demolition, observer/battery calls, discovery/camouflage, drops/reserve arrival, repeaters, modules/programs/Counterware, possession expiry, commander feats and casualty succession |
| Physical table | Painted sci-fi models, 2D/3D views, smoke/status/NO FIRE markers, referee adjustments, program/repeater/hazard indicators, camera pan/orbit/zoom and landscape drawers |
| Persistence/AI | Autosave/checkpoint/export/import; nested schema validation;10 local map slots; seeded Easy/Normal/Hard core AI with different coordination/evaluation/recovery behavior |

## Incomplete or only partially integrated

These items must not be described as fully available:

- **Pre-battle special operations:** total-supremacy Assassination, Espionage, Outflank, Sabotage, Subterfuge and Surveillance selection/resolution is not implemented.
- **Initial Bombardment:** the special pre-first-initiative observer bombardment sequence is not implemented. Ordinary in-battle indirect fire exists.
- **Organization:** sergeants, commander reassignment and the rule that an unattached heavy weapon/vehicle replaces a basic platoon unit are not fully represented. Several force costs/FMR combinations require audit; extra weapon costs do not yet distinguish every mounted-type surcharge.
- **Group actions:** command Skills across multiple stands and all source group/command movement subgroups need work. Melee support chains beyond direct contact/structure occupants are incomplete.
- **Weapons:** separate targets per mounted weapon are not selectable. Attachment alternate modes, permanent/off-table battery targeting restrictions, counter-battery fire and towing endpoints/capacity need a full audit. The source old4→new 3 root conversion is an adaptation, not an unchanged probability distribution.
- **Terrain:** room count is metadata and total capacity, without individually drawn rooms or per-room occupancy. Fortification entry/exit-side restrictions, ground-floor access, detailed elevation exceptions and source prohibition on every possible opposite-edge LOS corridor are not fully enforced.
- **LOS numerical limits:** continuous critical-event partitions replace corner/midpoint and fixed-step sampling. An open ray establishes LOS; whole-base visibility is checked across the route for fleeting-gap DIS. Floating-point tolerance is1e-9 coordinate units, not exact arithmetic. Complex work-budget exhaustion produces an explicit adjudication error, never a silently blocked ray. Degenerate overlapping polygons and every terrain/elevation exception are not exhaustively certified. Recon marker contact still uses its earlier step sampling.
- **Specialists/programs:** deployment-time free engineer placement is not a dedicated setup step. Wipe now chooses particular markers and up to two targets with the appropriate successes; cancelling a caster’s support marker is free. Two recovery pools apply sequentially, and Try Again repeats the same Skill/target in sequence, with separate Counterware windows. Source-wide program exceptions still need additional coverage.
- **Hazards:** circular tokens approximate obstacle/mines footprints; they cannot yet link arbitrary feature edges. Mine hits occur when completing the affected movement segment, not in a dedicated adjustable interruption window. Hazard quality defaults to the placing engineer; vehicle attacks use a reduced pool. These are explicit draft interpretations requiring approval/audit.
- **Feats:** timing uses the skill/action response framework. Player choice for every feat target/card, especially Terrifying casualty propagation, needs additional source-level validation.
- **Concealment:** local hotseat/solo privacy is a UI convention. Exported saves and browser developer tools expose referee data. Independent decoy movement, persistence after revelation, voluntary removal and replacement on recamouflage are implemented; all deployment/contact/ambush exceptions are not certified.
- **AI:** core patrol battles complete in tests. AI does not use every specialist/covert action or build optimized armies; difficulty is not a validated strength rating. No online multiplayer.
- **Assets:** procedural native tabletop models replace physical representations. They are not an exhaustive reproduction of every unpublished faction board, card, sculpt, terrain token or illustration.

## Source precedence and open draft decisions

1. Nathan's latest direct instructions govern action dice and the five attack outcomes. Old variable targets and the old melee casualty table are superseded.
2. Main document body wins over Resources duplication and conflicting art. LOS ignores both sides' bases. Withdrawal allows reactions after exiting original terrain.
3. Main deck:9×1,20×2,20×4,9×5,12 specials. Exactly two each of six specials follows Nathan’s ruling. Embedded artwork implies a different deck and is not used.
4. The retired command symbol table is superseded by mixed quality dice, fixed4+, recursive maxima, direct success assignment and refill blockers. Individual prices and authored traits are provisional.
5. Generic source weapon 4-die baseline becomes 3 kept roots; source profiles above 4 grant ADV; profiles below 4 keep their smaller printed pools, capped at 3. Promotions cannot reach Destruction without an explosion.
6. Take Cover/Drive are interpreted as extra defensive DIS while in terrain. Bad Cover removes one existing cover DIS. These effects follow Nathan’s explicit ruling; target protection imposes one extra incoming shooting DIS while in terrain.
7. Ordinary Heavy Armor costs3 and imposes one incoming shooting DIS, with no melee bonus, per Nathan’s ruling. Attachment FMR, recon “near” distance, deployment-marker quotas and several special-event conversions remain interpretations.
8. Default recon quota is one deployment marker per recon marker (minimum one), and “near” is six base widths. Zero/one-success smoke remains through the opponent's following initiative to avoid being removed immediately on its compulsory initiative change.

See [validation](VALIDATION.md). The remaining list is a work ledger, not a promise that unlisted interactions have exhaustive certification.

See [player rulings](PLAYER-RULINGS.md), [provisional command boards](COMMAND-BOARDS.md), and [dice table](DICE-ROLLER.md). This update resolves the supplied clarification rounds; the remaining source systems above are still unfinished.
