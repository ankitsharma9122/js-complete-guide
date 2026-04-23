# React 19

## 1. Problem Before React 19

Earlier in React, handling API calls required manual management of:

* Loading state
* Error state
* UI updates
* Optimistic updates

Example:

```js
const [isPending, setIsPending] = useState(false);

const handleSubmit = async () => {
  setIsPending(true);
  const error = await updateName(name);
  setIsPending(false);
};
```

Problems:

* Boilerplate code
* Hard to scale
* Easy to make mistakes

---

## 2. useTransition and startTransition

Definition:
useTransition is a React hook that lets you mark updates as non-urgent.
startTransition is the function used to wrap those updates.

Syntax:

```js
const [isPending, startTransition] = useTransition();
```

Example:

```js
const [isPending, startTransition] = useTransition();

const handleClick = () => {
  startTransition(() => {
    setData(expensiveCalculation());
  });
};
```

Behavior:

* Updates inside startTransition are treated as low priority
* UI remains responsive
* isPending becomes true while work is ongoing

When to use:

* Heavy rendering
* API calls
* Navigation updates

---

## 3. Actions

Definition:
Actions are async functions handled inside React transitions.

React automatically manages:

* Loading state
* Errors
* UI responsiveness

Example:

```js
const [isPending, startTransition] = useTransition();

const handleSubmit = () => {
  startTransition(async () => {
    await updateName(name);
  });
};
```

Flow:

1. isPending becomes true
2. Async work starts
3. UI remains responsive
4. After completion, isPending becomes false

---

## 4. Mental Model

Think of Actions as background tasks that do not block UI.

Flow:

* User triggers action
* React runs async logic in background
* UI remains interactive
* UI updates after completion

---

## 5. useActionState

Used to simplify form handling.

Example:

```js
const [error, submitAction, isPending] = useActionState(
  async (prev, formData) => {
    const error = await updateName(formData.get("name"));
    return error || null;
  },
  null
);
```

Usage:

```js
<form action={submitAction}>
  <input name="name" />
  <button disabled={isPending}>Submit</button>
</form>
```

Benefits:

* No manual state management
* Built-in error handling
* Built-in loading state

---

## 6. Form Actions

You can directly pass functions to form:

```js
<form action={actionFunction}>
```

React automatically:

* Handles submission
* Resets form
* Manages state

---

## 7. useFormStatus

Used inside child components to access form state.

Example:

```js
const { pending } = useFormStatus();
```

```js
function Button() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>Submit</button>;
}
```

No need for prop drilling.

---

## 8. useOptimistic

Used for optimistic UI updates.

Example:

```js
const [optimisticName, setOptimisticName] = useOptimistic(currentName);

const submitAction = async (formData) => {
  const newName = formData.get("name");

  setOptimisticName(newName);

  const updatedName = await updateName(newName);
};
```

Flow:

* UI updates immediately
* API runs in background
* Final state syncs after completion

---

## 9. use API

Used to read promises in render.

Example:

```js
const comments = use(commentsPromise);
```

With Suspense:

```js
<Suspense fallback="Loading...">
  <Comments commentsPromise={promise} />
</Suspense>
```

Rules:

* Do not create promises inside render
* Use cached promises

Behavior:

* Pending: suspends UI
* Resolved: renders data
* Rejected: handled by error boundary

---

## 10. Key Points

1. React 19 reduces manual async state handling
2. Actions handle async logic automatically
3. useActionState is best for forms
4. Optimistic UI improves user experience
5. use enables async data reading in render

---

