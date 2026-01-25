# JavaScript Objects
---

## 1. What is an Object in JavaScript?

An **object** is a collection of **key–value pairs**.

```js
const user = {
  name: "Ankit",
  age: 25,
  isTeacher: true
};
```

* Keys are called **properties**
* Values can be **any data type** (string, number, array, function, object)

---

## 2. Why Objects are Important

Objects are used to:

* Represent **real-world entities** (user, product, order)
* Store **structured data**
* Build **APIs, state, configs, components**

Almost everything in JS is an object:

* Arrays
* Functions
* DOM elements

---

## 3. Creating Objects

### a) Object Literal (Most Common)

```js
const car = {
  brand: "Tesla",
  model: "Model 3"
};
```

### b) Using `new Object()`

```js
const obj = new Object();
obj.a = 10;
```

### c) Constructor Function

```js
function User(name, age) {
  this.name = name;
  this.age = age;
}

const u1 = new User("Ankit", 25);
```

### d) ES6 Class

```js
class User {
  constructor(name) {
    this.name = name;
  }
}
```

---

## 4. Accessing Object Properties

### Dot Notation

```js
user.name
```

### Bracket Notation (Dynamic / Required)

```js
user["name"]
user[key]
```

Use brackets when:

* Property name has space
* Property is dynamic

---

## 5. Adding, Updating & Deleting Properties

```js
user.city = "Ranchi";      // add
user.age = 26;              // update
delete user.isTeacher;      // delete
```

---

## 6. Methods (Functions inside Objects)

```js
const user = {
  name: "Ankit",
  greet() {
    console.log("Hello", this.name);
  }
};
```

* `this` refers to **current object**

---

## 7. Iterating over Objects (MOST IMPORTANT)

### 7.1 `for...in` (Keys)

```js
for (let key in user) {
  console.log(key, user[key]);
}
```

✔ Iterates over **enumerable properties**

---

### 7.2 `Object.keys()`

```js
Object.keys(user).forEach(key => {
  console.log(key, user[key]);
});
```

Returns: `string[]`

---

### 7.3 `Object.values()`

```js
Object.values(user).forEach(value => {
  console.log(value);
});
```

---

### 7.4 `Object.entries()` (Best)

```js
Object.entries(user).forEach(([key, value]) => {
  console.log(key, value);
});
```

✔ Clean & modern

---

## 8. Iterating Nested Objects 

### Example Nested Object

```js
const user = {
  name: "Ankit",
  address: {
    city: "Ranchi",
    state: "Jharkhand",
    pin: {
      code: 834001
    }
  }
};
```

### Accessing Nested Values

```js
user.address.city
user.address.pin.code
```

---

### Looping Nested Objects (Recursive)

```js
function iterateObject(obj) {
  for (let key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      iterateObject(obj[key]);
    } else {
      console.log(key, obj[key]);
    }
  }
}

iterateObject(user);
```
 Handles **any depth**

---

## 9. Object Destructuring

```js
const { name, age } = user;
```

Nested destructuring:

```js
const { address: { city } } = user;
```

---

## 10. Spread & Rest with Objects

### Copy Object (Shallow Copy)

```js
const newUser = { ...user };
```

### Merge Objects

```js
const merged = { ...obj1, ...obj2 };
```

---

## 11. Object Methods (Very Important)

### 11.1 `Object.assign()` – Copy / Merge Objects

```js
const obj1 = { a: 1 };
const obj2 = { b: 2 };

const merged = Object.assign({}, obj1, obj2);
console.log(merged); // { a: 1, b: 2 }
```

⚠️ Note:

* It creates a **shallow copy**
* Later objects overwrite earlier keys

```js
Object.assign(obj1, obj2); // mutates obj1 ❌
// this is not safe as it will modify the obj1 
```

---

### 11.2 `Object.freeze()` – Prevent All Changes ❄️

```js
const user = {
  name: "Ankit",
  age: 25
};

Object.freeze(user);

user.age = 30;      // ❌ not allowed
user.city = "Ranchi"; // ❌ not allowed

delete user.name;  // ❌ not allowed

console.log(user); // unchanged
```

✔ Properties cannot be added, removed, or updated

⚠️ Shallow freeze:

```js
const obj = {
  info: { score: 10 }
};

Object.freeze(obj);
obj.info.score = 20; // ✅ allowed (nested)
```

---

### 11.3 `Object.seal()` – Allow Update Only 🔒

```js
const user = {
  name: "Ankit",
  age: 25
};

Object.seal(user);

user.age = 26;      // ✅ allowed
user.city = "Ranchi"; // ❌ not allowed

delete user.name;  // ❌ not allowed
```

✔ Existing properties can be **updated**
❌ Cannot add or delete properties

---

### 11.4 `hasOwnProperty()` – Safe Property Check

```js
const user = {
  name: "Ankit"
};

console.log(user.hasOwnProperty("name")); // true
console.log(user.hasOwnProperty("age"));  // false
```

Why not just `obj.key`?

```js
if (user.age) { }
```

❌ Fails for falsy values like `0`, `""`, `false`

Safe check:

```js
if (user.hasOwnProperty("age")) {
  console.log("Age exists");
}
```

---

### Quick Comparison Table

| Method        | Add | Update | Delete |
| ------------- | --- | ------ | ------ |
| Normal Object | ✅   | ✅      | ✅      |
| `seal()`      | ❌   | ✅      | ❌      |
| `freeze()`    | ❌   | ❌      | ❌      |

---

---|-----|
| `Object.keys()` | get keys |
| `Object.values()` | get values |
| `Object.entries()` | key-value pairs |
| `Object.assign()` | copy/merge |
| `Object.freeze()` | prevent changes |
| `Object.seal()` | allow update only |
| `hasOwnProperty()` | safe check |

---

## 12. Checking Property Exists

```js
"name" in user
user.hasOwnProperty("name")
```

---

## 13. Shallow vs Deep Object

### Shallow Copy ❌

```js
const copy = { ...user };
```

Nested objects still share reference

### Deep Copy ✅

```js
const deep = JSON.parse(JSON.stringify(user));
```

---

## 14. Common Real-Life Use Cases

* API response handling
* Form data
* Redux / State objects
* Config files
* Backend payloads

---

## 15. Interview Tips ⚡

* Objects are **reference types**
* `typeof object === "object"`
* Arrays & functions are objects
* Prefer `Object.entries()` for loops
* Always check nested access (optional chaining)

```js
user?.address?.city
```

---

# Tracking Object Updates in JavaScript Using Proxy

## Introduction
JavaScript's `Proxy` object allows you to intercept and customize operations on objects. One practical use case is tracking what properties have been updated on an object.

## Basic Example
```js
const updates = [];

const target = {
  name: 'John',
  age: 30
};

const handler = {
  set(obj, prop, value) {
    if (obj[prop] !== value) {
      updates.push({ property: prop, oldValue: obj[prop], newValue: value });
      console.log(`Updated: ${prop} from ${obj[prop]} to ${value}`);
    }
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);

proxy.name = 'Jane';
proxy.age = 31;
proxy.age = 31; // No update log

console.log('Tracked updates:', updates);
