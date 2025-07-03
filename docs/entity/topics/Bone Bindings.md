# Bone Bindings


## Overview
When additional geometriesb, e.g., attachables or equipped items, are dynamically appended to an entity model, they must specify which bone they attach to. If no bone is specified, the geometry defaults to the origin `(0,0,0)`, which is almost never correct.

To solve this, Minecraft relies on bone names as attachment points. While you're free to name bones however you like, equipment and attachables will only render correctly if the item or attachable is explicitly configured to bind to the corresponding bone name.

Vanilla models follow a consistent naming scheme, like `rightItem` or `head`, and many built-in systems (such as auto-equipping or third-party attachables) assume those names are used. This is why using standard locator names isn’t technically required, but is effectively mandatory if you want your models to be compatible with vanilla tools, auto-attachables, or other creators' content.

## Entity Bone Locators
As a rule of thumb, using the player bones as a guide for your model will give you all the required bones. However, If you want a bare minimum checklist, you can follow this diagram:

```json
waist
├── body
│   └── belt
├── head
├── rightArm
│   └── rightItem
├── leftArm
│   └── leftItem
├── rightLeg
└── leftLeg
```

<a href="/downloads/entity/topics/bone_bindings/example_skeleton.json" download>Download Example Model</a>

> [!Note]
> If you also want to adjust lead locations, you will need to add the `lead` and `lead_hold` particle locators to your model. To add a particle locator in Blockbench, you can right click any group and select the `Add Locator` button.

## Binding Attachables To Bones
As of `1.16.0`, bones can use the `binding` property to attach to a specified bone of the wielding entity. This property can be set in blockbench by right clicking a group and selecting the `Edit Binding` option. 

When binding item models, use `query.item_slot_to_bone_name(c.item_slot)` as the binding to bind the model based on the item slot it is in. It is not recommended to use this query for armour as `c.item_slot` is missing entries for `slot.armor.legs` and `slot.armor.feet`. When hard-coding bindings, you should reference the table below for which bones to bind your model to. 

| Bone | Usage in Equiptment |
| --- | --- |
| 'head' | helmet |
| 'body' | chestplate |
| 'rightArm' | chestplate right arm |
| 'leftArm' | chestplate left arm |
| 'belt' | leggings |
| 'rightLeg' | leggings, boots | 
| 'leftLeg' | leggings, boots |
| 'rightItem' | items |
| 'leftItem' | items |

*Note that in the table, all of the examples are wrapped in `''`, you'll need to do this too since the property is expecting a molang value.*

For detailed examples of adding custom tools and armour, check out the [official docs](https://learn.microsoft.com/en-us/minecraft/creator/documents/addcustomitems?view=minecraft-bedrock-stable).

## Data-Driven and Auto-Attachable Related Properties
Rendering data-driven attachables can be toggled using the `enable_attachables` property in the client-entity file, which set to `true` by default. When active, it causes attachables in both hand slots and all four armor slots to render automatically. To suppress armor slot attachables while keeping hand slot visuals, you can set `hide_armor: true`. These attachables rely solely on the bone specified via their parent binding, no other geometry properties or transform data influence their visibility or positioning.

Auto-attachables are the attachables generated for items and blocks without a dedicated attachable file. They're handled entirely differently and are not influenced by `enable_attachables` or `hide_armor` settings and instead rely on the existance of specific bones:
- A bone named `rightItem` must exist in an active geometry for hand slot auto-attachables to render at all.
- If the entity has something equipped in the head armor slot and lacks a bone named head, hand slot auto-attachables will not render regardless of whether the head item is data-driven or auto-generated, or what values `enable_attachables` or `hide_armor` hold.
- For a mainhand item to render properly, both `rightArm` and `rightItem` must be present even if they aren't in a direct parent-child relationship.
- Offhand items require both `leftArm` and `leftItem`, again regardless of parenting but also depend on the presence of `rightItem`.
- Only the vanilla `minecraft:pumpkin` and `minecraft:carved_pumpkin` will render as head slot auto-attachable, however, no other block items will. This too requires a head bone to exist.

To override lighting behavior for hand-held auto-attachables, you can set `held_item_ignores_lighting: true`. This causes the item to be rendered at full brightness, ignoring world lighting. This property does not apply to data-driven attachables and only affects item/block auto-attachables in hand slots.

## Multi-Model Entities
When an entity switches between different models at runtime, Minecraft does not automatically update the positions of item and attachable bones to match the new model's geometry. Instead, it continues to use the locator positions from the original model, which often leads to misplaced equiptment.

To address this, you can add the following render controller to the `0th` index of your render controllers and set it to always active. The existance of this controller stops the game from losing track of the active locations of locator bones.

```json
"controller.render.entity.track_locators": {
    "geometry": "geometry.default",
    "materials": [
        {
            "*": "Material.default"
        }
    ],
    "textures": [
        "Texture.default"
    ],
    "part_visibility": [
        {
            "*": false
        }
    ]
}
```
 