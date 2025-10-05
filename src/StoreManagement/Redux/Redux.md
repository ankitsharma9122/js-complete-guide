# Redux

Redux is a **pattern and library** for managing and updating **global application state**.

- UI triggers **actions** (events describing what happened)
- **Reducers** (update logic) modify state in response
- State changes trigger UI re-renders

---

## 1. Actions

**Definition**: Events that describe something that happened in the application.

### Structure
- Plain JavaScript objects
- Must have a `type` property (string describing the event)
- Optional `payload` property (additional data)

### Example
```js
const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
}
```

### Action Creators
Functions that return action objects (optional but recommended):
```js
function addTodo(text) {
  return {
    type: 'todos/todoAdded',
    payload: text
  }
}

// Usage
store.dispatch(addTodo('Buy milk'))
```

### Naming Convention
- Format: `'domain/eventName'`
- Descriptive past-tense or present-tense verbs
- Examples: `'todoAdded'`, `'userLoggedIn'`, `'counter/incremented'`

---

## 2. Reducers

**Definition**: Event listeners that handle state updates based on action types.

### Function Signature
```js
(state, action) => newState
```

### Key Rules
1. **Pure functions**: Same input always produces same output
2. **Immutable updates**: Must copy existing state, never modify directly
3. **No side effects**: No async logic, random values, or external API calls
4. **State calculation only**: Based on current state + action
5. **Must return state**: Always return current state for unknown actions

### Basic Example
```js
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case 'counter/incremented':
      return { ...state, value: state.value + 1 }
    case 'counter/decremented':
      return { ...state, value: state.value - 1 }
    case 'counter/incrementByAmount':
      return { ...state, value: state.value + action.payload }
    default:
      return state
  }
}
```

### Immutability Patterns

#### Objects
```js
// ❌ Wrong - Direct mutation
state.value = 123
state.nested.property = 'new'

// ✅ Correct - Copy and update
return { ...state, value: 123 }

return {
  ...state,
  nested: {
    ...state.nested,
    property: 'new'
  }
}
```

#### Arrays
```js
// Adding item
return { ...state, todos: [...state.todos, newTodo] }

// Removing item
return { 
  ...state, 
  todos: state.todos.filter(todo => todo.id !== action.payload) 
}

// Updating item
return {
  ...state,
  todos: state.todos.map(todo =>
    todo.id === action.payload.id
      ? { ...todo, completed: !todo.completed }
      : todo
  )
}
```

### Complex Reducer Example
```js
const initialState = {
  todos: [],
  filter: 'all'
}

function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded':
      return {
        ...state,
        todos: [...state.todos, {
          id: Date.now(),
          text: action.payload,
          completed: false
        }]
      }
    
    case 'todos/todoToggled':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      }
    
    case 'todos/todoDeleted':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      }
    
    case 'filter/filterChanged':
      return {
        ...state,
        filter: action.payload
      }
    
    default:
      return state
  }
}
```

---

## 3. Store

**Definition**: Object that holds the current Redux application state.

### Creation
```js
import { createStore } from 'redux'

const store = createStore(counterReducer)
```

### Store Methods

#### `getState()`
Returns current state value
```js
console.log(store.getState())
// {value: 0}
```

#### `dispatch(action)`
Dispatches action to trigger state update
```js
store.dispatch({ type: 'counter/incremented' })
```

#### `subscribe(listener)`
Registers callback that runs after every dispatch
```js
const unsubscribe = store.subscribe(() => {
  console.log('State changed:', store.getState())
})

// Later: stop listening
unsubscribe()
```

* the next dispatch() still updates the Redux state, but your listener won’t run anymore.

### Store with Multiple Reducers
```js
import { createStore, combineReducers } from 'redux'

const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer,
  user: userReducer
})

const store = createStore(rootReducer)

// State shape will be:
// {
//   counter: { value: 0 },
//   todos: { todos: [], filter: 'all' },
//   user: { name: '', loggedIn: false }
// }
```

### Store with Enhancers (DevTools)
```js
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
```

* This line connects your Redux store to the Redux DevTools browser extension, allowing you to visually debug and inspect all actions and state changes — but it runs only if the user actually has the DevTools installed.

## 4. Dispatch

**Definition**: The **only way** to update state - triggers state changes by sending actions to the store.

### Basic Usage
```js
store.dispatch({ type: 'counter/incremented' })

console.log(store.getState())
// {value: 1}
```

### With Action Creators
```js
function increment() {
  return { type: 'counter/incremented' }
}

function incrementByAmount(amount) {
  return { type: 'counter/incrementByAmount', payload: amount }
}

store.dispatch(increment())
store.dispatch(incrementByAmount(5))
```

### Data Flow
1. Call `store.dispatch(action)`
2. Store runs reducer with **current state** + **action**
3. Reducer returns **new state**
4. Store saves new state (replaces old state)
5. All subscribed listeners are notified
6. UI can call `getState()` to get updated data and re-render

### Metaphor
Think of dispatch as **"triggering an event"** in the application.

---

## 5. Selectors

**Definition**: Functions that extract specific pieces of information from store state.


- Encapsulate state shape knowledge
- useSelector checks whether the value it returns has changed using a strict === comparison (it only checks references, not deep equality).

```js
const data = useSelector(state => state.items.filter(item => item.active));
// Here, .filter() creates a new array every time the selector runs → new reference → re-render. Even if state.items didn’t actually change!
```

### Basic Selector
```js
const selectCounterValue = state => state.value

const currentValue = selectCounterValue(store.getState())
console.log(currentValue)
// 2
```

### Selectors with Combined Reducers
```js
// When using combineReducers, state is nested
const selectCounter = state => state.counter.value
const selectTodos = state => state.todos.todos
const selectFilter = state => state.todos.filter
```

### Selectors with Parameters
```js
const selectTodoById = (state, todoId) => {
  return state.todos.find(todo => todo.id === todoId)
}

const todo = selectTodoById(store.getState(), 5)
```

---

## 7. UI Re-rendering
- If changed → component re-renders with new data

### Manual Subscription (Vanilla JS)
```js
// 1) Create a new Redux store with the `createStore` function
const store = Redux.createStore(counterReducer)

// 2) Subscribe to redraw whenever the data changes in the future
store.subscribe(render)

// Our "user interface" is some text in a single HTML element
const valueEl = document.getElementById('value')

// 3) When the subscription callback runs:
function render() {
  // 3.1) Get the current store state
  const state = store.getState()
  // 3.2) Extract the data you want
  const newValue = state.value.toString()

  // 3.3) Update the UI with the new value
  valueEl.innerHTML = newValue
}

// 4) Display the UI with the initial store state
render()

// 5) Dispatch actions based on UI inputs
document.getElementById('increment').addEventListener('click', function () {
  store.dispatch({ type: 'counter/incremented' })
})
```

### With React (using react-redux library)
```js
import { useSelector, useDispatch } from 'react-redux'

function Counter() {
  // Automatically subscribes to store
  const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch({ type: 'counter/incremented' })}>
        +
      </button>
      <button onClick={() => dispatch({ type: 'counter/decremented' })}>
        -
  </button>
   </div>
  );
  ```

  And wrapping to index.js in mandate:

  ```js
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'
import store from './store'

const root = createRoot(document.getElementById('root'))

root.render(
  // Render a `<Provider>` around the entire `<App>`,
  // and pass the Redux store to it as a prop
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
  ```

  ## shallowEqual

- Without shallowEqual: new object {} created every time = always re-renders
- With shallowEqual: compares properties, re-renders only when actual data changes

```js
  // shallowEqual compares objects/arrays at first level only
import { shallowEqual } from 'react-redux';

//  Returns TRUE - primitives are equal
shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2 }); // true

//  Returns FALSE - nested objects have different references
shallowEqual({ a: { x: 1 } }, { a: { x: 1 } }); // false

//  Returns TRUE - same reference
const obj = { x: 1 };
shallowEqual({ a: obj }, { a: obj }); // true

// Usage in useSelector to prevent unnecessary re-renders
const { user, count } = useSelector(
  state => ({ user: state.user, count: state.count }),
  shallowEqual // Component only re-renders if user or count reference changes
);
```

- By itself, a Redux store doesn't know anything about async logic.

- A "side effect" is any change to state or behavior that can be seen outside of returning a value from a function.
 * Logging a value to the console
 * Saving a file
 * Setting an async timer
 * Making an HTTP request

# Redux Thunk 
Middleware for Redux that allows you to write action creators that return functions instead of actions. Enables async logic in Redux.

## Installation
```bash
npm install redux-thunk
```

## Setup

### Basic Setup
```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));
```

### Setup with Redux DevTools
```javascript
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(rootReducer, composedEnhancer);
```

## Basic Thunk Action
```javascript
// Return a function that receives dispatch
const thunkAction = () => {
  return (dispatch, getState) => {
    // Async logic here
    dispatch({ type: 'ACTION_TYPE' });
  };
};
```

## Common Pattern
```javascript
// Synchronous outer function receives parameters
export function saveNewTodo(text) {
  // Returns the async thunk function
  return async function saveNewTodoThunk(dispatch, getState) {
    // Now we can use the text parameter
    const initialTodo = { text }
    const response = await client.post('/fakeApi/todos', { todo: initialTodo })
    dispatch({ type: 'todos/todoAdded', payload: response.todo })
  }
}

// Usage in component
const handleKeyDown = e => {
  const trimmedText = text.trim()
  if (e.which === 13 && trimmedText) {
    // Create and dispatch the thunk with the parameter
    dispatch(saveNewTodo(trimmedText))
    setText('')
  }
}
```

## Key Points
- **dispatch**: Dispatches actions to the store
- **getState**: Accesses current state (optional parameter)
- Enables conditional dispatching based on state
- Perfect for API calls, timers, and complex async flows
- Thunks can dispatch multiple actions
- Can return promises for component await/chaining

## When to Use
- Async operations (API calls)
- Side effects before/after dispatching actions