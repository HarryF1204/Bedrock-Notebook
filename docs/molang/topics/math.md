---
prev:
    text: 'Syntax'
    link: '/molang/topics/Syntax'
next: 
    text: 'Queries'
    link: '/molang/topics/queries'
---
# Math Functions

| Function | Description |
| --- | --- |
| `math.abs(value)` | Returns the absolute value of `value`. |
| `math.acos(value)` | Computes the inverse cosine (arccos) of `value` in degrees. |
| `math.asin(value)` | Computes the inverse sine (arcsin) of `value` in degrees. |
| `math.atan(value)` | Computes the inverse tangent (arctan) of `value` in degrees. |
| `math.atan2(y, x)` | Computes the inverse tangent of `y/x` in degrees. *Note: the order of arguments is `y`, then `x`.* |
| `math.ceil(value)` | Rounds `value` up to the nearest integer. |
| `math.clamp(value, min, max)` | Clamps `value` between `min` and `max`, inclusive. |
| `math.cos(value)` | Computes the cosine of `value` degrees. |
| `math.die_roll(num, low, high)` | Returns the sum of `num` random numbers, each ranging from `low` to `high`. Note: the random numbers are floats. For integers, use `math.die_roll_integer`. |
| `math.die_roll_integer(num, low, high)` | Returns the sum of `num` random integers, each ranging from `low` to `high`. |
| `math.exp(value)` | Calculates e raised to the power of `value`. |
| `math.floor(value)` | Rounds `value` down to the nearest integer. |
| `math.hermite_blend(value)` | Performs Hermite interpolation using the function `3t² - 2t³`. Best used with `value` in the range [0, 1]. |
| `math.lerp(start, end, t)` | Linearly interpolates between `start` and `end` based on `t`, where `t` is between 0 and 1. |
| `math.lerprotate(start, end, t)` | Interpolates the shortest rotation from `start` degrees to `end` degrees based on `t`, where `t` is between 0 and 1. |
| `math.ln(value)` | Computes the natural logarithm of `value`. |
| `math.max(A, B)` | Returns the larger of `A` or `B`. |
| `math.min(A, B)` | Returns the smaller of `A` or `B`. |
| `math.min_angle(value)` | Normalizes `value` to the range (-180, 180) degrees. |
| `math.mod(value, denominator)` | Returns the remainder of `value` divided by `denominator`. |
| `math.pi` | Represents the mathematical constant π. |
| `math.pow(base, exponent)` | Raises `base` to the power of `exponent`. |
| `math.random(low, high)` | Generates a random float between `low` and `high`, inclusive. |
| `math.random_integer(low, high)` | Generates a random integer between `low` and `high`, inclusive. |
| `math.round(value)` | Rounds `value` to the nearest integer. |
| `math.sin(value)` | Sine of `value` degrees. |
| `math.sqrt(value)` | Calculates the square root of `value`. |
| `math.trunc(value)` | Truncates `value` toward zero. |