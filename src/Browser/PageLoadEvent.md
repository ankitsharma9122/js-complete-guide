### **Browser Event triggering Table during render**

```
| Event              | Triggered When?                                         | Can Be Listened To?         
|--------------------|---------------------------------------------------------|----------------------        
| `requestStart`     | Browser starts requesting the document                  |  No 
| `responseStart`    | First byte of response received                         | No  
| `domLoading`       | Browser starts parsing HTML                             | No  
| `domInteractive`   | HTML fully parsed, but images/styles may still load     | Yes (`performance.timing`)   
| `DOMContentLoaded` | HTML fully parsed, scripts loaded, but images may load  | Yes 
| `domComplete`      | Everything (DOM + styles + images) is fully loaded      | Yes (`document.readyState`)  
| `load` (`onload`)  | Page fully loaded (including all images)                | Yes 
| `beforeunload`     | User is about to leave the page                         | Yes (used for confirmations) 
| `unload`           | Page is being closed or navigated away                  | Yes 
```
