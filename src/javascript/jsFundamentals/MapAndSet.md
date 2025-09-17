# Map vs WeakMap & Set vs WeakSet in JavaScript

## 1. **Map**
- Stores **key–value pairs**.  
- Keys can be of **any type** (objects, primitives).  
- **Strong references** → keys prevent garbage collection.  
- **Iterable** (you can loop with `map.keys()`, `map.values()`, `map.entries()`).

Example:
```js
const m = new Map();
m.set('a', 1);
m.set({}, "obj");
console.log(m.get('a')); // 1
```

---

## 2. **WeakMap**
- Stores **key–value pairs**, but **keys must be objects**.  
- Keys are held **weakly** → eligible for garbage collection if no other reference exists.  
- **Not iterable** (no `.keys()`, `.values()`, etc.).  
- Useful for **private data storage** or **tracking without memory leaks**.

Example:
```js
let obj = { name: "Ankit" };
const wm = new WeakMap();
wm.set(obj, "secret");
obj = null; // object can be garbage collected
```

---

## 3. **Set**
- Stores **unique values** (no duplicates).  
- Values can be **any type** (objects, primitives).   
- **Iterable** (loop with `for...of`, `.forEach()`).

Example:
```js
const s = new Set([1, 2, 2, 3]);
console.log(s); // Set {1, 2, 3}
```

---

## 4. **WeakSet**
- Stores only **objects**, not primitives.  
- Objects are held **weakly** → can be garbage collected.  
- **Not iterable** (no size, no keys/values).  
- If there are no other references to an object stored in the WeakSet, the object is garbage-collected automatically.

Example:
```js
let user = { id: 1 };
const ws = new WeakSet();
ws.add(user);
user = null; // object can be garbage collected
```

---

# Weak and Strong References

## Strong References (Default Behavior)
- Objects remain in memory as long as they have strong references
- Prevents garbage collection of referenced objects
- Can lead to memory leaks if references aren't properly managed

```js
let obj = { name: "John" }; // Strong reference
let anotherRef = obj;       // Another strong reference
obj = null; // Object still exists because anotherRef points to it
```

## Weak References
- Don't prevent garbage collection of the referenced object
- Object can be garbage collected if only weak references exist

```js
let weakSet = new WeakSet();
let obj = { name: "Alice" };

weakSet.add(obj);
obj = null; // Object can be garbage collected
// WeakSet entry will be automatically removed
```
## Use Cases

**Strong References:** Normal object relationships, required dependencies, active data structures

**Weak References:** preventing memory leaks