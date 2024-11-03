
# Look Detection

## Overview
Look detection is a method used to determine whether the player is looking at a specific mob. For some cases, you can use the enderman component `minecraft:lookat` to run an event whenever any player looks at the entity. For most situations though, you'll need a per-player system rathern than an entity-based mechanic. For example, to display more information when the player is looking at a shop item.

## Client-Side
```json
"initilize": [
    "v.vertical_angle_sensitivity = 60;",
    "v.horizontal_angle_sensitivity = 20;",
    "v.height_offset = 1;"
],
"pre_animation": [
    "v.rotation_to_camera_0 = -Math.atan2(-q.distance_from_camera * Math.sin(q.rotation_to_camera(0)) - v.height_offset, q.distance_from_camera * Math.cos(q.rotation_to_camera(0)));",
    "v.look_at_entity = Math.abs(Math.abs(q.rotation_to_camera(1) - q.camera_rotation(1)) - 180) < (v.horizontal_angle_sensitivity / q.distance_from_camera) && Math.abs(v.rotation_to_camera_0 + q.camera_rotation(0)) < (v.vertical_angle_sensitivity / q.distance_from_camera);"
]
```

`v.look_at_entity` will be true if the player is looking at the entity. The default angles are 60º vertical and 20º horizontal. The height offset is 1 block above the entity's feet. This is fairly accurate to a collission that is 2m tall, 1m wide.


## Server-Side
```js
player.getEntitiesFromViewDirection(...);
```

[Get Entity From View Direction Documentation](https://learn.microsoft.com/en-us/minecraft/creator/scriptapi/minecraft/server/entity?view=minecraft-bedrock-stable#getentitiesfromviewdirection).

### Command-Based

```c#
execute as @p at @s anchored eyes facing entity @e[type=pig, c=1] eyes positioned ^^^1 positioned ~~-1.62~ rotated as @s positioned ^^^-1 if entity @s [r=0.2] run say hi pig!
```

This command allows you to detect if a player is looking at an entity. You can define the entity scope in the `@e` array. 