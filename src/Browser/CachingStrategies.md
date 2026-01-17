# Caching Strategies – Simple Notes

## What is Caching?

Caching means **saving data or files temporarily** so that the next time they can be loaded **faster without hitting the server again**.

---

## 🔁 Overall Caching Flow (Easy Order)

```
Browser RAM
↓
Browser Disk
↓
CDN (Edge Server)
↓
Backend Server Cache
↓
Database
```

---

## 1️⃣ Browser Cache

### a) Memory Cache (RAM)

* Fastest cache
* Cleared when tab or browser closes
* Used within the same session

**DevTools shows:** `(memory cache)`

---

### b) Disk Cache

* Stored on user device
* Survives browser restart
* Controlled by HTTP headers

**DevTools shows:** `(disk cache)`

---

## 2️⃣ HTTP Cache Headers (Most Important)

### Cache-Control Examples

```http
Cache-Control: max-age=3600
```

Cache for 1 hour

```http
Cache-Control: no-cache
```

Use cache but **revalidate with server**

```http
Cache-Control: no-store
```

Do not store anything

```http
Cache-Control: immutable
```

Never revalidate, always trust cache

---

## 3️⃣ `immutable` (Very Important)

* Means: **this file will never change at the same URL**
* Browser does NOT hit server again
* Works only with **hashed filenames**

✅ `main.a8f3c21.js`
❌ `main.js`

---

## 4️⃣ ETag / Last-Modified (Validation)

Used when cached data becomes stale.

Flow:

* Browser asks: "Is file same?"
* Server replies:

  * `304 Not Modified` → use local file
  * `200 OK` → download new file

📌 ETag is **validation logic**, not a cache layer

---

## 5️⃣ CDN Caching

* CDN stores files near users
* Reduces backend load
* Very fast global delivery

```http
Cache-Control: public, max-age=31536000
```

---

## 6️⃣ Server-side Cache

* Redis / Memory / Nginx cache
* Prevents DB hit on every request

```
Request → Server Cache → App → DB
```

---

## 7️⃣ When File Changes

| Scenario        | Result              |
| --------------- | ------------------- |
| Hashed filename | New file downloaded |
| Same filename   | ETag check          |
| immutable file  | New URL required    |

---

## 8️⃣ What Should Be Cached Long-Term?

✅ JS files (hashed)
✅ CSS files (hashed)
✅ Images
✅ Fonts

---

## 9️⃣ What Should NOT Be Cached?

❌ index.html
❌ API responses (by default)
❌ Auth / OTP data
❌ Config files

---

## 🔍 Debugging Cache (Quick Guide)

| DevTools Output  | Meaning          |
| ---------------- | ---------------- |
| `(memory cache)` | RAM cache        |
| `(disk cache)`   | Disk cache       |
| `304`            | Server validated |
| `200`            | Full download    |

---

## 🧠 One-Line Summary

> Browser checks RAM → Disk → CDN → Server.
> `immutable` skips server check.
> `ETag` verifies changes.

---

## 🎯 Interview Ready Line

> “Caching is handled at multiple layers: browser memory and disk, CDN edge cache, and server cache, with validation using cache-control headers and ETag.”

---

# 🔄 Complete Caching Workflow (End-to-End Example)

## Scenario

User opens a React web app:

```
https://example.com
```

JS file:

```
/assets/main.a8f3c21.js
```

Server sends:

```http
Cache-Control: public, max-age=31536000, immutable
```

---

## 🧭 Step-by-Step Workflow

### 🟢 Step 1: User opens website (First Time)

```
Browser
 ├─ Memory Cache ❌
 ├─ Disk Cache ❌
 └─ Network Request → CDN → Server
```

* Browser has no cache
* CDN also doesn’t have file
* Server sends file with cache headers

```
Server → 200 OK
```

✔ File downloaded
✔ Saved in Disk cache
✔ Loaded in Memory cache

---

### 🟢 Step 2: User refreshes page (Normal Reload)

```
Browser
 ├─ Memory Cache ❌ (reload clears RAM)
 ├─ Disk Cache ✅
 │    └─ immutable + TTL valid
 └─ NO Network Request
```

✔ File served directly from disk
✔ No CDN
✔ No server

---

### 🟢 Step 3: Hard Refresh (Ctrl + Shift + R)

```
Browser
 ├─ Memory Cache ❌
 ├─ Disk Cache ✅ (immutable)
 └─ Still NO request
```

📌 immutable tells browser:

> "Don’t even revalidate"

---

### 🟡 Step 4: Without immutable (ETag flow)

Headers:

```http
Cache-Control: no-cache
ETag: "abc123"
```

```
Browser → CDN / Server
If-None-Match: abc123
```

* Server compares file

If SAME:

```
304 Not Modified
```

✔ Browser uses disk cache

If CHANGED:

```
200 OK + new file
```

✔ Old cache replaced

---

### 🔵 Step 5: New Deployment (Code Changed)

New build generates:

```
main.f91c8aa.js
```

```
Browser loads index.html (no-cache)
→ sees new JS URL
→ cache MISS
→ CDN → Server
```

```
200 OK (new file)
```

✔ Old JS untouched
✔ New JS downloaded
✔ App updated safely

---

## 🧠 Single-Line Mental Model

```
Same URL + immutable → use cache
Same URL + no-cache → validate (304)
New URL → download new file
```

---

## 4.  Cache-Control Headers&#x20;

we genrally add in Reverse proxy server (Nginx like or Aws CloudFront CDN), you can also add in backend server but it might lead little bit of latency issue as for each request it have to reach to server.

Example header:

```http
Cache-Control: public, max-age=31536000, immutable
```

| Header          | Purpose                                            |   |
| --------------- | -------------------------------------------------- | - |
| `Cache-Control` | Defines how long and where the response is cached. |   |
| `ETag`          | Entity Tag: Helps validate if a file has changed.  |   |
| `Last-Modified` | Timestamp to check freshness.                      |   |
| `Expires`       | Legacy header to indicate expiry time.             |   |

---

## 🎯 Final Summary

> Browser first checks memory, then disk. If needed, request goes to CDN and then server. `immutable` skips validation completely. ETag helps validate cached files. Hash-based filenames guarantee safe updates.
