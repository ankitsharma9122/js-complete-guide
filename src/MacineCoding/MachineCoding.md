## 1. Debounce
```js
export default function debounce(func, wait) {
  let timerId = null;
  return function (...args) {
    clearInterval(timerId);
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}
```

## 2. Throttle
```js
export default function throttle(func, wait) {
  let flag = false;
  let timer = false;

  return function (...args) {
    if (!flag) {
      flag = true;
      clearInterval(timer);
      func.apply(this, args);
    }
    timer = setTimeout(() => {
      flag = false;
    }, wait);
  };
}
```

## 3. ClassNames Native 

```js
// classNames('foo', 'bar'); // 'foo bar'
// classNames('foo', { bar: true }); // 'foo bar'
// classNames({ 'foo-bar': true }); // 'foo-bar'
// classNames({ 'foo-bar': false }); // ''
// classNames({ foo: true }, { bar: true }); // 'foo bar'
// classNames({ foo: true, bar: true }); // 'foo bar'
// classNames({ foo: true, bar: false, qux: true }); // 'foo qux'

const appenResult = (oldValue, newValueToAppend) => {
  if (!newValueToAppend) return oldValue;
  return oldValue ? oldValue + " " + newValueToAppend : newValueToAppend;
};

const processClassArg = (arg) => {
  if (typeof arg === "string") {
    return arg;
  }

  if (typeof arg === "number") {
    return "" + arg;
  }

  if (typeof arg !== "object") {
    return "";
  }

  if (Array.isArray(arg)) {
    let mid = classNames(...arg);
    return mid;
  }

  let classes = "";

  Object.keys(arg).forEach((key) => {
    if (key in arg && arg[key]) {
      const midAnswer = processClassArg(key);
      classes = appenResult(classes, midAnswer);
    }
  });
  return classes;
};
export default function classNames(...args) {
  let classNameResult = "";
  for (let arg of args) {
    if (arg) {
      const midAnswer = processClassArg(arg);
      classNameResult = appenResult(classNameResult, midAnswer);
    }
  }
  return classNameResult;
}

```

## 4. Flatten Array 
```js
export default function flatten(value) {
  let result = [];
  for (let i = 0; i < value.length; i++) {
    if (Array.isArray(value[i])) {
      result = [...result, ...flatten(value[i])];
    } else {
      result.push(value[i]);
    }
  }
  return result;
}
```

## 5. Flatten Object

```js
export default function flatten(value) {
  let result = [];
  for (let i = 0; i < value.length; i++) {
    if (Array.isArray(value[i])) {
      result = [...result, ...flatten(value[i])];
    } else {
      result.push(value[i]);
    }
  }
  return result;
}
```

## 6. Utitlity to Test object and plain object 

```js
export function isObject(value) {
  return (
    value !== null && (typeof value === "object" || typeof value === "function")
  );
}

// const obj3 = Object.create(null);
// Object.getPrototypeOf(obj3) === null // true
export function isPlainObject(value) {
  return (
    value != null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    (Object.getPrototypeOf(value) === Object.prototype ||
      Object.getPrototypeOf(value) === null)
  );
}
```
## 7. Promise All Native
<!-- const tasks = [
  () => 1,                          // sync
  async () => 2,                    // async
  () => Promise.resolve(3),         // sync returning promise
  async () => {
    await delay(1000);
    return 4;
  }
]; -->

```js
export default function promiseAll(iterable) {
   if (iterable.length === 0) return Promise.resolve([]);
    let count=0;
    let result=[];
    return new Promise((resolve, reject) => {
       iterable.forEach((task, idx) => {
       const promise = typeof task === "function" ? task() : task;
       Promise.resolve(promise).then((res) => {
        count++;
        result[idx]=res;
        if (count === iterable.length) {
          resolve(result);
        }
      })
      .catch((err) => {
        reject(err);
      });
       });
    });
}
```

## 8. Promise any Native

```js
export default function promiseAny(iterable) {
  let len = iterable.length;
  if (!len) {
    return [];
  }

  return new Promise((resolve, reject) => {
    let count = 0;
    let error = [];
    iterable.forEach((data, idx) => {
      let task = typeof task === "function" ? data() : data;
      Promise.resolve(task)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          count++;
          error[idx] = err;
          if (count === len) {
            return reject(new AggregateError(error));
          }
        });
    });
  });
}
```


## 8. Promise promiseAllSettled Native
<!-- All settle always resolve -->
```js
export default function promiseAllSettled(iterable) {
  if (iterable.length === 0) return Promise.reject([]);

  const result = [];
  let count = 0;
  const len = iterable.length;

  return new Promise((resolve) => {
    iterable.forEach((task, idx) => {
      try {
        const promise = typeof task === "function" ? task() : task;

        Promise.resolve(promise)
          .then((res) => {
            result[idx] = { status: "fulfilled", value: res };
          })
          .catch((error) => {
            result[idx] = { status: "rejected", reason: error };
          })
          .finally(() => {
            count++;
            if (count === len) resolve(result);
          });
      } catch (err) {
        // Handle synchronous throws
        result[idx] = { status: "rejected", reason: err };
        count++;
        if (count === len) resolve(result);
      }
    });
  });
}
```

## 9. Function memoize the value
```js
export default function memoize(func) {
  let cache = new Map();

  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    let temp = func.call(this, ...args);
    cache.set(key, temp);
    return temp;
  };
}
```

## 10. mapAsyncLimit

```js
// function that accepts an array of items and maps each element with an asynchronous mapping function and returns a Promise.

// now problem can be asked to do proine any , all settled and different aspect
/**
async function fetchUpperCase(q: string) {
  // Fake API service that converts a string to uppercase.
  const res = await fetch('https://uppercase.com?q=' + encodeURIComponent(q));
  return await res.text();
}

// Only a maximum of 2 pending requests at any one time.
const results = await mapAsyncLimit(
  ['foo', 'bar', 'qux', 'quz'],
  fetchUpperCase,
  2,
);
console.log(results); // ['FOO', 'BAR', 'QUX', 'QUZ'];
 */
export default async function mapAsyncLimited(iterable, callbackFn, limit = 2) {
  let result = [];
  let index = 0;
  const worker = async () => {
    while (index < iterable.length) {
      const current = index++;
      try {
        result[current] = await callbackFn(iterable[current]);
      } catch (err) {
        throw err;
      }
    }
  };

  const alloperation = Array.from({
    length: Math.min(limit, iterable.length),
  }).map(() => worker());
  // if any error occrs then function exution will stopped
  await Promise.all(alloperation);

  return result;
}
```

## 11. N-level Curry

```js
// Currying is the technique of converting a function that takes multiple arguments into a sequence of functions that each takes a single argument.
// function add(a, b) {
//   return a + b;
// }

// const curriedAdd = curry(add);
// curriedAdd(3)(4); // 7

// const alreadyAddedThree = curriedAdd(3);
// alreadyAddedThree(4); // 7

export default function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    }
    // iddhar arrow function other this will bind with defined
    return (...nextArgs) => {
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}
```

## 12. Deep copy of any type , with check of circular deps 

```js
// const obj1 = {
//   num: 0,
//   str: '',
//   boolean: true,
//   unf: undefined,
//   nul: null,
//   obj: { name: 'foo', id: 1 },
//   arr: [0, 1, 2],
//   date: new Date(),
//   reg: new RegExp('/bar/ig'),
//   [Symbol('s')]: 'baz',
// };

// const clonedObj1 = deepClone(obj1);
// clonedObj1.arr.push(3);
// obj1.arr; // Should still be [0, 1, 2]


export default function deepClone(value, map = new WeakMap()) {
  if (value === null || typeof value !== "object") return value;

  if (map.has(value)) return map.get(value);
  let clone;
  if (value instanceof Date) {
    clone = new Date(value);
    map.set(value, clone);
    return clone;
  } else if (value instanceof Set) {
    clone = new Set();
    map.set(value, clone);
    value.forEach((v) => clone.add(deepClone(v, map)));
    return clone;
  } else if (value instanceof Map) {
    clone = new Map();
    map.set(value, clone);
    value.forEach((v, k) => clone.set(k, deepClone(v, map)));
    return clone;
  } else if (Array.isArray(value)) {
    clone = [];
    map.set(value, clone);
    value.forEach((v, i) => (clone[i] = deepClone(v, map)));
    return clone;
  } else if (value instanceof RegExp) {
    const clone = new RegExp(value.source, value.flags);
    clone.lastIndex = value.lastIndex;
    map.set(value, clone);
    return clone;
  } else {
    clone = Object.create(Object.getPrototypeOf(value));
    map.set(value, clone);
    Reflect.ownKeys(value).forEach(
      (key) => (clone[key] = deepClone(value[key], map)),
    );
    return clone;
  }
  return clone;
}
```

## 13 . call Ployfill

```js
Function.prototype.myCall = function (thisArg, ...argArray) {
  thisArg = thisArg ?? this;
  const fnSymbol = Symbol();
  thisArg[fnSymbol] = this;
  const result = thisArg[fnSymbol](...argArray);
  delete thisArg[fnSymbol];

  return result;
};
```


## 14 . Apply Ployfill

```js
Function.prototype.myApply = function (thisArg, argArray) {
  thisArg = thisArg ?? this;
  const symbolfn = Symbol();
  thisArg[symbolfn] = this;
  const result = thisArg[symbolfn](...argArray);
  delete thisArg[symbolfn];
  return result;
};
```

## 15 . Bind Ployfill

```js
// function add(a, b, c) {
//   return a + b + c;
// }

// const add5 = add.myBind(null, 5);
// console.log(add5(10, 20)); // 35


Function.prototype.myBind = function (thisArg, ...boundArgs) {
  const fn = this;

  return function (...args) {
    thisArg = thisArg ?? this;
    const key = Symbol();

    thisArg[key] = fn;
    const result = thisArg[key](...boundArgs, ...args);
    delete thisArg[key];

    return result;
  };
};

```

## 17. Infinite Scroll Logic

```js
// [viewport height + scrolled height from top>= scrollable total content]
// sample : https://codesandbox.io/p/sandbox/weathered-framework-s5zqt2
window.innerHeight + window.scrollY >= document.body.scrollHeight - 20

window.addEventListener("scroll", handleScroll);
return () => window.removeEventListener("scroll", handleScroll);
```