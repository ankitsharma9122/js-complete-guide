## Sprite Images

Sprite Images (Image Sprites) are a frontend performance optimization technique where multiple small images are combined into a single large image, and CSS background-position is used to show only the required part.

**Why Sprite Images were used**

Earlier, each image = one HTTP request.
Many small icons → many requests → slow page.

```js
+-----------------------+
| icon-home | icon-user |
+-----------------------+
| icon-cart | icon-star |
+-----------------------+
```

Benefits

1. Fewer HTTP requests
2. Faster load time (especially HTTP/1.1 era)

Cons: 
1. Hard to maintain
2. Updating one icon requires regenerating sprite
3. Not responsive-friendly
4. Poor developer experience
5. Bad with dynamic content

* what are the subsitute currently used :

| Technique           | Why better                      |
| ------------------- | ------------------------------- |
| **SVG icons**       | Scalable, accessible, editable  |
| **Icon fonts**      | Easy styling                    |
| **Inline SVG**      | Best control                    |
| **HTTP/2 / HTTP/3** | Multiple requests are cheap now |
| **CDN + caching**   | Efficient image delivery        |

* Sprite Examples
* Sprite vs storyboard(How YouTube seek preview works internally)

