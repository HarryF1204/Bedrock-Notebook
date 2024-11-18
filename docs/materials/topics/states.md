---
next:
    text: 'Defines'
    link: '/materials/topics/defines'
prev:
    text: 'Introduction'
    link: '/materials/introduction'
---

# States
## Overview
States allow you to configure material-level settings. This means that there are no dynamic configurations avaliable via render controllers, everything is set via the material.

States are inherited from their base class and can be added and removed using `"+states"` and `"-states"` arrays.

## Blending
```json
"+states": ["Blending"]
```
Blending allows for incoming fragments to be blended with the current pixel in the buffer, allowing for the RGBA factors to be combined. When dealing with blending, a common mistake is to not take into account that backface culling still applies by default, and that the depth buffer will be active to cull any translucent faces that are behind your model. You'll notice this when you apply the vanilla material `entity_alphablend` to a model and place it infront of water or glass, the blocks appear to vanish when viewed through the translucent entity. If you add `DisableDepthWrite`, then the material won't write to the depth buffer so the block won't be able to check the buffer and therefor won't be hidden.

There are a few configurations for the `Blending` state which can be viewed here: [Blending](/materials/topics/blending.md)

![Blending Example](/images/materials/blending_example.png)

## Disable Culling
```json
"+states": ["DisableCulling"]
```
By default, bones that are behind other bones (calculated using the depth buffer) are "culled" (hidden). Setting this state will remove that effect so that bones can render behind others. This is especially useful for multi-sided translucent models.

![Disable Culling](/images/materials/disable_culling.png)

## Invert Culling
```json
"+states": ["InvertCulling"]
```
By default, the backfaces of bones are culled when the front face is visible, this flips that so only the front face of the bone relative to the camera is culled.

![Invert Culling](/images/materials/invert_culling.png)

## Stencil Read/Write
```json
"+states": ["EnableStencilTest"]
```
```json
"+states": ["EnableStencilWrite"]
```

Stencilling is the concept of reading and writing to a buffer and using comparative operations to determine when to render bones. It allows you to create effects like portal-view rendering, outlines, etc. 

As it is a more advanced topic, it requires an indepth explaination which you can find here: [Stencilling](/materials/topics/stencilling.md).

## Disable Color Write
```json
"+states": ["DisableColorWrite"]
```

Disables writing colour to the buffer. This will completely hide any entity as well as any block using blending materials, for example, players, clouds, the armour they wear, glass, and water will all be hidden. Held items are not hidden and neither are item stacks unless their attachable model is using the blending state.

![Disable Color Write](/images/materials/disable_color_write.png)

## Disable Depth Test/Write
The depth buffer allows bones to behind/infornt of other to be hidden based on their distance from camera. This is done by writing depth values (distance from the camera) to a temporary storage and depending on depth functions and depth states, bones that are compared will be rendered/hidden. For more information, view the [Depth](/materials/topics/depth.md) page.

### Disabling Depth Testing
```json
"+states": ["DisableDepthTest"]
```

Prevents depth values from being checked before rendering. This makes the bones of the model render over other models. This allows simple geometries to render through walls but more complex geometries will have issues as faces in front may render behind others since they will not be culled although there are methods around that issue. 

![Disable Depth Test](/images/materials/disable_depth_test.png)

### Disabling Depth Writing
```json
"+states": ["DisableDepthWrite"]
```

Prevents depth values from being written to the depth buffer, allowing objects behind to remain rendered.

![Disable Depth Write](/images/materials/disable_depth_write.png)

## Disable Alpha Write
```json
"+states": ["DisableAlphaWrite"]
```

Stops the material from writing to the alpha channel. This allows for colour blending to take place without stacking translucency so the alpha value in the buffer remains untouched.

