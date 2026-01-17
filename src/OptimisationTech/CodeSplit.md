# **Lighthouse Performance Metrics**

Lighthouse evaluates web pages using various performance and user experience metrics. Below are the key parameters with their definitions.

**First Contentful Paint (FCP)**
- Measures the time until **the first visible element** appears on the screen.

**Largest Contentful Paint (LCP)**
- Determines when **the largest content** (image, text) is fully rendered.

**Total Blocking Time (TBT)**
- Captures **the time the page remains unresponsive** due to JavaScript execution.

**Cumulative Layout Shift (CLS)**
- Quantifies **unexpected layout shifts** that affect user experience.

**Speed Index**
- Measures how **quickly content becomes visible** during page load.

**Time to Interactive (TTI)**
- Calculates when the page **becomes fully interactive** for users.

| Point                     | **FCP**                             | **LCP**                                            |
| ------------------------- | ----------------------------------- | -------------------------------------------------- |
| Full Form                 | First Contentful Paint              | Largest Contentful Paint                           |
| Kya measure karta hai     | Screen pe **pehli cheez** kab dikhi | Screen ki **sabse badi important cheez** kab dikhi |
| Kya ho sakta hai          | Text, logo, background              | Hero image, banner, main heading                   |
| User ko kya feel hota hai | “Page start ho gaya”                | “Page load ho gaya”                                |
| Affects                   | Perceived loading                   | Actual loading experience                          |
| Good score                | ≤ **1.8s**                          | ≤ **2.5s**                                         |
| Google ranking me         | Indirect                            | **Direct (Core Web Vital)**                        |

1. Text heading dikhi → LCP = H1
2. Hero image load hui → LCP = Image


| Web Vital | Full Form                 | What It Measures (Simple)                     | Good Score  | Common Causes of Poor Score                       | How to Improve (Practical)                                                                                                              |
| --------- | ------------------------- | --------------------------------------------- | ----------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **LCP**   | Largest Contentful Paint  | How fast the **main content** becomes visible | ≤ **2.5s**  | Slow server, large images, render-blocking JS/CSS | • Optimize images (WebP, AVIF)<br>• Use CDN<br>• Preload hero image<br>• Remove render-blocking CSS/JS<br>• Server-side rendering (SSR) |
| **INP**   | Interaction to Next Paint | How fast UI responds to **user interactions** | ≤ **200ms** | Long JS tasks, heavy event handlers               | • Break long JS tasks<br>• Use `requestIdleCallback`<br>• Optimize event handlers<br>• Use Web Workers                                  |
| **CLS**   | Cumulative Layout Shift   | How much the layout **moves unexpectedly**    | ≤ **0.1**   | Images without size, ads, late font loading       | • Set width/height for images<br>• Reserve space for ads<br>• Use `font-display: swap`                                                   |

## Supporting Web Vitals
| Metric   | What It Measures       | Good Score  | Why It Matters                | How to Improve                                         |
| -------- | ---------------------- | ----------- | ----------------------------- | ------------------------------------------------------ |
| **FCP**  | First Contentful Paint | ≤ **1.8s**  | When first text/image appears | • Inline critical CSS<br>• Reduce server response time |
| **TTFB** | Time To First Byte     | ≤ **800ms** | Backend + network speed       | • Use CDN<br>• Enable caching<br>• Optimize backend    |
| **TBT**  | Total Blocking Time    | ≤ **200ms** | JS blocking main thread       | • Code splitting<br>• Defer non-critical JS            |
