---
prev:
    text: 'Depth'
    link: '/materials/topics/depth'
next:
    text: 'Fancy'
    link: '/materials/topics/fancy'
---

# Stencilling

## Overview
Stencilling allows you to control the drawing of pixels based on custom rules which allows for effects like masking, outlining, and multi-pass rendering. You can control both reading and writing to the stencil buffer to create these effects.

When using stencils on a single entity, you'll need to use [Multi-Pass Rendering](/materials/techniques/multi-pass%20rendering.md). This allows you to write to the buffer in one controller then read from it in another.

To apply stencil operations, you must first enable the required state `StencilWrite` and/or `EnableStencilTest`.

## Understanding Stencil Operations
### Per-Face Stencilling Operations
Per-face stencilling is controlled by the `frontFace` and `backFace` properties. Each face can independently read or write to the stencil buffer. The first key property is `stencilFunc`, which defines when the stencil test passes.

| **Parameter** | **Description**                             | **Options/Values**      |
| ------------- | ------------------------------------------- | ----------------------- |
| stencilFunc   | Determines the stencil comparison function. | Always, Equal, NotEqual |

| **Stencil Func** | **Description**                                                                         |
| ----------------------------- | -------------------------------------------------------------------------- |
| Always         | The stencil test always passes.                                                         |
| Equal          | Passes if (stencilRef & stencilReadMask) == (stencil buffer value & stencilReadMask). |
| Not Equal      | Passes if (stencilRef & stencilReadMask) != (stencil buffer value & stencilReadMask). |

### Stencil Test Results
There are three key properties that define what happens when the stencil and depth tests pass or fail.

| **Parameter**        | **Description**                                                     | **Options         |
| -------------------- | ------------------------------------------------------------------- | ----------------- |
| stencilFailOp      | Action to take if the stencil test fails.                           | Keep, Replace |
| stencilDepthFailOp | Action to take if the stencil test passes but the depth test fails. | Keep, Replace |
| stencilPassOp      | Action to take if both the stencil and depth tests pass.            | Keep, Replace |
### Material-Scoped Stencilling Properties
In the material, there are also properties that apply to the material as a whole which are shown below.

| **Parameter**        | **Description**                                                                | **Options**                        |
| -------------------- | ------------------------------------------------------------------------------ | ---------------------------------- |
| stencilRef         | Reference value for stencil testing.                                           | Number (e.g., 0, 1, 2, etc.) |
| stencilReadMask    | Bitmask applied to the stencil buffer and stencilRef during stencil testing. | Number (e.g., 255, 1)          |
| stencilWriteMask   | Bitmask used to control which bits in the stencil buffer are written.          | Number (e.g., 1, 255)          |
| stencilRefOverride | Optional override for stencilRef, not always used.                           | Number (e.g., 0, 1, 2, etc.) |

---

## Reading and Writing to the Stencil Buffer

### Writing To The Stencil Buffer
When you write to the stencil buffer, you typically perform the following steps:
1. **Enable Stencil Testing and Writing**: Use `+states` to enable stencil testing (`EnableStencilTest`) and allow writing to the stencil buffer (`StencilWrite`).
2. **Set Stencil Operations**: Define how stencil operations affect the stencil buffer using `stencilFailOp`, `stencilDepthFailOp`, and `stencilPassOp`.
3. **Set Stencil Function**: Use `stencilFunc` to determine when the stencil test passes or fails. For writing, Always is commonly used to ensure that the stencil buffer is updated.
4. **Provide Reference Value**: Specify `stencilRef` to set the value that will be written to the stencil buffer.

The following example demonstrates how to write to the stencil buffer:
```json
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
```

In this example, the material writes a reference value (`stencilRef`) to the stencil buffer, replacing the existing value regardless of whether the stencil test passes or fails. 

### Reading From the Stencil Buffer
When you read from the stencil buffer, you perform these steps:
1. **Enable Stencil Testing**: Use +states to enable stencil testing (`EnableStencilTest`).
2. **Set Stencil Function**: Use `stencilFunc` to determine the condition under which a fragment passes the stencil test based on the comparison between `stencilRef` and the stencil buffer value.
3. **Set Reference Value and Mask**: Provide `stencilRef` and optionally `stencilReadMask` to control the stencil test.
4. **Define Depth Function**: Adjust `depthFunc` if necessary (e.g., Always) to control depth testing during this pass.

The following material example shows how to read from the stencil buffer.

```json
"+states": [
    "EnableStencilTest"
],
"frontFace": {
    "stencilFunc": "NotEqual"
},
"backFace": {
    "stencilFunc": "Equal"
},
"stencilRef": 2,
"stencilReadMask": 2
```

In this example, the material reads from the stencil buffer to determine where to draw. It uses the stencil function to compare the `stencilRef` with the existing stencil buffer value.
