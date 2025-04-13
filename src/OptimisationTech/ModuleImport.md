# Import Optimization: Visibility vs. Interaction

Optimizing imports in modern JavaScript applications, especially React-based ones, helps improve performance by reducing the initial load time. Two common strategies are:

## 1. Import on Visibility

**Definition:**  
Components or modules are dynamically imported when they become visible within the viewport.
Lazy loading components like modals, image galleries, or tab content that appears as the user scrolls.

**Example:**

```tsx
// App.tsx
import { useEffect, useRef, useState } from 'react';

export default function App() {
  const ref = useRef<HTMLImageElement>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setImgSrc('https://via.placeholder.com/600x400');
        observer.disconnect();
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ height: '1000px' }}>
      <p>Scroll down to load the image</p>
      <img
        ref={ref}
        src={imgSrc ?? ''}
        alt="Lazy Loaded Example"
        width="600"
        height="400"
        style={{ opacity: imgSrc ? 1 : 0.3 }}
      />
    </div>
  );
}
```

## 2. Import on Interaction

**Definition:**  
Modules or components are imported dynamically only when a user interacts with a certain UI element, such as clicking a button.
Helpful for rarely used features like a settings panel, support chat widget, or exporting data.
or you can handle thogh directly lazy loading with specific navigation 

**Example:**

```tsx
// SettingsPanel.tsx
export default function SettingsPanel() {
  return <div>Settings Panel Loaded</div>;
}
```

```tsx
// App.tsx
import { useState } from 'react';

export default function App() {
  const [Component, setComponent] = useState<null | React.FC>(null);

  const handleClick = async () => {
    const mod = await import('./SettingsPanel');
    setComponent(() => mod.default);
  };

  return (
    <div>
      <button onClick={handleClick}>Load Settings</button>
      {Component && <Component />}
    </div>
  );
}
```

---

Both techniques allow developers to reduce initial bundle size and improve user experience by loading only what’s needed, when it’s needed.

* browser will not load your img untill you specify the src with specific urls

