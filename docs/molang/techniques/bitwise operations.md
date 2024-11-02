# Bitwise Operations
Bitwise operations are operations that directly manipulate bits. Unfortunately, they are not natively supported in Molang, however, there are work arounds.

## Bitwise Shifts
You can replicate certain bitwise operations with normal functions, for example:

```c#
math.floor(v.x*math.pow(2, v.b))
```

shifts bits to the right `(v.b < 0)` or left `(v.b > 0)` by `v.b`. e.g. bitshift by 2 to the right would be `v.b = 2` and by 3 to the left would be `v.b = -3`.

## Reading Bits
To find the least significant bit, you can use the following formula:
```c#
math.mod(v.x, 2)
```

Then to read the bit at position `n` (where `n` starts from `0` for the LSB), you can use the following formula:
```c#
v.bit_n = math.mod(math.floor(v.x / math.pow(2, n)), 2);
```
### Breaking it down into steps:
1. **Shift the bits by `n` positions:** 
```c#
v.shifted_value = math.floor(v.x / math.pow(2, n));
```
2. **Extract the Least Significant Bit**: 
```c#
v.bit_n = math.mod(v.shifted_value, 2);
```

### Example
*Given `v.x = 13`* (binary `1101`), `n = 2`:
1. **Shift the bits by `n` positions:** 
```c#
shifted_value = math.floor(13 / math.pow(2, 2)) = math.floor(13 / 4) = 3
```

```c#
bit_2 = math.mod(3, 2) = 1
```

**Result:** `bit_2 = 1`

## Writing Bits
Writing is a bit more complicated, lets start with the previous operation which can be expended to read any number of bits:
```c#
math.mod(v.x, math.pow(2, v.b+1))
```

So, to encode a value at the `n`th position, you can use the following formula:
```c#
v.x = v.x - (math.mod(math.floor(v.x / math.pow(2, n)), math.pow(2, v.b + 1)) * math.pow(2, n)) + (math.mod(v.x, math.pow(2, v.b + 1)) * math.pow(2, n));
```

### Breaking it down into steps:
1. Extract the Bits to Encode:
```c#
bits_to_encode = math.mod(v.x, math.pow(2, v.b + 1));
```

2. Shift the Bits to the Target Position:
```c#
shifted_bits = bits_to_encode * math.pow(2, n);
```

3. Clear the Bits at the Target Position in v.x:
```c#
v.x = v.x - math.mod(math.floor(v.x / math.pow(2, n)), math.pow(2, v.b + 1)) * math.pow(2, n);
```

4. Add the Shifted Bits to v.x:
```c#
v.x = v.x + shifted_bits;
```