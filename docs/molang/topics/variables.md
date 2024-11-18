---
next:
    text: 'Domain'
    link: '/molang/topics/domain'
prev: 
    text: 'Math'
    link: '/molang/topics/math'
---

# Variables

## Data Types
There are 3 main data types that can be directly assigned to variables in Molang:
- `float` : A floating-point number. Note that all numerical values are floats.
- `boolean` : A boolean value, stored as a float value of either `0.0` or `1.0` for values of `false` or `true` respectively.
- `string` : A string value.

However, these are not the only types. Context variables, queries, render controllers, and entity defintion files can all setup different types. These are:
- `Geometry` : Setup in the client-entity defintion file to reference a model. This is accessed in the render controllers as `geometry.<name>`. 
- `Texture` : Setup in the client-entity defintion file to reference a texture. This is accessed in the render controllers as `texture.<name>`.
- `Material` : Setup in the client-entity defintion file to reference a material. This is accessed in the render controllers as `material.<name>`.
- `Actor Reference` : This can be accessed via queries/context and is used to reference an actor, for example, `c.owning_entity`.
- `Actor Reference Array` : This cannot be accessed by any stable queries.
- `Arrays` : Ararys can be setup in the render controller and accessed via `Array.<name>[<index>]`. Note that arrays are clamped at 0 for negative values or wrapped by the array size for large values.

## Variable Types
Molang allows you to use 3 primary variable types: `variable`, `temp`, and `context`.

### Variable
`variable.` or `v.` is a read-write variable type accessible within the scope of the current actor (if it is declared in an entity). It shares the same variable space across animations, animation controllers, render controllers, and the client-entity file. Everywhere except entity-attached particles, which have their own variable space and require the `pre_effect_script` component in the animation that create them to pass values.

### Temp
`temp.` or `t.` is a temporary read-write, lightweight, short-lived variable used for intermediate calculations. Although temp variables are accessible within the global scope of an entity, they should only be referenced within the scope of which they are defined to avoid unexpected results.

### Context
`context.` or `c.` is a read-only variable type that is defined by the game. It is used to accerss additonal context surrounding the actor the for example, `c.owning_entity `returns a reference to the entity holding an attachable item.

## Structs
Structs are a method of grouping related variables together. They are defined by their usage, for example, `v.vec.x = 0;` defines a struct `vec` with the property `x` holding the value `0`. Although they are convenient, structs use more performance than standards variables so they are not as recommended for every use case. 

The recommended way to initilize a struct is with `braces` as shown below with the inline initilization example.

```json
"v.vec = v.vec ?? {v.vec.x=0; v.vec.y=0; v.vec.z=0;};"
```


## Hard-Coded Variables
### Context
```c#
context.block_face
context.cardinal_block_face_placed_on
context.is_first_person
context.item_slot 
context.other
context.owning_entity 
context.player_offhand_arm_height
```

#### Is First Person
`c.is_first_person` can be used from item attachables and returns true when the player is in first person. Since hard-coded actor variables ― like `v.is_first_person` ― are read-only and private, so you can think of this context varaible as a `getter`.


#### Item Slot
The value of `c.item_slot` (commonly used in geometries to bind a model to an entity bone) depends on where the attachable is slotted:

- For `slot.weapon.mainhand`, returns `'main_hand'`
- For `slot.weapon.offhand`, returns `'off_hand'`
- For `slot.armor.head`, returns `'head'`
- For `slot.armor.chest`, returns `'torso'`
- For `slot.armor.legs`, returns `''`
- For `slot.armor.feet`, returns `''`

Because the last 2 return empty strings, there's no way using the context variable alone to tell when in those 2 slots/which one it is. This makes `q.item_slot_to_bone_name` a poor choice for bone-binding when it comes to armour but great for tools.

### Other
`c.other` can be used from server-side item files to refer to the "other" item in a repearable recipe.
In this example, `c.other` refers to the item being used to repair the bow:
```json
"minecraft:repairable": {
    "repair_items": [
        {
        "items": [
            "bow:bow"
        ],
        "repair_amount": "c.other->q.remaining_durability * 0.8"
        }
    ]
}
```

#### Owning Entity
`c.owning_entity` returns a reference to the entity holding an item attachable. It can be accessed using the `->` operator, for example:
```json
"v.is_using_item = c.owning_entity -> q.is_using_item;"
```

### Variables
Hardcoded variables may be used by entities, particles, and items. They are read-only, private, and sometimes only created for entities with specific runtime identifiers. To make a private variable accessible, you can use the `public` keyword in the script component of the client-entity file.
```json
{
  "format_version": "1.10.0",
  "minecraft:client_entity": {
    "description": {
      ...
      "scripts": {
        "variables": {
          "variable.is_first_person": "public"
        }
        ...
      },
      ...
    }
  }
}

```

#### List of Private Variables

<TextContent path="/Bedrock-Notebook/txt/molang/hardcoded.txt"/>




## Types
<!-- 
- All numerical values are floats.
- Boolean values such as actor flags are converted and stored as a float value of either 0.0 or 1.0 for values of false or true respectively.
- For boolean tests, a float value equivalent to 0.0 is false, and anything not equal to 0.0 is true.
- For array indices, floats are C-style-cast to ints, and clamped at zero for negative values or wrapped by the array size for large values.
- Other supported types are:

Geometry
Texture
Material
Actor Reference
Actor Reference Array
String
Struct (see 'structs' section below) 

-- link to variables
-->