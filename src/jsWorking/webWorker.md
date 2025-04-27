## Web Woker 

JavaScript (in browsers and Node.js) is usually single-threaded — meaning it can do one thing at a time.
Worker Threads allow you to run JavaScript code in parallel in separate threads (background workers) so the main thread doesn't get blocked.

* Browser = Web Workers
* Node.js = Worker Threads module

**Why are Worker Threads important**
* Non-blocking UI
* Parallel processing
* Better performance: handle CPU-heavy operations without slowing everything down.

**When should you use Worker Threads?**
* You have CPU-intensive tasks (math, data parsing, encryption, etc.)
* You want multi-core scaling (Node.js server-side work).
* You need to process big data, ML models, or video/audio editing in JS.

**Real world Example :** Image split into 4 quadrants → 4 workers → each processes 1/4th of the image → combine the result at the end.

## Exmaple of using web-worker :
Code : https://codesandbox.io/p/sandbox/mgv484?file=%2Fsrc%2FApp.js%3A8%2C28 [React code]

```js
const worker = new Worker(scriptURL, options);
// scriptURL ==> The URL of the worker JavaScript file you want to run.
// options==> If your worker script uses import / export, you must tell the browse

Example :
const worker = new Worker('/worker.js', { type: 'module' });
```

### ArrayBuffer
An **ArrayBuffer** is, fixed-size binary data buffer. It's used for handling raw binary data, typically with **typed arrays** like `Uint8Array` to manipulate the data.

**Transferable objects**, like `ArrayBuffer`, can be transferred between threads (main thread and Web Workers) without duplicating memory, improving performance with zero-copy transfer.

So if larger data set is their go with `ArrayBuffer` instaed of copying in threads.
<!-- Need to study array buffer , typed array ,form entries  -->