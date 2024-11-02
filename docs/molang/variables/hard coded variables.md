
# Hard-Coded Variables
## Context
```c#
context.block_face
context.cardinal_block_face_placed_on
context.is_first_person
context.item_slot 
context.other
context.owning_entity 
context.player_offhand_arm_height
```

### Item Slot
The value of `c.item_slot` (commonly used in geometries to bind a model to an entity bone) depends on where the attachable is slotted:

- For `slot.weapon.mainhand`, returns `'main_hand'`
- For `slot.weapon.offhand`, returns `'off_hand'`
- For `slot.armor.head`, returns `'head'`
- For `slot.armor.chest`, returns `'torso'`
- For `slot.armor.legs`, returns `''`
- For `slot.armor.feet`, returns `''`

Because the last 2 return empty strings, there's no way using the context variable alone to tell when in those 2 slots/which one it is. This makes `q.item_slot_to_bone_name` a poor choice for bone-binding when it comes to armour but great for tools.

### Is First Person
`c.is_first_person` can be used from item attachables and returns true when the player is in first person. Since hard-coded actor variables ― like `v.is_first_person` ― are read-only and private, so you can think of this context varaible as a `getter`.

### Owning Entity
`c.owning_entity` returns a reference to the entity holding an item attachable. It can be accessed using the `->` operator, for example:
```json
"v.is_using_item = c.owning_entity -> q.is_using_item;"
```

## Variables
Hardcoded variables may be used by entities, particles, and items. They are read-only, private, and sometimes only created for entities with specific runtime identifiers.
<TextContent path="/Bedrock-Notebook/txt/molang/hardcoded.txt"/>