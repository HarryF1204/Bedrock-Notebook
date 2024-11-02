
# Variable Types
Molang allows you to use 3 variable types: `variable`, `temp`, and `context`.

## Variable
`variable.` or `v.` is a read-write variable type accessible within the scope of the current actor (if it is declared in an entity). It shares the same variable space across animations, animation controllers, render controllers, and the client-entity file. Everywhere except entity-attached particles, which have their own variable space and require the `pre_effect_script` component in the animation that create them to pass values.

## Temp
`temp.` or `t.` is a temporary read-write variable type accessible within the current scope of an expression. 

Note that the transitions of a state in an animation controller share the same variable scope. This means that a temp variable set in one transition can be accessed by another transition within the same state.

```json
"transitions": [
    {
        "state_1": "t.is_sneaking = q.is_sneaking; return t.is_sneaking;"
    },
    {
        "state_2": "!t.is_sneaking"
    }
]
```

## Context
`context.` or `c.` is a read-only variable type that is defined by the game. It is used to accerss additonal context surrounding the actor the for example, `c.owning_entity `returns a reference to the entity holding an attachable item.