## Hydration in Web Development

Hydration is the process of converting server-rendered HTML into a fully interactive application by attaching JavaScript on the client side.

---

## Rendering on basis of Hydration Strategy

## 1. Basic Hydration

Server sends fully rendered HTML first, then JavaScript loads and hydrates the entire page at once.

**Flow:**

1. Server renders HTML
2. Browser displays static UI
3. JS loads
4. Entire page becomes interactive

**Pros :**

1. Simple implementation
2. Works well for small apps

**Cons :**

1. Slow Time to Interactive (TTI)
2. Heavy JS execution at once

---

## 2. Progressive Hydration

Hydrates the page in chunks instead of all at once. Priority is given to important (above-the-fold) components.

**Flow:**

1. Server sends HTML
2. Critical components hydrate first
3. Remaining components hydrate gradually

**Pros :**

1. Faster perceived performance
2. Better user experience
3. Efficient resource usage

**Cons :**

1. Requires prioritization logic
2. Partial interactivity can confuse users

---

## 3. Selective Hydration

Only specific components are hydrated based on user interaction or visibility.

**Flow:**

1. Server sends HTML
2. Components hydrate only when:

   * User interacts (click, scroll)
   * Component enters viewport

**Pros :**

1. Best performance optimization
2. Minimal JavaScript execution
3. Ideal for large applications

**Cons :**

1. Complex implementation
2. Requires precise control
3. Risk of inconsistent UI

---

## Progressive vs Selective Hydration

Progressive Hydration hydrates the entire page step-by-step.
Selective Hydration hydrates only required components when needed.

---

## When to Use

Use Basic Hydration when application is small and simple.

Use Progressive Hydration when:

1. All components are eventually needed
2. You want balanced performance and simplicity

Use Selective Hydration when:

1. Application is large and complex
2. Many components are not immediately needed
3. Maximum performance is required

---

## Key Takeaway

Hydration connects server-side rendering with client-side interactivity.

Basic Hydration loads everything at once.
Progressive Hydration loads everything gradually.
Selective Hydration loads only what is needed.

* we don't control hydration directly but its controlled via loading methods