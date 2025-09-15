## Object

### 1. Object Declaration
Objects are associative arrays with special features.

- Store properties as **key-value pairs**.
- **Keys** → must be strings or symbols (usually strings).  
- **Values** → can be any type.

### 2. Accessing Properties
- **Dot notation**: `obj.property`
- **Square brackets**: `obj["property"]`  
  (useful when key is in a variable: `obj[varWithKey]`)

### 3. Operators
- **Delete property**: `delete obj.prop`
- **Check existence**: `"key" in obj`
- **Iterate**: `for (let key in obj)`


---

### Code Examples

```js
// 1. Plain object
let user = {
  name: "Ankit",
  age: 25
};

// Access
console.log(user.name);        // Dot notation → Ankit
console.log(user["age"]);      // Bracket notation → 25

let key = "name";
console.log(user[key]);        // Variable as key → Ankit

// 2. Operators
delete user.age;
console.log("age" in user);    // false

for (let k in user) {
  console.log(k, user[k]);     // Iteration → name Ankit
}

// 3. Built-in objects
let arr = [1, 2, 3];           
let now = new Date();          
let err = new Error("Oops!");

console.log(arr);  // Array [1,2,3]
console.log(now);  // Current date
console.log(err);  // Error: Oops!

let user = new Object(); // "object constructor" syntax
```

Note : Unary Plus (+) : The unary plus operator converts a string into a number (if possible).

```js
console.log(+"49");     // 49
console.log(+"-3.5");   // -3.5
console.log(+"abc");    // NaN (not a number)
```
## Method
* A function that is a property of an object is called its method.

```js
// these objects do the same
user = {
  sayHi: function() {
    alert("Hello");
  }
};

// method shorthand looks better, right?
user1 = {
  sayHi() { // same as "sayHi: function(){...}"
    alert("Hello1");
  }
};
user.sayHi();
user1.sayHi();
```
# this in JavaScript

---
## Normal Functions and `this`

### Example in an Object

```js
let user = {
  name: "John",
  sayHi() {
    console.log(this.name);
  }
};

user.sayHi(); // "John"
```

Here `this` refers to the object that called the method (`user`).

---

### Calling without an Object: `this == undefined`

```js
function sayHi() {
  console.log(this);
}

sayHi(); // undefined (in strict mode)
```

* In **strict mode**, `this` is `undefined`.
* In **non-strict mode**, `this` becomes the global object (`window` in browsers).
* Such usage is usually a mistake, since `this` implies an object context.

---

* Arrow functions do **not** have their own `this`.
* They **inherit** (lexically capture) `this` from the surrounding scope **at creation time**.

## 1. Inside Object Method with Arrow

```js
let user = {
  name: "John",
  greet() {
    let arrow = () => console.log(this.name);
    arrow();
  }
};

user.greet(); // "John"
```

Arrow inherits `this` from `greet()` → `user`.

---

## 2. In a Callback

```js
let user = {
  name: "Alice",
  sayLater() {
    setTimeout(() => {
      console.log(this.name);
    }, 1000);
  }
};

user.sayLater(); // "Alice"
```

Arrow preserves `this` from `sayLater()`.

---

## 3. Nested Functions

```js
let user = {
  name: "Bob",
  outer() {
    function inner() {
      let arrow = () => console.log(this.name);
      arrow();
    }
    inner();
  }
};

user.outer(); // undefined
```

❌ `inner` is a normal function → loses `this`.
Arrow inherits from `inner` → not `user`.

**Fix:**

```js
let user = {
  name: "Bob",
  outer() {
    let inner = () => {
      let arrow = () => console.log(this.name);
      arrow();
    };
    inner();
  }
};

user.outer(); // "Bob"
```

---

## 4. Inside a Class

```js
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    let arrow = () => console.log(this.name);
    arrow();
  }
}

new Person("Charlie").greet(); // "Charlie"
```

 Arrow inherits `this` from the method context (`greet`).

---

## Summary

* Normal functions: `this` depends on where they are binded.
* Arrow functions: **inherit `this`** from surrounding scope.
* Useful for: callbacks, event listeners, nested functions.
* Avoid using them directly as object methods.
* They also lack their own `arguments`, `super`, and cannot be used as construct
