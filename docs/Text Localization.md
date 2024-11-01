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


