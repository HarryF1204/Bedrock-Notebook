---

---

# Multi-Pass Rendering

## Overview
Multi-pass rendering is a technique used to render a model multiple times with different materials. This technique is used to achieve effects that are not possible with a single pass. For example, when an entity needs to set it's own stencil.

## Example
This technique is best explained with a stencil example. In this case, we want an entity outline that is visible through walls. If you just apply a depth function to the outline to make it always render, it will render over the base. This means that you need to use the base to set a stencil and then read it from the outline to ensure it only renders where it should.

In this example material: *The base material, sets a stencil value. The outline material inverts its culling and removes the fancy define to give it the visual effect of an outline. It also reads the stencil value and is hidden where the stencil is set.*

```json
// materials/entity.material
"outline_base:entity_alphatest": {
	"+states": [
		"EnableStencilTest",
		"StencilWrite"
	],
	"frontFace": {
		"stencilFunc": "Always",
		"stencilFailOp": "Replace",
		"stencilDepthFailOp": "Replace",
		"stencilPassOp": "Replace"
	},
	"backFace": {
		"stencilFunc": "Always",
		"stencilFailOp": "Replace",
		"stencilDepthFailOp": "Replace",
		"stencilPassOp": "Replace"
	},
	"stencilRef": 2
},
"outline_outline:entity_alphatest": {
	"+states": [
		"EnableStencilTest",
		"InvertCulling"
	],
	"-states": [
		"DisableCulling"
	],
	"-defines": [
		"FANCY"
	],
	"depthFunc": "Always",
	"frontFace": {
		"stencilFunc": "NotEqual"
	},
	"backFace": {
		"stencilFunc": "Equal"
	},
	"stencilRef": 2,
	"stencilReadMask": 2
}
```


Each "pass" requires it's own render controller. As touched on in [Multi-Material Models](/materials/techniques/MultiMaterial%20models.md), when using wild cards to match bones for material configeration, it can bleed into unintended bones, so the material uses a bone namespace to avoid this.

In the outline controller, the `ignore_lighting` field is set to `true` to ensure the outline is always rendered at full brightness. The `overlay_color` field is set to white to allow us to use only one texture or to let us apply some sort of colour wheel effect to the outline.

```json
// render_controllers/entity_name.json
{
    "format_version": "1.10.0",
    "render_controllers": {
        "controller.render.outline.base": {
            "geometry": "geometry.default",
            "materials": [
                {
                    "base*": "material.base"
                }
            ],
            "textures": [
                "texture.default"
            ]
        },
        "controller.render.outline.outline": {
            "geometry": "geometry.default",
            "materials": [
                {
                    "outline*": "material.outline"
                }
            ],
            "textures": [
                "texture.default"
            ],
            "ignore_lighting": true,
            "overlay_color": {
                "r": 1,
                "g": 1,
                "b": 1,
                "a": 1
            }
        }
    }
}
```

In the client-entity file, the base is rendered first to ensure that the stencil is set, and then the outline is rendered.
```json
// entity.json
"render_controllers": [
	"controller.render.outline.base",   // sets the stencil
	"controller.render.outline.outline" // reads the stencil
]
```