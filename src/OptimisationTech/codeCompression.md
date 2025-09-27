# Gzip vs Brotli Compression

Web compression reduces the size of files (HTML, CSS, JavaScript) before sending them from server to browser. This makes websites load faster and improves user experience.

**Note**: These compression methods only work for text-based files, not images. For images, use next-generation formats like WebP or AVIF.

## Compression Algorithms Comparison


| Feature | Gzip | Brotli |
|---------|------|--------|
| **Compression Speed** | ✅ Fast compression | ❌ Slower compression |
| **Decompression Speed** | ✅ Fast | ✅✅ Very fast (equal or faster than Gzip) |
| **File Size** | Good (baseline) | ✅ 15-25% smaller than Gzip |
| **Browser Support** | ✅ All browsers (even old IE6+) | ✅ Modern browsers only |
| **CPU Usage** | Low | Higher |
| **Best For** | Dynamic content, universal fallback | Static files (CSS, JS, HTML) |
| **File extension** | `.gz` | `.br` |
| **size Reduction** | 60-70% smaller than original |  70-85% smaller than original (best results) |

## CloudFront Automatic Compression

### How It Works
1. CloudFront checks if browser supports compression (`Accept-Encoding` header)
2. Only compresses files between 1KB and 10MB
3. Works only with specific file types mentioned in AWS sheet.
4. Adds compression at edge locations (closer to users -- nearest server of user)

* Configuration
- AWS Management Console (Web Interface)

1. Go to CloudFront in AWS Console
2. Select your distribution
3. Go to Behaviors tab
4. Edit your behavior (usually the default * behavior)
5. Set Compress Objects Automatically to Yes

### Limitations of Auto-Compression
-  No control over compression level
- May slow down dynamic content as it do on the fly of servering content

## Manual Compression Strategy

### The Approach
Instead of compressing files on-the-fly, compress them during your build process and store multiple versions.

### File Structure Example
```
website-files/
├── index.html          # Original file
├── index.html.gz       # Gzip compressed
├── index.html.br       # Brotli compressed
├── styles.css          # Original file  
├── styles.css.gz       # Gzip compressed
└── styles.css.br       # Brotli compressed
```

### Smart File Serving
Use CloudFront Lambda to automatically serve the best version:

```javascript
// This code runs at CloudFront edge locations
exports.handler = (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const acceptEncoding = request.headers['accept-encoding'];
    
    if (acceptEncoding && acceptEncoding[0]) {
        const encoding = acceptEncoding[0].value;
        
        // Serve Brotli if browser supports it
        if (encoding.includes('br')) {
            request.uri = request.uri + '.br';
        }
        // Otherwise serve Gzip if supported
        else if (encoding.includes('gzip')) {
            request.uri = request.uri + '.gz';
        }
        // If no compression support, serve original
    }
    
    callback(null, request);
};
```

### Benefits of Manual Compression
-  **Better compression**: Use highest compression levels
-  **Brotli support**: Full control over modern compression
-  **No CPU overhead**: Files pre-compressed, not compressed per request

### Drawbacks of Manual Compression  
-  **More storage space**: Need to store multiple versions
-  **Complex deployment**: Build process becomes more complicated
-  **Cache management**: Must clear cache for all file versions
-  **Manual work**: Need to manage compressed versions

# CloudFront ETag Handling with Compression
* For each build, an ETag is generated and mapped to the source file.  
  - This is a **strong ETag** (example: `"abc123"`).

* When CloudFront compresses the object, it add the weak ETag  
  to a **strong ETag** (example: `W/"abc123"`) and returns it to the client.  
  - CloudFront also caches the compressed content.

* On subsequent requests, the browser includes the weak ETag in the  
  `If-None-Match` header.  
  - If the object is unchanged, CloudFront/origin responds with  
    **`304 Not Modified`**.  
  - If the object has changed, CloudFront fetches and compresses  
    the new version, then updates the cache and ETag.
---

### Best Practice: Hybrid Approach
1. **Static assets**: Use manual pre-compression with Brotli + Gzip
2. **Dynamic content**: Use CloudFront auto-compression with Gzip
3. **Fallback**: Always have Gzip as backup for older browsers


Remember: The goal is faster websites. Start with automatic compression for immediate benefits, then consider manual compression for maximum performance gains.