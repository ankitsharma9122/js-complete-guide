# Adaptive Loading in React

Adaptive Loading improves performance by serving content based on the user’s device/network capabilities.

---

## Why Use Adaptive Loading?

Not all users have fast devices or internet. Adaptive loading helps:
- Load lightweight components on slow networks
- Skip animations for low-RAM devices
- Use responsive layouts for small screens

---

## Key APIs

###  Network Info
```ts
const connection = navigator.connection;
const isSlow = connection?.effectiveType !== '4g' || connection?.saveData;
```
or you can use different packages 