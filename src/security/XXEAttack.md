## XXE (XML External Entity)

An XML External Entity (XXE) attack is a security vulnerability that exploits weakly configured XML parsers to inject external entities, potentially leading to data exposure, server-side request forgery (SSRF).

**XXE (XML External Entity) attacks can be used for two primary exploits:**

1. Sensitive Data Exposure – Reading files from the server.
2. SSRF (Server-Side Request Forgery) – Forcing the server to make unintended requests.

Example : 
```
const screenshot = async () => {
    try {
        const page = document.getElementById('main').innerHTML;

        const serializer = new XMLSerializer();
        const pageAsString = serializer.serializeToString(page);

        let response = await fetch('https://my-web-hosting.com/screenshot', {
            method: "POST",
            body: pageAsString
        });

        response = await response.json();
        const image = response;

    } catch (e) {
        console.error(e);
    }
};
document.getElementById("capture-the-screen").addEventListener('click', screenshot);
```

and backend Api is like : 

```
import xmltojpg from './xmltojpg';

app.post('/screenshot', function (req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    xmltojpg.convert(req.body)
        .then((jpg) => res.send(jpg))
        .catch(() => res.sendStatus(400));
});
```

now suppose a case when hacker send a pageAsString value as : 

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<request>
  <data>&xxe;</data>
</request>

```

1. The attacker injects an external entity declaration in the <!DOCTYPE> section.
```<!ENTITY xxe SYSTEM "file:///etc/passwd"> ```tells the parser to fetch the file /etc/passwd.

Note  : If the application processes this XML and returns the response, the attacker sees the contents of /etc/passwd.

How to handle these attacks :
1. Configure your XML parser to reject external entities like file or system level infomation.
2. use JSON as much as possiable .