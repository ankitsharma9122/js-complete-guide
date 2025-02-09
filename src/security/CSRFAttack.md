
## CSRF (Cross-Site Request Forgery)

A CSRF attack is when a malicious website tricks you into performing unwanted actions on another website where you're already logged in.

EXAMPLE : When you're logged into a trusted website, cookies store your session. If you visit a malicious site, it can trick your browser into sending requests to the trusted site, which processes them as if they're from you.

```
<a link="trustedwebsite/delete?=config.yml">JOIN MY GROUP</a>

OR 

<img src="https://trustedwebsite.com/delete?file=config.yml" height="0" width="0" />

```

A link which indicate to join some group but acts to delete some sensitive info,Video or Audio tag can be used to such purpose.

* Similary throgh HTTP POST request it can be done.

```
<form action="https://trustedwebsite.com/delete" method="POST" style="display:none;">
    <input type="hidden" name="file" value="config.yml">
        <input type="name" name="username" value="username">
    <input type="password" name="password" value="password">
    <button type="submit">Submit</button>
</form>
<script>
    document.forms[0].submit();
</script>
```

##  Prevent CSRF attack 
1. Use CSRF Tokens : A unique token is generated on the server for each user session. This token changes with every session and is used to verify the legitimacy of requests. For example, in the case of a forgery request like <img tag, the request would be blocked because the token would be missing or invalid.

2. Use SameSite Cookies : so that cross site cokkies are not allowed.

3. Content Security Policy (CSP) : 

```
Content-Security-Policy: 
  default-src 'self'; 
  script-src 'self' https://apis.google.com; 
  style-src 'self' 'unsafe-inline'; 
  img-src 'self' data:; 
  font-src 'self' https://fonts.googleapis.com; 
  frame-src 'none'; 
  object-src 'none';
```
Meaning ==>
default-src 'self' :
Sets the default policy for all content types to only load from the same origin ('self')

4. Verify Request Origin :
```
const allowedOrigin = "https://trustedwebsite.com";
if (req.headers.origin !== allowedOrigin) {
    return res.status(403).send("Forbidden");
}
```
## Origin in CSRF Context
The origin of a request is defined by three components:

1. Protocol (scheme): e.g. https or http
2. Host (domain): e.g., trustedwebsite.com or attackerwebsite.com

3. Port (if specified): e.g., :80, :443