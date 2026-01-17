
# Memory Management and Garbage Collection in JS



As inefficient memory usage can lead to performance issues and memory leaks. In JavaScript, memory is allocated in two primary locations: the **stack** and the **heap**. The garbage collection (GC) mechanism is responsible for freeing up memory that is no longer needed by the program. 

## Content

- Stack vs. Heap Memory
- How Garbage Collection Works
- Mark-and-Sweep Algorithm
- Generational Garbage Collection (with Compact Logic)
- Stale Closures and Memory Leaks in React
- Event Listeners and Memory Management: document vs window
- Memory Fragmentation and its Handling in JavaScript

## Stack vs Heap Memory
### Stack Memory:
- Stores **primitive values** (e.g., numbers, strings, booleans) and **references** to objects (not the objects themselves).
```js
let person = { name: "John", age: 30 };  // 'person' holds a reference to an object in heap memory
// person:refenece ==> in stack 
// { name: "John", age: 30 } ==> in Heap
```
- Stack memory is automatically managed, and its size is fixed.
- Variables and function calls are stored in the stack. When a function is called, a new stack frame is created. Once the function execution is complete, the frame is removed.

### Heap Memory:
- The heap is a region of memory used to store **objects** and **arrays**, which can grow in size dynamically.
- It is not as tightly managed as the stack. Objects in the heap have to be garbage collected when they are no longer referenced.
- Objects stored in the heap do not follow the stack's LIFO structure, and memory can be fragmented over time due to frequent allocations and deallocations.

### Call Stack:

* The call stack is part of the stack memory and is used specifically to track the execution of function calls.

* Each time a function is called, an execution context is created and pushed onto the call stack. This context includes:

* The function's local variables (stored on the stack).

* The reference to where the function should return after finishing (also stored on the stack).

* When a function finishes executing, its execution context is removed from the call stack, and the program continues executing the next function.

**NOTE : rest follow akshhay video**


## Garbage Collection in JavaScript

JavaScript engines use garbage collection to automatically manage memory, reclaiming memory that is no longer in use. The garbage collection process involves identifying which objects are no longer accessible and removing them from memory.

### Mark-and-Sweep Algorithm
**Mark-and-Sweep** is one of the simplest and oldest garbage collection algorithms. It works in two phases:

1. **Mark Phase**:
   - The garbage collector starts with the "root" objects (global variables, function arguments) and recursively marks all objects that are reachable.
   - All reachable objects are marked as **alive**.

2. **Sweep Phase**:
   - The garbage collector goes through the heap and frees the memory used by objects that were not marked during the mark phase (unreachable objects).
   - These objects are considered garbage and can be safely deleted.

**Advantages**:
- Guarantees the removal of unreachable objects.

**Disadvantages**:
- Performance can suffer with large heaps.
- Causes **memory fragmentation**, as memory is not compacted after the sweep phase.

### Generational Garbage Collection (with Compact Logic)
**Generational Garbage Collection** divides objects into different generations: **young** and **old**. The idea behind generational GC is based on the observation that most objects are short-lived.

1. **Young Generation**:
   - Objects that are newly created.
   - These objects are collected frequently because they often become unreachable quickly.
   - A minor GC event is triggered to collect the young generation.

2. **Old Generation**:
   - Objects that have survived multiple garbage collection cycles.
   - These objects are long-lived and are collected less frequently (major GC).
   
**Compact Logic**:
- After marking and sweeping, the memory may become fragmented (i.e., small free spaces scattered between used memory).
- In **generational GC**, after collecting the young generation, **compaction** can occur, where the remaining live objects are moved together to reduce fragmentation.
- This ensures that memory is more contiguous, which improves the performance of future memory allocations.

**Advantages of Generational GC**:
- More efficient by focusing collection efforts on short-lived objects.
- Reduces memory fragmentation by compacting memory.

**Disadvantages**:
- More complex to implement than basic mark-and-sweep.

**The V8 engine (the JavaScript engine used by Chrome and Node.js) implements both Generational Garbage Collection and the Mark-and-Sweep algorithm (with Sweep phase).**

## Stale Closures and Memory Leaks

In JavaScript, a **closure** is created when a function "remembers" the scope in which it was created, even after that scope has finished executing. While closures are powerful, they can lead to **memory leaks** if not handled correctly.

### What is a Stale Closure?
- A stale closure occurs when a function retains references to variables or objects from an outer scope, even after the outer scope has finished execution.
- This can prevent garbage collection from freeing the memory used by those objects, as the closure still holds a reference to them.
  
### How Stale Closures Lead to Memory Leaks
In a React component, for example, event listeners or asynchronous functions (like `setInterval` or `fetch`) that use closures might keep old state or props values alive, causing a memory leak even after the component has unmounted. This happens because the closure keeps a reference to the values, preventing them from being garbage collected.

Detailed example : https://medium.com/@anandsimmy7/stale-closures-and-react-hooks-ea60689a3544

### Example:
```javascript
useEffect(() => {
  const handler = () => {
    console.log(data);  // Closure keeps 'data' alive
  };
  window.addEventListener('resize', handler);

  return () => {
    window.removeEventListener('resize', handler);
  };
}, []);
```
In this example, the `data` state is captured in the closure, and if the component unmounts without removing the event listener properly, the reference to `data` may persist, causing a memory leak.

## Memory Leaks in React

Memory leaks in React typically occur due to **stale closures**, **unresolved promises**, or **forgotten event listeners**.

### Common Causes of Memory Leaks in React:
1. **Event Listeners**:
   - If event listeners are not removed when a component unmounts, they can hold references to the component's state and prevent garbage collection.
   
```
function ScrollTracker() {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    function onScroll() {
      setScrollY(window.scrollY);
    }

    window.addEventListener("scroll", onScroll);
  }, []);

  return <h1>{scrollY}</h1>;
}
Event lisner cause the issue with scrollY and leads tomemory leaks
```
2. **Timers**:
   - Functions like `setInterval` or `setTimeout` may continue running even after a component unmounts, keeping references to the component’s state via closures.
   * 
```js
timeer cause the issue with count and leads tomemory leaks
  useEffect(() => {
  setTimeout(() => {
    setCount(count + 1);
  }, 5000);
}, []);
   ```

3. **Promises**:
   - Unresolved promises that update component state after the component has unmounted can cause memory leaks.

```js
  // if abort is not handle then prosimse can cause the memory leaks 
  React.useEffect(() => {
  const controller = new AbortController();

  fetch("/api/user", { signal: controller.signal })
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(err => {
      if (err.name !== "AbortError") {
        console.error(err);
      }
    });

  return () => {
    controller.abort(); 
  };
}, []);
```

### Solution:
- Always clean up event listeners, timers, and promises inside the cleanup function of `useEffect` to prevent memory leaks.

```javascript
useEffect(() => {
  const interval = setInterval(() => {
    setCount((prev) => prev + 1);
  }, 1000);

  return () => {
    clearInterval(interval);  // Clean up the interval when the component unmounts
  };
}, []);
```

## Event Listeners: `window` vs `document` and Memory Management

In JavaScript, event listeners can be attached to different global objects like `window` or `document`. However, their behavior and impact on memory management can vary.

### `window`:
- The `window` object represents the global scope of the browser.
- Event listeners attached to `window` can persist beyond the lifetime of a component if not properly removed.

```js
function MyComponent() {
  const [data, setData] = useState(largeDataObject);

  useEffect(() => {
    const handler = () => {
      console.log(data); // Closure keeps old data
    };
    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);
}
```

The problem is that data forms a closure with the handler, and the handler(only reference) is attached to the window object. So, even after the component unmounts, the reference to data is still stored, which prevents it from being garbage collected.

### `document`:
- The `document` object represents the current web page.
- Event listeners on `document` are typically easier to manage because they are more closely tied to the lifecycle of the page.
- Proper cleanup still needs to be done, but event listeners on `document` are often less prone to causing memory leaks compared to `window` due to the nature of the object.

the event listener on document will be cleaned up when the component unmounts, as long as no other references to handleScroll are kept. If document is no longer needed (like when the page is unloaded), the browser will handle the cleanup but same thing doesn't work with window.

## Memory Fragmentation in JavaScript

**Memory fragmentation** occurs when memory is allocated and freed over time in a non-contiguous manner. Over time, this can cause inefficient memory usage, as the memory has free spaces between allocations, leading to wasted space.


**Complete End to End flow**:

1. When a JavaScript program runs, newly created objects are allocated in the heap’s **Young Generation**.
2. When the Young Generation (Eden space) starts filling up, **Minor Garbage Collection (Minor GC)** is triggered.
3. During Minor GC, V8 starts from **GC roots** (global variables, stack variables, and closures) and finds all **reachable (live) objects**.
4. These live objects are **copied/moved to a new memory area called the Survivor space**, and all unreachable objects are discarded.
5. Because only live objects are copied into a fresh, contiguous memory area and the old space is cleared entirely, **memory fragmentation does not occur in the Young Generation**.
6. Objects that survive multiple Minor GCs or are large in size are **promoted to the Old Generation**.
7. When the Old Generation starts filling up, **Major Garbage Collection (Major GC)** is triggered.
8. Major GC works in three main steps:

   * **Mark**: All reachable objects are marked.
   * **Sweep**: Unreachable objects are removed.
   * **Compact** (when needed): Live objects are moved together to remove gaps in memory.
9. During this entire process, JavaScript execution continues, while garbage collection runs incrementally or concurrently in the background.
10. The ultimate goal of V8’s garbage collection is to **free memory used by unused objects and keep memory usage efficient for live objects**.