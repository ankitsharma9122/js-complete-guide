
## What is Clickjacking?

Clickjacking tricks users into clicking on something different from what they perceive, typically through embedding a site in an invisible iframe.

### Examples:
- Fake Like buttons
- Hidden "Purchase" or "Submit" buttons
- Hijacking form submissions

---

## 1. Prevent Clickjacking Using HTTP Headers

### Recommended: `X-Frame-Options` header

This header controls whether your site can be embedded in an iframe.

| Option         | Description                             |
|----------------|-----------------------------------------|
| `DENY`         | No embedding allowed                   |
| `SAMEORIGIN`   | Only same-origin pages can embed        |
| `ALLOW-FROM`   | (Deprecated) Allows a specific URI      |

### Example (for Express.js):
```js
const helmet = require("helmet");
app.use(helmet.frameguard({ action: "DENY" }));
```

### Example (Nginx config):
```nginx
add_header X-Frame-Options "DENY";
```

---

## 2. Modern Protection Using CSP

The Content Security Policy (CSP) `frame-ancestors` directive gives fine-grained control over who can embed your site.

### Example Header:
```http
Content-Security-Policy: frame-ancestors 'self';
```

### Example (Nginx):
```nginx
add_header Content-Security-Policy "frame-ancestors 'self';";
```

---

## 3. JS-Based Frame Busting (Backup)

Use this as an additional layer, especially when headers can't be modified.

```js
<style id='antiClickJack'>
      body {
        display: none !important;
      }
    </style>
  
    <script type='text/javaScript'>
      if (self === top) {
        var antiClickJack = document.getElementById("antiClickJack");
        antiClickJack.parentNode.removeChild(antiClickJack)
      }
      else {
        top.location = encodeURI(self.location);
      }
    </script>
```

---
