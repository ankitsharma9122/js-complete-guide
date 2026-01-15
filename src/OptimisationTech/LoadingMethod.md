
## 1. Preload — Critical Assets

Preload is useful for assets needed immediately to render the page.

```html
<!-- Preload a critical stylesheet -->
<link rel="preload" as="style" href="https://cdn.example.com/css/main.min.css" onload="this.rel='stylesheet'">

<!-- Preload a web font (avoid double-fetching with crossorigin) -->
<link rel="preload" as="font" type="font/woff2" href="https://cdn.example.com/fonts/myFont.woff2" crossorigin="anonymous">

<!-- Preload a hero image -->
<link rel="preload" as="image" href="/assets/images/hero.jpg" type="image/jpeg">
```

**Best Use Case:** Render-blocking or above-the-fold resources needed immediately.

---

## 2. Preconnect — Third-Party Connections

Preconnect allows the browser to set up early connections (DNS, TCP, TLS) to external origins.

* Is origin se kuch mangne wala hoon,
abhi se connection ready rakho

```html
<!-- Preconnect to Stripe -->
<link rel="preconnect" href="https://js.stripe.com" crossorigin>

<!-- Preconnect to CMS API -->
<link rel="preconnect" href="https://cms.mywebsite.io">

<!-- Combine with dns-prefetch -->
<!-- Sirf DNS lookup karta hai -->
<link rel="dns-prefetch" href="https://cdn.example.com">
<link rel="preconnect" href="https://cdn.example.com" crossorigin>

* Dono saath me kyun likhte hain
* Modern browsers → preconnect use karte hain
* older me dns-prefetch ka support hai 
```

**Best Use Case:** External APIs, analytics, payments, CDN.

---

## 3. DNS-Prefetch — DNS Resolution Only

DNS-prefetch allows browsers to resolve a domain name before making a request.

```html
<!-- DNS-prefetch for a video CDN -->
<link rel="dns-prefetch" href="https://video-cdn.myvideoplatform.com">

<!-- DNS-prefetch for analytics server -->
<link rel="dns-prefetch" href="https://analytics.mytracker.com">
```

**Best Use Case:** External domains likely to be used, but no specific assets are referenced yet.

---

## 4. Prefetch — Near-Future Resources

Prefetch is ideal for resources that might be needed soon but not immediately.

```html
<!-- Prefetch next page's script -->
<link rel="prefetch" href="/scripts/blog-list.js" as="script">

<!-- Prefetch data for a future view -->
<link rel="prefetch" href="/api/user-dashboard-data.json" as="fetch">

<!-- Prefetch a large image for the next section -->
<link rel="prefetch" href="/images/next-section.jpg" as="image">
```

**Best Use Case:** Multi-step journeys, upcoming components, or hover-triggered views.

---

## 5. Prerender — Full Page in Advance

Prerender loads and renders an entire page in the background, making navigation instant.

```html
<!-- Prerender dashboard after login -->
<link rel="prerender" href="/dashboard">

<!-- Prerender a likely destination product page -->
<link rel="prerender" href="/product/12345">
```

**Best Use Case:** High-certainty navigation — such as post-login, wizard steps, or menus.

---

## Pro Tips

- Only preload **critical** assets. Avoid large scripts or rarely used items.
- Use **preconnect** for external APIs, payment gateways, or CDNs.
- Use **dns-prefetch** when you want to reduce latency with minimal overhead.
- **Prefetch** resources you're likely to need very soon (but not immediately).
- Use **prerender** sparingly, since it's resource-intensive.

| Resource            | Priority  |
| ------------------- | --------- |
| HTML                | Very High |
| CSS (stylesheet)    | High      |
| JS (blocking)       | High      |
| JS (defer/async)    | Medium    |
| Images (above fold) | High      |
| Images (below fold) | Low       |
| Fonts               | High      |
| Prefetch            | Low       |


| Resource                  | Render-Blocking? | Reason               |
| ------------------------- | ---------------- | -------------------- |
| HTML                      | —                | Base document        |
| `<link rel="stylesheet">` | ✅ Yes            | CSSOM required       |
| `<script>`                | ✅ Yes            | JS can block DOM     |
| `<script defer>`          | ❌ No             | Runs after parse     |
| `<script async>`          | ❌ No             | Runs async           |
| `preload`                 | ❌ No             | Download hint        |
| `prefetch`                | ❌ No             | Idle fetch           |
| Images                    | ❌ No             | No layout dependency |
| Fonts                     | ⚠️ Partial       | Text reflow          |

* crossorigin="anonymous" tells the browser:

-> Hey browser, load this resource without sending credentials (cookies, HTTP auth).
And if the server allows it via CORS, I’ll be able to use it safely in JS / CSS

* ALL Pre depends on disk storgae TTL and other factor , situation ke hosab se change hota hai or udd jata hai .