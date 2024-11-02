# Structs

Although they are convenient, structs use more performance than standards variables so they are not as recommended. If you want to use them, you can declare them either in initilize or by using the null coalescing operator `??`.

```json
"v.vec = v.vec ?? {v.vec.x=0; v.vec.y=0; v.vec.z=0;};""
```