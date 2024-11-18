---
prev:
    text: 'Blending'
    link: '/materials/topics/blending'
next:
    text: 'Stencilling'
    link: '/materials/topics/stencilling'
---

# Depth


## Overview
Depth functions control how depth values of incoming fragments are compared to those in the depth buffer, determining whether a new fragment should be rendered.

## Depth Function
The depth function defines the comparisons made when determining whether a fragment passes the depth check. By setting this function, you're controlling how pixels are drawn based on their depth. Higher depth value means that the object is further from the camera.

To set a depth function, use the `depthFunc` property. Note that the default value is `LessEqual`.
```json title:"Depth Function"
"depthFunc": "Always"
```

These are the available options for the depth function along with their outcome. Each option, such as `Greater`, `Less`, or `Equal`, determines whether fragments closer, further, or at the same depth are rendered, allowing for detailed control over occlusion and multi-layer rendering setups.
  
|**Value**|**Description**|
|---|---|
|`Always`|Always passes, drawing every fragment, even those behind others. Leads to layers or objects rendering on top regardless of depth.|
|`Equal`|Passes only if the fragment's depth matches the existing depth, useful for multi-pass effects. Nothing else renders unless it has the exact same depth.|
|`Greater`|Renders only fragments further from the camera than current pixels, good for layers that should appear behind others.|
|`GreaterEqual`|Passes if fragments are further or at the same depth, allowing fragments further away or exactly aligned to render.|
|`Less`|Only renders fragments closer to the camera than existing ones, commonly used for front-to-back rendering.|
|`LessEqual`|Passes for fragments closer or at the same depth, ensuring closer and matching-depth fragments are rendered.|
|`NotEqual`|Passes if the fragment depth differs from the existing one, useful for avoiding overlap or ensuring layered rendering.|

## Depth Bias

> [!warning] Warning
> As of the Render Dragon update, Depth Bias no longer has any effect in game. 

Depth bias works to mitigate visual artefacts such as z-fighting which occurs when two or more faces have nearly identical depth values. This is seen as the two objects flickering as both attempt to render in the same location. 

### Depth Bias Configuration
Depth bias can be controlled using four main variables, each influencing how the depth offset is calculated:

| **Variable**              | **Description**                                                                                                                                            |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `depthBias`               | A constant offset applied to the depth of fragments. Typically used for static depth shifts, ensuring one object consistently renders in front of another. |
| `slopeScaledDepthBias`    | Scales the depth offset based on the slope of the polygon's surface. Useful for handling depth conflicts on sloped surfaces relative to the camera.        |
| `depthBiasOGL`            | The OpenGL-specific version of `depthBias`, providing platform-specific adjustments for consistent depth behavior.                                         |
| `slopeScaledDepthBiasOGL` | OpenGL's equivalent of `slopeScaledDepthBia`                                                                                                               |

#### Example Use Case
**Decal Rendering**: When applying decals (like bullet holes or graffiti) onto surfaces, z-fighting can cause the decal to flicker or incorrectly overlap with the base surface.
**Solution**: Apply a slight depth bias to the decal material to ensure it consistently renders above the base surface.
```json title:"Depth Bias"
"depthBias": 0.01, 
"slopeScaledDepthBias": 1.0,
```

#### Calculating the Depth Offset
The total depth offset applied to a fragment is calculated using the following formulas:

$$
\text{offset} = (\text{slopeScaledDepthBias} \cdot m) + (\text{depthBias} \cdot r)
$$
$$
\text{offset}_{OGL} = (\text{slopeScaledDepthBiasOGL} \cdot m) + (\text{depthBiasOGL} \cdot r)
$$
**Where:**
- 𝑚: Represents the maximum slope of the polygon's depth, calculated during the rasterization stage. Polygons that are more parallel to the near clipping plane have smaller mmm values, while those at steeper angles have larger mmm values.
- 𝑟: The smallest resolvable depth value in the window coordinate system. It is a platform-specific constant that defines the minimal discernible depth difference, ensuring that the bias is noticeable without causing excessive offset.

#### Example Calculation

Suppose you have the following values:
- `slopeScaledDepthBias` = 1.0
- `depthBias` = 0.5
- `m` = 0.3 (for a moderately angled polygon)
- `r` = 0.01 (platform-specific constant)

**Offset Calculation:**

$$
offset=(1.0×0.3)+(0.5×0.01)=0.3+0.005=0.305
$$


This means the fragment's depth will be increased by 0.305, ensuring it renders behind other fragments with a depth value less than 0.305 units.


### Additional Considerations
- **Slope-Scaled Bias:** Adjusting the slope-scaled depth bias is essential for handling polygons at various angles. A higher slope bias can prevent z-fighting on steeply angled surfaces, while a lower bias maintains precision for flatter surfaces.
- **Platform-Specific Adjustments:** Different graphics APIs (like OpenGL and DirectX) and hardware may handle depth bias calculations differently. Utilizing platform-specific variables (`depthBiasOGL` and `slopeScaledDepthBiasOGL`) ensures that depth bias behaves consistently across different systems.

### Associated Rendering Environment Configurations
In addition to depth bias, certain rendering states can influence how depth information is processed and how objects are rendered relative to each other. Below are key states related to depth handling:

|**State**|**Description**|
|---|---|
|**Wireframe**|Renders objects in wireframe mode, displaying only the edges of polygons without filling their interiors. Useful for debugging geometry.|
|**DisableCulling**|Renders both the front and back faces of polygons simultaneously by disabling face culling. This can be useful for double-sided materials or debugging.|
|**InvertCulling**|Switches the culling mode from back-face to front-face (or vice versa). By default, back-face culling is used, which discards polygons facing away from the camera. Inverting culling renders the opposite faces, allowing for different visual effects or corrections.|
