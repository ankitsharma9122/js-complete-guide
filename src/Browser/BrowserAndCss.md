# Browser Internals + CSS Performance

## Browser Rendering Pipeline

```
HTML → DOM
CSS  → CSSOM
DOM + CSSOM → Render Tree
Render Tree → Layout (Reflow)
Layout → Paint
Paint → Composite (GPU)
```

---

## 1. DOM (Document Object Model)

* Browser parses HTML top-to-bottom
* Creates a tree structure (DOM)
* JavaScript can modify DOM at runtime

⚠️ DOM changes can trigger **Reflow** or **Repaint**

---

## 2. CSSOM (CSS Object Model)

* Browser parses CSS rules
* Creates CSSOM
* CSS is **render-blocking**

DOM + CSSOM are required to build Render Tree

---

## 3. Render Tree

* Combination of DOM + CSSOM
* Contains only **visible elements**

❌ `display: none` → not included
✅ `visibility: hidden` → included

---

## 4. Layout (Reflow) ❌ EXPENSIVE

### What is Reflow?

* Browser calculates:

  * width / height
  * position (x, y)
  * box model

### What triggers Reflow?

* Changing layout properties:

  * width / height
  * margin / padding
  * top / left
  * font-size
  * adding/removing DOM nodes

⚠️ Reflow can affect **entire page or large subtree**

---

## 5. Paint ⚠️ MEDIUM COST

### What is Paint?

* Drawing pixels:

  * colors
  * background
  * borders
  * shadows
  * text

### Triggers Paint

* Changing visual properties:

  * color
  * background-color
  * box-shadow

---

## 6. Composite ✅ FAST (GPU)

### What is Composite?

* Layers are combined by GPU
* No layout or paint required

### Composite-only properties

* transform
* opacity

✅ Best for animations

---

## Reflow vs Repaint vs Composite

| Change Type | Example            | Cost      |
| ----------- | ------------------ | --------- |
| Reflow      | width, height      | ❌ High    |
| Repaint     | color, shadow      | ⚠️ Medium |
| Composite   | transform, opacity | ✅ Low     |

---

## Layout Thrashing (Common Bug)

❌ Bad Practice:

* Read + write layout repeatedly

Example:

* `offsetHeight`
* `getBoundingClientRect()`

➡️ Causes forced synchronous reflow

---

## CSS Performance Best Practices

### ✅ Use transform instead of top/left

```css
.card {
  transform: translateX(100px);
}
```

### ✅ Avoid deep CSS selectors

* ❌ `div ul li a span`
* ✅ `.titleText`

### ✅ Batch DOM updates

* Use `requestAnimationFrame`
* Use document fragments

### ✅ Use will-change carefully

```css
.box {
  will-change: transform;
}
```

❌ Overuse = memory issues

---

## CSS Animations: Good vs Bad

❌ Bad (Reflow):

* left / top

✅ Good (Composite):

* transform
* opacity

---

## Interview One-Liners 

* “Reflow is layout calculation and is the most expensive step.”
* “Repaint redraws pixels but doesn’t recalculate layout.”
* “Transform and opacity trigger only compositing.”
* “CSS is render-blocking because CSSOM is needed for render tree.”

---

Example of reflow and repaint cases:
```js
const box = document.getElementById('box');
box.style.width = '300px';
```

## One-Line Summary

> Minimize **Reflow**, reduce **Repaint**, prefer **Composite** for smooth UI.
