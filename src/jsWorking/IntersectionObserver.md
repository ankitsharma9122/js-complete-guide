
# IntersectionObserver in JavaScript

The `IntersectionObserver` API lets you asynchronously observe changes in the **intersection of a target element with a root element or the viewport**.

In simpler terms:
> It tells you **when an element enters or exits the visible part of the screen** — without using scroll events!

---

##  Why use it?

- **Efficient**: Doesn't run on every scroll like `onscroll` handlers
- 🚀 **Optimized**: Browser handles it natively using rendering optimizations
- 📦 **Use cases**: Lazy loading, infinite scroll, triggering animations, tracking visibility, analytics

---

## Lazy Loading Images

```html
<img data-src="image.jpg" class="lazy-image" width="300" />
```

```js
const images = document.querySelectorAll('.lazy-image');

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src; // Load real image
      observer.unobserve(img);
    }
  });
});

images.forEach(img => observer.observe(img));
```

---

## Use Case: Analytics or Tracking

```js
const track = document.querySelector('#ad-banner');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Ad was viewed');
    }
  });
});

observer.observe(track);
```

---

## IntersectionObserver vs Scroll Events

| Feature              | IntersectionObserver           | Scroll Events                        |
|----------------------|-------------------------------|--------------------------------------|
| Performance          |  Optimized                   |  Can be costly                     |
| Easy to use          |  Simple API                  |  Manual bounding box checks needed |
| Debounce needed?     |  No                          |  Usually required                  |
| Native visibility    |  Built-in                    |  Must calculate                    |

---
