# HSTS Redirection vs Internal Redirection 

## 1. Internal Redirection

**Definition:**
Internal redirection is when the browser changes a request **before sending it to the network**.

**Key Points:**

* Happens inside browser
* No server involvement
* No actual HTTP request is sent for original URL
* Seen as: `307 Internal Redirect` in DevTools

**Examples:**

* HSTS
* Cached redirects
* Service Worker redirects

**Flow:**

```
User → http://example.com
Browser → modifies → https://example.com
Network → HTTPS request only
```

---

## 2. HSTS Redirection

**Definition:**
HSTS (HTTP Strict Transport Security) is a **security policy** that forces browser to always use HTTPS.

**How it works:**

1. First HTTPS response contains header:

```
Strict-Transport-Security: max-age=31536000
```

2. Browser stores rule:

```
example.com → HTTPS only
```

3. Future requests:

```
http://example.com → internally converted → https://example.com
```

**Key Points:**

* Implemented via server header
* Causes internal redirect
* Prevents HTTP requests after learning
* Protects against MITM attacks

---


## 3. First Request Problem (Without Preload)

Even with HSTS:

```
First visit:
http://example.com → goes to server
→ then learns HSTS
```

Issue:

* First request is still HTTP
* Vulnerable to downgrade attack

---

## 5. HSTS Preload (Solution)

**Definition:**
Preload is a browser-maintained list of domains that must always use HTTPS.

**How it works:**

* Browser already knows:

```
example.com → HTTPS only
```

* Even on first visit:

```
http://example.com → converted to https before request
```

**Key Points:**

* No first HTTP request
* No learning phase needed
* Hardcoded in browser


---
