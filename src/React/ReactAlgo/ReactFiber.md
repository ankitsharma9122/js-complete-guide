# React Fiber Internals

## Overview
React Fiber is the internal engine behind React's rendering system. Introduced in React 16, Fiber enables incremental rendering and better scheduling of updates, making React faster and more responsive.

---

## What is Fiber?
Fiber is a reimplementation of the React core algorithm using a linked list architecture. Each node in the Fiber tree represents a component or DOM element in your application.

### Goals of Fiber:
- **Incremental rendering**: Split rendering work into units
- **Pause and resume**: Ability to pause work and come back to it
- **Prioritization**: Assign priority to updates
- **Concurrency**: Support for React Concurrent Mode

---

## Fiber Node Structure
Each Fiber node is a JavaScript object with the following important properties:

```js
{
  type: Function | string,        // The component type or tag name
  key: string | null,            // Key for reconciliation
  stateNode: Object,             // Instance of rendered component or DOM node
  return: Fiber | null,          // Parent fiber
  child: Fiber | null,           // First child
  sibling: Fiber | null,         // Next sibling
  alternate: Fiber | null,       // Link to previous fiber (used for diffing)
  pendingProps: any,             // New props
  memoizedProps: any,            // Previous props
  memoizedState: any,            // Previous state
  updateQueue: UpdateQueue,      // State updates queued
}
```

---

## Fiber Tree
The Fiber tree represents the component hierarchy. It includes:
- **Root fiber**: The starting point
- **Child and sibling links**: Used to traverse and update the tree

```txt
App
├── Header
│   ├── Logo
│   └── Nav
└── Content
    ├── Article
    └── Sidebar
```

---

## Rendering Phases
React Fiber has two main phases:

### 1. Render Phase (Reconciliation)
- **Pure** and can be paused/interrupted
- Builds the work-in-progress fiber tree
- Diffing (reconciliation) happens here

### 2. Commit Phase
- **Impure** and cannot be interrupted
- DOM mutations occur
- Runs lifecycle methods like `componentDidMount`, `useEffect`, etc.

---

## Scheduler and Priority
React uses a cooperative scheduler to manage updates. It uses:
- **Expiration times** for prioritization
- **Idle callbacks** to perform background work
- **User-blocking priority** for urgent updates

---

## Concurrent Mode
Fiber enables React to support **Concurrent Mode**, which allows:
- Interruptible rendering
- Background rendering
- Prioritized updates
- Lazy loading and suspense

---

## React Hooks and Fiber
Hooks are stored in a **linked list** on each Fiber node. React tracks:
- `currentlyRenderingFiber`: Points to the active fiber
- `hookIndex`: Ensures the correct hook order

**Important**: Hooks must be called in the same order on every render.

---

## Batched Updates in React

**Batched updates** combine multiple state updates into a single render to improve performance. React queues updates during event handlers (e.g., `onClick`) and processes them in a single render pass.

### How It Works:
- React batches state updates and triggers a single render.
- In React 18+, batching also works for async operations like timeouts, promises, and fetch callbacks.

### Example:
```jsx
function handleClick() {
  setCount(prev => prev + 1);
  setName('React');
  // Both updates are batched together into one render
}
```

**if you want to manully control react update:**

* flushSync() : Forces updates to be applied synchronously. This bypasses React’s batching mechanism and applies the state change immediately.

```jsx
import { flushSync } from 'react-dom';
flushSync(() => {
  setCount(count + 1);
});
```

* startTransition() : Marks an update as low-priority (non-urgent). This helps with batching non-essential updates and rendering them after more urgent tasks.

```jsx
import { startTransition } from 'react';

startTransition(() => {
  setSearchResults(expensiveResults);
});

```

* React me Virtual DOM aur Reconciliation ka kaam ye hai ki jab bhi state ya props change hote hain, React UI ka naya virtual snapshot (Virtual DOM) banata hai .

* usse purane snapshot se compare karta hai taaki pata chale exactly kaun-sa part change hua, phir React Fiber is comparison aur update process ko manage aur optimize karta hai—Fiber.

* har component ko ek fiber node me tod deta hai, updates ko priority deta hai (user input pehle, background kaam baad me), rendering ko pause/resume kar sakta hai, aur finally jo minimum changes nikalte hain unhe commit phase me ek saath Real DOM par apply kar deta hai

* matlab Virtual DOM batata hai kya badla, aur Fiber decide karta hai kaise, kab aur kis priority se wo change safely aur smoothly Real DOM me lage.
