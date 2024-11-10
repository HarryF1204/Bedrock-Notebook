---
prev:
    text: 'Variables'
    link: '/molang/topics/variables'
---

# Domain Examples
An incomplete set of examples of where you can use molang to give you an idea of what it can do.

## Animation Controllers
Both server-side and client-side animation controllers use molang in their `transitions` as well as `on_entry` and `on_exit` events. 

```json
"default": {
    "blend_via_shortest_path": true,
    "blend_transition": 0.2,
    "transitions": [
        {
            "melee_attack": "q.is_delayed_attacking"
        }
    ]
}
```

## Animations

### Bones
Molang can be used to create looping animations for bones. This is heavily preferred over static keyframes as it allows for more dynamic animations that are easier to implement.

```json
"loop" : true,
"bones" : {
  "leftarm" : {
    "rotation" : [ 0.0, 0.0, "-(math.cos(query.anim_time * 103.2) * 2.865) - 2.865" ]
  },
  "rightarm" : {
    "rotation" : [ 0.0, 0.0, "(math.cos(query.anim_time * 103.2) * 2.865) + 2.865" ]
  }
}
```

### Anim Time Update
Anim time update is used to update the value returned from `q.anim_time`. This allows you to dynamically map animations to properties like movement speed. This does mean that you'll need to use molang in the animation, specifically the `q.anim_time` function.

```json
"anim_time_update": "q.anim_time+q.delta_time*(q.modified_move_speed*1.5)"
```

### Pre Effect Script
When defining the particles to play during an animation, the `pre_effect_script` can be used to execute molang within the scope of the particle while passing the current actor to be used in any query functions. 

```json
"particle_effects": {
    "0.0": [
        {
            "effect": "digging_particles",
            "pre_effect_script": "variable.dig_particle_texture_coordinate = query.surface_particle_texture_coordinate; variable.dig_particle_texture_size = query.surface_particle_texture_size; variable.dig_particle_color = query.surface_particle_color;"
        }
    ]
}
```

## Geometry
> [!Note] Note
> This requires that the `.geo` file uses a format version of `1.16.0` or higher.

Model bones cannot directly use molang but there is a `binding` property per-bone that accepts both `strings` and `molang`. This allows you to dynamically bind an attachable model to the entity that it is attached to. [More Info](/molang/topics/variables#item-slot).
```json
{
  "name": "sword",
  "pivot": [0, 0, 0],
  "binding": "q.item_slot_to_bone_name(c.item_slot)"
}
```

## Client-side Actor Defintions
Both item and attachable client-side defintions allow you to use molang within the scripts object to setup variables on `initilize`, `parent_setup`, `pre_animation`, `scale`, `scalex`, `scaley`, and `scalez`.

## Render Controller
### Arrays and Resource Properties
Arrays let you setup conditional textures, materials, and geos that can be used by the resource properties. You can setup an array like this:
```json
"arrays": {
  "textures": {
    "array.skins": [
      "texture.default",
      "texture.angry",
      "texture.happy"
    ]
  }
}
```
Which can then be referenced in the resource usage properties like this:
```json
"textures": ["array.skins[q.property('skin_index')]"]
```

### Resource Usage Properties
Resource usage properties are any render controller options that directly configure the rendering of the entity. For example: `color`, `color_overlay` `geometry`, `materials`, `is_hurt_color`, `light_color_multiplier`, ...

The majority of resource usage properties do accept molang as their values.

## Server-side Conditions
The majority of the server-side entity file will use `filters` to determine conditions for running events. There are a few cases where `molang` is used over `filters` to determine conditions. These are the following components which can use molang:

```json
"minecraft:ambient_sound_interval": {
  "value": 5.0,
  "range": 5.0,
  "event_name": "ambient",
  "event_names": [
    {
      "event_name": "ambient.tame",
      "condition": "query.is_using_item"
    },
    {
      "event_name": "ambient",
      "condition": "!query.is_using_item"
    }
  ]
}
```

```json
"minecraft:anger_level": {
  "max_anger": 150,
  "angry_threshold": 80,
  "remove_targets_below_angry_threshold": true,
  "angry_boost": 20,
  "anger_decrement_interval": 1.0,
  "default_annoyingness": 35,
  "default_projectile_annoyingness":  10,
  "on_increase_sounds": [
    { "sound": "listening_angry", "condition" : "query.anger_level(this) >= 40" },
    { "sound": "listening", "condition" : "query.anger_level(this) >= 0" }
  ],
  "nuisance_filter": {
    "all_of": [
      { "test": "is_family", "subject": "other", "operator": "not", "value": "warden" },
      { "test": "is_family", "subject": "other", "operator": "not", "value": "inanimate" }
    ]
  }
}
```