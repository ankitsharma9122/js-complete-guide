# Content Security Policy

**Content Security Policy (CSP)** is a security feature that controls which resources a web document is allowed to load, with a primary focus on **JavaScript resources**.

---

## Primary Purpose

- **Main Use Case**: Control which resources (especially JavaScript) a document can load
- **Key Protection**: Defends against **Cross-Site Scripting (XSS) attacks**

---

## How to Implement CSP

### Two Methods:

**1. HTTP Header** 
- Set via server response headers
- **More secure** and flexible
- **Always preferred** when you have server access
- Works for both SSR and CSR applications

**2. HTML Meta Tag**
- Use the `http-equiv` attribute in the `<meta>` element
- **Only use when you cannot configure server headers**
- **Recommended for CSR (Client-Side Rendering) applications** when no server control is available
- **BUT it cannot cover all security cases** (see limitations below)
- Useful for static hosting without server control (GitHub Pages, S3, etc.)

**Example:**
```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'">
```

**Important:** 
- HTTP Headers are ALWAYS better than meta tags when available!
- Meta tags provide partial protection (~60-70% coverage)
- Critical features like `report-uri`, `frame-ancestors`, and `sandbox` don't work in meta tags.

---

## CSP Implementation: SSR vs CSR

| Aspect | SSR | CSR |
|--------|-----|-----|
| **Delivery Method** |  HTTP Header (preferred) |  HTTP Header (preferred) |
| **Fallback** |  Meta tag (if needed) |  Meta tag (if needed) |
| **Security Approach** |  **Nonces** (dynamic per request) |  **Hashes** (static but secure) |
| **Why?** | Server generates unique nonces | Static builds can't generate dynamic nonces |

---

##  Why HTTP Headers Are Recommended for BOTH

###  Advantages of HTTP Headers (SSR & CSR):

1. **More Secure**: Headers can't be manipulated by client-side JavaScript
2. **Applied Earlier**: Browser receives CSP before parsing HTML
3. **Cannot Be Overridden**: Client-side code can't modify HTTP headers.

###  Limitations of Meta Tags:

1. **Applied Later**: During HTML parsing, not before
2. **Can Be Modified**: JavaScript could potentially manipulate
3. **Limited Directives**: Some CSP directives don't work in meta tags:
   - `report-uri` / `report-to` - Cannot send violation reports
   - `frame-ancestors` - Cannot protect against clickjacking
   - `sandbox` - Cannot apply sandbox restrictions
4. **Less Secure**: Not the intended primary delivery method.

---

###   Meta Tags CSP not supported: 

| CSP Directive | Works in Meta Tag? | Why It Matters |
|---------------|-------------------|----------------|
| `report-uri` |  **NO** |  Cannot report violations |
| `report-to` |  **NO** |  Cannot report violations |
| `frame-ancestors` |  **NO** |  Cannot prevent clickjacking |

---

###  SSR Applications → Use Nonces (with HTTP Headers)

**Why Nonces Work Well in SSR:**
- The server generates a fresh, cryptographically-random nonce for every HTTP response.
- The server injects the nonce into both the CSP header and any inline `<script> / <style>` blocks that must be allowed.
- strict-dynamic + nonce lets a trusted, nonce’d script dynamically load and run other scripts without you having to whitelist every host.
- won't allow inline scripts and events like `eval` and `javascript:`.
- Modern browsers ignore 'unsafe-inline' when a nonce or hash is present (so adding 'unsafe-inline' has no effect in modern browsers).

**Note:**older browsers that don’t understand nonces/strict-dynamic will fall back and respect 'unsafe-inline' if you include it — that weakens security on those legacy clients.

```
Content-Security-Policy: script-src 'nonce-{random}' 'strict-dynamic' 'unsafe-inline'; object-src 'none'; base-uri 'none';
```

####  SSR with Nonces Example:
```javascript
// Server generates nonce per request
app.use((req, res, next) => {
  const nonce = generateNonce(); // New random value
  
  // Set CSP via HTTP Header (recommended)
  res.setHeader(
    'Content-Security-Policy', 
    `script-src 'nonce-${nonce}'`
  );
  
  res.render('page', { nonce }); // Pass to template
  next();
});
```

```html
<!-- Server-rendered HTML -->
<script nonce="abc123xyz"> // Unique per request
  console.log('Secure!');
</script>
```

**Security Benefit:** Attacker can't predict nonce - it's different every time!

---

### CSR Applications → Use Hashes (with HTTP Headers)

**Why CSR Can't Use Nonces Effectively:**
- CSR apps are **pre-built static files**
- Same HTML served to **all users**
- **No server-side logic** to generate unique nonces per request
- Using static nonce = **security illusion** (attacker knows the nonce)

####  CSR with Static Nonces (DON'T DO THIS):
```html
<!-- Built once, served to everyone -->
<meta http-equiv="Content-Security-Policy" 
      content="script-src 'nonce-STATIC123'">

<script nonce="STATIC123">
  console.log('False sense of security!');
</script>
<!--  Problem: "STATIC123" never changes - attacker knows it! -->
```

####  CSR with Hashes (CORRECT APPROACH):
```javascript
// Build-time: Calculate hash of script content
const crypto = require('crypto');
const scriptContent = `console.log('Hello!');`;
const hash = crypto.createHash('sha256')
  .update(scriptContent)
  .digest('base64');
```

```nginx
# Configure server to send CSP via HTTP Header (preferred!)
add_header Content-Security-Policy "script-src 'self' 'sha256-xyz123abc...'";
```

```html
<!-- Your static HTML -->
<script>
  console.log('Hello!'); // Exact content hashed
</script>
```

**Security Benefit:** Hash is based on **exact script content**. If attacker changes even one character, hash won't match → blocked!

<!-- contine here -->

# Subresource Integrity (SRI) 

**SRI** is a security feature that allows browsers to verify that files fetched from CDNs haven't been tampered with.

* it can't help to protect you from XSS, it ensures the content is downloaded are not tempered.

### How SRI Works
- Adds a cryptographic hash to `<script>` or `<link>` tags
- Browser downloads the file and calculates its hash
- If hashes match → file executes
- If hashes don't match → file is blocked

### SRI Syntax
```html
<script 
  src="https://cdn.example.com/library.js"
  integrity="sha384-HASH_VALUE_HERE"
  crossorigin="anonymous">
</script>
```

## Why `crossorigin="anonymous"` is Required

When the request is not on the same origin the crossorigin attribute must be present to check the integrity of the file.
Without a crossorigin attribute, the browser will choose to 'fail-open' which means it will load the resource as if the integrity attribute was not set, effectively losing all the security SRI brings in the first place.

### Key Points

| Attribute | Purpose |
|-----------|---------|
| `integrity` | Contains the hash to verify |
| `crossorigin="anonymous"` | Enables CORS mode so SRI can work |

## Security Benefits
- **Prevents CDN compromise attacks**
- **Blocks modified/injected scripts**
- **Ensures file authenticity**
- **No performance cost** (verification is fast)

 **Use SRI for:**
- Third-party scripts from CDNs
- External CSS files
- Any untrusted external resource

 **Don't need SRI for:**
- Resources loaded over same origin

# Key Differences CSP Hash and SRI:

- **Scope:** Only work for **inline scripts or styles** (no `src` attribute).  
- **Location:** Hash is defined in the **CSP header**.  
- **How it works:** Browser computes the hash of the inline content and compares it against the hash in the CSP. If it matches, the script runs.

## SRI (Subresource Integrity / `integrity` attribute):

- **Scope:** Only works for **external scripts or styles** (must have a `src` or `href` attribute).  
- **Location:** Hash is included in the **HTML `integrity` attribute**.  
- **How it works:** Browser downloads the external file, computes its hash, and compares it with the one in the `integrity` attribute. If it matches, the file is loaded.

Resouces : https://blogs.halodoc.io/securing-web-applications-using-csp-nonce/
Google RA : https://research.google/pubs/csp-is-dead-long-live-csp-on-the-insecurity-of-whitelists-and-the-future-of-content-security-policy/