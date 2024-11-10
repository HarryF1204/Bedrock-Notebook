---
prev:
    text: 'Introduction'
    link: '/molang/introduction'
next: 
    text: 'Maths'
    link: '/molang/topics/math'
---

# Syntax

## Keywords
| Keyword | Description |
| ------- | ----------- |
| `!` | Logical NOT |
| `&&` | Logical AND |
| `\|\|` | Logical OR |
| `<` `>` `<=` `>=` `==` `!=` | Comparison operators |
| `*` `/` `+` `-` | Arithmetic operators |
| `()` | Used to control the evaluation order of expressions. Example: `v.a = (v.b + v.c) * v.d;` |
| `{}` | Braces for execution scope. It groups multiple statements into a single executable block, often within loops or conditions. Example: `v.should_reset_a ? { v.a = 0; }` |
| `[]` | Square brackets for array access.<br>*Note that custom variables cannot be arrays, this is for use within the render controller.*|
| `??` | Null coalescing operator. It returns the left-hand operand if the operand is not null; otherwise, it returns the right-hand operand. Example: `v.a = v.a ?? 0;` |
| `?` | Binary conditional operator. It returns one of two values depending on the value of a Boolean expression. Example: `v.a = (v.b > 5) ? 1 : 0;` |
| `? :` | Ternary conditional operator. It returns one of two values depending on the value of a Boolean expression. Example: `v.a = (v.b > 5) ? 1 : 0;` |
| `this`| The current value that this expression will ultimately write to (context specific). Example: in `"rotation" : [ 0.0, "-this", 0.0 ]` `this` refers to the current rotation of the bone. |
| `return` | Used to set the evaluation of complex expressions to the evaluation of the following statement. Example: `v.a = q.life_time; return v.a > 5;` |
| `->` | Used to follow an `actor reference` to execute queries within the current scope while passing the referenced actor to the function. Example: `c.owning_entity -> q.is_using_item`. In this expression, `c.owning_entity` can be called from an item and refers to said entity who has equipped the item. By using the arrow operator, we can execute the `is_using_item` function to determine if the entity is using an item in their hand. |
| `loop` | For repeating an execution block `n` times. <br>*Note that the max value `n` can be is 1024*.<br> Example: <br><pre lang="json"> // check inventory<br>"t.val = 0; <br>t.i = 0; <br>loop(27, {<br>        t.val = q.is_item_name_any('slot.inventory', t.i, 'minecraft:splash_potion', 'minecraft:potion'); <br>        t.val ? {return t.val;}; t.i = t.i+1;<br>    }<br>); <br>// check hotbar<br>t.val = 0; <br>t.i = 0; <br>loop(9, {<br>    t.val = q.is_item_name_any('slot.hotbar', t.i, 'minecraft:splash_potion', 'minecraft:potion'); <br>    t.val ? {<br>        return t.val;<br>    }; <br>    t.i = t.i+1;<br>    }<br>);"</pre> |
| `for_each` | Used to iterate through an `array` of `actors`.<br>*Note that there are no stable queries that can use this*<br>This is an example from a previously experimental query that was removed:<br><pre lang="json">"v.x = 0;<br>for_each(t.pig, query.get_nearby_entities(4, 'minecraft:pig'), {<br>    v.x = v.x + 1;<br>});"</pre> |
| `break` | Breaks out of the inner-most active loop. So if you have nested loops and the inner-most one calls break, only that loop will break.<br>Example:<br><pre lang="json">v.x = 1;<br>v.y = 1;<br>loop(10, {<br>        t.x = v.x + v.y; <br>        v.x = v.y; <br>        v.y = t.x; <br>        (v.y > 20) ? break;<br>    }<br>);</pre> |
| `continue` | For skipping the rest of the set of statements of a loop/for_each iteration and moving to the next iteration.<br>Example:<br><pre lang="json">v.x = 0;<br>loop(10, {<br>  (v.x > 5) ? continue;<br>  v.x = v.x + 1;<br>});</pre> |
| `geometry.` | A reference to a geometry named in the client-side entity defintion. |
| `material.` | A reference to a material named in the client-side entity defintion. |
| `texture.` | A reference to a texture named in the client-side entity defintion. |
| `math.` | Used to execute [Math Functions](/molang/topics/math). |
| `query.` | Used to execute [Query Functions](/molang/topics/queries). |
| `variable.` | Used to reference [Variables](/molang/topics/variables#variable-types). |
| `temp.` | Used to reference [Temporary Varaibles](/molang/topics/variables#temp). |
| `context.` | Used to access [Context](/molang/topics/variables#context). |

## Expressions 
An expression is a variable assignment operation or a calcuation that returns a value. Expressions can be simple or complex.

### Simple Expressions

A simple expression is a single statement, the return value of which is returned to the system. eg:

```json
query.is_alive
```

*Simple expressions must end with a `;` when setting a variable. Omitting the `;` or adding it to non-variable expressions will throw an error.*

```json
v.x = 1.0;
```

### Complex Expressions
A complex statement is a series of statements, seperated using `;`. Each statement is evaluated in order, the last statement must use the `return` keyword to define the resulting value of the expression. For example, this expression that checks if the entity has gained health without using multiple states:

```c#
t.update_tick = math.mod(q.state_time, 0.05) < 0.0001; 
t.previous_health = t.update_tick ? q.health : (t.previous_health ?? q.health);
return t.update_tick ? 0 : (q.health > t.previous_health);
```

## Order of Operations
Molang Operators follow this order to determine which thing is evaluated first when no parentheses are used. The table notates the precedence groups highest to lowest.
| Precedence Group | Description |
| ---------------- | ----------- |
| Logical Not | The Logical Not `!` operator |
| Multiplication and Division | Multiplication `*` and Division `/` |
| Addition and Subtraction | Addition `+` and Subtraction `-` |
| Comparisons | Comparison operators `<` `<=` `>` `>=` (See 'Versioned Changes' below) |
| Equality checks | Equality checking operators `==` `!=` (See 'Versioned Changes' below) |
| Logical AND | The Logical AND `&&` operator (See 'Versioned Changes' below) |
| Logical OR | The Logical OR `||` operator (See 'Versioned Changes' below) |
| Ternary Conditional | Ternary conditional operators using `? :`. Evaluated right-to-left when there are multiple ternary operators. (See 'Versioned Changes' below) |
| Null Coalescing | Null coalescing operator `??` |