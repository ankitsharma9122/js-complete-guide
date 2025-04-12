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
