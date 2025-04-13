# Virtualization vs Infinite Scroll

## Virtualization

Virtualization is a technique to improve performance by rendering only the visible portion of a long list or table in the DOM. The rest of the data exists in memory but is not part of the DOM tree until needed.

### Key Points:
- Only the visible items are rendered in the DOM.
- Great for performance with large datasets.
- Used in libraries like `react-window`, `react-virtual`, `react-virtualized`.

---

## 2. Fixed Height Virtualization (Basic Implementation)

In this approach, each item has the same, known height.

### How It Works
1. Fixed height is assumed (e.g., 50px).
2. Total height = number of items × item height.
3. Items are positioned using `top = index * height`.
4. Only items in view are rendered.

### Code Example
```tsx
const FixedHeightVirtualList = () => {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const itemHeight = 50;
  const containerHeight = 400;
  const totalItems = 1000;
  const items = new Array(totalItems).fill(0).map((_, i) => `Item ${i}`);

  const startIdx = Math.floor(scrollTop / itemHeight);
  const endIdx = Math.min(totalItems - 1, Math.ceil((scrollTop + containerHeight) / itemHeight));

  const visibleItems = items.slice(startIdx, endIdx);

  return (
    <div
      ref={containerRef}
      onScroll={e => setScrollTop(e.currentTarget.scrollTop)}
      style={{ height: containerHeight, overflowY: 'scroll', border: '1px solid black' }}
    >
      <div style={{ height: totalItems * itemHeight, position: 'relative' }}>
        {visibleItems.map((item, i) => (
          <div
            key={startIdx + i}
            style={{
              position: 'absolute',
              top: (startIdx + i) * itemHeight,
              height: itemHeight,
              left: 0,
              right: 0,
              padding: 10,
              boxSizing: 'border-box',
              background: '#e0f7fa',
              margin: '4px 0'
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## 3. Dynamic Height Virtualization

### How It Works

1. **Scroll Container:** A fixed-height container allows vertical scrolling.
2. **Virtual Space:** A large invisible `div` creates space equivalent to all items combined.
3. **Scroll Position Tracking:** We monitor the user's scroll position to calculate which items are in view.
4. **Height Map:** We measure each item's height and store it in a `heightMap` to accurately calculate item positions.
5. **Render Visible Items Only:** Items are conditionally rendered based on whether they fall inside the current scroll window.
6. **Absolute Positioning:** Rendered items are positioned manually using `top` values based on their cumulative heights.

### Visibility Logic

```ts
return top + height > scrollTop && top < scrollTop + containerHeight;
```

This line determines if an item is visible in the scroll window:

- `top + height > scrollTop`: The item's bottom is below the top of the visible area.
- `top < scrollTop + containerHeight`: The item's top is above the bottom of the visible area.

If both are true, the item is at least partially visible and should be rendered.

### Visualization
```
         ↓
      scrollTop (200px)
───────────────
|             |
|  visible    |  ← viewport (200px to 600px)
|  area       |
|             |
───────────────
         ↑
scrollTop + containerHeight (600px)
```

### Example:
- For an item with `top = 150` and `height = 100`, its range is 150–250.
- 250 > 200 and 150 < 600 → Item is visible.

---

## 4. Infinite Scroll vs Virtualization

| Feature             | Infinite Scroll                 | Virtualization                         |
|---------------------|----------------------------------|----------------------------------------|
| DOM Size            | Grows continuously              | Remains constant                        |
| Memory Usage        | Increases with data load        | Optimized by rendering visible content |
| User Experience     | Natural scroll feel             | Same, with better performance          |
| Use Case            | Loading more data progressively | Rendering existing large datasets      |

> Virtualization is more suitable when you already have a large dataset and want optimal rendering.

---

## 5. Dynamic Height Virtualization Code [ where conent of height is getting changed contiously]

```tsx
import React, { useRef, useState, useEffect, useMemo } from 'react';

const items = new Array(1000).fill(0).map((_, i) => ({
  id: i,
  text: `Item ${i} with dynamic height ${Math.floor(Math.random() * 100) + 20}`,
}));

const DynamicVirtualList = () => {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [heightMap, setHeightMap] = useState({});
  const containerHeight = 400;

  const updateHeightMap = (index, height) => {
    setHeightMap(prev => {
      if (prev[index]?.height === height) return prev;
      const newMap = { ...prev, [index]: { height } };
      let top = 0;
      for (let i = 0; i < items.length; i++) {
        newMap[i] = {
          ...newMap[i],
          top,
        };
        top += newMap[i]?.height || 50;
      }
      return newMap;
    });
  };

  const visibleItems = useMemo(() => {
    return items.filter((_, i) => {
      const top = heightMap[i]?.top ?? i * 50;
      const height = heightMap[i]?.height ?? 50;
      return top + height > scrollTop && top < scrollTop + containerHeight;
    });
  }, [scrollTop, heightMap]);

  const totalHeight = useMemo(() => {
    return Object.values(heightMap).reduce((acc, cur) => acc + cur.height, 0) || items.length * 50;
  }, [heightMap]);

  return (
    <div
      ref={containerRef}
      onScroll={e => setScrollTop(e.currentTarget.scrollTop)}
      style={{ height: containerHeight, overflowY: 'scroll', position: 'relative', border: '1px solid black' }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map((item, i) => {
          const index = item.id;
          const top = heightMap[index]?.top ?? index * 50;
          return (
            <div
              key={index}
              ref={el => {
                if (el) updateHeightMap(index, el.offsetHeight);
              }}
              style={{ position: 'absolute', top, left: 0, right: 0, padding: 10, boxSizing: 'border-box', background: '#f4f4f4', margin: '4px 0' }}
            >
              {item.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DynamicVirtualList;
```

---

## Summary
- **Virtualization** is great for large datasets.
- **Infinite scroll** keeps adding to DOM, potentially causing performance issues.
- **Pagination** is best for SEO and simpler use cases.

Choose based on your app's needs: performance, UX, SEO, and data volume.

