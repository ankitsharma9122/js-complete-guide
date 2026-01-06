## CORS (Cross-Origin Resource Sharing) — Clear & Practical Explanation

Modern web security is based on the **Same-Origin Policy (SOP)**. SOP restricts how one website can interact with another. Attacks usually don’t *break* SOP — instead, they **abuse misconfigured CORS or rely on CSRF**.

This document explains CORS **in simple terms**, focusing on *what the browser does*, *why attacks happen*, and *how to configure CORS safely*.

---

## 1. What is an Origin?

An **origin** is defined by **three things**:

```
scheme (protocol) + host + port
```

Example:

```
https://bank.com:443
```

* Protocol: `https`
* Host: `bank.com`
* Port: `443`

Note :
* If **all three match**, the request is **same-origin**.
* If **any one differs**, it is **cross-origin**.

---

## 2. Same-Origin Policy (Why CORS Exists)

By default, the browser:

* Allows JS to **send requests anywhere**
* But **blocks JS from reading responses** from other origins

This protection is SOP.

CORS exists so that a **server can explicitly relax SOP** for trusted origins.

---

## 3. What a CORS Attack Really Is

A **CORS attack** happens when:

* A server allows **untrusted origins**, and
* The browser is allowed to expose **authenticated responses** to JavaScript

Example of a **dangerous configuration**:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
```

Why this is dangerous:

* `*` → any website is trusted
* `Allow-Credentials: true` → cookies are involved

An attacker’s website can now **read sensitive user data**.

---

## 4. Correct and Safe CORS Configuration

Always allow **specific, trusted origins only**:

```
Access-Control-Allow-Origin: https://trusted-site.com
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST
```

* Only trusted frontend can read responses
* Cookies work correctly
* Attacker sites are blocked

---

## 5. Cookies and Login

* When a user logs in, cookies are stored by the **browser**, not by a tab
* Cookies belong to a **domain** (e.g., `bank.com`)
* Any tab or website can trigger requests to that domain

👉 The browser decides **when to attach cookies**, not JavaScript.

---

## 6. `credentials` option in `fetch`

This option tells the browser **whether it is allowed to send credentials**.

```
credentials: "omit"        // never send cookies
credentials: "same-origin"// send cookies only for same-origin (default)
credentials: "include"    // send cookies even for cross-origin requests
```

Important:

* JavaScript **never reads cookies directly**
* This option only affects **sending**, not **reading**

---

## 7. What CORS Actually Controls

Key rule:

> **CORS does not block requests — it blocks JavaScript from reading responses**

So even if:

* The request reaches the server
* Cookies are attached

JavaScript may still see **nothing**, unless CORS allows it.

---

## 8. `Access-Control-Allow-Credentials: true`

* A **server-side response header**
* Meaning:

> “Browser, it is OK to expose this response to JavaScript even though credentials were used.”

Important clarifications:

* ❌ It does NOT enable cookies
* ❌ It does NOT authenticate users
* ✅ It only controls **JS access to the response**

---

## 9. Default Behavior

* If `Access-Control-Allow-Credentials` is **not present**
* The browser treats it as **false by default**

Result:

* Cookies may still be sent
* JavaScript **cannot read the response**

---

## 10. Why It Cannot Always Be `false`

Real-world applications often have:

* Frontend: `https://app.example.com`
* Backend: `https://api.example.com`
* Cookie-based authentication

In this case:

* Cookies must be sent
* JavaScript must read responses

* Therefore `Access-Control-Allow-Credentials: true` is **required**

---

## 11. Where CORS Headers Are Set

* All CORS headers are set on the **server response**
* Clients **cannot** override or fake them

---

## Final Takeaway

> **By default, browsers block JavaScript from reading cross-origin responses that include credentials.
> Only when the server explicitly allows a specific origin and sets `Access-Control-Allow-Credentials: true` does the browser expose the response to JavaScript.**

```js
const allowedOrigins = ["https://app.example.com"];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  next();
});
```