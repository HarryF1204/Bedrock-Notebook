---
next:
    text: 'Domain'
    link: '/molang/topics/domain'
prev: 
    text: 'Math'
    link: '/molang/topics/math'
---

# Variables

## Primary Data Types
There are 3 main data types that can be directly assigned to variables in Molang:

### Float
A floating-point number. Note that all numerical values are floats. In certain locations, for example, the `color` property of a render controller, you can wrap a number in a string and append an `f` to the end to make it a percentage. For example:
```json
"color": {
  "r": "1.0f", // keeps original value
  "g": "1.0f", // keeps original value
  "b": "1.0f", // keeps original value
  "a": 0.3
}
```

### Boolean
A boolean value, stored as a float value of either `0.0` or `1.0` for values of `false` or `true` respectively.

### String
A string value.

## Additional Data Types
In addition to the primary data types, context variables, queries, render controllers, and entity definition files can define other types.

### Geometry
Setup in the client-entity definition file to reference a model. This is accessed in the render controllers as `geometry.<name>`.

```json
// Client-Entity Defintion
"geometry": {
  "model_1": "geometry.<namespace>.<model_name>",
  "model_2": "geometry.<namespace>.<model_name>"
}
```

```json
// Render Controller
"geometry": "geometry.model_1"
```

### Texture
Setup in the client-entity definition file to reference a texture. This is accessed in the render controllers as `texture.<name>`.

```json
// Client-Entity Defintion
"textures": {
  "texture_1": "path/to/texture",
  "texture_2": "path/to/texture"
}
```

```json
// Render Controller
"textures": [
  "texture.texture_1"
]
```

### Material
Setup in the client-entity definition file to reference a material. This is accessed in the render controllers as `material.<name>`.

```json
// Client-Entity Defintion
"materials": {
  "material_1": "<material_name>",
  "material_2": "<material_name>"
}
```

```json
// Render Controller
"materials": [
  {
    "<bone_name>": "material.material_1"
  }
] 
```

### Arrays
Arrays can be set up in the render controller and accessed via `Array.<name>[<index>]`. Note that arrays are clamped at 0 for negative values or wrapped by the array size for large values.

```json
// Render Controller
"arrays": {
  "geometries": {
    "array.<array_name>": [
      "geometry.<name_1>",
      "geometry.<name_2>",
      "geometry.<name_3>"
    ]
  },
  "materials": {
    "array.<array_name>": [
      "material.<name_1>",
      "material.<name_2>",
      "material.<name_3>"
    ]
  },
  "textures": {
    "array.<array_name>": [
      "texture.<name_1>",
      "texture.<name_2>",
      "texture.<name_3>"
    ]
  }
},
"textures": [
	"array.<array_name>[<molang resulting in a valid index>]"
]
```


### Actor Reference
This can be accessed via queries/context and is used to reference an actor, for example, `c.owning_entity`.

### Actor Reference Array
This cannot be accessed by any stable queries.

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
Hardcoded variables may be used by entities, particles, and items. They are read-only, private, and sometimes only created for entities with specific runtime identifiers. To make a private variable accessible to other actors, you can use the `public` keyword in the script component of the client-entity file.
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

> [!note] Note
> Animations **CAN** access private variables. This means that you can use a variable like `v.attack_time` in a client-side animation being ran from the entity and it will work. This also extends to animations ran via `/playanimation` which are added at runtime by adding on an extra animation controller to the entity.

#### List of Private Variables

<TextContent path="/txt/molang/hardcoded.txt"/>




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