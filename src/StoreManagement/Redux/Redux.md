# Redux

Redux is a **pattern and library** for managing and updating **global application state**. It follows a unidirectional data flow where:
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

---

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

### Purpose
- Encapsulate state shape knowledge
- Reusable logic for accessing state
- Can compute derived data
- Single place to update if state structure changes

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

### Derived Data Selectors
```js
const selectCompletedTodos = state => {
  return state.todos.filter(todo => todo.completed)
}

const selectActiveTodos = state => {
  return state.todos.filter(todo => !todo.completed)
}

const selectVisibleTodos = state => {
  const filter = state.filter
  const todos = state.todos
  
  switch (filter) {
    case 'completed':
      return todos.filter(todo => todo.completed)
    case 'active':
      return todos.filter(todo => !todo.completed)
    default:
      return todos
  }
}

const selectTodoStats = state => {
  const todos = state.todos
  return {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length
  }
}
```

---

## 6. Data Flow (Unidirectional)

```
┌─────────────────────────────────────────┐
│  1. User interacts with UI              │
│     (button click, form submit, etc.)   │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  2. Dispatch action                     │
│     store.dispatch({ type: '...' })     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  3. Store calls reducer                 │
│     newState = reducer(state, action)   │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  4. Reducer returns new state           │
│     (immutable update)                  │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  5. Store saves new state               │
│     Notifies all subscribers            │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  6. UI retrieves updated state          │
│     state = store.getState()            │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│  7. Component re-renders with new data  │
└─────────────────────────────────────────┘
```

---

## 7. UI Re-rendering

**How it works**:
- Components subscribe to store using `store.subscribe()`
- When state changes, store notifies **all** subscribers
- Each component checks if **its specific data** changed
- If changed → component re-renders with new data
- If unchanged → component can skip re-render (manual optimization)

### Manual Subscription (Vanilla JS)
```js
let previousValue = store.getState().value

store.subscribe(() => {
  const state = store.getState()
  const currentValue = state.value
  
  if (currentValue !== previousValue) {
    previousValue = currentValue
    // Update UI
    document.getElementById('counter').textContent = currentValue
  }
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
      </but