---

---


# Introduction to Materials
## Overview
Materials serve as configerations for the rendering engine, instructing it on how to handle the rendering of bones—often more familiar to developers by their alias in Blockbench: **groups**. It's common to assume that materials are hard-coded or predefined, with their primary use being to apply rendering techniques to entire entities using the wildcard operator `*`. However, as with JSON UI, a lack of documentation does not imply a lack of depth or flexibility. Materials are much more than they initially appear to be.

When it comes to custom materials, the two primary components are **Link to states and defines**. **States** is an array that allows in-material configurable properties to be toggled, whereas **Defines** toggle pre-defined rendering techniques that sometimes offer configurations via render controllers. Defines allow for large-scale changes to a material.


## Material Files
There are three key JSON files for material control: **common**, **fancy**, and **sad**. The **fancy** and **sad** files are used to apply performance considerations to control to applied shaders. These files define lists of material files. When a player enables **fancy textures** in the video settings, materials in `fancy.json` are applied, often containing complex shaders and operations for higher-quality effects. When fancy textures are disabled, `sad.json` is used for more performance-friendly materials.

```json title:sad.json
[
    {"path":"materials/sad.material"},
    {"path":"materials/entity.material"},
    {"path":"materials/terrain.material"},
    {"path":"materials/portal.material"},
    {"path":"materials/cameraFacingSprite.material"},
    {"path":"materials/wireframe.material"}
]
```

```json title:fancy.json
[
	{"path":"materials/fancy.material", "+defines":["FANCY"]},
	{"path":"materials/entity.material", "+defines":["FANCY"]},
	{"path":"materials/terrain.material", "+defines":["FANCY"]},
	{"path":"materials/hologram.material"},
	{"path":"materials/portal.material", "+defines":["FANCY"]},
	{"path":"materials/cameraFacingSprite.material"},
	{"path":"materials/wireframe.material"}
]
```

Registering material files works in a similar way to how registering UI pages works, this means that they stack and you don't need to copy over the entire registry to add your custom material files. To register materials, create a new file, either `common.json`, `fancy.json`, or `sad.json`, and add a path object pointing to your custom material file.  

It is good practise to create a sad and fancy version of your materials to maximize performance although it is not required. You can create a file named `particles.material` or `entity.material` and write your material directly into it. Keep in mind that similarly to registering materials, you do not need to copy over the entire vanilla file, you can start from a blank material and it will stack with both the vanilla materials and custom materials. This does come with a potential issue, when two materials have the same identifier, the material in the pack with the highest priority will take effect so ensure that all identifier are unique unless you intend to overwrite another material.

```json title:"entity.material | Empty Material File"
{
    "materials": {
        "version": "1.0.0"
    }
}
```

## Identifier Structure
The notation of material identifiers is unique to it's system. To understand it, you need to know that materials tend to build off of others through a process known as inheritance, which is indicated by a `:` to define the base class, as seen below:

```json title:entity.material
"entity_alphatest:entity_nocull": {
  "+defines": [
    "ALPHA_TEST"
  ],
  "+samplerStates": [
    {
      "samplerIndex": 1,
      "textureWrap": "Repeat"
    }
  ],
  "msaaSupport": "Both"
}
```

Although it is similar to the `<namespace>:<identifier>` format of other topics, it's important to note that they are separate notations as materials use it to define `<identifier>:<base class>`.  

Most entity materials build off the the vanilla base material `entity_static` and while it’s generally good practice to build on top of vanilla materials, it’s not required. Although you can use vanilla materials as base classes, custom materials cannot inherit from other custom materials.
