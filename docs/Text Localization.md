---

---

# Localization

## Overview
Text string localization is the concept of creating an indentifier for a string of text that can be used to translate the text into different languages. To get started with it, you'll need a `texts` folder in your resource pack with a `languages.json` file along with each of your languages.

```json
// languages.json
{
  "languages": [
    "en_US"
  ]
}
```

In the language file, you can use `identifier=translation`to create a translation that you can use in your code.

Places you can use translations:
- tellraw
- titleraw
- dialogue
- tile names
- item names
- data-driven item names
- UI

## Data-Driven Item Name Localization 

> [!warning] Display name text translations do not support ":". Use "." to seperate each section of the identifier.

The `minecraft:display_name` can compose keys using `%`. For Example, if you wanted to add a few lines of lore using the item name, you could do something like this:

```json
// items/item_name.json
"minecraft:display_name": {
    "value": "%item.namespace.item_name\n%§5§o%lore.namespace.item_name.line_1\n%lore.namespace.item_name.line_2§r"
},
```

and then setup the localization file like this:
```ini
item.namespace.item_name=item name
lore.namespace.item_name.line_1=Test Text
lore.namespace.item_name.line_2=Test Text
```

## Input Key Localization
When displaying a localized message, you may want to give control hints, for example, "Press [key] to open the menu". To this this, you can use `tellraw @s {"rawtext":[{"text":":_input_key.hotbar.1:"}]}`

**Definitely Supported:**

```
:_input_key.attack: 
:_input_key.pickItem: 
:_input_key.use: 
:_input_key.drop: 
:_input_key.hotbar.1: 
:_input_key.hotbar.2: 
:_input_key.hotbar.3: 
:_input_key.hotbar.4:
:_input_key.hotbar.5: 
:_input_key.hotbar.6: 
:_input_key.hotbar.7: 
:_input_key.hotbar.8: 
:_input_key.hotbar.9: 
:_input_key.inventory: 
:_input_key.togglePerspective: 
:_input_key.jump: 
:_input_key.sneak: 
:_input_key.sprint: 
:_input_key.left: 
:_input_key.right: 
:_input_key.back: 
:_input_key.forward: 
:_input_key.mobEffects: 
:_input_key.chat: 
:_input_key.command: 
:_input_key.emote: 
:_input_key.menuTabLeft: 
:_input_key.menuTabRight: 
:_input_key.copyCoordinates: 
:_input_key.copyFacingCoordinates: 
:_input_key.lookUpSlight: 
:_input_key.lookDownSlight: 
:_input_key.lookUpRight: 
:_input_key.lookUp: 
:_input_key.lookUpLeft: 
:_input_key.lookRight: 
:_input_key.lookCenter: 
:_input_key.lookLeft: 
:_input_key.lookDownRight: 
:_input_key.lookDown: 
:_input_key.lookDownLeft: 
:_input_key.lookUpSmooth: 
:_input_key.lookDownSmooth: 
:_input_key.lookLeftSmooth: 
:_input_key.lookRightSmooth: 
:_input_key.cycleItemLeft: 
:_input_key.cycleItemRight:
:_input_key.menuCancel: 
:_input_key.codeBuilder: 
:_input_key.immersivereader: 
:_input_key.toggleControlTips:
```

**Likely supported but haven't tested on something that uses these controls:**
```
:_input_key.flyUpSlow: 
:_input_key.flyDownSlow: 
:_input_key.mobeffectsandinteractwithtoast:
```

### Example 

`/titleraw @s actionbar {"rawtext":[{"text":"Press :_input_key.jump: to Jump"}]}`

![input key mapping](/images/text_localization/input_key_mapping.png)

*Note that it is good practise to use a translation key for this as texts files also support input key localization.*

## Good Practise 
Language files can be used for translating almost any text and even if you're not translating your addon into multiple languages, keeping a language file up to date can still be incredibly useful.

The first advantage is that everything is in the same place so you can leave placeholder text without having to search for it. The second is that non-technical people find it much easier to replace the text translations than looking through your project for the text.

When creating language files, you need to maintain consistency in naming conventions to ensure that text strings are easy to find and always unique.

```ini
## MSG
text.<namespace>.<text>
actionbar.<namespace>.<text>
title.<namespace>.<text>

## NPC Dialogue
dialogue.<namespace>.<scene>.body
dialogue.<namespace>.<scene>.button.<button name>
entity.<namespace>:<identifier>

## Server Form
form.<namespace>.<identifier>.body
form.<namespace>.<identifier>.button.<button name>
form.<namespace>.<identifier>.toggle.<toggle name>
form.<namespace>.<identifier>.title

## Actions
action.<namespace>:<entity_name>.<action>
```

When writing in a placeholder, it is good practise to include some sort of symbol at the start/end of the text string to signify that it is not a final text translation. For example, encasing the string in brackets `[]` is a good way to show that the text requires alteration.


