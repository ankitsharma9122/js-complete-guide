1. [Error boundary and best practices](https://refine.dev/blog/react-error-boundaries/#dealing-with-errors-in-asynchronous-operations-in-react )

## React Error Boundaries 

### What are Error Boundaries?

* React components that **catch JavaScript errors in child component trees**
* Prevent whole app crash and show **fallback UI**
* Introduced in **React 16**
* React equivalent of **try…catch**, but for **declarative UI**

---

### How Error Boundaries Work

* Errors propagate **upward** in component tree
* Nearest Error Boundary catches the error
* Rest of app continues to work

---

### Creating an Error Boundary

* Must be a **class component**
* Uses either or both lifecycle methods:

#### 1. `static getDerivedStateFromError(error)`

* Runs during **render phase**
* Updates state to show fallback UI
* ❌ No side effects allowed

#### 2. `componentDidCatch(error, info)`

* Runs after error is thrown
* Used for **logging & side effects**

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logError(error, info);
  }

  render() {
    if (this.state.hasError) return <h1>Something went wrong</h1>;
    return this.props.children;
  }
}
```

Usage:

```jsx
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

---

### What Error Boundaries **DO NOT** Catch

* ❌ Event handler errors (`onClick`, `onChange`)
* ❌ Asynchronous code (`setTimeout`, Promises)
* ❌ Server-side rendering errors
* ❌ Errors inside the ErrorBoundary itself

---

### Handling Async Errors (Manually)

Error boundaries don’t catch async errors → handle explicitly:

```js
try {
  const data = await fetch(url);
} catch (e) {
  setError(true);
}
```

---

### `react-error-boundary` Library

* Simplifies error boundary usage
* Works with **functional components**

Install:

```bash
npm install react-error-boundary
```

Basic usage:

```jsx
<ErrorBoundary fallback={<div>Something went wrong</div>}>
  <App />
</ErrorBoundary>
```

---

### `fallbackRender`

* Render prop for dynamic fallback UI
* Gives access to `error` and `resetErrorBoundary`

```jsx
<ErrorBoundary
  fallbackRender={({ error, resetErrorBoundary }) => (
    <div>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Retry</button>
    </div>
  )}
>
  <App />
</ErrorBoundary>
```

---

### Resetting After Error

* Use `resetErrorBoundary()`
* Optional `onReset` prop to reset app state

```jsx
<ErrorBoundary onReset={() => resetApp()} />
```

---

### `FallbackComponent` Prop

* Pass a **component** instead of JSX

```jsx
<ErrorBoundary FallbackComponent={ErrorFallback}>
  <App />
</ErrorBoundary>
```

---

### Logging & Monitoring

* Log errors inside `componentDidCatch`
* Use tools like **Sentry, Datadog**

```js
componentDidCatch(error, info) {
  logToService(error, info);
}
```

---

### Best Practices

#### Use Strategically

* ❌ Don’t wrap whole app
* ✅ Wrap independent sections (forms, dashboards, charts)

#### Granularity

* Too many → complexity
* Too few → big crashes

#### Fallback UI

* Be **user-friendly & contextual**
* Provide retry or help actions

#### Third-Party Components

* Always wrap them

```jsx
<ErrorBoundary fallback={<h2>Chart failed</h2>}>
  <Chart />
</ErrorBoundary>
```

#### Avoid Overuse

* Not a replacement for:

  * API error handling
  * Event handler try/catch

---

### Testing Error Boundaries

* Use Jest / React Testing Library

```js
expect(screen.getByText('Something went wrong')).toBeInTheDocument();
```

---

### Mental Model (Interview Friendly)

* **Error Boundary = UI crash protector**
* Catches render lifecycle errors only
* Async & events → manual handling
* Production apps = Error Boundary + Logging + Retry

---

### One-Line Summary

> Error Boundaries prevent React UI crashes by isolating component errors and rendering fallback UI — they are the last safety net, not the first line of defense.
