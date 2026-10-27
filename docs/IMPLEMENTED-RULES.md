# K Dwarf Implemented Game Rules

Version 0.3.0 • Player review edition • 27 October 2026

This manual describes the rules enforced by the current browser game. It was written by examining the executable game, its runtime data, controls, and save behavior. No PDF, external rulebook, or design document was consulted for this manual. Read it as a description of what the game currently does. The final section identifies incomplete systems and behavior that needs your ruling or a correction.

The operation supports solo play against Easy, Normal, or Hard AI and same-device hotseat play. Each side builds a force, resolves reconnaissance and deployment, then takes an open-ended sequence of actions while it holds initiative. Victory comes from objectives, morale, domination, or elimination. There is no fixed round limit.

## Playing an operation

Open Operations to create an operation, choose forces and battlefield, set AI difficulty, and choose manual or automatic dice. Blue is the human side in solo play. Force Forge builds lists; the battlefield builder creates or generates maps. You can save up to ten maps locally and import or export force, map, and game files separately.

Resolve any pending instruction in Orders before declaring something new. Recon bids, deployment, command responses, reactions, manual dice, compulsory routs, smoke placement, morale cards, and melee each have their own decisions. Passing an ordinary initiative is unavailable while one of those decisions requires resolution.

Select a friendly miniature or its Force entry, then an enemy miniature to plan fire. Declare fire and resolve the opponent's response. To move, drag a Ready unit and inspect its route, or choose Move and tap the endpoint. Shift-click selects multiple friendly units; touch Multi enables group selection. Hold a friendly unit for contextual choices. Selecting a target does not itself roll dice or resolve an attack.

Full Screen keeps the map and translucent drawers together. Camera controls provide Move, Pan, Orbit, Fit, Focus, overhead view, projection, yaw, tilt, and height. Two fingers pan and pinch; twisting rotates. Desktop right-drag orbits, Space or middle-drag pans, WASD pans, Q and E rotate, R and F tilt. Native fullscreen and orientation lock depend on browser support. Visual terrain and miniatures illustrate the underlying two-dimensional rules geometry.

## Dice and success categories

|Quality|Action die|Points|FMR contribution|
|---|---|---|---|
|Irregular|d4|1|2|
|Regular|d6|3|3|
|Veteran|d8|5|4|
|Elite|d10|7|5|
|Super|d12|9|5|

The normal action pool keeps three root dice of the unit's quality. Some weapon profiles keep one or two. A kept face of 4 or more is one success. A characteristic modifier changes the success test on each face; it does not change the natural face used to decide explosions.

Cancel Advantage and Disadvantage one for one. Roll one extra root die for each remaining Advantage or Disadvantage. With Advantage keep the highest base number; with Disadvantage keep the lowest. The engine limits net Advantage or Disadvantage to twenty. Discard extras before resolving explosions.

Every retained natural maximum generates another die of the same type. That die also scores on 4+ and explodes if it is a natural maximum. Discarded maximums do not explode. Explosion dice add to the result and are not put through the original keep-three choice. The engine stops chains beyond one hundred batches. A d4 therefore succeeds and explodes only on its natural 4 before characteristic modifiers.

|Attack successes|Result on the directly attacked unit|
|---|---|
|0|No effect|
|1|Pin if currently Ready|
|2|Suppress and make nonvehicles Prone|
|3|Rout; Androids and Drones are Suppressed instead|
|4 or more|Destroy|

Standard shooting and melee cap their attack category at Rout unless there was an explosion batch. With an explosion the cap is Destroy. Weapon category promotions can increase a category before that cap. Some specialist and special-card damage uses a separate success-to-hit path; those exceptions are listed later.

Results are categories rather than additive damage points. Two separate Suppression results do not automatically destroy a unit. A Routed unit receiving a positive hit while moving surrenders.

### Rolling at the table

With Auto-roll off, each game-required pool appears in the dice tray with its exact count, die type, keep rule, modifiers, and purpose. A single declared action may require several batches: roots, explosions, another participant, a recovery pool, a command contribution, or a repeated attempt. Resolve all required batches before judging the completed action.

Accepted faces are saved before visual animation finishes. Dragging or tossing an accepted die does not change its result. Reloading resumes the saved roll sequence. Undo and Redo can restore that sequence, including the exact accepted faces; resuming restored dice continues from those faces.

The separate free-roll table supports d2, d4, d6, d8, d10, d12, d20, and d100; mixed bags, colors, custom face labels and values, held dice, bag import and export, optional exploding maximums, target successes, sum, highest, lowest, dropping one high or low, and keeping a chosen number high or low. A free bag holds up to 120 root dice. Free rolls do not resolve game actions. Board styles, lighting, sound, voice, ambience, shake, and tilt are preferences; motion and audio require browser support or permission. These are the implemented controls, not a claim that every feature of another dice application exists here.

## Initiative and action order

Initiative is permission for one side to declare ordinary actions. Successful actions can keep it for further actions. Ordinary failed shooting and melee may pass it, subject to the contested-resolution rules below. Voluntary Pass gives it to the other side when no compulsory decision prevents passing.

**A completed rolled Rally or Skill with zero or one success automatically loses initiative.** Two or more retains it. This mandatory rule overrides retention effects, including Heroism and commander retention feats. A one-success Skill can achieve its effect and still pass initiative. A one-success Rally can improve the unit and still pass initiative.

For coordinated Rally the best participant pool determines whether initiative passes. For two-pool specialist recovery, apply both recovery effects in sequence and use the better pool for initiative. Try Again resolves its two attempts in sequence using the same Skill and target, then uses the best attempt. These sequences finish before the mandatory pass is checked. Two one-success recovery pools may turn Suppressed into Ready but still lose initiative.

A reaction is performed by the side that does not currently hold initiative. A failed reactive Rally or Skill leaves initiative with its current holder; it does not give a new initiative to the already-active opponent. Reactive Rally with two successes can flag the moving side to lose initiative at movement resolution. Automatic Rally has no roll and uses its morale cost instead of the low-roll rule.

At the beginning of every new initiative, the game replaces eligible lost commanders, expires timed fields and markers, clears both sides' NO FIRE, NO RALLY, NO SKILL, and NO COUNTERWARE locks, resets the active side's advanced ability usage, checks command-bowl refill, opens its optional discard, queues due Air Attacks, and checks start-of-initiative victory conditions.

## Force building and morale rating

A force has one to twenty platoons. Each platoon contains three or four basic teams and up to two attachments. Basic roles are infantry, assault, recon, forward observer, medic, engineer, and hacker. Attachments and up to thirty independent entries also allow support weapons, heavy weapons, indirect batteries, androids, vehicles, and drones. A company number is one through five; each company holds at most four platoons.

Every platoon receives a Platoon Commander. A company with at least two platoons receives a Company Commander. At least four distinct companies produce a Battalion Commander. Leadership is PC 2, CC 3, BC 4, plus one for an upgraded commander where that profile field reaches the generated unit.

At most half the basic platoon slots may be reserves. A basic reserve slot cannot be Recon. Reserve attachments and independents are not currently included in that restriction. Androids and Drones are forced to Elite. Elite, Super, powered armor, Android status, or an explicit flag grants special-operations status. Drones also qualify because they are forced to Elite.

Vehicle, Heavy, and Indirect units, plus heavy-category HMG units, generate a separate off-table crew. The crew uses the original quality, Rifle, and no armor. It is priced separately and receives no reserve discount.

A noncommander's points add quality, infantry armor, weapon, specialist upgrade, main weapon type, facing armor, extra weapons, transport, and explicit adjustments. Reserve units other than generated crew subtract one point. Its FMR adds quality, armor, main weapon, specialist, two for Android or Vehicle or Drone, transport's minus one, and explicit adjustments. Commander points are twice the quality index minus two, plus two if leadership upgraded: Irregular minus two, Regular zero, Veteran two, Elite four, Super six. Commander FMR is its leadership value.

|Specialist upgrade|Points added|FMR adjustment|
|---|---|---|
|Recon|1|minus 1|
|Forward observer|2|minus 2|
|Medic|2|minus 1|
|Engineer|2|minus 1|
|Hacker|2|minus 2|

Ballistic, Laser, and Microwave main weapon types cost zero; Gauss, Plasma, and Gamma cost one; Missile five; Antimatter seven. Explosive is accepted with zero type surcharge. Matching armor vulnerabilities are separate from these prices.

Vehicle and Drone facing levels zero to five cost respectively 0, 0, 1, 3, 5, 7 per facing. Android levels zero to three cost 0, 1, 3, 5. Vehicle defaults are front two and sides, rear, top one. Android defaults are front one and rear one; an unspecified attacked face falls back to rear. Transport capacity two, four, or six costs one, three, or five points and subtracts one FMR. Up to four extra weapons are accepted; their weapon points are added.

Initial force morale rating is the sum of generated units' FMR, including reserves and crews, with a minimum of one. It does not shrink as units are lost. The budget display warns when a list is over budget, but currently does not prohibit starting with it. Additional costing and profile-propagation gaps are explicitly listed under Review items.

## Battlefield and terrain

Maps support square, rectangular, circular, oval, hexagonal, and custom convex boundaries. Width is 600 to 3000 table units and depth 600 to 2400. Square and circle use equal dimensions; circle and oval use 64 boundary points. Custom boundaries have three to twenty-four vertices, are simple and convex, and have area at least 240000 square table units. One base unit is 32 table units. Whole-base containment, not miniature appearance, governs playable edges.

A map holds at most sixty nonoverlapping terrain polygons. Each has three to 128 vertices. The generator normally builds thirty features and two neutral Installation building objectives. At most two designated building objectives are accepted. Deployment zones may use any supported edge with depth ten to fifty percent or a custom polygon. The manual recon and placement procedures still assume west and east in several checks; see Review items.

Ordinary area terrain has capacity four to twenty and area at least four bases. Fortifications hold one or two with area at least two bases. Buildings normally hold two; explicit room counts one to ten allow at most two capacity per room. Room counts are aggregate limits, not individually occupied tactical rooms. Obstacles hold one to twenty with area at least one base. Resizing clips features to the boundary and discards fragments that cannot meet validation.

|Feature|Blocks LOS|Protection|Capacity minimum / maximum / default|
|---|---|---|---|
|Ruins|Yes|direct|4 / 20 / 8|
|Building / rooms|Yes|all|1 / 20 / 2|
|Fortification|Yes|all|1 / 2 / 2|
|Hill|Yes|direct|4 / 20 / 8|
|Woods|Yes|all|4 / 20 / 8|
|High field|Yes|direct|4 / 20 / 8|
|Low field|No|direct|4 / 20 / 8|
|High barrier|Yes|direct|1 / 20 / 2|
|Low barrier|No|direct|1 / 20 / 2|
|Rough ground|No|all|4 / 20 / 8|
|Depression|No|depression|4 / 20 / 8|
|Bocage|Yes|direct|1 / 20 / 2|
|Hedge|Yes|direct|1 / 20 / 2|

Protection marked direct is ignored by indirect fire. All-type cover also affects indirect fire. Depression gives zero numeric cover but prohibits shooting at its occupants unless the direct firer, or indirect observer, occupies a Hill. Default numeric cover is one Disadvantage for every non-depression feature, including Buildings and Fortifications. A custom numeric cover value overrides it.

Smoke blocks LOS but adds no ordinary cover benefit. Roads are decorative or map metadata in the current rules engine. No global map check guarantees that every edge-to-edge sightline is obstructed.

## Reconnaissance and deployment

More deployed Recon units wins recon supremacy. Equal counts require bids from zero to twenty. The higher bidder wins and draws that many morale cards at battle start. Equal bids draw one morale card each immediately and roll d12 until unequal; higher wins. These roll-offs use their own procedure rather than the ordinary quality pool.

Recon markers alternate movement. If another friendly marker exists, a moving marker must retain LOS to a friendly marker. It follows terrain-route restrictions and locks at the first detected enemy LOS. This recon-only contact search samples one hundred and one positions along the route. Finish or lock reconnaissance to proceed to deployment markers.

Each side places at least one deployment marker, otherwise as many as its Recon markers. Alternate starting with the supremacy winner. A marker must be behind at least one friendly Recon marker along its west/east direction and in terrain, or within two bases of a table edge. These markers become capturable objectives.

Unit placement uses the side's own edge or terrain within six bases behind a friendly deployment marker. Recon units may also use their Recon markers. Bases may not overlap. Automatic edge arrangement is available. Beginning battle sets the initiative sequence; the player without supremacy draws a morale card. If no deployment objectives exist, two neutral fallback objectives are created. Deployed Hackers create repeaters. Camouflaged special operators receive their decoys.

The three scenario names change briefing and map-generation presentation; they do not implement three wholly different victory systems. Defaults use a generated 1300 by 1300 square and opposing west/east deployment zones at twenty-five percent.

## Movement and positions

Ordinary movement requires a deployed Ready unit that is not Prone. Choose a straight-line destination with its full base on the table. There is no fixed numerical movement allowance in the current engine. Terrain entry, collision, reactions, and the chosen endpoint constrain the move. A move stops in the first new terrain feature entered; route validation rejects crossing through terrain to a later endpoint.

Pinned or Suppressed units must Rally before moving. Prone units must stand before ordinary movement. Prone, Stand, and Pivot are separate position actions; Hug changes posture in place. Permanent batteries and towed weapons may only pivot independently. A limbered weapon follows its towing vehicle and cannot fire.

A friendly base may not overlap the destination. Ordinary movement may not enter a revealed enemy base; use Melee. Terrain capacity at the endpoint counts friendly noncommanders. The current group check tests endpoints against the other members' old positions, which can reject an otherwise sensible relocation.

Group movement uses one platoon. Included commanders must command the other members. Every member must initially see every other member, and final positions must form an unbroken friendly LOS chain. Declare all endpoints together, then resolve each member's movement and reactions in sequence. Selecting several units alone does not bypass these checks.

Withdrawal requires ordinary infantry, whole-base starting terrain, and a direction into its rear half. Androids, Vehicles, and Drones cannot withdraw. Reactive fire is withheld while the withdrawing base remains within its starting feature; it becomes available once the unit leaves.

Intact barriers block vehicles. Infantry approaching wire must stop at contact, then cross in a new move; vehicles clear wire when their route contacts it. Mines and other movement hazards are applied at route completion in the current engine. Movement reveals the mover, reveals hidden enemies in the entered feature, and captures an objective within one base; the previous enemy owner draws morale.

## Line of sight and reactions

LOS uses two-dimensional base edges. Any unobstructed open edge-to-edge ray establishes LOS, however narrow the opening. Friendly and enemy bases do not block LOS. Intervening blocking terrain and smoke do. Structures use their defined center-origin behavior; decorative individual trees, roofs, soldiers, or three-dimensional heights do not replace the terrain polygons.

Battle movement exposure uses continuous geometric partitions rather than a coarse sequence of visible sample positions. Tangency alone is not an open ray. Floating-point tolerance applies. If a work limit prevents a reliable geometric answer, the system reports the case for adjudication instead of silently inventing an unobstructed ray.

During an enemy move, choose a point along the still-unresolved exposed route. Each reacting unit may participate once during that mover's declaration. More than one unit may react at different positions, and group fire uses each participant's allowance. A single action's continuation after a reaction is still the same declared move.

Options are fire, move, Rally, Skill, or decline. Reactive movement is applied immediately and does not open another nested movement reaction window. A moving target that never presents its entire base during the route gives one additional shooting Disadvantage for fleeting visibility through a narrow gap.

Reactive fire with zero hits lets the mover continue. One or more stops it at the selected point. Two or more also flags the moving side to lose initiative after resolution. A reactive firer with fewer than two hits receives NO FIRE for the rest of the initiative. A zero-result reactive Rally sets NO RALLY; a zero-result reactive Skill sets NO SKILL. These locks clear when the next initiative starts. Reactive Counterware has its own lock described below.

A direct shooting declaration also offers a response. Fire creates a simultaneous firefight. Move, Rally, or Skill resolves that response before the attacking fire proceeds. Decline permits the declared attack.

## Shooting and firing identifiers

A firing unit must be deployed, alive, not surrendered, not abandoned or limbered, and neither Suppressed nor Routed. Commanders cannot initiate ordinary shooting. Pinned units may fire. Targets must be revealed enemy units with legal LOS. Camouflaged contacts must be discovered before ordinary direct targeting.

Single Fire uses one firer. Group Fire needs at least two same-platoon firers with mutual LOS. Command Fire, displayed as crossfire in some controls, needs same-platoon firers and a Platoon Commander able to see the target and every firer. Isolation and Static prevent coordination. Every firer rolls its own pool against the one declared target. Ordinary armored attackers fire their main and extra mounted weapons; reactive attacks use one selected or main weapon.

The engine converts catalog weapon source profiles to at most three base dice. Source 1, 2, or 3 means that many base dice; source 4 means three; source 5 means three with one Advantage; source 6 means three with two Advantage; source 8 means three with four Advantage. Named weapon Advantages are additional.

Close weapon profiles apply in melee or when both bases are wholly inside their respective terrain features. The current implementation does not require those features to be the same. Building-specific shotgun overrides apply when both units occupy Buildings. See the weapon reference for source values and special profiles.

### Shooting modifiers

Cover contributes its numeric Disadvantage, except direct-only cover is ignored by indirect fire. A Prone target imposes one Disadvantage, or two for reactive fire. Shooting outside the firing arc gives one Disadvantage rather than forbidding the shot. Half-arcs are forty-five degrees for hull-mounted Vehicles, Heavy, Indirect, and HMG; ninety degrees for turret Vehicles and ordinary infantry.

Shooting a farther target than the nearest eligible revealed enemy gives one Disadvantage in nonreactive fire. Sniper weapons ignore that penalty. This is a penalty, not a compulsory closest-target prohibition. A Suppressed enemy is still an eligible target and can still be counted as closest; the current K Dwarf variant registry does not offer a separate ignore-suppressed toggle.

A Vehicle target gives one Disadvantage while an eligible ordinary infantry target exists. An ordinary infantry target gives one Disadvantage to antiarmor weapons while an eligible Vehicle target exists. Matching armor vulnerabilities give the attacker one Advantage; None armor matches every weapon type. Heavy and powered armor impose their incoming shooting Disadvantage.

Vehicle, Drone, and Android facing armor gives additional Disadvantage: front when the firer is within forty-five degrees of the target's facing, rear beyond 135 degrees, sides otherwise; indirect uses top. Missing facing values fall back to rear. Explosive main weapon type gives one Advantage and Antimatter two. Isolation imposes one Disadvantage; Assist grants one Advantage. A hidden reactive ambush from the target's feature grants one Advantage. Weapon rules, command abilities, and the fleeting-gap rule modify the same net pool.

### Firefight and initiative

Roll both sides' shot batches before applying them. Apply every recorded attack even if its firer is subsequently removed by the simultaneous opposing batch. If both sides' best attack categories are below Suppress, repeat the exchange, to a safety limit of 150 rounds. A declined response supplies no defending shots.

The defender wins qualifying ties. The attacker retains initiative when its best category is at least Suppress and it is not equaled or exceeded by a qualifying defender. Otherwise initiative passes, unless an applicable nonmandatory retention effect prevents it. Repeated-fire Orders currently duplicate weapon pools into the same simultaneous batch rather than resolving distinct sequential attacks.

### Persistent firing markers

Standard fire, Group Fire, Command Fire or crossfire, recon by fire, reactive fire, and indirect fire create directional animated lines, muzzle and impact effects, and clear FIRED and TARGET identifiers. Each firer-to-target pair remains until either unit begins its next action. Unrelated units acting and a change of initiative do not remove it. A target merely taking a hit has not taken an action. Continuing a move that was already declared before a reactive shot does not clear that shot.

Group and crossfire display every firer's own line. If one firer acts again, only pairs involving that unit disappear. Repeated shots in one action aggregate their shot count. Destroyed targets retain an impact identifier at their last location. Recon marks its attacked area and any revealed contacts, without revealing undiscovered enemy identities or causing damage. Shot-line visibility can be toggled without deleting the saved records. Reduced-motion preference keeps static identifiers and arrows.

## Recon by fire and smoke

Recon by fire selects eligible friendly shooters and a terrain feature whose center they can see. Each rolls separately with two Disadvantage. The best result of two or more reveals enemies and removes decoys in that feature. No damage is applied. With an enemy actually present, two successes retain initiative; with an empty feature, three are needed. Feature knowledge is recorded even on a failed result.

A Commander, Forward Observer, or smoke-capable weapon can call smoke onto a visible point. Do not intentionally place its center within half a base of a friendly unit. Commander and Observer receive one Advantage. Smoke uses the caller's quality pool.

|Smoke successes|Placement and duration|Initiative|
|---|---|---|
|0|Opponent chooses a small smoke point visible from both the firer and the original target point; lasts until the caller's next initiative|Passes through normal smoke pass handling|
|1|Small smoke on target; lasts until caller's next initiative|Passes through normal smoke pass handling|
|2|Small smoke on target; lasts until caller's next initiative|Retained|
|3|Large smoke on target; expires at the immediately next initiative|Retained|
|4 or more|Large smoke on target; lasts until caller's next initiative|Retained|

Small and large use lengths three and five with the engine's tabletop scale conversion; the circular blocking radius is respectively 1.27 and about 2.12 bases. Zero and one-success smoke therefore remain through the opponent's following initiative. Smoke is a distinct action with normal retention handling; the mandatory Rally and Skill override does not silently change its separate procedure. This table is the current K Dwarf smoke system, including its four-plus band, rather than the earlier Crossfire variant.

## Status recovery rout and destruction

Ready units can move and perform their eligible actions. Pinned units cannot move ordinarily but can shoot and use eligible Skills. Suppressed and Routed units cannot initiate ordinary fire or Skills. Suppression makes nonvehicles Prone. Androids and Drones replace Rout with Suppression and require specialist recovery rather than ordinary Rally.

Ordinary Rally chooses a Pinned, Suppressed, or Routed friendly unit without Breakdown. Roll three quality dice, modified by command relationships, Assist, Isolation, and abilities. Two or more makes Ready. One makes Pinned become Ready, or Suppressed or Routed become Pinned. Zero changes no status and draws a morale card. Zero or one automatically passes initiative. Rally does not clear Prone; stand up separately. Automatic Rally makes Ready without dice and draws a morale card.

Group Rally selects at least two eligible Pinned or Suppressed units from one platoon with mutual LOS. Command Rally uses an unsuppressed Platoon Commander seeing every participant. Each unit rolls separately; apply every result, draw for each zero, and use the best pool for initiative.

A Routed unit must resolve compulsory movement toward the nearest legal rear terrain center, otherwise its own table edge. This is a reactable move. On completion, compulsory Rally leaves the unit Suppressed; zero sends it off-table to reserves and draws morale. A positive hit received while moving Routed causes surrender.

Vehicle or Heavy rout abandons its equipment and routes the crew. Destruction releases a surviving crew at the equipment's position. A nearby unsuppressed Medic may attempt emergency recovery with one Advantage to change eligible infantry destruction to Rout. This automatic protection can use a Routed Medic because the current exclusion tests Suppressed only.

Passengers take the same nonmelee attack result as a struck transport. In melee, only the directly assigned Vehicle, crew, or passenger receives that hit.

## Melee

Declare Melee with infantry and a discovered enemy target. Vehicles, Heavy, Indirect, and HMG roles cannot initiate a charge. Commanders need assisting subordinate infantry. Resolve movement and all approach reactions first. A pinned charger stops and does not join unless the actual contact conditions have already been established.

Melee starts at a base edge gap of two table units or less, or when charger and target occupy the same Building. The Building case includes every enemy in that feature. Ruins and Fortifications do not receive the same automatic expansion. Crews and passengers can join participants.

Each participant chooses one enemy, with the first enemy used as default. Both sides roll every participant's weapon pools before applying effects. Each attack affects only its selected target. Dead, surrendered, and Routed participants leave the fight; survivors remain engaged until one side has no participants. Ordinary movement and voluntary Pass cannot avoid unresolved melee.

Melee uses close weapon profiles, no shooting cover or facing armor, commander participation bonuses, Isolation, Assist, abilities, and one Disadvantage in circular smoke. The current code applies its powered-armor melee bonus from the target's armor profile rather than the attacker; this needs review. It also does not apply all ordinary shooting eligibility checks to defenders already listed in combat. Compare the sides' best categories for initiative; a qualifying defending tie or active best below two passes it through normal retention handling.

## Skills specialists and equipment

Eligible deployed infantry may use generic Skills unless Suppressed, Routed, or NO SKILL. Vehicles and Drones cannot act as Skill users. Recon, Observer, Medic, Engineer, and Hacker roles receive one Skill Advantage. Eligible commanders with LOS add PC one, CC two, or BC three; Assist adds one and Isolation removes one. Action bonuses and characteristic modifiers also apply.

One success normally achieves a Skill effect; zero does not. Zero or one automatically passes initiative after the complete sequence. Some target and distance checks happen only after a successful roll in the current engine; the interface normally validates the planned action before accepting it.

### Interact discover and camouflage

Interact captures a selected objective or one within two bases; an enemy owner draws morale. The explicitly selected objective path currently does not enforce that distance. Discover requires a visible enemy camouflage contact. Any success reveals the real unit or removes a discovered decoy.

Special operators outside every enemy LOS may re-enter camouflage with a successful Skill. They receive one real marker and one new decoy, removing any previous decoy belonging to that unit. Real and decoy markers may move independently under ordinary movement restrictions. A decoy cannot shoot, assault, or capture. Revealing the real unit does not remove its remaining decoy; discover it separately or voluntarily remove it. Most shooting and Skills reveal the actor. Voluntary decoy removal is a free control action.

### Medic engineer and hacker recovery

Recovery uses two separate pools. Apply them in order: each two-plus result makes Ready; each one improves Suppressed or Routed to Pinned, otherwise to Ready; each zero draws morale. Two one-success pools can therefore clear Suppression completely. Initiative uses the better pool. A Hacker's second pool has one additional Disadvantage.

Medic Heal requires friendly base contact and affects infantry or powered armor, excluding Androids and Vehicles. Engineer Repair uses friendly contact and can clear Breakdown with any successful pool. Hacker Repair requires program control and an Android or Drone target. Recovery does not automatically clear Prone.

### Engineers and hazards

A successful Engineer Skill places wire, barrier, or mine within three bases, or clears an existing hazard within two bases. Mines have radius one base. Route crossing includes another half-base allowance. Engineers detect with one Advantage and trigger a mine only with zero successes and a retained natural one. Other units entering from outside trigger it. Mine attacks use the creator's quality with three dice, or two against Vehicles.

Demolition targets Building, Fortification, or Ruins with its center within five bases. A successful initiating Skill rolls an additional pool with one Advantage against every occupant, then turns the feature into Rough with cover one and capacity eight. These follow-up pools directly apply success categories.

### Observers and indirect fire

A Commander or Observer outside Static and Isolation can call a friendly indirect battery by Skill. The observer must see the target; a Depression target requires the observer on a Hill. On success, roll the battery's own weapon profile and quality, ignoring direct-only cover and using top facing armor.

Repeated calls at the same target and exact coordinates accumulate one extra ranging Advantage per call after the first. Changing target or target coordinates resets this progression. Gun movement does not currently reset it. The selected battery must exist and own an indirect-capable weapon, but its readiness, off-table state, and ammunition are not fully checked. This barrage directly caps successes at four rather than using ordinary shooting's promotion/explosion cap.

### Reserves transports crews and towing

Reserve arrival is unavailable before initiative three. Ordinary reserves enter at their own west/east edge or within six bases of a friendly deployment marker. Special operators may combat drop elsewhere but not into a Building, within one base of an objective, or within an edge gap of two table units from an enemy. The whole base must fit and the landing must be unoccupied. Suppressed or Routed reserves need two successes to become Ready and enter; one makes Pinned and leaves them off-table.

Mount requires a friendly transport with capacity remaining, in direct base contact or through one friendly intermediary touching the transport. One successful Skill removes the passenger from the table and assigns it to the transport. Dismount places the passenger in the same direct or single-intermediary contact arrangement on an unoccupied surface. Longer contact chains do not qualify.

Original crew may re-crew adjacent abandoned equipment by a successful Skill, making the equipment Ready and taking the crew off-table. Dismounting a crew leaves its equipment abandoned. Limber and Unlimber require adjacent towed equipment; limber also requires an adjacent friendly towing Vehicle. Limbered equipment follows the tow and cannot fire. This is not a general inventory or unlimited crew-transfer system.

## Cyberwarfare

Standard module offers ICE, Tracer, Possession, Static, and Counterware. Hunter offers ICE, Tracer, Isolation, Counterware, and Wipe. Support offers Assist and Firewall. Modules are alternatives; a Hacker cannot use every program simultaneously merely because the full list is displayed.

A caster in Static cannot program. Ordinary unit targets must be revealed, deployed, and outside Static. Assist and Firewall use friendly targets; offensive programs use enemies. Except Tracer, the target must be Elite or Super or armored: powered armor, Android, Vehicle, or Drone. A unit can place a repeater by successful Skill.

Program control grants one Advantage. Tracer on the target grants another. Enemy-repeater control and a target Firewall each impose one Disadvantage. A friendly repeater needs LOS to the target, but no chain or distance from caster to repeater is required. Currently control or LOS is a bonus condition rather than a mandatory legality condition for ordinary programs. Static centers and Wipe choices also have no enforced range; this is a review item.

Nonreactive programs open an opposing Counterware decision before their result applies, including friendly support. Effective successes after Counterware determine the program effect.

|Program|Implemented effect by effective successes|
|---|---|
|ICE|Apply successes as attack categories|
|Tracer|One or more marks target and grants programming bonus; one or two expires next initiative, three or more at caster's next initiative|
|Isolation|One or more gives one Disadvantage and blocks coordinated fire and indirect calls; same duration bands as Tracer|
|Assist|One or more gives one Advantage to shooting, Rally, and Skills; same duration bands|
|Firewall|One or more gives one Disadvantage against incoming programs; same duration bands|
|Possession|One no effect; two Suppress; three changes side until next initiative; four or more changes side until caster's next initiative|
|Static|One or two small radius, three or more large; one or three lasts until next initiative, two or four-plus until caster's next initiative|
|Wipe|One or two removes one selected program marker; three can remove Static; four or more handles two selections|

Static radius is three bases, or five for three or more successes. It prevents programming and coordinated fire or indirect calls; single ordinary attacks remain possible. Applying Assist or Firewall replaces the target's prior Assist or Firewall and removes the caster's previous support elsewhere. The shared marker helper also removes that caster's support when placing Tracer or Isolation. A caster can voluntarily cancel its own Assist or Firewall without a roll or action-count increment.

Counterware requires a deployed enemy Standard or Hunter Hacker, neither Suppressed nor Routed nor NO COUNTERWARE. Roll with one Advantage, another if controlling the caster. Subtract its successes from the incoming program. Zero or one prevents more Counterware that initiative; three or more transfers initiative to the responder. Counterware itself does not require a direct LOS test to the caster. This is a specific program response procedure, separate from ordinary acting-side Skill failure.

## Command resources and Orders

Each deployed living troop unit and commander contributes one die of its own quality to a command bowl. Do not count a commander twice. Suppression does not remove contribution. Roll successes on four-plus; discard failures immediately; natural maximums explode into additional dice of the same contributor's quality. Keep successful dice as assignable resources; there are no command points or symbol conversions.

The bowl persists across initiatives. It refills at the start of an own initiative only if every die is gone, including dice in armed slots and committed ongoing traits. At each own initiative's start, before the next ordinary declaration, one optional die may be discarded. Discarding from a basket returns its other dice to the bowl and ends the ongoing effect in that slot. Releasing a slot spends all its assigned dice.

Arm an ability by assigning exactly its required number of successful dice. Ordinary activation spends its assigned basket. Basics can repeat if rearmed; advanced abilities are once per own initiative. Both sides can respond to a declared action using eligible armed Orders. Activation alternates response priority; two passes resolve the stack last-in-first-out, then the declared action. Pending special cards can defer that action until resolved.

Actor-targeted Orders must select participants in the declared action. Defensive Orders select the declared incoming target in terrain. In this targeting vocabulary infantry means nonvehicle and includes Androids and commanders. Effects scoped to the action expire when it finishes. The four universal basics are Fire, Charge, Regroup, and Do it.

Ongoing faction and subfaction traits also require activation. Assign their one success, choose a fixed eligible unit during the owner's initiative outside a pending action, and activate. The trait lasts only while that die remains committed. Changing the target requires releasing and reactivating. There are no automatic free faction passives.

**Every individual success cost is provisional. All newly authored faction and subfaction identities and traits are provisional.** Defined Order effects are distinguished from these draft prices. The following reference records actual effect fields in readable form. Retention entries do not override mandatory zero-or-one Rally or Skill passes. Repeated fire or melee currently resolves as a duplicated simultaneous batch; Try Again is sequential.

|Ability|Successful dice|Target and actual effect|
|---|---|---|
|Fire!|1|friendly infantry: +1 Advantage on shoot|
|Charge!|1|friendly infantry: +1 Advantage on melee|
|Regroup!|1|friendly infantry: +1 Advantage on rally|
|Do it!|1|friendly infantry: +1 Advantage on skill|
|Take Cover!|1|friendly infantry: +1 incoming shooting Disadvantage while target is in terrain|
|The Cavalry Have Arrived!|1|friendly vehicle: +1 Advantage on shoot|
|Keep It Together!|1|friendly vehicle: +1 Advantage on rally|
|Drive!|1|friendly vehicle: +1 incoming shooting Disadvantage while target is in terrain|
|Bloodthirsty!|2|friendly infantry: Two melee attempts as a simultaneous batch|
|Try Again!|2|friendly infantry: Two skill attempts with same Skill and target, sequential|
|Misfire!|1|enemy infantry: -1 Advantage on shoot|
|Disordered Charge!|1|enemy infantry: -1 Advantage on melee|
|Mistake!|1|enemy infantry: -1 Advantage on skill|
|Bad Cover!|1|enemy infantry: Remove one incoming shooting cover Disadvantage, clamped to available protection|
|Fire At Will!|2|friendly infantry: Two shoot attempts as a simultaneous batch|
|Keep Firing!|2|self player: Retain once when shoot would lose initiative; mandatory Rally / Skill pass still applies|
|Keep Fighting!|2|self player: Retain once when melee would lose initiative; mandatory Rally / Skill pass still applies|
|Keep it up!|2|self player: Retain once when skill would lose initiative; mandatory Rally / Skill pass still applies|
|Hell’s Fire!|3|friendly vehicle: Two shoot attempts as a simultaneous batch|
|Take Aim!|2|friendly infantry: +1 characteristic modifier on shoot|
|Spill Blood!|2|friendly infantry: +1 characteristic modifier on melee|
|Esprit De Corps!|2|friendly infantry: +1 characteristic modifier on rally|
|Best of the Best!|2|friendly infantry: +1 characteristic modifier on skill|
|Incoming Intelligence!|1|enemy player: Reveal 2 random enemy morale cards|
|Command Control!|2|self player: Return 1 selected numeric morale card|
|Seize the Initiative!|3|self player: Retain once when any would lose initiative; mandatory Rally / Skill pass still applies|
|Incoming Intelligence Dump!|2|enemy player: Reveal 4 random enemy morale cards|
|Command Supremacy!|3|self player: Return 2 selected numeric morale cards|
|Morale Break!|2|enemy player: Opponent draws one morale card|
|Cohesion Protocol|1|friendly infantry ongoing trait: +1 Advantage on rally|
|Calculated Execution|1|friendly infantry ongoing trait: +1 Advantage on skill|
|Citadel Discipline|1|friendly infantry ongoing trait: +1 incoming shooting Disadvantage while target is in terrain|
|Field Autonomy|1|friendly infantry ongoing trait: +1 Advantage on skill|
|Surveyed Fire Lane|1|enemy infantry ongoing trait: Remove one incoming shooting cover Disadvantage, clamped to available protection|
|Recovery Drill|1|friendly infantry ongoing trait: +1 Advantage on rally|
|Conquest Imperative|1|friendly infantry ongoing trait: +1 Advantage on melee|
|Bastion Link|1|friendly vehicle ongoing trait: +1 incoming shooting Disadvantage while target is in terrain|
|Predator Focus|1|friendly infantry ongoing trait: +1 Advantage on shoot|

### Faction board membership

### The Athenian Order

Ordinary abilities: Fire!, Charge!, Regroup!, Do it!, Take Cover!, Bad Cover!, Command Control!, Try Again!, Fire At Will!, Incoming Intelligence!, Misfire!, Keep Firing!, Morale Break!.

Native trait: Cohesion Protocol. Subfactions: Logician Cohorts gives Calculated Execution; Citadel Wardens gives Citadel Discipline. Its new native trait and subfactions are provisional.

### Expeditionary Accord

Ordinary abilities: Fire!, Charge!, Regroup!, Do it!, The Cavalry Have Arrived!, Keep It Together!, Drive!, Try Again!, Best of the Best!.

Native trait: Field Autonomy. Subfactions: Frontier Surveyors gives Surveyed Fire Lane; Relief Columns gives Recovery Drill. This entire board identity is provisional.

### Obsidian Dominion

Ordinary abilities: Fire!, Charge!, Regroup!, Do it!, Bloodthirsty!, Disordered Charge!, Hell’s Fire!, Spill Blood!, Keep Fighting!.

Native trait: Conquest Imperative. Subfactions: Forgeborn Legions gives Bastion Link; Vanguard Clades gives Predator Focus. This entire board identity is provisional.

The Complete Order catalog is a utility option containing every defined ordinary Order, not an additional canonical faction. Choose at most one subfaction attached to its board. Its trait is optional and still must be paid and activated.

## Commander feats and succession

Every commander feat is once per game and takes no Skill roll. Command Control returns up to two selected numeric morale cards, defaulting to the last two. Steelstorm grants the side one melee Advantage consumed by matching actions. Firestorm grants shooting Advantage only in Command Fire and draws morale.

Terrifying draws morale and causes a matching destruction or surrender to Suppress every unit able to see the target, or Rout those already Suppressed. This currently affects either side, and the feat effect is not automatically consumed, so later kills can trigger it again.

Inspiring Maneuvering, Inspire Fire, Inspire Courage, Inspire Charge, and Inspire Competency give matching movement, shooting, Rally, melee, or Skill retention. Inspire Heroism gives unrestricted retention and draws morale. The zero-or-one Rally and Skill mandatory pass overrides their retention. This leaves some older retention abilities needing a new purpose or explicit exception for your review.

At the next initiative after commander loss, a Battalion Commander promotes a Company Commander, a Company Commander promotes a Platoon Commander, and a Platoon Commander promotes an eligible nonvehicle subordinate. Promotions can cascade. The replacement inherits the lost commander's used-feat state; initial force FMR is unchanged. Several command-bonus checks exclude Suppressed but not Routed commanders; this is listed for review.

## Morale cards and victory

The shared deck contains nine value-one cards, twenty value-two cards, twenty value-four cards, nine value-five cards, and exactly two of each special: Air Attack, Mine Strike, Heroism, Confusion, Ammunition Low, and Breakdown. Numeric morale burden is private in the interface. Specials do not add to the numeric burden. Returned cards go back to the shared deck.

Draw morale for destruction or surrender, failed Rally and failed recovery pools, zero compulsory Rally, automatic Rally, objective loss, first terrifying attack on a unit, first Air Attack on a unit, relevant setup bids, and listed feats or Orders. Commander destruction uses its normal destruction draw, with no second commander-specific draw.

Mine Strike and Heroism may be held. Air Attack queues for the drawing side's next initiative. Other specials require immediate selection of an eligible enemy and then return to the deck. Air Attack uses Veteran three d8 with two Advantage; Mine Strike uses Veteran three d8 with one Advantage; Confusion uses Super three d12. All use the ordinary four-plus exploding pool. These actual attack pools differ from unused catalog card metadata.

Ammunition Low applies two hits to an eligible nonvehicle. Breakdown pins a Ready armored target and sets Breakdown. Heroism grants chosen friendly retention and is returned when played; it cannot override mandatory low Rally or Skill passes. Mine Strike targets a currently moving enemy; its current handler does not automatically stop the route through the normal reactive-fire path.

Victory occurs when an opponent's numeric morale burden is strictly greater than its initial FMR; equal is not defeat. Controlling every objective wins at the beginning of your own initiative. If every deployed living unit of a side is Suppressed or Routed when its initiative starts, it loses by domination. Elimination is checked when the active side has no surviving noncrew units; off-table reserves count as surviving for this check. No turn timer or points threshold forces a winner. A victory result blocks further ordinary play; Undo can return to an earlier playable decision.

## Weapons armor and targeting reference

These tables are generated from the same exported data the game reads. N and C are source normal and close profiles, converted to kept dice and Advantage by the shooting rule. Same means retain N. A null FMR contributes zero except Light Mortar, whose contribution is minus four. HE and penetrating values are alternate source profiles, not additional separate attacks.

|Weapon|Points|FMR|N source|C source|
|---|---|---|---|---|
|Pistol|0|0|2|4|
|Rifle|1|1|4|Same|
|Carbine|1|0|4|Same|
|Light Machine Gun|1|-1|4|3|
|Medium Machine Gun|3|-1|5|2|
|Heavy Machine Gun|5|-1|5|1|
|Grenade Machine Gun|5|-1|5|Same|
|Rocket Launcher|5|-1|5|Same|
|Submachine Gun|0|-1|3|5|
|Sniper Rifle|5|-1|4|Same|
|Heavy Sniper Rifle|7|-1|5|Same|
|Rifle with Shotgun Attachment|3|0|4|Same|
|Carbine with Shotgun Attachment|3|-1|4|Same|
|Rifle with Grenade Launcher Attachment|5|0|4|Same|
|Carbine with Grenade Launcher Attachment|5|-1|4|5|
|Light Autocannon|3|-2|6|Same|
|Medium Autocannon|5|-2|6|Same|
|Heavy Autocannon|5|-2|6|Same|
|Missile Launcher|5|-2|5|Same|
|Light Mortar|1|-4|3|Same|
|Medium Mortar|5|-2|4|Same|
|Heavy Mortar|7|-2|5|Same|
|Artillery|9|-2|6|Same|

Weapon notes below explain additional fields, including declared restrictions that the engine does not currently enforce.

- **Pistol:** no additional consumed modifier fields.
- **Rifle:** no additional consumed modifier fields.
- **Carbine:** close Advantage 1.
- **Light Machine Gun:** anti-infantry Advantage 1.
- **Medium Machine Gun:** normal source against Vehicle 4.
- **Heavy Machine Gun:** anti-infantry Advantage 1.
- **Grenade Machine Gun:** HE infantry source 6; smoke capable; declared close prohibition NOT enforced.
- **Rocket Launcher:** HE infantry source 6; penetrating armored source 6; incendiary source 4; incendiary promotion metadata miss to pinned, pinned to suppressed, suppressed to routed.
- **Submachine Gun:** no additional consumed modifier fields.
- **Sniper Rifle:** anti-infantry Advantage 1; ignores farther-target penalty; particular-unit targeting metadata; normal direct fire already selects individual units; normal promotion metadata miss to pinned, pinned to suppressed, suppressed to routed, routed to destroyed; actual count-based conversion and explosion cap apply.
- **Heavy Sniper Rifle:** anti-infantry Advantage 1; ignores farther-target penalty; particular-unit targeting metadata; normal direct fire already selects individual units; normal promotion metadata miss to pinned, pinned to suppressed, suppressed to routed, routed to destroyed; actual count-based conversion and explosion cap apply.
- **Rifle with Shotgun Attachment:** close infantry source 4; close infantry Advantage 1; both in Buildings source 5.
- **Carbine with Shotgun Attachment:** close infantry source 5; both in Buildings source 5; both in Buildings Advantage 1.
- **Rifle with Grenade Launcher Attachment:** HE infantry source 6; penetrating armored source 6; incendiary source 3; smoke capable; incendiary promotion metadata miss to pinned, pinned to suppressed, suppressed to routed.
- **Carbine with Grenade Launcher Attachment:** close Advantage 1; HE infantry source 6; penetrating armored source 6; incendiary source 3; smoke capable; incendiary promotion metadata miss to pinned, pinned to suppressed, suppressed to routed.
- **Light Autocannon:** Advantage against Android or powered armor or Vehicle 2; declared close prohibition NOT enforced.
- **Medium Autocannon:** Advantage against Android or powered armor or Vehicle 3; declared close prohibition NOT enforced.
- **Heavy Autocannon:** Advantage against Android or powered armor or Vehicle 3; declared close prohibition NOT enforced.
- **Missile Launcher:** normal Advantage 1; HE infantry source 6; HE Advantage 1; penetrating armored source 6; penetrating Advantage 1; incendiary source 4; incendiary Advantage 1; normal promotion metadata miss to pinned, pinned to suppressed; actual count-based conversion and explosion cap apply; incendiary promotion metadata miss to pinned, pinned to suppressed, suppressed to routed.
- **Light Mortar:** normal Advantage 1; HE infantry source 5; smoke capable; indirect capable; declared close prohibition NOT enforced.
- **Medium Mortar:** normal Advantage 1; HE infantry source 6; smoke capable; indirect capable; declared close prohibition NOT enforced.
- **Heavy Mortar:** normal Advantage 1; HE infantry source 6; HE Advantage 1; smoke capable; indirect capable; declared close prohibition NOT enforced.
- **Artillery:** normal Advantage 1; HE infantry source 8; smoke capable; indirect capable; declared close prohibition NOT enforced.

Ordinary vehicle attacks roll each mounted weapon separately. The unit's main weapon-type keyword is currently reused for all mounted weapons' armor and Explosive or Antimatter modifiers. This can differ from an extra weapon's own catalog type.

|Armor|Points|FMR|Vulnerability|Incoming DIS|Melee value|
|---|---|---|---|---|---|
|None|0|2|all|0|0|
|Light Armor (Ballistic, Gauss)|0|1|ballistic, gauss|0|0|
|Light Armor (Laser, Plasma)|0|1|laser, plasma|0|0|
|Light Armor (Microwave, Gamma)|0|1|microwave, gamma|0|0|
|Light Armor (Noxious, Toxic)|0|1|noxious, toxic|0|0|
|Medium Armor (Gauss)|1|0|gauss|0|0|
|Medium Armor (Plasma)|1|0|plasma|0|0|
|Medium Armor (Gamma)|1|0|gamma|0|0|
|Medium Armor (Noxious)|1|0|noxious|0|0|
|Heavy Armor|3|0|None|1|0|
|Light Power Armor|3|-1|None|1|1|
|Medium Power Armor|3|-2|None|1|2|
|Heavy Power Armor|5|-2|None|2|2|

An armor vulnerability keyword gives the attacker one Advantage. Heavy Armor gives one incoming shooting Disadvantage and no intended melee bonus. Powered-armor melee values in the table currently enter the attacker's pool from the target's profile; that application needs correction or a ruling. None armor has vulnerability to all types. Noxious and Toxic armor references exist even though those weapon keywords are not accepted by force validation.

## Saves undo redo and referee controls

The game autosaves in this browser and provides a separate local checkpoint. Export a portable game JSON to keep it on your device or transfer it to another browser. Imports are validated, including unit references, dice, command costs, pending decisions, marker geometry, and history. Saves include private and referee information and are not encrypted. Version 0.2 saves upgrade to 0.3 while preserving command bowls and accepted dice; older incompatible pending command rolls may be rejected rather than silently changed.

Undo and Redo are available in the map controls, full-screen view, Operations, and game dice dialog. Desktop Ctrl or Command Z undoes; Shift Z or Y with the same modifier redoes. Text inputs keep their normal text-editing shortcuts. Undo restores the previous recorded decision, including unit positions, casualties, initiative, morale, command resources, firing markers, random state, and accepted dice. Redo restores that exact result. It does not reroll dice.

History holds up to forty decisions, subject to a 500000-character patch budget. Older entries are dropped to keep saves manageable. A new decision after Undo replaces the redo branch. Autosaves and exported games retain the available timeline. Importing a game or restoring a checkpoint adopts that file's timeline; starting a new operation starts a new one. Camera movement, selection, and free dice-table preferences are not game decisions.

After Undo or Redo the AI is paused so it cannot immediately overwrite the restored decision. Resume it explicitly when ready. Restored manual dice show Resume Saved Dice; that continues the accepted batches and requests only what remains. Undo can reveal prior private information and is intended as a local tabletop correction tool rather than competitive hidden-information enforcement.

The referee marker tray manually sets Ready, Pinned, Suppressed, Routed, NO FIRE, or Prone. It is an adjudication override, not a rolled action and not a substitute for Rally, shooting, or morale resolution. Automated actions place their own markers. These manual changes can also be undone.

## Review items and implementation boundaries

This is a comprehensive inventory of the executable rules above, not a claim that every intended rule is finished. The following observed discrepancies are part of this review edition.

- Heavy weapons with a declared no-close-combat flag, including grenade machine gun, autocannons, mortars, and artillery, are not actually prohibited by that flag. Only a numeric zero close profile would reject them. Defending melee participants also bypass ordinary shooting eligibility checks.
- Repeated fire and melee effects are duplicated simultaneous pools, although their metadata says sequential. Try Again Skills and two-pool recovery are genuinely sequential. Target removal can therefore precede application of a later already-rolled repeated shot.
- Ordinary programs do not require LOS or program control as a legality condition. Control is only a bonus. Repeater range and chain, Static placement range, and Wipe reach are not enforced. Interact with an explicitly selected objective does not enforce the nearby-objective distance.
- Close profiles can apply across two different occupied terrain features. Building shotgun overrides can also affect armored targets. Default Buildings and Fortifications do not have stronger numeric cover than other terrain unless a custom value is supplied. Rooms and designated entrances do not have individual tactical occupancy or entry enforcement.
- Powered-armor melee Advantage is read from the target's armor instead of the attacker's. Extra weapons use the unit's main weapon-type keyword. Promotion is implemented by the number of mapping entries and a category increment, not by walking each named mapping; no-explosion ordinary attacks still cap at Rout.
- Force budget is advisory. Reserve limits omit attachments and independent entries. Towed cost adjustments, catalog fire-mode upgrade prices, extra-weapon FMR and type surcharges, and commander weapon or armor prices are not fully included. Android facing levels four and five are accepted but have zero price because only levels zero through three are priced.
- Basic platoon teams do not inherit all optional profile fields such as transport, extra weapons, module, or leadership upgrade. Attachment and independent profiles do. PCs copy quality and feat; generated CCs and BCs are Regular. These are builder propagation limits, not free deliberate upgrades.
- Manual recon, deployment, rear routing, and reserve-entry logic still assumes west/east in places even when north/south or custom deployment zones are chosen. Recon uses sampled contact detection; battle reactions use continuous exposure. The map generator is procedural generation, not a language-model tactical map planner.
- Movement has no numerical range allowance. Group collisions test old member positions. Pivot requests retain the old facing when there is no movement, so an independent pivot does not reliably set a requested new facing. Mine hazards resolve at the route end rather than exact contact.
- Indirect and Terrifying shock can affect friendly units as well as enemies. Terrifying remains active for later kills. Routed commanders and Medics can qualify for some bonuses or emergency recovery because only Suppressed is excluded. Indirect battery readiness, ranging reset on gun movement, and Mine Strike's movement interruption need review.
- Mandatory zero-or-one Rally and Skill passes supersede retention effects. Keep it up, Inspire Courage, Inspire Competency, and similar older effects can therefore be ineffective in the situations they formerly protected. Decide their replacement purpose or an explicit exception before treating those effects as fully reconciled.
- All individual command prices and newly authored faction or subfaction traits remain provisional. No optional Crossfire rule is silently carried over: the K Dwarf variant registry is currently empty. AI difficulty changes decision heuristics; it is not a guarantee of complete tactical mastery of every specialist option.
- Solo and hotseat are available; remote multiplayer, server authority, and encrypted hidden information are not implemented. Browser autosave is local to its origin. Native device motion, vibration, orientation, and audio depend on actual device support and have not been certified on physical Android hardware.

## Source trace for this edition

The rules were reconstructed from engine.js, rolls.js, army.js, data.js, the exported runtime catalog, command.js, command-board.js, orders.js, geometry and visibility modules, battlefields.js, table.js, ai.js, app.js, the dice tray modules, history.js, fire-events.js, fire-visuals.js, storage.js, and save-validation.js. Catalog descriptions were treated as implemented only where an executable consumer supports them; inactive fields and conflicting consumers are identified above. The runtime reference tables were generated from exported game objects. This manual and its in-game HTML and editable Word edition describe version 0.3.0.
