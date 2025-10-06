# Redux Toolkit 

### Core Redux Concepts

1. **Store**: Holds the entire state of your application
2. **Actions**: Objects that describe what happened (events)
3. **Reducers**: Pure functions that specify how state changes in response to actions
4. **Dispatch**: Method to send actions to the store

---

## Redux Toolkit (RTK)

**Redux Toolkit** is the official, recommended way to write Redux logic. It simplifies Redux by:
- Reducing boilerplate code
- Including best practices by default
- Providing powerful utilities

### Why Use Redux Toolkit Over Core Redux?

| Redux Core | Redux Toolkit |
|------------|---------------|
| More boilerplate code | Less code, more productivity |
| Manual store setup | Simplified configuration |
| Need to install middleware separately | Includes Redux Thunk by default |
| Manual immutable updates | Immer library built-in (mutate drafts safely) |

---

## Installation

```bash
npm install @reduxjs/toolkit react-redux
```

---

## Core Redux Toolkit APIs

### 1. **configureStore()**

Replaces Redux's `createStore()` with better defaults.

**Redux Core Way:**
```javascript
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(
  combineReducers({ counter: counterReducer }),
  applyMiddleware(thunk)
);
```

**Redux Toolkit Way:**
```javascript
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer
  }
  // Redux Thunk is included automatically!
});
```

---

### 2. **createSlice()**

The most important RTK API. Creates reducer + actions automatically.

**Redux Core Way:**
```javascript
// Action Types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// Action Creators
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });

// Reducer
const counterReducer = (state = { value: 0 }, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, value: state.value + 1 };
    case DECREMENT:
      return { ...state, value: state.value - 1 };
    default:
      return state;
  }
};
```

**Redux Toolkit Way:**
```javascript
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      // Looks like mutation but Immer makes it immutable!
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});

// Actions are auto-generated
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

---

## Complete Example: Todo App

### Step 1: Create a Slice

**features/todos/todosSlice.js**
```javascript
import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({
        id: Date.now(),
        text: action.payload,
        completed: false
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      return state.filter(t => t.id !== action.payload);
    }
  }
});

export const { addTodo, toggleTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
```

### Step 2: Configure Store

**app/store.js**
```javascript
import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer
  }
});
```

### Step 3: Provide Store to React

**index.js**
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

### Step 4: Use in Components

**components/TodoList.js**
```javascript
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from '../features/todos/todosSlice';
import { useState } from 'react';

function TodoList() {
  const [text, setText] = useState('');
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          placeholder="Add todo..."
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleTodo(todo.id))}
            />
            <span style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none' 
            }}>
              {todo.text}
            </span>
            <button onClick={() => dispatch(deleteTodo(todo.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
```

---

## 3. **createAsyncThunk()**

Handles async logic (API calls) easily.

**Redux Core Way:**
```javascript
// Action types
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// Thunk action creator
const fetchUsers = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      dispatch({ type: FETCH_USERS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
    }
  };
};

// Reducer
const usersReducer = (state = { data: [], loading: false, error: null }, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
```

**Redux Toolkit Way:**
```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Create async thunk
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetch('/api/users');
    return response.json();
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default usersSlice.reducer;
```

**Usage in Component:**
```javascript
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from './usersSlice';

function UsersList() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {data.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

---

## 4. **createEntityAdapter()**

Manages normalized state (like database tables).

**Example: Posts with Comments**
```javascript
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const postsAdapter = createEntityAdapter({
  selectId: (post) => post.id,
  sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: postsAdapter.getInitialState(),
  reducers: {
    addPost: postsAdapter.addOne,
    addPosts: postsAdapter.addMany,
    updatePost: postsAdapter.updateOne,
    removePost: postsAdapter.removeOne
  }
});

export const { addPost, addPosts, updatePost, removePost } = postsSlice.actions;

// Export selectors
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors((state) => state.posts);

export default postsSlice.reducer;
```

---

## Key Concepts Summary

### Immer Integration
Redux Toolkit uses Immer library internally, so you can write "mutating" code that's actually immutable:

```javascript
// This is OK in RTK
state.value += 1;
state.items.push(newItem);

// But you can still return new state if you want
return { ...state, value: state.value + 1 };
```

### Middleware
Redux Toolkit includes Redux Thunk by default. You can add more:

```javascript
import logger from 'redux-logger';

const store = configureStore({
  reducer: { ... },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(logger)
});
```

### DevTools
Redux DevTools Extension is automatically configured in development mode!

---

## Best Practices

1. **One slice per feature**: Keep related state and logic together
2. **Use TypeScript**: RTK has excellent TypeScript support
3. **Normalize complex data**: Use `createEntityAdapter` for arrays of objects
4. **Keep slices small**: Split large slices into smaller ones

---

## Common Hooks

```javascript
import { useSelector, useDispatch } from 'react-redux';

// Get state
const todos = useSelector(state => state.todos);

// Dispatch actions
const dispatch = useDispatch();
dispatch(addTodo('Learn Redux Toolkit'));
```

---

## Migration from Redux Core

1. Replace `createStore` with `configureStore`
2. Convert reducers to slices using `createSlice`
3. Replace manual action creators with slice-generated actions
4. Use `createAsyncThunk` for async logic
5. Remove manual immutable update logic (use Immer syntax)

---

## Conclusion

Redux Toolkit makes Redux simpler, more maintainable, and easier to learn. It's the recommended approach for all new Redux projects and provides a clear migration path for existing applications.

<!-- Entity adaptor,middleware,persist -->