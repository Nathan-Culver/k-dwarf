# K-Dwarf rule coverage — v0.1.0 alpha

This is a development build. “Implemented” below identifies working draft code; it does not establish that every exception, list, tactic, asset or rulebook interaction has been validated. The game can reach completion through the core systems, while the full source rules remain unfinished.

## Implemented and exercised

| System | Current behavior |
| --- | --- |
| Action dice | Five quality dice d4/d6/d8/d10/d12; three kept roots; fixed4+; canceling ADV/DIS; discard extras before recursive natural-maximum explosions; manual, physical entry or auto rolls; saved immutable batches |
| Combat outcomes | No effect, Pin, Suppression, Rout, Destruction at 0/1/2/3/4+; an explosion is necessary for Destruction; repeated Suppression does not kill |
| Initiative | Automatic qualifying failure/pass; shooting reactions and simultaneous pools; tie favors reactive side; context-scoped retention effects |
| Movement | Straight routes, first new terrain stopping, ready/prone requirements, group formation/LOS, drag routes, reactions at selected route point, withdrawal protected only inside initial feature |
| Shooting | Single/group/PC Command Fire; cover/prone/arcs/proximity penalties; weapon/armor modifiers and facings; HE/penetrating/incendiary profiles; mounted weapon pools at a common target; historical actual LOS rays |
| LOS | 2D base-edge rays, no unit blocking; terrain/smoke blocks; structures use center as specified. Finite ray solver limitations remain below |
| Rally/rout | Single/coordinated/command rally; commander/program modifiers; morale costs; compulsory rearward rout and rally; reserve handling; surrender while routing; Android/Drone cannot rout |
| Melee | Infantry charges, simultaneous per-stand attack bands, continued contact exchanges; commanders assist; defending vehicles include live crews and passengers |
| Morale/victory | Initial FMR; shared numeric/special deck; strategic loss strictly above FMR; objective control and domination at initiative start; special event choices, first-air-attack morale |
| Recon/deployment | Supremacy/bids/roll-off; recon and deployment markers; deployment restrictions; automatic legal edge setup; saveable pre-battle states |
| Army lists | Platoons, quality, specialist roles, attachments, generated commanders/crews; 23 weapon profiles,13 armor profiles; independent/armored units, extra weapons, armor facings, transport, cyberware, reserves, force import/export |
| Commands | Athenian 4 basic+9 advanced board; custom generic Orders; symbol costs; assignment; response priority and LIFO; characteristic, double-pool, morale, protection and retention effects; chosen morale returns |
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
- **LOS precision:** the solver checks base corners and edge midpoints. A very narrow gap requiring an interior point between these rays may be missed. Reaction-window partitioning and recon contact sampling also need an exact continuous-geometry audit. Actual chosen reaction points are rechecked; the drawn ray now matches resolution.
- **Specialists/programs:** deployment-time free engineer placement is not a dedicated setup step. Wipe can remove one marker per selected unit, but UI selection of arbitrary individual marker types and multiple targets is incomplete. Support-program cancellation and every program duration/Counterware combination need more coverage.
- **Double Skills:** Try Again rolls two independent attempts and applies the best outcome to one declared target/effect. Two independently targeted effects/programs are not implemented.
- **Hazards:** circular tokens approximate obstacle/mines footprints; they cannot yet link arbitrary feature edges. Mine hits occur when completing the affected movement segment, not in a dedicated adjustable interruption window. Hazard quality defaults to the placing engineer; vehicle attacks use a reduced pool. These are explicit draft interpretations requiring approval/audit.
- **Feats:** timing uses the skill/action response framework. Player choice for every feat target/card, especially Terrifying casualty propagation, needs additional source-level validation.
- **Concealment:** local hotseat/solo privacy is a UI convention. Exported saves and browser developer tools expose referee data. All deployment/contact/ambush edge cases and camouflage decoy repositioning are not certified.
- **AI:** core patrol battles complete in tests. AI does not use every specialist/covert action or build optimized armies; difficulty is not a validated strength rating. No online multiplayer.
- **Assets:** procedural native tabletop models replace physical representations. They are not an exhaustive reproduction of every unpublished faction board, card, sculpt, terrain token or illustration.

## Source precedence and open draft decisions

1. Nathan's latest direct instructions govern action dice and the five attack outcomes. Old variable targets and the old melee casualty table are superseded.
2. Main document body wins over Resources duplication and conflicting art. LOS ignores both sides' bases. Withdrawal allows reactions after exiting original terrain.
3. Main deck:9×1,20×2,20×4,9×5,12 specials. Distribution of specials is not specified; two each is an editable default. Embedded artwork implies a different deck and is not used.
4. Command face 1 is unspecified; it is blank. No physical Command Dice supply cap is specified.
5. Generic source weapon 4-die baseline becomes 3 kept roots; source profiles above 4 grant ADV; profiles below 4 keep their smaller printed pools, capped at 3. Promotions cannot reach Destruction without an explosion.
6. Take Cover/Drive are interpreted as extra defensive DIS while in terrain. Bad Cover removes one existing cover DIS. These effects follow main text rather than conflicting board art; exact Take Cover/Drive intent remains ambiguous.
7. Ordinary Heavy Armor has a price but no stated protection. No unstated benefit was invented. Attachment FMR, recon “near” distance, deployment-marker quotas and several special-event conversions remain interpretations.
8. Default recon quota is one deployment marker per recon marker (minimum one), and “near” is six base widths. Zero/one-success smoke remains through the opponent's following initiative to avoid being removed immediately on its compulsory initiative change.

See [validation](VALIDATION.md). The remaining list is a work ledger, not a promise that unlisted interactions have exhaustive certification.
