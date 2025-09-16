# Progressive Web App (PWA)

A **Progressive Web App** is a web application that uses modern web technologies to provide an **app-like experience** on both mobile and desktop.
It can be **installed**, **works offline**, and supports features like **push notifications** without needing an app store.

---

##  Key Features

* **Responsive** → Works on all devices.
* **Installable** → Can be added to home screen/desktop.
* **Offline Support** → Via **Service Worker** caching.
* **Fast Loading** → Uses caching strategies.
* **Secure** → Must run on **HTTPS**.
* **App-like UX** → Opens without browser chrome.
* **Background Features** → Push notifications, background sync.

---

## Basic Configuration Needed

### 1. **HTTPS**

* Mandatory for security & service workers.it works with https only not with (http except localhost).

### 2. **Web App Manifest (`manifest.json`)**

Defines how your app looks & behaves when installed. Example:

```json
{
  "name": "My PWA",
  "short_name": "PWA",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    { "src": "icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

### 3. **Service Worker (`service-worker.js`)**

Handles caching, offline, push notifications. Example:

```js
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("app-cache").then(cache =>
      cache.addAll(["/", "/index.html", "/style.css", "/app.js"])
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
```

### 4. **Registration of Service Worker**

In `index.js`:

```js
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}
```

---

##  Lifecycle of Service Worker

1. **Install** → Cache essential files.
2. **Activate** → Clean old caches.
3. **Fetch** → Intercept network requests (serve cache or network).

---

**In summary:**
A **PWA = Web App + Manifest.json + Service Worker + HTTPS**
This combination makes it **installable, offline-capable, and app-like**.

More on : https://codewave.com/insights/react-progressive-web-app-building/