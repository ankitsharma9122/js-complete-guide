# HTML Canvas Graphics 

* `<canvas>` is an HTML element used to **draw graphics dynamically using JavaScript**.
* It is **just a container**; all drawing is done via JS.
* Supports drawing **paths, shapes, text, gradients, and images**.

```html
<canvas id="myCanvas" width="200" height="100"></canvas>
```

**Rules to remember**:

* Always define **id**, **width**, and **height** (CSS scaling ≠ actual resolution).
* Default canvas is **transparent** and has **no border**.

With border:

```html
<canvas id="myCanvas" width="200" height="100" style="border:1px solid #000"></canvas>
```

```js
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
```

* `2d` → 2D drawing API
* All drawing methods live on `ctx`

---

## 4. Coordinate System (VERY IMPORTANT)

* Origin `(0, 0)` → **top-left corner**
* X-axis → right ➡️
* Y-axis → down ⬇️

```
(0,0) ───────────▶ x
  │
  │
  ▼ y
```

---

## 5. Drawing a Line

```js
ctx.moveTo(0, 0)
ctx.lineTo(200, 100)
ctx.stroke()
```

* `moveTo` → starting point
* `lineTo` → ending point
* `stroke()` → actually draws the line

---

## 6. Paths & Shapes

### Circle (Arc)

```js
ctx.beginPath()
ctx.arc(95, 50, 40, 0, 2 * Math.PI)
ctx.stroke()
```

**arc params**:

* `x, y` → center
* `radius`
* `startAngle`, `endAngle` (in radians)

---

## 7. Rectangles

```js
ctx.fillRect(10, 10, 150, 80)   // filled
ctx.strokeRect(10, 10, 150, 80) // outline
ctx.clearRect(20, 20, 50, 50)   // erase
```

---

## 8. Text Drawing

### Filled Text

```js
ctx.font = '30px Arial'
ctx.fillText('Hello World', 10, 50)
```

### Stroked Text

```js
ctx.font = '30px Arial'
ctx.strokeText('Hello World', 10, 50)
```

---

## 9. Colors & Styles

```js
ctx.fillStyle = 'red'
ctx.strokeStyle = '#000'
ctx.lineWidth = 2
```

---

## 10. Linear Gradient

```js
const grd = ctx.createLinearGradient(0, 0, 200, 0)
gr.addColorStop(0, 'red')
gr.addColorStop(1, 'white')

ctx.fillStyle = grd
ctx.fillRect(10, 10, 150, 80)
```


---

## 15. When to Use Canvas?

✅ Games
✅ Charts & visualizations
✅ Image processing
✅ Particle effects

❌ UI forms
❌ Accessible text-heavy content

---

## 16. Canvas vs SVG (Quick Mental Model)

| Canvas                  | SVG                      |
| ----------------------- | ------------------------ |
| Pixel-based             | Vector-based             |
| No DOM nodes            | DOM elements             |
| Faster for many objects | Better for interactivity |
| Manual redraw           | Auto redraw              |

---