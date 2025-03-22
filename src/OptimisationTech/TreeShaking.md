## Tree Shaking 

Tree shaking in React works the same way as in regular JavaScript: it removes unused code from the final bundle to reduce size.

## Tree Shaking Works in React:

1. **Tree shaking only works for named exports, not default exports.**

Not recommended as its default export even its not imported anywhere.
```
export default function Button() 
{ 
  return <button>Click</button>; 
}

```
2. **Use static import instead of dynamic require()**

Not recommended as its dynamic import
```
const Button = require("./Button");
```
Recommended as static imports handles tree shaking
```
import { Button } from "./Button";
```
3. **Prefer lodash-es over lodash :**
React projects often depend on third-party UI libraries (e.g., lodash, material-ui).
Some libraries bundle everything together, preventing tree shaking.

Not recommended as lodash not works on tree shaking: 
```
import _ from "lodash";
console.log(_.isEmpty([]));
```

Recommend as lodash-es works on tree shaking: 
```
import { isEmpty } from "lodash-es";
console.log(isEmpty([]));

```
4. Set "sideEffects": false" in package.json.
5. Use Webpack + TerserPlugin or Rollup for better tree shaking.
6. Use component-level imports for UI libraries.
Don't use * level imports for library .