# `<noscript>` Tag in HTML

The `<noscript>` HTML element provides fallback content for users who either:
- Have disabled JavaScript in their browser
- Are using browsers that do not support JavaScript

---

## Use Cases

### 1. Graceful Fallback

Show a warning or helpful message to users without JavaScript:

```html
<noscript>
  <p>Your browser does not support JavaScript or it is disabled. Please enable JavaScript for the best experience.</p>
</noscript>
