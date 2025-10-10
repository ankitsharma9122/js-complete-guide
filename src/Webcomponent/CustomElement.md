# Custom Elements

Custom Elements allow you to create your own HTML tags with custom functionality using JavaScript classes that extend `HTMLElement`.

**Syntax:**
```javascript
class MyElement extends HTMLElement {
  // your code
}
customElements.define("my-element", MyElement);
```

---

## Key Lifecycle Methods

### 1. **constructor()**
- Called when element is created
- **Attributes are NOT available yet**
- **Element is NOT in the DOM yet**
- Use for: Initial setup, attaching shadow DOM
- **Don't render content here!**

### 2. **connectedCallback()**
- Called when element is **added to the document**
- Attributes ARE available
- Element IS in the DOM
- Use for: Rendering content, setting up event listeners
- **Best place to render!**

### 3. **attributeChangedCallback(name, oldValue, newValue)**
- Called when an observed attribute changes
- Must define `observedAttributes()` to use this
- Use for: Updating content when attributes change

### 4. **static get observedAttributes()**
- Returns array of attribute names to watch
- Only these attributes trigger `attributeChangedCallback`

---

## Why Render in connectedCallback, Not constructor?

When you create a custom element, the lifecycle follows this order:

1. constructor() is called
2. Attributes are assigned by the browser
3. connectedCallback() is called (when added to DOM)

```js
class MyElement extends HTMLElement {
  constructor() {
    super();
    console.log(this.getAttribute('name')); // ❌ null ==> AS attribute is not their until it got called
    console.log(this.hasAttribute('color')); // ❌ false ==> AS attribute is not their until it got called
  }
}

customElements.define('my-element', MyElement);
```

### Custom Element Lifecycle (Precise Summary)

1. **Constructor Phase** – `new MyElement()`

   * Browser creates the element object in memory.
   * It’s recognized as a `MyElement`, but **no attributes or DOM context yet**.

2. **Attribute Initialization Phase**

   * Browser parses HTML attributes (e.g., `name="John" color="blue"`).
   * These are assigned **after the constructor** via `element.attributes`.

3. **Connected Phase** – `connectedCallback()`

   * Element is inserted into the DOM tree.
   * Now it has a **parent**, **position**, and **full document context**.


**Best Practice:** Always render in `connectedCallback()` for better performance and attribute access.

---

## Example : Time Formatter (With Updates)

```javascript
class TimeFormatted extends HTMLElement {
  render() {
    let date = new Date(this.getAttribute('datetime') || Date.now());
    
    this.innerHTML = new Intl.DateTimeFormat("default", {
      year: this.getAttribute('year') || undefined,
      month: this.getAttribute('month') || undefined,
      day: this.getAttribute('day') || undefined,
      hour: this.getAttribute('hour') || undefined,
      minute: this.getAttribute('minute') || undefined,
      second: this.getAttribute('second') || undefined,
      timeZoneName: this.getAttribute('time-zone-name') || undefined,
    }).format(date);
  }

  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
  }

  static get observedAttributes() {
    return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render(); // Re-render when attributes change
  }
}

customElements.define("time-formatted", TimeFormatted);
```

**Usage (Live Clock):**
```html
<time-formatted id="elem" hour="numeric" minute="numeric" second="numeric"></time-formatted>

<script>
  setInterval(() => elem.setAttribute('datetime', new Date()), 1000);
</script>
```

---

##  Children Content Problem

**Problem:** Children are NOT available in `connectedCallback()`

```javascript
customElements.define('user-info', class extends HTMLElement {
  connectedCallback() {
    alert(this.innerHTML); // EMPTY! ❌
  }
});
```

```html
<user-info>John</user-info>
```

### Why?
HTML parser connects the custom element **before** processing its children.

### Solutions:

**Solution 1: Use Attributes** (Recommended)
```html
<user-info name="John"></user-info>
```

**Solution 2: Use setTimeout**
```javascript
customElements.define('user-info', class extends HTMLElement {
  connectedCallback() {
    setTimeout(() => alert(this.innerHTML));
  }
});
```

```html
<user-info>John</user-info>
```
---
## Additional Lifecycle Methods 

### **disconnectedCallback()**
- Called when element is removed from the document
- Use for: Cleanup (removing event listeners, stopping timers, etc.)
---
