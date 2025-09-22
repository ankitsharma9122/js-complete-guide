# JavaScript Prototype 

## 1. Prototype Basics

Every JavaScript object has a hidden `[[Prototype]]` property that refers to another object (the prototype) or `null`. This prototype is used for inheritance - if a property or method is not found on the object itself, JavaScript continues the lookup through the prototype chain.

```javascript
let animal = { eats: true };
let rabbit = { jumps: true };

// Setting prototype (historical way - NOT recommended)
rabbit.__proto__ = animal;

console.log(rabbit.eats); // true (inherited from animal)
console.log(rabbit.jumps); // true (own property)
```

---

## 2. The Prototype Chain

The prototype chain is the mechanism by which JavaScript objects inherit properties and methods. It forms a linked list structure that ends with `null`.

### Understanding the Complete Chain

```javascript
// Every object inherits from Object.prototype
let obj = {};
console.log(obj.__proto__ === Object.prototype); // true
console.log(obj.toString === obj.__proto__.toString); // true
console.log(obj.toString === Object.prototype.toString); // true

// Object.prototype's prototype is null (end of chain)
console.log(Object.prototype.__proto__ === null); // true
```

### Array Prototype Chain

Arrays have their own prototype chain:

```javascript
let arr = [1, 2, 3];

// arr -> Array.prototype -> Object.prototype -> null
console.log(arr.__proto__ === Array.prototype); // true
console.log(Array.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true

// Arrays inherit methods from both Array.prototype and Object.prototype
console.log(arr.push); // function (from Array.prototype)
console.log(arr.toString); // function (inherited from Object.prototype, but overridden by Array.prototype)
```

### Function Prototype Chain

Functions also follow the prototype chain:

```javascript
function myFunc() {}

// myFunc -> Function.prototype -> Object.prototype -> null
console.log(myFunc.__proto__ === Function.prototype); // true
console.log(Function.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true

// Functions inherit methods from both Function.prototype and Object.prototype
console.log(myFunc.call); // function (from Function.prototype)
console.log(myFunc.toString); // function (overridden by Function.prototype)
```

### Chain Visualization

```
Object: {} 
  ↓ __proto__
Object.prototype (has toString, valueOf, etc.)
  ↓ __proto__
null

Array: [1, 2, 3]
  ↓ __proto__
Array.prototype (has push, pop, slice, etc.)
  ↓ __proto__  
Object.prototype (has toString, valueOf, etc.)
  ↓ __proto__
null

Function: function() {}
  ↓ __proto__
Function.prototype (has call, apply, bind, etc.)
  ↓ __proto__
Object.prototype (has toString, valueOf, etc.)
  ↓ __proto__
null
```

---

## 3. Reading vs Writing Properties

**Reading**: JavaScript checks the object first, then traverses the prototype chain if the property isn't found.

**Writing/Deleting**: Operations affect only the object itself, not the prototype (unless the property is an accessor with a setter).

```javascript
let animal = { eats: true };
let rabbit = { jumps: true, __proto__: animal };

// Writing creates an own property
rabbit.eats = false;

console.log(rabbit.eats); // false (own property)
console.log(animal.eats); // true (unchanged)
```

---

## 4. Method Inheritance and `this`

Even when a method is inherited from a prototype, `this` always refers to the current object that called the method, not the prototype where the method is defined.

```javascript
let user = {
  sayHi() {
    console.log(`Hello, ${this.name}`);
  },
};

let admin = { 
  name: "Admin", 
  __proto__: user 
};

admin.sayHi(); // "Hello, Admin"
// `this` refers to admin, not user
user.sayHi()// undefined 
```

---

## 5. Enumerating Properties and `hasOwnProperty`

Different methods handle inherited properties differently, and `hasOwnProperty` is crucial for distinguishing between own and inherited properties.

### Property Enumeration Methods

```javascript
let animal = { eats: true, walks: true };
let rabbit = { jumps: true, __proto__: animal };

// for...in includes inherited enumerable properties
for (let key in rabbit) {
  console.log(key); // "jumps", "eats", "walks"
}

// Object.keys/values/entries only include own properties
console.log(Object.keys(rabbit));   // ["jumps"]
console.log(Object.values(rabbit)); // [true]
console.log(Object.entries(rabbit)); // [["jumps", true]]
```

### `hasOwnProperty()` Behavior

The `hasOwnProperty()` method is inherited from `Object.prototype` and checks if a property belongs directly to the object (not inherited):

```javascript
let animal = { eats: true };
let rabbit = { jumps: true, __proto__: animal };

// Check own properties
console.log(rabbit.hasOwnProperty('jumps')); // true (own property)
console.log(rabbit.hasOwnProperty('eats'));  // false (inherited)

// hasOwnProperty itself is inherited from Object.prototype
console.log(rabbit.hasOwnProperty('hasOwnProperty')); // false
console.log(rabbit.hasOwnProperty === Object.prototype.hasOwnProperty); // true
```

### Safe Property Enumeration

Use `hasOwnProperty` to filter own properties when using `for...in`:

```javascript
let animal = { eats: true };
let rabbit = { jumps: true, __proto__: animal };

// Only process own properties
for (let key in rabbit) {
  if (rabbit.hasOwnProperty(key)) {
    console.log(`Own property: ${key} = ${rabbit[key]}`);
  } else {
    console.log(`Inherited property: ${key} = ${rabbit[key]}`);
  }
}
// Output:
// Own property: jumps = true
// Inherited property: eats = true
```
* Object.keys() will NOT work for inherited properties - it only returns own enumerable properties.
* only Enumerable works here.

## 7. Creating Objects with Prototypes

### Method 1: Literal syntax with `__proto__` (discouraged)

```javascript
let animal = { eats: true };
let cat = { 
  sound: "meow", 
  __proto__: animal 
};
```

### Method 2: `Object.create()` (recommended)

```javascript
let animal = { eats: true };

// Basic creation
let dog = Object.create(animal);
dog.bark = true;

// With property descriptors
let dog2 = Object.create(animal, {
  bark: { 
    value: true, 
    enumerable: true,
    writable: true,
    configurable: true
  }
});

console.log(dog.eats); // true (inherited)
console.log(dog.bark); // true (own property)
```

---

## 8. Cloning with Descriptors

To create a true clone that preserves both prototype and property descriptors:

```javascript
let rabbit = { jumps: true };
let animal = { eats: true };
Object.setPrototypeOf(rabbit, animal);

// Clone with same prototype and descriptors
let clone = Object.create(
  Object.getPrototypeOf(rabbit),
  Object.getOwnPropertyDescriptors(rabbit)
);

console.log(clone.jumps); // true
console.log(clone.eats);  // true (inherited)
```

---

## 9. Modern Prototype Methods

These are the standard, recommended methods for working with prototypes:

```javascript
let obj = { name: "example" };
let proto = { type: "object" };

// Get prototype
console.log(Object.getPrototypeOf(obj)); // Object.prototype

// Set prototype
Object.setPrototypeOf(obj, proto);

// Verify
console.log(Object.getPrototypeOf(obj) === proto); // true
```

---

## 10. Why `__proto__` is Not Recommended

The `__proto__` property is a historical getter/setter for `[[Prototype]]`. It should be avoided for several reasons:

### Performance Issues
Changing prototypes with `__proto__` is slow because JavaScript engines optimize assuming prototypes are fixed after object creation.

### Code Clarity
Standard methods are clearer and more explicit about intent.

### Recommended Alternatives

```javascript
// Avoid
obj.__proto__ = prototype;
let proto = obj.__proto__;

//  Use instead
Object.setPrototypeOf(obj, prototype);
let proto = Object.getPrototypeOf(obj);
```

---

## 11. Prototype-less Objects

Objects created with `Object.create(null)` have no prototype, making them useful as "pure" dictionaries without inherited properties that might cause conflicts.

```javascript
// Regular object inherits from Object.prototype
let regularObj = {};
console.log(regularObj.toString); // function (inherited)

// Prototype-less object
let dict = Object.create(null);
dict.key1 = "value1";
dict["__proto__"] = "safe"; // stored as regular property

console.log(dict.key1); // "value1"
console.log(dict.__proto__); // "safe" (not a prototype reference)
console.log(dict.toString); // undefined (no inheritance)
```
---

## Complete Prototype Chain Summary

### Key Relationships

```javascript
// Basic object prototype chain
let obj = {};
console.log(obj.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true

// Array prototype chain  
let arr = [];
console.log(arr.__proto__ === Array.prototype); // true
console.log(Array.prototype.__proto__ === Object.prototype); // true

// Function prototype chain
function fn() {}
console.log(fn.__proto__ === Function.prototype); // true  
console.log(Function.prototype.__proto__ === Object.prototype); // true

// Method resolution example
let obj = {};
console.log(obj.toString === obj.__proto__.toString); // true
console.log(obj.toString === Object.prototype.toString); // true
```

### All Prototype Chains Lead to Object.prototype

Every built-in type eventually inherits from `Object.prototype`, which provides fundamental methods like `toString()`, `valueOf()`, and `hasOwnProperty()`. The chain always ends with `Object.prototype.__proto__ === null`.

---
