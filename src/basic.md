## Pure Function

A **pure function** is a function that, given the same input, always produces the same output. It has no side effects and does not modify any external state.

### Example :

````
function sum(a, b) {
  return a + b;
}

console.log(sum(2, 3)); // 5
console.log(sum(2, 3)); // 5
````
### Other Methods :
1. String.prototype.toUpperCase()
2. Maths.abs() etc .
3. Pure functions return values without modifying anything outside.

### Impure Function
A **Impure functions** are functions whose output value may or may not change for the same arguments, it is not consistent.

```
var c = 0;
function sum(a, b){
  return a + b + c++;
}

console.log(sum(2, 3)); // 5
console.log(sum(2, 3)); // 6
```
### Other Methods :
1. Math.random()
2. Date.now() 
3. SetTimeOut etc .

### Pure Components
A **Pure Components** Pure Component will always render the same output for the same set of input data, ensuring no side effects during the render process.

Note : Impure functions cause side effects (console logs, API calls, modifying globals).



```
import React from 'react';

class ItemList extends React.PureComponent {
  render() {
    const { items } = this.props;
    return (
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    );
  }
}

export default ItemList;

```
<!-- TODO with Deep copy compare -->
1.  React optimizes Pure Components by shallowly comparing the previous and current props. If there is no change in the props, React will skip re-rendering, thus improving performance.

# Static vs. Dynamic Imports in JavaScript

### Static Import (`import`)
- Synchronous (blocks execution)
- Loaded at **build time**
- Supports **tree shaking** (removes unused code)
- Must be at the **top level**
- Used for **core dependencies**
- require() in JavaScript (CommonJS) is static

### Dynamic Import (`import()`)
- Asynchronous (does not block execution)
- Loaded at **runtime** (only when needed)
- Does **not** support tree shaking (always included)
- Can be used **inside functions, conditions, and events**
- Used for **lazy loading and conditional imports**

---

## Example: Static vs. Dynamic Import

```js
export function add(a, b) {
  return a + b;
}

// Static Import (Eager Loading)
import { add } from "./math.js"; // Loaded at build time
console.log(add(2, 3)); 

// Dynamic Loading
async function loadMath() {
  const math = await import("./math.js"); // Loaded at runtime
  console.log(math.add(2, 3));
}

loadMath();

```
## **Key Differences: require vs. import**

| Feature           | `require()` (CommonJS) | `import` (ES Modules) |
|------------------|----------------------|----------------------|
| **Module System** | CommonJS (CJS)        | ES Modules (ESM)     |
| **Syntax**        | `const x = require('module');` | `import x from 'module';` |
| **Export Syntax** | `module.exports = {}` | `export default {}` or `export {}` |
| **Execution**     | Synchronous (blocking) | Asynchronous (non-blocking) |
| **Tree Shaking**  |  No                   |  Yes |
| **Placement**     | Anywhere (inside functions) | Top-level only |
| **Default in Node.js?** | Yes |  No (must Need to enable) |

---

## **Common Mistakes & Fixes**

###  **Cannot use `require()` in ES Modules**
```js
const fs = require("fs"); //  Error in ESM
```
 **Fix:** Use dynamic import:
```js
const fs = await import("fs"); //  Works in ESM
```

###  **Cannot use `import` in CommonJS**
```js
import { greet } from "./utils.js"; //  Error in CJS
```
**Fix:** Use `require()`:
```js
const { greet } = require("./utils.js"); //  Works in CJS
```

---

## **Final Takeaway for module**
- **CommonJS (`require()`)** is for **Node.js**, synchronous, and does **not** support tree shaking.
- **ES Modules (`import`)** is for **modern JavaScript**, asynchronous, and supports **tree shaking**.
- **Node.js supports ES Modules**, but you must **enable it explicitly** using `.mjs` files or `"type": "module"` in `package.json`.





