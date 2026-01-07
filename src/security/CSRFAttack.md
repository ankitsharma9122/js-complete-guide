
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

## CSRF Tokens implementation

Before relying on  ```sameSite: "Strict"```  to prevent CSRF, note that some legacy browsers lack full support. To ensure robust protection, it's best to use a CSRF token as an additional layer of security.

**How to implements**
1. A random token is generated per session.
2. The server validates the CSRF token before processing requests.

```
const crypto = require("crypto");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

const sessions = {}; // Store session tokens
const csrfTokens = {}; // Store CSRF tokens

// Generate Session Token
function generateSessionToken() {
    return crypto.randomBytes(32).toString("hex");
}

// Generate CSRF Token
function generateCSRFToken() {
    return crypto.randomBytes(32).toString("hex");
}


app.get("/csrf-token", (req, res) => {
    const sessionToken = req.cookies.session;

    if (!sessionToken || !sessions[sessionToken]) {
        return res.status(401).json({ error: "Not authenticated" });
    }

    res.json({
        csrfToken: sessions[sessionToken].csrfToken
    });
});



// Login Endpoint (Sets Session Cookie)
app.post("/login", (req, res) => {
    const sessionToken = generateSessionToken();
    const csrfToken = generateCSRFToken();

    sessions[sessionToken] = { csrfToken };

    res.cookie("session", sessionToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict"
    });

    res.json({ message: "Logged in" });
});


// Protected Endpoint (Validates CSRF Token)
app.post("/transfer", (req, res) => {
    const sessionToken = req.cookies.session;
    const csrfToken = req.headers["x-csrf-token"];

    if (
        !sessionToken ||
        !sessions[sessionToken] ||
        sessions[sessionToken].csrfToken !== csrfToken
    ) {
        return res.status(403).json({ error: "Invalid CSRF token" });
    }

    res.json({ message: "Transfer successful!" });
});


app.listen(3000, () => console.log("Server running on port 3000"));

```

Cleint side code :

```
async function fetchCSRFToken() {
    const response = await fetch("https://bank.com/csrf-token", { credentials: "include" });
    const data = await response.json();
    return data.csrfToken;
}

async function makeSecureTransfer() {
    const csrfToken = await fetchCSRFToken();
    await fetch("https://bank.com/transfer", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken
        },
        body: JSON.stringify({ amount: 10000, toAccount: "hacker_account" })
    });
}
```

Note : 

1. credentials: "include" it will include session from cookies from browser.

2. ```res.cookie("session", sessionToken, { httpOnly: true, secure: true, sameSite: "Strict" });``` here httpOnly means you can't access through ```document.cookies``` , it have to be a http request .


| Option               | What it does                            | Protects against           | What happens if missing             |
| -------------------- | --------------------------------------- | -------------------------- | ----------------------------------- |
| `httpOnly: true`     | Blocks JavaScript access to cookie      | XSS (session theft via JS) | Attacker JS can read & steal cookie |
| `secure: true`       | Sends cookie only over HTTPS            | MITM / network sniffing    | Cookie may leak on HTTP             |
| `sameSite: "Strict"` | Cookie sent only for same-site requests | CSRF attacks               | Cookie sent in cross-site requests  |
