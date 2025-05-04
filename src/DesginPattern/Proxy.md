
## Proxy

 Instead of interacting with the original object directly, you interact with the Proxy, which can define custom behavior for operations on the target object though `set` and `get` Methods.

Code : [Proxy Design Patten](https://codesandbox.io/embed/cocky-bird-rkgyo)

JavaScript provides a built-in object called `Reflect`, which makes it easier for us to manipulate the target object when working with proxies.

Insted of `obj[prop]` you can directly use `Reflect.get(obj,prop)`.

CODE :[Though Reflect]( https://codesandbox.io/embed/gallant-violet-o1hjx)


