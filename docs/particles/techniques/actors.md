# Entity Actors

Entities can be used in particles to set up variables that are otherwise inaccessible. For instance, queries used to obtain block information require an entity:

```c#
query.surface_particle_texture_coordinate;
query.surface_particle_texture_size; 
query.surface_particle_color;
```

This can be done using the `pre_effect_script` property in a `client-side entity animation`

```json
// particle pre-effect script
{
    "effect": "particle_reference",
    "pre_effect_script": "variable.dig_particle_texture_coordinate = query.surface_particle_texture_coordinate; variable.dig_particle_texture_size = query.surface_particle_texture_size;"
}
```

This property allows you to execute molang within the variable scope of the particle being summoned (referenced via `effect`) but using the entity actor to call the expression.