# TypeScript: `type` vs `interface` and Union vs Intersection (Frontend-Focused)

This guide helps you understand **when to use `type` vs `interface`**, and **union vs intersection** types, with focus on frontend TypeScript projects (e.g., React).

---

##  `type` vs `interface`

### When to use `interface`
- Defining the **shape of an object** (e.g., props, data models)
- You want to **extend** other interfaces or allow **declaration merging**
- Used frequently in **React component props**

```ts
interface User {
  name: string;
  age: number;
}

interface Admin extends User {
  role: 'admin';
}
```

### When **not** to use `interface`
- When you need to define **union types**, **tuples**, or **utility types**
- When working with **primitives**, `interface` doesn't work.

---

###  When to use `type`
- For **union or intersection** types
- Aliasing **primitives**, **tuples**, or **functions**
- Creating **complex utility types** with mapped or conditional logic

```ts
type Status = 'loading' | 'success' | 'error';
type RGB = [number, number, number];
type Input = string | number;

type User = {
  name: string;
} & {
  age: number;
};
```

### When **not** to use `type`
- When you want declaration merging or to allow external augmentation
- When defining objects that may be extended by others

---

## Summary: `interface` vs `type`

| Use Case                               | Prefer        |
|----------------------------------------|---------------|
| Object/class shape                     | `interface`   |
| Extending other types/interfaces       | `interface`   |
| Declaration merging                    | `interface`   |
| Union / Intersection types             | `type`        |
| Primitive, tuple   | `type`        |
| Conditional / mapped / utility types   | `type`        |

---

##  Union (`|`) vs Intersection (`&`)

###  Union Type: `|`
- Allows a value to be **one of many types**
- Great for **variant type  handling**
 
```ts
type APIStatus = 'idle' | 'loading' | 'success' | 'error';
type Response = string | number;
```

Use case in React:
```ts
type Props = {
  variant: 'text';
  text: string;
} | {
  variant: 'icon';
  icon: JSX.Element;
};
```

###  Intersection Type: `&`
- Combines multiple types into **one single type**
- Often used for **extending props**, **mixins**, or **combining utility types**

```ts
type WithId = { id: string };
type WithTimestamp = { createdAt: Date };

type Entity = WithId & WithTimestamp;
```

###  Avoid intersecting incompatible types
```ts
type A = { value: string };
type B = { value: number };
type AB = A & B; //  Invalid: value can't be both string and number
```

---

## Frontend Best Practices

- Use `interface` for React **props**, **state**, and **context types**
- Use `type` for **utility**, **discriminated unions**, and **data transformations**
- Use **union** to model **variant props or API responses**
- Use **intersection** to **extend props** or **compose types**

---

## Interface
* In TypeScript, when two interfaces with the same name are declared in the same scope (usually in the same file or module), TypeScript automatically merges them. This is called declaration merging.
```ts
interface User {
  name: string;
}

interface User {
  age: number;
}
```
it behaves like 
```ts
// Final shape of User
interface User {
  name: string;
  age: number;
}
```

for type its a error 

* interface can be extended but type can't

| Feature            | `interface` | `type`     |
| ------------------ | ----------- | ---------- |
| Works with `Pick`  | ✅           | ✅          |
| Works with `Omit`  | ✅           | ✅          |
| Merging            | ✅ Yes       | ❌ No       |
| Union/Intersection | ⚠ Limited   | ✅ Powerful |

* There is no runtime performance difference between interface and type — because TypeScript erases all types at runtime, but in compile time interface having good permormance.

# TypeScript: `any` vs `unknown`

## 1. `any`

`any` disables TypeScript's type checking.

```ts
let value: any;

value = 10;
value = "hello";

value.toUpperCase(); // ✅ allowed
value();             // ✅ allowed
value.foo.bar;       // ✅ allowed
```

### Characteristics

* No compile-time safety
* No errors for invalid operations
* High risk of runtime crashes

```ts
let value: any = 10;
value.toUpperCase(); // ❌ Runtime error
```

---

## 2. `unknown`

`unknown` represents a value of unknown type **with safety enforced**.

```ts
let value: unknown;

value = 10;
value = "hello";

value.toUpperCase(); // ❌ Error
```

### Why error?

TypeScript forces **type checking before usage**.

---

## 3. Type Narrowing with `unknown`

```ts
if (typeof value === "string") {
  value.toUpperCase(); // ✅ safe
}
```

Other narrowing methods:

* `typeof`
* `instanceof`
* custom type guards

---

## 4. Assignment Rules (Important)

### `any`

```ts
let a: any = 10;
let s: string = a; // ✅ allowed
```

### `unknown`

```ts
let u: unknown = 10;
let s: string = u; // ❌ Error
```

Correct way:

```ts
if (typeof u === "string") {
  let s: string = u; // ✅
}
```

---

## 8. Key Takeaway

> `any` turns off TypeScript checks.
> `unknown` enforces validation before use during compile time

---
