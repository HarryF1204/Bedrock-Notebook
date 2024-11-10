---
prev:
    text: 'Math'
    link: '/molang/topics/math'
next: 
    text: 'Variables'
    link: '/molang/topics/variables'
---

# Queries
> [!Warning] Warning
> This page is WIP. 

> [!Note] Note
> Descriptions were pulled from the documentation built in to the example packs and have been modified to visualize the queries and the context in which they are accessible. This process is manual so information may be out-of-date. If you spot an incorrect query, create an issue on our github page.

## Overview
Queries (`query.` or `q.`) are functions used to get information about the game/entity state. These functions automatically pass the `actor` issuing them so parenthesis are not required unless stated otherwise. For example, if an `animation controller` linked to an entity uses the function `q.is_jumping`, the returned value will be `1.0` if true and `0.0` if false.

## Entity Queries
Server side entity queries are functions that can be called from the server-side, for example, in server-side animation controllers. This does not mean that they cannot be called client-side.

| Query | Description | Accessible Server-Side | Accessible Client-Side | 
| ----- | ----------- | ---------------------- | ---------------------- |
| `q.all_animations_finished` | Returns `1.0` if all animations in the current state have played through at least once, else `0.0` | - [ ] | - [x] |
| `q.anger_level(<actor reference>)` | If the query makes sense, it returns the anger level of the actor from `0` to the entity's defined max anger level (defined using `minecraft:anger_level`). Else returns `0.0` | - [x] | - [ ] |
| `q.anim_time` | If called from an animation, it returns the time (seconds) since the current animation started, modified by `anim_time_update`. Else returns `0.0` | - [ ] | - [x] |
| `q.any_animation_finished`| Returns `1.0` if any animation in the current state has been played through at least once, else `0.0` | - [ ] | - [x] |
| `q.armor_color_slot(<number>)` | Returns the colour of the armour in the specified slot index. `0 : head` `1 : chest` `2 : legs` `3 : feet` `4 : body` | - [x] | - [x] |
| `q.armor_damage_slot(<number>)` | Returns the damage value of the item in the requested slot index. `0 : head` `1 : chest` `2 : legs` `3 : feet` `4 : body` | - [x] | Players only |
| `q.armor_material_slot(<number>)` | Returns the material type in the specified slot index. `0 : head` `1 : chest` `2 : legs` `3 : feet` `4 : body` | 

## Block Queries
Block queries are functions that can be executed from a block.

| Query | Description |
| ----- | ----------- |
| `q.all_tags(...<string>)` | Returns `1.0` if the block has all of the tags specified, else `0.0` |
| `q.any_tag(...<string>)` | Returns `1.0` if the block has any of the tags listed, else `0.0` |

## Item Queries 
Item queries are functions that can be executed from an item.

| Query | Description |
| ----- | ----------- |
| `q.all_tags(...<string>)` | Returns `1.0` if the item has all of the tags specified |
| `q.any_tag(...<string>)` | Returns `1.0` if the item has any of the tags listed |

## Global Queries
These are functions that can be called from any actor

| Query | Description | Accessible Server-Side | Accessible Client-Side | 
| ----- | ----------- | ---------------------- | ---------------------- |
| `q.actor_count` | Returns the number of actors rendered in the last frame. | - [ ] | - [x] |
| `q.all(...<expression>)` | Requires at least 3 arguments. Evaluates the first argument, then returns `1.0` if all of the following arguments evaluate to the same value as the first. Otherwise it returns 0.0. | - [x] | - [x] |
| `q.any(...<expression>)` |   Requires at least 3 arguments. Evaluates the first argument, then returns 1.0 if any of the following arguments evaluate to the same value as the first. Otherwise it returns 0.0. | - [x] | - [x] | 
| `q.approx_eq(...<expression>)` | Returns `1.0` if all of the arguments are within `0.000000` of each other, else `0.0` | - [x] | - [x] | 



## Untested Queries
q.above_top_solid
Returns the height of the block immediately above the highest solid block at the input (x,z) position


