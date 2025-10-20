# In-App Browsers: Complete Guide

## What Are In-App Browsers?

**In-app browsers** are mini web browsers that open inside mobile apps instead of switching to your phone's default browser (Safari/Chrome).

**Example**: Click a link in Instagram → Opens inside Instagram (not Safari/Chrome)

**Also called**: WebView, Embedded Browser

---

## Why Apps Use Them

* Keep users inside the app  
* Track what links users click  
* Control the browsing experience  
* Collect data on user behavior  

---

## Escape Strategies

### Android Solution
Uses `intent:` links to redirect to default browser:

```javascript
import InAppSpy from "inapp-spy"
const { isInApp } = InAppSpy()

const url = `https://example.com`
const intentLink = `intent:${url}#Intent;end`

if (isInApp) {
  // Auto-redirect
  window.location.replace(intentLink)
  
  // Provide manual fallback link
  const $div = document.createElement("div")
  $div.innerHTML = `
    <p>Tap the button to open in your default browser</p>
    <a href="${intentLink}" target="_blank">Open</a>
  `
  document.body.appendChild($div)
}
```
