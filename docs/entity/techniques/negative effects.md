# Negative Effects
## Overview

Entity components like `minecraft:projectile` or `minecraft:spell_effects` can apply negatively amplified effects on entities. Sometimes, this negative amplification reverses the effect, while other times it remains unchanged, resulting in either a level 1 effect or an effect of the same level but with a positive amplifier.

```json
// Setting up a negative effect projectile
"minecraft:projectile": {
    "on_hit": {
        "mob_effect": {
            "effect": "jump_boost",
            "durationeasy": 600,
            "durationnormal": 600,
            "durationhard": 600,
            "amplifier": -50
        }
    }
}
```

## Effects

> [!note] Note
> Upon relogging, the negative sign will be ignored, leaving you with an effect of the same level but with a positive amplifier.

| Effect           | Result                                                                 |
|------------------|------------------------------------------------------------------------|
| absorption       | no changes                                                             |
| blindness        | no changes                                                             |
| conduit power    | no changes                                                             |
| darkness         | no changes                                                             |
| fatal poison     | no changes                                                             |
| fire resistance  | no changes                                                             |
| haste            | no changes                                                             |
| health boost     | instantly loses health/dies                                            |
| hunger           | stops you from losing any hunger but does not increase the hunger bar  |
| infested         | no changes                                                             |
| instant damage   | no changes                                                             |
| instant health   | no changes                                                             |
| invisibility     | no changes                                                             |
| jump boost       | jump height decreases, this can be used to stop the player from jumping|
| levitation       | pushes you towards the ground at the same rate as +levitation would lift you up. |
| mining fatigue   | turns into haste                                                       |
| nausea           | no changes                                                             |
| night vision     | no changes                                                             |
| oozing           | no changes                                                             |
| poison           | no changes                                                             |
| regen            | no changes                                                             |
| resistance       | you take more damage                                                   |
| saturation       | removes hunger bars at the same rate it would give it                  |
| slow falling     | no changes                                                             |
| slowness         | turns into speed                                                       |
| speed            | turns into slowness                                                    |
| strength         | no changes                                                             |
| village hero     | no changes                                                             |
| water breathing  | no changes                                                             |
| weakness         | no changes                                                             |
| weaving          | no changes                                                             |
| wind charged     | no changes                                                             |
| wither           | no changes                                                             |
