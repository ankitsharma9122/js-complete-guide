# JavaScript and Browser

## Window Object
**Root object in browsers** - 
which is also a  `Global Object` and All global functions/variables become `window` properties.

![Window](../../../Public/DOM.png)

## Key Points
- **DOM**: Page content manipulation
- **BOM**: Browser-specific functionality
- **CSSOM**: Style rule management
- **Window**: Global object + browser control
- Each environment adds objects to JavaScript core

**DOM Tree**
* DOM Structure: HTML documents become tree structures where tags are element nodes and text content forms text nodes.

* Table Exception: Tables always get <tbody> tags automatically inserted by the browser, even if omitted in HTML

* Developer Tools: Use browser dev tools to inspect DOM structure, with shortcuts like $0 for selected elements and previously selected element as $1

example :
```js
$0.style.background = 'red'
```
## DOM LEVEL

![Alt text](../../../Public/DOMLevel.png)

## Attributes :
* elem.hasAttribute(name) – to check for existence.
* elem.getAttribute(name) – to get the value.
* elem.setAttribute(name, value) – to set the value.
* elem.removeAttribute(name) – to remove the attribute.
* elem.attributes is a collection of all attributes.


* node.append(...nodes or strings) – append nodes or strings at the end of node
* node.prepend(...nodes or strings) – insert nodes or strings at the beginning of node,
* node.before(...nodes or strings) –- insert nodes or strings before node,
* node.after(...nodes or strings) –- insert nodes or strings after node,

**below are old school's**

* parent.appendChild(node)
* parent.insertBefore(node, nextSibling)
* parent.removeChild(node)
* parent.replaceChild(newElem, node)

## CSS and styling 
* The style.cssText property corresponds to the whole "style" attribute, the full string of styles.

```js
div.style.cssText=`color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
  `;
```
<!-- psedo class and element -->
