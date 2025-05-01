## Singleton Design Pattern.

Singletons are classes which can be instantiated once, and can be accessed globally. This single instance can be shared throughout our application, which makes Singletons great for managing global state in an application.

* Singletons are actually considered an anti-pattern, and can (or.. should) be avoided in JavaScript.

code : https://codesandbox.io/p/sandbox/singleton-1-forked-9k86cr

1.  A change in one place unexpectedly affects another.
because They retain internal state that's shared across the whole app.

2. Hard to Test : You can’t easily replace them with mocks or stubs because of singleton nature as you can't easily modify the instance , you have to reset.

Singletons are useful when you need a single shared instance — like for logging, WebSocket connections, or a centralized state store (like Redux). While there are alternatives, singletons can offer a clean, scalable solution when used responsibly.

**you can save memory as well as multiple insatnce is not getting created.**

**Exmaples :**

1. A logging mechanism that needs consistent configuration (log level, timestamp format, output destination) throughout the application is a good candidate for a singleton.

```js
class Logger {
  constructor() {
    if (Logger.instance) return Logger.instance;
    this.logLevel = 'info';
    Logger.instance = this;
  }

  setLevel(level) {
    this.logLevel = level;
  }

  log(message) {
    if (this.logLevel === 'info') {
      console.log(`[INFO]: ${message}`);
    } else if (this.logLevel === 'debug') {
      console.log(`[DEBUG]: ${message}`);
    }
  }
}

// Usage
const logger1 = new Logger();
logger1.setLevel('debug');
logger1.log('This is a debug message.');

// Optional: freeze after configuration
Object.freeze(logger1);

// Still gets same instance
const logger2 = new Logger();
logger2.log('Another debug message');
```

2. Redux internally acts like a singleton for the store instance.