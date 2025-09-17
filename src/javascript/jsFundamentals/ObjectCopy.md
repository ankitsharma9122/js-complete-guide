
# Objects Shallow & Deep Copy 

## Value vs Reference
- **Primitives** (string, number, boolean, null, undefined, bigint, symbol) are copied *by value* — the variable contains the actual value.
- **Objects** (objects, arrays, functions, maps, sets, typed arrays) are copied *by reference* — the variable stores a reference to a memory location. Copying the variable copies the reference.

```js
let a = 1; let b = a; // independent
let obj = {x:1}; 
let ref = obj; // both refer same object
```

---

## 1) Shallow copy 
A **shallow copy** duplicates only the top level of the source object. If a top-level property is an object or array, the reference is copied — not its content.

### Common shallow-copy idioms
```js
// objects
let cloneA = Object.assign({}, src);
let cloneB = { ...src };

// arrays
let arrClone1 = arr.slice();
let arrClone2 = [...arr];
let arrClone3 = Array.from(arr);
```

### What a shallow copy copies
- **Symbol**-keyed properties are NOT copied by `Object.assign` unless explicitly retrieved using `Object.getOwnPropertySymbols`.

### Example
```js
let src = {
  a: 1,
  nested: { p: 10 },
  [Symbol('s')]: 'sym'
};
let shallow = { ...src };
console.log(src.nested === shallow.nested); // true -> shared reference
```

### Shallow copy custom


```js
function shallowCloneDepth1(obj) {
  if (obj == null || typeof obj !== 'object') return obj;
  const out = Array.isArray(obj) ? [] : {};

// Reflect is a built-in method in JavaScript that returns all own property keys of an object.
  Reflect.ownKeys(obj).forEach(key => {
    const val = obj[key];
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      // create a *new* object for that nested value (one level deep)
      out[key] = { ...val };
    } else if (Array.isArray(val)) {
      out[key] = val.slice(); // shallow copy array
    } else {
      out[key] = val;
    }
  });

  return out;
}
```

**When to use shallow copy**
- Config objects are often combined using shallow copies.(defualt with updated value => {...default,...user})

Example: user config overrides default config.
- Performance-sensitive code where nested objects are intentionally shared.

---

##  Deep copy — full depth copy
A **deep copy** recursively duplicates the entire structure so that no nested object is shared between source and clone (unless intentionally preserved).

### Built-in: `structuredClone`
- The fastest and safest choice when available. It handles many built-in types and circular refs.

```js
const clone = structuredClone(src);
```

Limitations: some host-specific objects (like DOM nodes) or functions are not cloneable.

### JSON approach (quick but limited)
```js
const clone = JSON.parse(JSON.stringify(obj));
```
**Drawbacks**: loses functions, `undefined`, `Symbol` keys, `Date` becomes string, `Map`/`Set` not preserved, fails on circular references.


## Performance, memory & best practices
- **Shallow copy** is cheap (O(n) with n = number of top-level keys). Great for many app patterns (Redux) where immutability combined with shallow copy allows cheap change detection via reference equality.
- **Deep copy** cost grows with the total number of nodes in the graph. It allocates new objects and increases memory usage.
- Prefer `structuredClone` when available — it’s optimized and often implemented in native code.
- **Avoid JSON.stringify for deep clone** if your object contains Dates, Maps, Sets, functions, or circular references.
- When implementing your own deep clone, always use `WeakMap` to handle cycles and to preserve structure sharing semantics.

---

## Practical examples
- **Configuration merging**: deep merge user config into defaults but validate keys and avoid prototype pollution.
- **Large graphs**: if you only need a small part copied, selectively clone that branch to reduce cost.

---


complete : https://www.programiz.com/online-compiler/1F3aO0lj490Hh