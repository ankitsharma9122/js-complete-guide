## Raster vs Vector

* **Raster**: PNG, JPG/JPEG, WebP, AVIF, JPEG 2000 → pixel-based, resolution dependent.
* **Vector**: SVG → math/XML-based, infinitely scalable.

---

```js
Image file (.jpg / .webp / .avif)
        ↓
   Browser downloads
        ↓
   Browser DECODES image
        ↓
   Pixels in memory
        ↓
   Browser RENDERS on screen

// Note:
// Encoding happens only once, before the image is delivered to the browser.
// Usually during image creation, export, or build pipeline — not in the browser.

// Note:
// Decoding happens in the browser every time before rendering the image.


// Base64 is Not an image format 
```
## PNG (Portable Network Graphics)

**Type**: Raster

* **Compression**: Lossless
* **Transparency**: it supports background transparency
* **Extensions / MIME**: `.png` / `image/png`

**Pros**

* No quality loss after compression
* Excellent transparency support
* Widely supported across browsers and tools

**Cons**

* Larger file sizes compared to JPG/WebP/AVIF
* Not ideal for large photos

**Best Use**: UI assets, icons, screenshots, images needing transparency

---

## JPG / JPEG (Joint Photographic Experts Group)

**Type**: Raster

* **Compression**: Lossy
* **Transparency**: No
* **Extensions / MIME**: `.jpg`, `.jpeg` / `image/jpeg`

**Pros**

* Small file sizes for photographs
* Universal support
* Fast encoding/decoding

**Cons**

* Quality loss on recompression
* No transparency
* Artifacts at high compression(lossy compression throws away data to reduce file size like blurred like)

**Best Use**: Photographs, banners, large images where slight quality loss is acceptable

---

## JPEG 2000 (Next‑Gen JPEG)

**Type**: Raster

* **Compression**: Lossy
* **Progressive Decoding**: Yes
* **Extensions / MIME**: `.jp2`, `.jpx` / `image/jp2`, `image/jpx`, `image/jpm`, `video/m2`

**Pros**

* Up to **200% more compression** than JPEG(JPG)
* Progressive decoding (low‑quality preview while loading)

**Cons**

* Higher RAM usage
* Slower and more complex encoding
* **Limited browser support** (mainly Safari desktop & mobile)

* *Note* : Encoding compresses and saves image data, while decoding decompresses it into pixels for display.

**Best Use**: Niche use cases where Safari-only support is acceptable

---

## WebP (Google)

**Type**: Raster

* **Compression**: Lossy
* **Transparency**: Yes
* **Animation**: Yes (GIF alternative)
* **Extensions / MIME**: `.webp` / `image/webp`

**Pros**

* **25–35% smaller** than JPEG (lossy)
* Faster page loads
* Google‑recommended → **SEO friendly**
* Wide support in modern browsers

**Cons**

* Not supported by very old browsers
* Limited native OS/app viewers
* Fewer image editing tools support it

**Best Use**: Default web image format for modern websites

---

## AVIF (AV1 Image File Format)

**Type**: Raster

* **Compression**: Lossy
* **Transparency**: Yes
* **Animation**: Yes
* **Extensions / MIME**: `.avif` / `image/avif`

**Pros**

* Smaller than JPEG, PNG, and WebP
* ~**25% smaller than JPEG** on average
* Excellent visual quality
* Strong SEO and performance benefits

**Cons**

* No progressive decoding
* Slower encoding
* Limited browser & editing‑tool support


**Best Use**: High‑quality images (e‑commerce, galleries) where supported

---

## SVG (Scalable Vector Graphics)

**Type**: Vector (XML‑based)

* **Compression**: N/A (text‑based)
* **Extensions / MIME**: `.svg` / `image/svg+xml`

**Pros**

* Infinite scalability (no quality loss)
* Very small file size for simple graphics
* Manipulable via **CSS & JavaScript**
* Animatable
* SEO‑friendly (indexable text)
* Prints at any resolution

**Cons**

* File size grows rapidly with complexity
* Not suitable for detailed photos

**Best Use**: Icons, logos, illustrations, UI graphics



| Format    | Compression              | Transparency  | Animation     | Best For                             |
| --------- | ------------------------ | ------------- | ------------- | ------------------------------------ |
| PNG       | Lossless (default)       | Yes (default) | No (default)  | UI, screenshots (default)            |
| JPG       | Lossy (default)          | No (default)  | No (default)  | Photos (default)                     |
| JPEG 2000 | Lossy (default)          | No (default)  | No (default)  | Safari‑only advanced use (default)   |
| WebP      | Lossy/Lossless (default) | Yes (default) | Yes (default) | Modern web default (default)         |
| AVIF      | Lossy/Lossless (default) | Yes (default) | Yes (default) | High‑quality, next‑gen web (default) |
| SVG       | Vector (default)         | Yes (default) | Yes (default) | Icons, logos (default)               |


### Practical Recommendation (Frontend)

* **Icons/Logos** → SVG
* **Photos (safe fallback)** → JPEG
* **Modern websites** → AVIF → WebP → JPEG (fallback chain)
* **Transparency UI assets** → WebP or PNG

<!-- Topic to cover -->
<!-- Security concern in images(like mime sniffing) -->
<!-- Best for SEO & how to configure dynmic fallback images for stacic iamges -->