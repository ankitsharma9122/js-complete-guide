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