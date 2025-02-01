## Different ways to host a web app FE



## 1. Static Site Hosting using CDN (SPA'S and hybrid).

1. All we need to define is an entry file (index.html) that will be opened when the URL will be accessed. We can take it to next level by adding a CDN (Content Delivery Network) on top of it to make it blazing fast by caching the files.

2. Hybrid : Incremental Static Regeneration (ISR) (in Next.js, Nuxt.js) pre-renders pages and updates them dynamically and CDNs cache pre-rendered pages, reducing server load.


Note : storage available over the cloud, Amazon’s S3 bucket, or Azures storage.

Advantages :  
 1. No server required.

 Disadvantages : 
 1. Routing problem – As the routing is done on the client-side through JavaScript and HTML5 History API, if we try to access any routes directly like https://example.com/route it will return 404. This route will be only rendered after the initial rendering of the index.html which is not yet done. 
 
 Solution : To solve this we can add a 404.html page and redirect it to the index.html page every time.

 2. SEO concern
 3. CORS issue as backend and frontend are hosted on two different domains.

 ## 2. Frontend as a part of the Backend app(SPA + Hybrid).

 1. Backend application will be any way hosted on the server, we can also copy the static files (build files) of SPA or Hybrid, within the backend and server the files.

 2. Backend and Frontend both are served on the same URL but on different routes which solve the CORs issue. backend on https://example.com/apis/* and frontend on https://example.com/.

3. For SPA'S : A 404 error will be thrown, similar to static site hosting, if you try to open any route directly. This can be resolved by redirecting the request to the base URL or index.html.

4. TODO #1 : how to host hybrid by this way [Reverse proxy concept].


**Conclusion :** As backend and frontend both are built with a Microservice approach keeping them separate can be a good use case in certain scenarios.


 ## 3. Serverless Hosting (SSR)

1. Deploy SSR apps on serverless platforms (e.g., Vercel, Netlify, AWS Lambda etc)
Requests trigger a serverless function that renders the page on demand.

## 4. Traditional Server Hosting (SSR)

1. Deploy SSR apps on a dedicated server or VPS (e.g., DigitalOcean, Linode, AWS EC2).
2. Use Node.js, Express etc.
3. Configure NGINX as a reverse proxy [TODO]




<!-- TODO ITEM : 
1. REVERSE PROXY AND PROXY SERVER 
2. HOW TO ACTUALLY HOST SSR AND HYBRID APPLICATION MEDIUM.
3. HOW TO CONFIGURE NGNIX IN CLIENT SIDE.
4.  how to host hybrid by FRONTEND AS A PART OF way [Reverse proxy concept]. -->





