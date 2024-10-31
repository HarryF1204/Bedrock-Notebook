---

---

# Multi-Material models

Render controllers set materials on a per-bone basis by either explicitly setting bone names or through wild cards `*` to match multiple sub-groups at once. For the default entity render controller, setting the material looks like this:
```json
"materials": [ 
    { 
        "*": "Material.default" 
    } 
]
```

This will set the every bone to `material.default` since there is no group identifier specified before or after the wild card. If the identifier were to look like this: `leg_*` then bones like `leg_1`, `leg_2`, and `leg_3` would all be matched and the same works the other way around. When it comes to making models that you know will use multiple materials, it is smart to keep a consistent naming convention to ensure that matching all of the groups is as easy as possible.

To apply multiple materials to different bones, you need to add multiple material instance objects to the materials array like this:
```json
"materials": [ 
    { 
        "head": "Material.head" 
    }, 
    { 
        "body*": "Material.body" 
    },
    {
        "*": "Material.default"
    }
]
```

In the client-entity file, the order of render controllers significantly affects which materials are applied to bones because it's processed in a first-come, first-serve manner. For instance, if `controller A` uses a wildcard (`*`) to apply materials to all bones, even models managed by `controller B` may still end up with default materials from `controller A`.

To avoid this, you can use the `part_visibility` array to prevent specific bones from being affected, but this approach might not always be optimal. A better strategy is to either explicitly specify which bones each controller should handle or carefully manage the hierarchy of render controllers to ensure correct material application.