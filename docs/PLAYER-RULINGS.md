# Player rulings — implemented clarification rounds

These are Nathan Culver's direct rulings. They override conflicting draft text and previous implementation interpretations. The v0.2.0 implementation and targeted tests exercise these rulings. This does not certify every remaining source-rule exception.

## Round 1: Orders and smoke

- Take Cover! and Drive!: incoming shooting against the selected friendly unit in terrain suffers one additional Disadvantage.
- Try Again!: both separately resolved attempts must use the same Skill and the same target.
- Zero/one-success smoke: expires at the start of the placing player's next initiative, remaining through the opponent's initiative.

## Round 2: Camouflage and decoys

- Real and decoy markers may move independently using normal movement restrictions.
- Revealing the real unit leaves its decoy on the table until separately discovered or voluntarily removed.
- Successfully re-entering camouflage replaces the miniature with a real marker plus a new decoy; remove any previous decoy belonging to that unit.

## Round 3: Crews, passengers and recovery

- In melee, only the directly targeted vehicle, crew or passenger receives the hit. Do not propagate a vehicle melee hit to its passengers.
- Boarding/dismounting allows direct base contact or one intermediate friendly unit in base contact with the transport; no longer chains.
- Medic/engineer/hacker recovery applies each of its two pools in sequence. Two one-success pools clear Suppression through Pinned to Ready.

## Round 4: Narrow-gap LOS and movement reactions

- Any unobstructed base-edge-to-base-edge ray establishes LOS, however narrow the open gap. Apply the rulebook's one Disadvantage for a moving target glimpsed through a gap too narrow to show its whole base.
- Multiple reactions may occur along one enemy unit's declared movement route. Each reacting unit may participate only once during that move.

## Round 5: Armor, morale and command-board direction

- Ordinary Heavy Armor: costs 3 points and imposes one Disadvantage on incoming shooting; no melee bonus.
- Special morale deck: exactly two copies each of Air Attack, Mine Strike, Heroism, Confusion, Ammunition Low and Breakdown.
- Redesign command boards for the new polyhedral dice system. They should manage faction/subfaction-themed abilities and basic battle-themed abilities, inspired by the combination of army identity and stratagem-style abilities. The old d12 symbol table, including face 1, is not an approved final design. Resource generation, activation and passive/active structure are still being clarified.

## Round 6: Command-board redesign

- Use a mixed command dice bowl contributed by eligible commanders and troops; every contributor uses its own quality die (Irregular d4, Regular d6, Veteran d8, Elite d10, Super d12). Larger forces supply more dice; elite forces supply better die types.
- Assign successful dice directly to ability slots. Stronger abilities require more dice. Natural maximum results explode. Do not replace this with a Command Point currency.
- The bowl resets after all dice are used, rather than automatically replacing the bowl each initiative. At the start of the player's initiative, the player may discard one die of their choice.
- Every command-board ability requires activation by spending command dice. Some innate faction/subfaction abilities cost one success and remain active for as long as a die remains placed on them.
- Contribution counts, failed-roll handling and committed-trait dice/refill interaction remain under clarification.

## Round 7: Command contributions, failures and refresh blockers

- Each eligible troop unit and each commander contributes exactly one command die of its own quality.
- Command rolls below 4 are immediately spent/discarded. Only successful dice remain available for assignment.
- A command bowl cannot reset while any die remains committed to an ongoing ability; those dice must also be removed or used.

## Round 8: Ability pricing, authored content and validation

- Reprice each ability individually by effect and duration. Basic abilities usually cost one successful die; stronger abilities cost more. Do not mechanically translate old rarity symbols to fixed costs.
- Draft original faction/subfaction abilities where undefined, clearly label them provisional for review, and preserve already-defined abilities.
- Prioritize Android with Chrome for layout, touch controls and save-file validation.

## Implementation status

The rulings above are implemented in v0.2.0, including sequential repeated Skills/Counterware windows, two sequential recovery pools, independent reusable decoys, direct melee target damage, bounded transport chains, route-wide fleeting exposure, per-unit movement reactions, armor, smoke expiry, fixed special-card distribution and the mixed command bowl.

New individual command prices and authored faction/subfaction traits remain explicitly provisional for review. See COMMAND-BOARDS.md. Remaining source coverage is tracked separately in COVERAGE.md; additional broad questions are not needed to use the rulings already supplied.

## Recon independence — 28 October 2026

Friendly recon markers do not need to see each other. Their movement is independent; remove the friendly recon LOS-chain requirement. Enemy-contact locking, terrain-route rules, and alternating patrol turns still apply.
