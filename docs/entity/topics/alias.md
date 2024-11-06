
# Entity Alias

> [!warning] Warning
> **This feature is deprecated**

Entity aliases are a useful, not-so-well-known feature of server entity definitions. They allow for tersely describing variants of an entity that would be configured using only properties. Aliases go in the description object and look like:

```json
"aliases": {
    "ex:open_door": {
        "ex:state": "open",
        "ex:active": true
    },
    "ex:closing_door": {
        "ex:state": "closing"
    }
}
```

Each key in alias is an identifier. This effectively creates additional identifiers for your entity beyond just the one declared in identifier. Each identifier assigns entity definition properties. These properties will be configured as specified when the identifier alias is used, circumventing the need to set up spawn events.

Properties not given use their default values. Molang cannot be used in alias property assignments. Spawn events may still be used with aliases and will both assign the alias properties and perform event actions. If an event action would conflict with a property assignment, the last set_property run will take priority.

Aliases are usable nearly anywhere in the API, such as entity components (minecraft:shooter, minecraft:spawn_entity, minecraft:transform, etc.), commands (summon and ride), the minecraft:entity_placer item component, and more. They do not exist as true types, though. For example, using the type selector argument in commands will erroneously autocomplete aliases but cannot match entities with the configured IDs. Use the new has_property argument to do so. Also note that the spawnEntity method in scripting is currently bugged not to be usable with aliases.

Even spawn rules can discriminate identifier types by alias separately or use alias references in their components. While client entities must be consolidated for most functionality (rendering) under the main type identifier, client entity definitions are still used for assigning spawn egg icons to each of the aliases, if they would have them. Spawn eggs indeed are created for each and every alias when is_spawnable is set to true in the entity definition. 