---
---

# Example Materials

> [!note] Note 
> **This page is a WIP**

## Additive
This material is not a perfect match although it is quite close. You may have to change the `light_color_multiplier` and add `ignore lighting` in the render controller depending on the conditions of your entity.

```json
"additive_alpha:entity_alphatest": {
  "-defines": ["FANCY"],
  "-states": ["DisableCulling"],
  "+states": ["Blending", "DisableDepthWrite"],
  "blendSrc": "One",
  "blendDst": "One"
}
```

![Blockbench Additive](/images/materials/additive.png)


## Repeating Texture
This material sets up the texture filter as point which is the default texture filter and will render the texture normally. The wrap is set to repeat which means that when the UV goes over the defined over, it won't stretch, it will repeat the texture. To get the UV to go over defined bounds, we need to set the UV which means that we need to add that to the defines.

```json
"material_test:entity_alphablend": {
    "+defines": [ "USE_UV_ANIM" ],
    "samplerStates": [
        {
            "samplerIndex": 0,
            "textureFilter": "Point",
            "textureWrap": "Repeat"
        }
    ]
}
```

To setup our texture like this, I have scaled a flat 16x16 model to `[3,0,3]` and setup a UV animation to force the UV out of the regular bounds.

```json
// render_controllers/entity_name.json
"uv_anim": {
    "offset": [0, 0],
    "scale": [3, 3]
}
```

![Repeating Texture](/images/materials/repeating_texture.png)


## Stacking Translucency

This material builds off of ``entity_nocull`` to ensure that both the back face and front face of the bone renders, enables blending to support the alpha channel of the texture, and disables depth write to allow other bones to render through it.

```json
"stacking_translucency:entity_nocull": { 
	"+states": [
		"Blending", 
		"DisableDepthWrite"
	] 
}
```

![Stacking translucency](/images/materials/blending_example.png)


## Glowing Translucent

This materials makes use of the emissive property without clearing the alpha channel, allowing it to blend and glow.
```json
{
    "customblend:entity_alphablend": {
        "+defines": [
            "USE_EMISSIVE"
        ],
        "+states": [
            "Blending",
            "DisableCulling",
            "DisableDepthWrite",
            "DisableAlphaWrite"
        ]
    }
}
```


## Entity Outlines
### Method 1
![Outline Method 2](/images/materials/outline_1.png)

Duplicate your model in blockbench and scale it slightly either using the `inflate` property, or by using an animation. [Apply the material below to the outline.](/materials/techniques/Multi-material%20models.html)

```json
"outline:entity_alphatest": {
	"+states": [
		"InvertCulling"
	],
	"-states": [
		"DisableCulling"
	],
	"-defines": [
		"FANCY"
	]
}
```


### Method 2
For this method to work, setup your model as shown below with outline bones inflated by ``-17`` and make sure they are textured the outline colour that you want.

![Outline Method 2](/images/materials/outline_2.png)

Then, you will need to apply the ``entity_emissive_alpha_one_sided`` to the entity to make sure that the outline renders correctly. 