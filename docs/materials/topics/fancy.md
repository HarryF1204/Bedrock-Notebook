---

---

# Fancy

The "Fancy Graphics" option in the video settings of Minecraft allows player's to prioritise rendering efficiency over quality. When enabled, the `fancy.json` file loads materials rather than `sad.json`. In this file is a list of material paths along with a `+defines` property for some of the paths. This automatically adds the define to every material within the file.

```json title
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

To give a visual explaination, I will take my entity-based custom skybox as an example. It is saved in the `entity.material` file which means that when fancy graphics is enabled, the fancy properties will be applied which looks like this.

![Fancy Enabled](/images/materials/fancy_enabled.png)

If I were to add `"-defines": ["Fancy"]` to the material, it would render as if it were a real skybox.

![Fancy Disabled](/images/materials/fancy_disabled.png)