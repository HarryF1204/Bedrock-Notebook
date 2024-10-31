---

---

# Sampler States

Sampler states is an array that defines how the textures in texture indexes are processed. The texture index is the corresponding value (starting at 0) to the order that textures appear in a render controller.  

This is the render controller for armour. The armour materials support multiple textures which is obvious as the textures array holds two indexes. This means that they both render at the same time and the one with the highest index renders on top.

```json title:"armor.render_controllers.json"
{
  "format_version": "1.8.0",
  "render_controllers": {
    "controller.render.armor": {
      "geometry": "Geometry.default",
      "materials": [
        {
          "*": "variable.is_enchanted ? Material.enchanted : Material.default"
        }
      ],
      "textures": [
        "variable.has_trim ? variable.trim_path : Texture.default",
        "Texture.enchanted"
      ]
    }
  }
}
```

To define a sampler state, add the `+samplerStates` array to the material, and set the `samplerIndex` to the index that you want to control the parameters for.

```json
"+samplerStates": [
    {
      "samplerIndex": 0,
      "textureWrap": "Clamp",
      "textureFilter": "Point"
    }
]
```

`textureWrap` allows you to define how the rendering engine should handle the texture if the UV goes beyond its bounds.

| **Option** | **Definition**                                                                 |
| ---------- | ------------------------------------------------------------------------------ |
| Clamp      | If the UV goes beyond the bounds, then the texture should be stretched to fit. |
| Repeat     | If the UV goes beyond the bounds, then the texture should repeat itself.       |

To make the texture co-ordinates go beyond their defined bounds, you can use a [UV Animation](/materials/topics/defines.md#uv-animation).

```json
// render_controllers/entity_name.json
"uv_anim": {
    "offset": [
        0.0,
        "math.mod(math.floor(q.life_time * fps), frame_count) / frame_count"
    ],
    "scale": [
        "size_in_blocks",      
        "size_in_blocks/frame_count"
    ]
}
```

`textureFilter` defines how the texture is pre-processed.

| Filter    | Definition                                                                                                                                                                                                                                                                                                                                                        |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Point     | Uses point sampling (nearest-neighbour sampling). The colour of a pixel is taken directly from the nearest texel. This is the default for entities                                                                                                                                                                                                                |
| Bilinear  | Uses bilinear interpolation. Averages the colours of the four nearest texels to produce a smoother texture.                                                                                                                                                                                                                                                       |
| Trilinear | Combines bilinear filtering while also considering mipmapping, these are precomputed, smaller versions of the texture used for distant objects. It averages the bilinear results from two mipmap levels to produce smoother transitions between them.<br><br>This filter is not fully supported and will cause an assertion error when ran with a partner client. |
| TexelAA   | TexelAA samples multiple times at slightly different positions within a pixel. These samples are then averaged to produce the final colour. This helps to smooth out jagged edges and reduce the aliasing artifacts that can occur when a texture is mapped onto a surface.                                                                                       |

