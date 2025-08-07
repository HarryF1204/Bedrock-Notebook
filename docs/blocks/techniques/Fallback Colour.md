# Alphatest to Opaque Material Colour Fallback

> [!note]
> Working as of 1.21.100

## Problem
When using the `alpha_test_to_opaque` material, blocks use alpha testing up close but switch to opaque rendering at a distance. This hybrid approach is performance-friendly but has a noticible visual drawback being that any fully transparent pixels are rendered as pure black (`#000`) when the opque fallback is used. This causes visual artifacts that are especially noticible with vibrant textures or models with a lot of transparency.

Alpha testing discards pixels below an alpha (translucency) threshold, allowing it to render transparent pixels. However, the opaque material ignores the alpha channel entirely. This means transparent pixels are treated as fully visible and rendered as black, since no color information exists for them.

![img](/images/blocks/alpha_test_fallback/close_far.png)

## Solution
To mitigate this issue, we can embed a more subtle fallback colour beneth the primary texture. This fallback layer must be set to a low opacity to be discarded by alphatest material up close, but will still present in the colour buffer for the opaque rendering at a distance.

1. Open the texture using an imagine editing tool.
2. Create a new texture layer.
3. Fill the layer with your chosen low-opacity fallback colour.
4. Flatten the layers.
5. Export as a `.tga` file.

![img](/images/blocks/alpha_test_fallback/in-aseprite.png)

## Result
With this technique, blocks rendered from a distance retain appropriate color and tone rather than defaulting to black. This preserves the intended visual quality while maintaining the performance benefits of distance-based material switching.

![img](/images/blocks/alpha_test_fallback/result.png)