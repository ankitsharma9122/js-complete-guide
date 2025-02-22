## CORS, CSRF & Origin Security

Modern web security relies on same-origin policy (SOP), which determines how different web pages interact. Attackers often try to bypass SOP restrictions using Cross-Origin Resource Sharing (CORS) misconfigurations and Cross-Site Request Forgery (CSRF) attacks.

**Origin in Web security**

It's combination of 3 parts : scheme ,host and port, if all 
 are same then only mens its same-origin.

```
Protocol://host:port

Example https://bank.com:443

Protocol : https
host : bank.com
port : 443
```

## CORS Attack

Now below configuration allow all the origin and cookies can be sent to cross site as well becuase of ```Access-Control-Allow-Credentials: true ``` an attacker can make authenticated requests on behalf of the user from any website.

```
Access-Control-Allow-Origin: *  # BAD! Allows all origins.

Access-Control-Allow-Credentials: true  # BAD! Exposes user’s cookies.

```

**What's the correct approach :**
Below will only allow to trusted web not any and cookies can be used with this origin only.

```
Access-Control-Allow-Origin: https://trusted-site.com
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST
```


