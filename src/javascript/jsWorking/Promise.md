# JavaScript Promises 



## 1. What is a Promise?

A **Promise** represents a value that may be available **now**, **later**, or **never**.

### Promise States

* **pending** → initial state
* **fulfilled** → resolved successfully
* **rejected** → failed

> A promise settles **only once**.

---

## 2. Creating a Promise

```js
const promise = new Promise((resolve, reject) => {
  if (success) {
    resolve("OK");
  } else {
    reject("ERROR");
  }
});
```

### Important Rules

* `resolve()` → fulfilled
* `reject()` → rejected
* Only **first call** matters

---

## 3. then() Syntax & Behavior

```js
promise.then(
  value => console.log(value),
  error => console.log(error)
);
```

### Common Usage

```js
promise.then(value => console.log(value));
```

### Key Rule 🔥

> **Every `.then()` returns a NEW Promise**

---

## 4. catch()

```js
promise.catch(err => console.log(err));
```

Equivalent to:

```js
promise.then(null, err => console.log(err));
```

---

## 5. finally()

```js
promise.finally(() => console.log("cleanup"));
```

* Runs **always**
* Cannot change resolved value
* Used for loaders / cleanup

---

## 6. Promise Chaining

```js
Promise.resolve(1)
  .then(v => v + 1)
  .then(v => v + 1)
  .then(console.log); // 3
```

### Why chaining works?

Returned value → automatically wrapped in Promise

---

## 7. Returning Promise inside then()

```js
Promise.resolve()
  .then(() => {
    return new Promise(resolve => {
      setTimeout(() => resolve(10), 1000);
    });
  })
  .then(console.log);
```

> JS waits for the returned promise

---

## 8. Error Propagation

```js
Promise.resolve()
  .then(() => {
    throw new Error("Boom");
  })
  .catch(err => console.log(err.message));
```

### Rules

* `throw` inside `.then()` → rejection
* Error skips remaining `.then()` until `.catch()`

---

## 9. Promise.resolve & Promise.reject

```js
Promise.resolve(5).then(console.log);
Promise.reject("err").catch(console.log);
```

### Promise Flattening

```js
Promise.resolve(Promise.resolve(10)).then(console.log); // 10
```

---

## 10. Promise Combinators

### Promise.all()

```js
Promise.all([p1, p2])
```

* Resolves when **ALL succeed**
* Rejects on **first failure**

---

### Promise.allSettled()

```js
Promise.allSettled([p1, p2]);
```

Returns:

```js
[{status: "fulfilled", value}, {status: "rejected", reason}]
```

---

### Promise.race()

```js
Promise.race([p1, p2]);
```

* First settled promise wins

---

### Promise.any()

```js
Promise.any([p1, p2]);
```

* First **fulfilled** wins
* All rejected → `AggregateError`

---

## 11. async / await

```js
async function fn() {
  return 10;
}
```

Equivalent to:

```js
function fn() {
  return Promise.resolve(10);
}
```

### await

```js
const value = await Promise.resolve(5);
```

---

## 12. try / catch with async

```js
async function test() {
  try {
    await Promise.reject("fail");
  } catch (e) {
    console.log(e);
  }
}
```

---

## 13. EVENT LOOP (MOST IMPORTANT 🔥)

### Queues

* **Call Stack**
* **Microtask Queue** → Promises
* **Macrotask Queue** → setTimeout, setInterval

### Priority Order

```
Call Stack
↓
Microtask Queue (Promises)
↓
Macrotask Queue (Timers)
```

---

## 14. Promise vs setTimeout

```js
setTimeout(() => console.log("timeout"), 0);

Promise.resolve().then(() => console.log("promise"));
```

### Output

```
promise
timeout
```

---

## 15. Complex Execution Order Example

```js
console.log("start");

setTimeout(() => console.log("timeout"));

Promise.resolve()
  .then(() => console.log("p1"))
  .then(() => console.log("p2"));

console.log("end");
```

### Output

```
start
end
p1
p2
timeout
```

---

## 16. Promise inside setTimeout

```js
setTimeout(() => {
  Promise.resolve().then(() => console.log("promise"));
  console.log("timeout");
});
```

### Output

```
timeout
promise
```

---

## 18. Callback → Promise

```js
function readFilePromise() {
  return new Promise((resolve, reject) => {
    fs.readFile("a.txt", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
```

---

## 19. Promise Anti‑Patterns ❌

### Missing return

```js
.then(() => {
  fetch(url); // ❌
});
```

### Promise inside Promise

```js
new Promise(() => new Promise()); // ❌
```

---
