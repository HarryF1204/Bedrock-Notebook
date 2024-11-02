
# Dynamic Atlas

## Overview
Dynamic atlas compositing allows for colour overlays on item icons without requiring individual images for each variant. By defining textures and colour overlays in the item atlas, Minecraft can dynamically composite these elements using the additive property.

## Example: Potion Variants
In this example, we create chalices with different liquid colours to represent potion effects. Instead of a unique texture for each potion, we use a base chalice texture and overlay it with a tinted liquid texture for each type.

```json
"namespace:regeneration_potion": {
    "textures": [
        "textures/items/potion/potion_base",
        {
            "path": "textures/items/potions/potion_overlay",
            "tint_color": "#CD5CAB"
        }
    ],
    "additive": true
}
```

`textures` includes the base chalice shape and a liquid overlay.
`tint_color` specifies the overlay colour.
`additive` applies the colour additively over the base texture.

This method lets you manage item variants easily and reduces the need for repetitive texture editing.