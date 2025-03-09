## ASYNC / DEFER / NO SCRIPT 

# 1. Standard Script Loading

```
<script src="script.js"></script>
```
1. The browser stops parsing the HTML when it encounters the script tag.
2. It downloads the script file (script.js) , 
Once downloaded, it executes the script immediately before continuing to parse the rest of the HTML.

**Drawbacks:**
1. Blocks HTML rendering until the script loads and executes.
2. If the script is large, it can slow down page loading.


# 2. Script Loading with async

```
<script src="script.js" async></script>
```

1. The browser downloads the script while still parsing the HTML.
2. Once the script finishes downloading, it executes immediately (before continuing HTML parsing).
Parsing pauses for execution when the script is ready.

**Drawbacks :**
1. Execution order is NOT guaranteed if multiple scripts are loaded asynchronously ,because Async scripts run in the “load-first” order. So whichever script loads first will run first.

**Best Use Case:**
1. For scripts not dependent on the DOM or other script, like:

-Analytics (Google Analytics, Facebook Pixel) or Ads

# 3. Script Loading with defer

```
<script src="script.js" defer></script>
```
1. The browser downloads the script while parsing the HTML.However, the script only executes AFTER the HTML is fully parsed.
2. Unlike async, execution order is preserved when multiple scripts use defer.
3. defer is similar to placing a script at the end of the body, but with a key difference: the script is downloaded in parallel with HTML parsing and executed only after the document is fully parsed.

**Best Use Case:**
Recommended for most scripts because:
1. It doesn’t block HTML parsing.
2. It ensures the DOM is fully loaded before executing.
Ideal for:
 - DOM manipulation scripts Frameworks (e.g., React, Vue, Angular).

 # 4. using noscript tag for Fallback:
 If JavaScript is disabled in the browser, <noscript> provides an alternative message:
```
<noscript>
  <p>JavaScript is required for this website. Please enable it in your browser settings.</p>
</noscript>

```

When you want to notify users that JavaScript is needed.
If your website relies heavily on JavaScript.

![!\[Alt text\](image.png)](../../Public/scriptTag.png)