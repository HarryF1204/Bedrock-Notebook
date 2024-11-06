---

---

# Particle that Reads from the Terrain Atlas

The warden has a particle `warden_dig.particle.json` that uses the atlas to display particles. For this, Minecraft added Molang queries that we can use to translate block -> texture UV values.

To setup a particle that uses the block atlas, the first thing we need to do is setup an entity with a client-side animation that we can use to setup variables by executing molang in the variable scope of the particle. To do this, add this particle effect to the entity's animation. 

```json
// particle pre-effect script
{
    "effect": "particle_reference",
    "pre_effect_script": "variable.dig_particle_texture_coordinate = query.surface_particle_texture_coordinate; variable.dig_particle_texture_size = query.surface_particle_texture_size;"
}
```

This script will find the nearest block (on the y-axis) to the spawned entity with a max range of 10 and convert it into two variables which represent the particle texture co-ordinate on the terrain atlas, and the UV size.

The next step is to setup the particle where you'll need to apply two things, the first is the texture, you need to reference the terrain atlas which can be done like this.
```json
"description": {
	"identifier": "particle_name",
	"basic_render_parameters": {
		"material": "particles_alpha",
		"texture": "atlas.terrain"
	}
}
```

You will then need to setup your particle UV like this to make sure that the particle uses the variables that you have passed.
```json
"uv": {
	"texture_width": 1,
	"texture_height": 1,
	"uv": [
		"variable.dig_particle_texture_coordinate.u + (variable.dig_particle_texture_size.u/4) * (variable.particle_random_1*3)",
		"variable.dig_particle_texture_coordinate.v + (variable.dig_particle_texture_size.v/4) * (variable.particle_random_2*3)"
	],
	"uv_size": [
		"variable.dig_particle_texture_size.u/4",
		"variable.dig_particle_texture_size.v/4"
	]
}
```

![Terrain Atlas Particle](/images/particles/terrain_atlas_particle.png)
