---

---

# Multi-Pass Rendering


Example:
```json
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

```
{
    "format_version": "1.10.0",
    "render_controllers": {
        "controller.render.outline.base": {
            "geometry": "geometry.default",
            "materials": [
                {
                    "*": "material.base"
                }
            ],
            "textures": [
                "texture.default"
            ],
            "part_visibility": [
                {
                    "*": false
                },
                {
                    "base*": true
                }
            ]
        },
        "controller.render.outline.outline": {
            "geometry": "geometry.default",
            "materials": [
                {
                    "*": "material.outline"
                }
            ],
            "textures": [
                "texture.default"
            ],
            "part_visibility": [
                {
                    "*": false
                },
                {
                    "outline*": true
                }
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


"render_controllers": [
                "controller.render.outline.base",
                "controller.render.outline.outline"
            ]