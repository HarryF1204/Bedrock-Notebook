---

---

# Defines

## Overview
Defines are constants and conditional flags used to apply shaders/materials to the rendering process. Defines are initilized in the material and then any further configurations are done via render controllers.

Defines are inherited from their base class and can be added/removed using the `"+defines"` and `"-defines" arrays. 

## Use Overlay
```json
"+defines": ["USE_OVERLAY"]
```

Enables the "overlay_color" render controller property, allowing the texture to be overlayed with a colour based on the set RGBA values. 

> [!note] Note that the values can be a `molang expression`, `int`, or `float`

```json
// render_controllers/entity_name.json
"overlay_color": {
    "a": 1.0,
    "r": 1.0,
    "g": 1.0,
    "b": 1.0
}
```

## Alpha Testing
```json
"+defines": ["ALPHA_TEST"]
```

This is a property that you have probably heard of since `entity_alphatest` is a very common material but you may not know what it does. Alpha testing is a concept where the texture is taken and the alpha channel of the pixels is checked for it's opacity, if it is below a certain threshold, it isn't rendered. This allows for entirely transparent pixels as opposed to the black squares which would normally show.

## Emissive Textures
```json
"+defines": ["USE_EMISSIVE"]
```

The emissive define translates texture transluency into light filtering. The loer the opacity, the less the pixel is affected by ambient lighting. 

A good example of this in practise is in the breeze.

![Emissive Texture](/images/materials/emissive.png)

## UV Animation
```json
"+defines": ["USE_UV_ANIM"]
```

This enables the `uv_anim` component in the render controller. It allows you to play flipbook animations (stacked entity textures making up an animation).
To create a simple looping animation, you can use this logic:

```json
// render_controllers/entity_name.json
"uv_anim": {
    "offset": [ 
        0.0, 
        "math.mod(math.floor(q.life_time * fps), frame_count) / frame_count" 
    ],
    "scale": [ 
        1.0, 
        "1 / frame_count" 
    ]
}
```

## Color Mask
> [!warning] This define requires the entity to have either the "player" or "warden" runtime identifier.

```json
"+defines": ["USE_COLOR_MASK"]
```

Enables the "color" component in the render controller. This applies a "mask" (renders a modification of the original texture based on RGBA values) allowing you to modify the colour and opacity of the entities texture.

> [!note] Note that values can be a "molang expression", float, or int. The "f" character means % of original. So 1.0f is 100% of the original.

This setup will keep the original colour but set the opacity to 45%.

```json
// render_controllers/entity_name.json
"color": {
    "r": "1.0f",
    "g": "1.0f",
    "b": "1.0f",
    "a": 0.45
}
```

![Color Mask](/images/materials/color_mask.png)

## Multiple Textures
```json
"+defines": ["USE_MULTITEXTURE"]
```

Allows for multiple textures to be set in the textures array within the render controller but requires multiple [Sample States](/materials/topics/sampler%20states.md).

## Texel Anti-Aliasing
```json
"+defines": ["TEXEL_AA"]
```

States that the shader should apply anti-aliasing at the texel (texture element) level. It applies blending to the colours of neighbouring texels, improving the overall quality of textures, especially when viewed at angles or up close. The `TEXEL_AA` define, along with the associated `TexelAA` texture filter, helps achieve smoother transitions between texels. 

## Enable Fog
> [!warning] This define no longer works

```json
"+defines": ["ENABLE_FOG"]
```

This material used to allow you to control whether or not fog affected the entity.

## Undocumented Defines
Undocumented does not mean completely unknown, or unusable, it means that they have not been tested to the point that they can be explained in the same way that other defines have been.
- GLINT
- COLOR_BASED
- USE_MASK
- ITEM_IN_HAND
- NO_TEXTURE
- MULTI_COLOR_TINT
- TINED
- COLOR_SECOND_TEXTURE
- MULTIPLICATIVE_TINT_COLOR
- AS_ENTITY_RENDERER
- ATLAS_TEXTURE
- LOW_PRECISION
- SEASONS
- TINED_ALPHA_TEST
- ENABLE_LIGHTING
- DISABLE_LIGHTING
- USE_ONLY_EMISSIVE
- USE_SKINNING