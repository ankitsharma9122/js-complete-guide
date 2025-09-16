## HTTP Security Headers 

## Security Response Headers 

1. **X-Frame-Options**: HTTP response header can be used to indicate whether or not a browser should be allowed to render a page in a iframe / embed. uses to avoid clickjacking.

X-Frame-Options: DENY


2. **X-XSS-Protection**: response header is a feature of Internet Explorer, Chrome, and Safari that stops pages from loading when they detect reflected cross-site scripting (XSS) attacks.

X-XSS-Protection: 1; mode=block

Note : means enable 0 means disable 

its recommended to use CSP instead as this is not standard way and major browser stop supporting it.



3. **X-XSS-Protection**: nosniff stops browsers from guessing file types and forces them to trust what the server says. This prevents some attacks where hackers try to trick browsers into running malicious files.

X-Content-Type-Options: nosniff

MIME sniffing: https://blog.mozilla.org/security/2016/08/26/mitigating-mime-confusion-attacks-in-firefox/


4. **Referrer-Policy**: tells the browser how much information about the current page’s URL it should share with the next request (when you click a link, load an image, run a script, etc.).

Referrer-Policy: strict-origin-when-cross-origin

Note : send all referrer information (origin, path, and query string) to the same site but to only send the origin to other sites.

5. **Content-Type**: Representation header is used to indicate the original media type of the resource (before any content encoding is applied for sending)

Content-Type: text/html; charset=UTF-8

Note :  the charset attribute is necessary to prevent XSS in HTML pages (If you don’t declare UTF-8, a browser might guess another encoding.)

* <meta charset> works, but comes after parsing starts.

* HTTP header is stronger, because it sets encoding before parsing.

* Best practice = use both for maximum safety.

6. **Set-Cookie**: it can store tokens (like session IDs or JWTs). The browser then automatically includes those tokens in future requests, allowing the server to recognize and authenticate you.

Set-Cookie: jwt=eyJhbGciOiJIUzI1Ni...; HttpOnly; Secure; SameSite=Strict; Max-Age=3600

7. **Strict-Transport-Security (HSTS)** : response header lets a website tell browsers that it should only be accessed using HTTPS, instead of using HTTP.

Strict-Transport-Security: max-age=63072000;

## Performance & Optimization Headers

8. **X-DNS-Prefetch-Control** : DNS prefetching = browser looks up IP addresses ahead of time to make websites load faster, but it can slightly leak your browsing intentions.

X-DNS-Prefetch-Control: off

9. **ETag** :It’s a unique identifier the server gives to a specific version of a resource (like a file, HTML page, or JSON response). Browser doesn’t need to download the full file if nothing changed. 

10. **Connection**: Keep the TCP connection open after this request, so subsequent requests are faster.

Connection: keep-alive

11. **Cache-Control**: Controls caching behavior.

Cache-Control: no-store, no-cache, must-revalidate

* no-store → don’t store this response anywhere (browser or proxy).

* no-cache → always check with server before using cached copy.

* must-revalidate → cached response must be validated before reuse.

* Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0

12. **Access-Control-Allow-Origin**: Prevents other sites from accessing your API/data (like a whitelist).

## Request Headers

13. **Host** : only Domain sent , Host is part of the URL(backend url) that tells the browser which server to talk to.

14. **Origin** :Origin = protocol + domain + port (everything that identifies the “source” of a request).
Tells the server where the request is coming from.

 Origin: https://mybankclient.com

 | Term       | Includes                                                  | Purpose                                                                 |
| ---------- | --------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Host**   | Domain + port of the server you are contacting            | Tells the server which site you want                                    |
| **Origin** | Protocol + domain + port of the source making the request | Tells the server where the request is coming from (for security / CORS) |

15. **user-agent** : 
User-Agent header is an HTTP request header that browsers, mobile apps, or API clients send to the server. It identifies the client software, operating system, and sometimes device details making the request.

```doc
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 
(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
```
## Security Best Practices

* Always use HTTPS with Strict-Transport-Security.

* Implement CSP instead of deprecated X-XSS-Protection
Set secure cookie attributes for authentication tokens

* Use nosniff to prevent MIME confusion attacks

* Configure proper CORS policies for APIs
* Implement proper caching strategies for sensitive data

Ref : https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Headers_Cheat_Sheet.html