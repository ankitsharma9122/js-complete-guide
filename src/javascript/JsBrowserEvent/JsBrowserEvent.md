# HTML Page Lifecycle Events 

## Main Events Overview

**DOMContentLoaded**
- Fires when HTML is fully loaded and DOM tree is built
- External resources (images, stylesheets) may still be loading
- Use: Initialize interface, access DOM elements
- Syntax: `document.addEventListener("DOMContentLoaded", handler)`

**load**
- Fires when page and ALL resources are loaded (images, styles, etc.)
- Use: Operations needing complete page load
- Syntax: `window.onload = handler` or `window.addEventListener('load', handler)`

**beforeunload**
- Fires when user tries to leave the page
- Use: Ask confirmation for unsaved changes
- Can cancel navigation by returning false or setting event.returnValue
- Syntax: `window.onbeforeunload = handler`

**unload**
- Fires when user is finally leaving
- Use: Send analytics, cleanup operations
- Should not involve delays or user interaction
- Use `navigator.sendBeacon()` for data sending
- Syntax: `window.addEventListener("unload", handler)`

## DOMContentLoaded Special Cases

**Scripts Block DOMContentLoaded**
- Regular `<script>` tags block the event
- Event waits for scripts to execute first
- **Why?** Scripts might modify DOM or use `document.write()`, so browser waits
- **Example:**
  ```html
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      alert("DOM ready!"); // This runs AFTER the script below
    });
  </script>
  
  <script src="large-library.js"></script> <!-- Takes 3 seconds to load -->
  
  <script>
    alert("Library loaded!"); // This runs FIRST
  </script>
  ```
  Output: "Library loaded!" → then "DOM ready!" (after 3+ seconds)

**Scripts that DON'T block DOMContentLoaded:**
- `<script async src="...">` - Downloads and runs independently
- `<script defer src="...">` - Downloads during parsing, runs AFTER DOMContentLoaded
- Dynamically created scripts: `document.createElement('script')`

**defer vs async vs regular:**
```html
<!-- Regular: Blocks parsing AND DOMContentLoaded -->
<script src="script.js"></script>

<!-- async: Doesn't block parsing or DOMContentLoaded -->
<script async src="script.js"></script>

<!-- defer: Doesn't block parsing, runs AFTER DOMContentLoaded -->
<script defer src="script.js"></script>
```

**Stylesheets Don't Block Directly**
- But if a script comes after stylesheet, script waits for stylesheet
- Since DOMContentLoaded waits for scripts, it indirectly waits for stylesheets

## Document Ready State

**document.readyState** values:
- `"loading"` - Document is loading
- `"interactive"` - Document parsed, DOM ready (same as DOMContentLoaded)
- `"complete"` - Everything loaded (same as window.onload)

**Checking if DOM is ready:**
```javascript
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', work);
} else {
  work(); // DOM already ready
}
```

## Event Sequence

1. `document.readyState: loading`
2. `document.readyState: interactive`
3. `DOMContentLoaded` event
4. Resources load (images, iframes)
5. `document.readyState: complete`
6. `window.onload` event

## Complete Event Flow Example

```html
<script>
  log('initial readyState:' + document.readyState);
  
  document.addEventListener('readystatechange', () => log('readyState:' + document.readyState));
  document.addEventListener('DOMContentLoaded', () => log('DOMContentLoaded'));
  
  window.onload = () => log('window onload');
</script>

<iframe src="iframe.html" onload="log('iframe onload')"></iframe>

<img src="https://en.js.cx/clipart/train.gif" id="img">
<script>
  img.onload = () => log('img onload');
</script>
```

**Expected Output Sequence:**
```
[1] initial readyState: loading
[2] readyState: interactive  
[2] DOMContentLoaded
[3] iframe onload
[4] img onload
[4] readyState: complete
[4] window onload
```
## Key Takeaways

- Use **DOMContentLoaded** for DOM manipulation
- Use **load** only when you need all resources loaded
- Use **beforeunload** for exit confirmations
- Use **unload** for cleanup (prefer sendBeacon for data)
- Check **readyState** when unsure about DOM readiness

# Script Loading

### Default Behavior
- Scripts block HTML parsing and DOM construction
- Browser waits for script download and execution before continuing
- Creates render-blocking behavior

### `defer` Attribute
- **Non-blocking**: HTML parsing continues while script downloads
- **Execution timing**: Runs after DOM is built, before `DOMContentLoaded`
- **Order preserved**: Deferred scripts maintain document order
- **Use case**: Scripts that need full DOM or depend on other scripts

```html
<script defer src="app.js"></script>
<script defer src="utils.js"></script> <!-- Runs after app.js -->
```

### `async` Attribute
- **Non-blocking**: HTML parsing continues during download
- **Execution timing**: Runs immediately when downloaded (no guarantees)
- **Order**: "Load-first" - whoever downloads first, executes first
- **Use case**: Independent scripts (analytics, ads, counters)

```html
<script async src="analytics.js"></script>
<script async src="ads.js"></script> <!-- Order doesn't matter -->
```

### Dynamic Scripts
- Created via JavaScript: `document.createElement('script')`
- **Default behavior**: `async` by default
- **Control order**: Set `script.async = false` for document order

```javascript
function loadScript(src) {
  let script = document.createElement('script');
  script.src = src;
  script.async = false; // Maintain order
  document.body.append(script);
}
```

### Loading Strategy Decision Tree
- **Critical scripts**: Inline or load synchronously
- **DOM-dependent scripts**: Use `defer`
- **Independent scripts**: Use `async`
- **Third-party scripts**: Always `async` with fallbacks

# onload and onerror Events

The browser provides two main events to track the loading of external resources like scripts, iframes, images, and stylesheets:

- **onload** - triggers when resource loads successfully
- **onerror** - triggers when loading fails

### Using onload Event
The onload event fires after the script is both loaded and executed:

```javascript
let script = document.createElement('script');
script.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js";
document.head.append(script);

script.onload = function() {
  // Script variables and functions are now available
  alert(_.VERSION); // Can use library functions
};
```

### Handling Errors with onerror
The onerror event tracks loading failures:

```javascript
let script = document.createElement('script');
script.src = "https://example.com/404.js"; // Non-existent script
document.head.append(script);

script.onerror = function() {
  alert("Error loading " + this.src);
};
```

**Important Notes:**
- onload/onerror only track loading, not execution errors
- For script execution errors, use window.onerror global handler


### Special Cases
- **Images**: Start loading when src is assigned, not when added to document
- **Iframes**: onload triggers for both successful loads and errors (historical reasons- basically for old browser support)
