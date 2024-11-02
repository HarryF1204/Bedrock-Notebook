# Item Rendering 

> [!warning] Warning
> This document is a work in progress.

## Materials
Entities, particles, blocks, and items all support materials to a different level, with entities being the most versatile, and blocks being the least. This document will go over the different ways materials can and cannot be applied to different types of attachables as well as some work arounds to make impressive visuals.

| Material Concept | Functional |
| --- | --- |
| Stencilling | - [x]  |
| USE_UV_ANIM | - [ ]  |
| USE_EMISSIVE | - [x]  |

## Multi-Pass Rendering
When an attachable uses multiple render controllers, each duplicate bone is renamed to `bone_name{n}` where `n` is the index of the controller. This should be accounted for when it comes to creating the animations for the attachable.

## Creating Animated Textures
The ``USE_UV_ANIM`` define is not supported by items but that does not meaen that items cannot be animated. By splitting a flipbook into inidivual images, you can use the render controller to animate the item using a textures array.

```json
"arrays": {
    "textures": {
        "Array.skins": [
            "Texture.frame_2",
            "Texture.frame_2",
            "Texture.frame_3",
            "Texture.frame_4"
        ]
    }
},
"textures": [
    "temp.life_time=query.life_time*4;return array.skins[temp.life_time];"
]
```

