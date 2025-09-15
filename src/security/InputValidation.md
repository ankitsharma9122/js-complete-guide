## innerHTML vs innerText vs textContent

### 1. **innerHTML**

* Gets/sets **HTML markup** inside an element.
* Parses string as HTML → creates/removes DOM nodes.
* **Read:** No reflow (just serializes HTML).
* **Write:** Replaces DOM children → triggers reflow.

```js
let div = document.createElement("div");
div.innerHTML = "<b>Hello</b> World";
console.log(div.innerHTML); // "<b>Hello</b> World"

div.innerHTML = "<i>New</i>"; // Children replaced → reflow
```

⚠️ Risk: XSS if used with untrusted input.

---

### 2. **innerText**

* Gets/sets **visible (rendered) text**.
* Respects CSS (`display:none`, `visibility:hidden`).
* **Read:** Forces reflow/layout to compute visibility.
* **Write:** Replaces children with text node → triggers reflow.

```js
let div = document.createElement("div");
div.innerHTML = "Hello <span style='display:none'>Hidden</span> World";

console.log(div.innerText); // "Hello World" (hidden ignored)

div.innerText = "Only Text"; // Children replaced → reflow
```

---

### 3. **textContent**

* Gets/sets **raw text content** of nodes.
* Ignores CSS visibility.
* **Read:** No reflow (fastest).
* **Write:** Replaces children with text node → triggers reflow.

```js
let div = document.createElement("div");
div.innerHTML = "Hello <span style='display:none'>Hidden</span> World";

console.log(div.textContent); // "Hello Hidden World" (hidden included)

div.textContent = "Plain String"; // Children replaced → reflow
```

---

**Rule of Thumb:**

* Use `innerHTML` → when injecting HTML.
* Use `textContent` → for plain text (preferred).
* Use `innerText` → only when visible text is required.


# Input Validation & Sanitization in JS + React

---

## **1. Input Validation in JavaScript**

**Definition**: Check if user input follows rules before sending to server.  
**Why**: Prevents invalid data, improves UX, but can be bypassed (so server-side validation is also required).

### **Scenario: Signup Form**
```html
<form id="signup">
  <input type="text" id="username" placeholder="Enter username" />
  <button type="submit">Submit</button>
</form>

<script>
document.getElementById("signup").addEventListener("submit", e => {
  e.preventDefault();
  const username = document.getElementById("username").value;

  // Validation: only letters/numbers, 3-15 chars
  const regex = /^[a-zA-Z0-9]{3,15}$/;
  if (!regex.test(username)) {
    alert("Invalid username!");
  } else {
    alert("Valid input: " + username);
  }
});
</script>
```

⚠️ **Issue**: Hackers can bypass client validation using DevTools, cURL, Postman.  
👉 **Fix**: Always repeat validation on the **server**.

---

## **2. Input Sanitization in JavaScript**

**Definition**: Clean/escape user input before displaying in DOM.  
**Why**: Prevents malicious scripts (XSS).

### **Scenario: User Comments**

❌ **Unsafe**
```js
let userComment = "<img src=x onerror=alert('XSS!')>";
document.body.innerHTML += userComment; // Executes malicious code
```

✅ **Safe**
```js
function sanitize(str) {
  const temp = document.createElement("div");
  temp.textContent = str; // Browser escapes harmful HTML
  return temp.innerHTML;
}

let safeComment = sanitize("<img src=x onerror=alert('XSS!')>");
document.body.innerHTML += safeComment; // Renders as harmless text
```

"escape” here means turn special characters into safe text so the browser treats them as plain text, not HTML or script. In other words, escaping prevents the browser from interpreting <, >, &, " and ' as markup or code.

✅ **Using DOMPurify**
```js
const clean = DOMPurify.sanitize("<img src=x onerror=alert(1)>");
document.body.innerHTML = clean; // Safe
```

---

## **3. React’s Built-in Safety**

React **escapes JSX by default**, so user data is safe when rendered normally.

### **Scenario: Rendering User Input**

✅ **Safe**
```jsx
function App() {
  const userInput = "<img src=x onerror=alert('XSS!')>";
  return <div>{userInput}</div>;
}
// Output: <div>&lt;img src=x onerror=alert('XSS!')&gt;</div>
```

❌ **Unsafe**
```jsx
function App() {
  const userInput = "<img src=x onerror=alert('XSS!')>";
  return <div dangerouslySetInnerHTML={{ __html: userInput }} />;
}
// Executes attacker’s script
```

👉 Use `dangerouslySetInnerHTML` **only** if:
- Data is trusted (from your CMS/backend).  
- OR sanitized with **DOMPurify**.

---

## **4. Modern Approaches**

- **React Escaping** → Safe by default.  
- **DOMPurify** → Sanitizes untrusted HTML.  
- **Trusted Types (Browser Feature)** → Enforces safe DOM APIs.  


---

👉 **Rule of thumb**:  
- **Validate** → before storing/processing.  
- **Sanitize** → before rendering in DOM.  
- **React** → Safe by default, unless you bypass with raw HTML.

* unsafe :

```js
// UnsafeRendering.jsx
import React from "react";

export default function UnsafeRendering() {
  const userInput = "<img src=x onerror=\"alert('XSS')\">";
  return (
    <div>
      <h3>Unsafe rendering (dangerous)</h3>
      <div dangerouslySetInnerHTML={{ __html: userInput }} />
    </div>
  );
}
```

* Safe : 
```js
// SafeWithDOMPurify.jsx
import React from "react";
import DOMPurify from "dompurify"; // npm i dompurify

export default function SafeWithDOMPurify() {
  const userInput = '<img src=x onerror="alert(\'XSS\')"><b>hello</b>';
  const clean = DOMPurify.sanitize(userInput); // strips dangerous attributes

  return (
    <div>
      <h3>Safe rendering with DOMPurify</h3>
      <div dangerouslySetInnerHTML={{ __html: clean }} />
    </div>
  );
}

```