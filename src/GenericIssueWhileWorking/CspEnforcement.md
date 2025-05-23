# Why `add_header ... always;` is Critical for Proper CSP Enforcement in NGINX

## Problem Statement

When implementing Content Security Policy (CSP) headers in a Single Page Application (SPA) such as one built with React, developers often rely on NGINX to set security headers via the `add_header` directive. However, improper configuration can lead to CSP being inconsistently enforced. This becomes especially evident during negative testing, where removing specific CSP directives is expected to break styling or script loading—but in some cases, these assets still load properly.

## Core Issue

NGINX's `add_header` directive **only applies to successful 2xx responses** by default. This means if your application is using fallback mechanisms like:

```nginx
location / {
    try_files $uri /index.html;
}
```

and a request to a sub-path (e.g., `/loan-summary`) results in a 404 before falling back to `index.html`, the response may not include your CSP headers unless explicitly configured with `always`.

## Why This Matters in SPAs

React and other SPAs often rely on `index.html` being served for all routes. If a user directly visits `/dashboard` and this route doesn't physically exist on disk, NGINX may issue a 404 and then serve `index.html` via fallback. In this case, unless:

```nginx
add_header Content-Security-Policy "default-src 'self';" always;
```

is used, the header might not be sent. As a result:

* CSP policies are bypassed.
* Resources like scripts and styles may load even during negative testing.

## Misleading Network Tab

In Chrome DevTools or similar tools, you might see CSP headers listed under the `Headers` tab even in 404 responses. However, the browser **does not enforce** CSP unless it sees them in the actual 200 response used to render the page. This creates a false sense of security.

## Recommended Solution

Always use the `always` modifier:

```nginx
add_header Content-Security-Policy "default-src 'self';" always;
```

This ensures headers are added to all response types, including:

* Errors (404, 500)
* Redirects (301, 302)
* Fallbacks from `try_files`

## Best Practices

* **Disable browser cache** while testing CSP.
* **Avoid `rel="preload"`** for styles/scripts when validating CSP.
* **Force full page reloads (Ctrl + Shift + R)** for accurate results.
* Use separate NGINX `location` blocks to apply headers consistently.

## Conclusion

CSP is a powerful layer of defense against XSS and other injection attacks, but it only works if enforced consistently. Misconfiguring NGINX to omit `always` in `add_header` leads to false negatives in security testing, undermining the very protections CSP is meant to provide.

Use `add_header ... always;` to ensure comprehensive, reliable CSP enforcement across all response types and maintain the integrity of your frontend application.
