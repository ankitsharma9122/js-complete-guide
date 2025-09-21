## Reconciliation in React

### What is Reconciliation?
Reconciliation is the process React uses to compare the new Virtual DOM with the previous one and determine the minimal set of changes required to update the real DOM.

### How It Works
1. **Different Element Types**: Replace the entire subtree.
```jsx
<div /> → <span />
```
2. **Same Element Type**: Update only the props and children.
```jsx
<div className="a" /> → <div className="b" />
```
3. **Keys in Lists**: Help React identify which items changed.
```jsx
<ul>
  <li key="1">A</li>
  <li key="2">B</li>
</ul>
```

### Purpose
- Minimize DOM mutations
- Improve performance
- Keep UI in sync with state and props

## React Fiber

### What is Fiber?
Fiber is a reimplementation of React’s rendering engine that allows incremental, interruptible rendering and supports concurrent features.

### Benefits
- Incremental rendering
- Task prioritization
- Pausing/resuming work
- Supports concurrent rendering

### Fiber Node
Each node includes:
- `type`, `key`, `stateNode`
- `child`, `sibling`, `return`
- `alternate` (link to old fiber)
- `memoizedState`, `updateQueue`, etc.

### Rendering Phases
1. **Render Phase**: Builds work-in-progress tree (pure, interruptible)
2. **Commit Phase**: Applies DOM changes and runs side effects

# React Reconciliation vs React Fiber

## Comparison

| Feature              | Reconciliation                     | Fiber                                  |
|----------------------|-------------------------------------|-----------------------------------------|
| Purpose              | Identify UI changes                | Manage how updates are rendered         |
| Scope                | Virtual DOM diffing                | Rendering engine                        |
| Concurrency          | Not supported                      | Supported                               |
| Update Strategy      | Synchronous/batched                | Incremental/interruptible               |
| Hook Management      | Not applicable                     | Managed in Fiber nodes                  |

## Summary
- **Reconciliation**: Determines what to change.
- **Fiber**: Determines how and when to apply the change.

Fiber provides the foundation for advanced features like concurrent rendering and Suspense by enabling controlled, prioritized rendering.

