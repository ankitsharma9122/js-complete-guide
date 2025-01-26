
## *Rendring on basis of page Load*
## 1. Container/presentational pattern in React

1. Container Components: Focus on managing state, fetching data, and handling business logic.
2. Presentational Components: Focus solely on rendering UI based on the props they receive, making them reusable and stateless.

Basic component which we make without any custom hook and HOC or any further engineering on it.

## 2. HOC pattern in React
It is a function that takes a component as an argument and returns a new component with enhanced functionality or additional behavior.

![![HOC COMPONENT](<Screenshot 2025-01-26 at 9.32.42 AM.png>)](../../Public/HOC1.png)

Uses withFetchData and withstyle as another nested HOC. 

![!\[HOC2 \](<Screenshot 2025-01-26 at 9.32.06 AM.png>)](../../Public/HOC2.png)

**Pros :**
1. Same Logic can be re-used
2.  keep the logic separate from the UI.

**Cons :**
1. Multiple layer of nesting causes unwanted re-rending.
2. The component hierarchy becomes less clear when HOCs are overused.

## 3. useContext pattern in React
Pattern allows you to share values (like state, functions, or constants) across components without props drilling.

![![use Context](<Public/useContext.png>)](../../Public/useContext.png)


## *Rendring on basis of page Load*


## 1. SSR Pattern (Multi page application) 
Multi page application refers that every time you navigate on the web application, a new HTML page is generated on the server and is returned to the browser, where the browser parses the HTML and displays the content.

**Pros :**
1. SEO : good SEO as HTML generated on server itself.
2. More Scalable.
3. Fast initial load time .
4. More secure.

**Cons :**
1. SLOW : it is slower as on every navigation it loads 
HTML from server.


## 1. CSR Pattern (single page application) 
single page application as the term suggests, is composed of a single HTML file that is loaded only once along with all the static files such as CSS, JavaScript, and media assets and renders the application on the client side after loading the assets in the browser.

**Pros :**
1.Fast : As the static files are loaded only once on the initial render, and after that only required data is pulled from the server and UI is updated on runtime. Also the the .
2. Easily Exentiable code.

**Cons :**
1. SEO : its not seo friendly as it's single page application.
2. Navigation of multiple route handling more difficult as app grows.
3. secuirty CSSA concern <!--TODO-->
4. initial load time is larger.

**Note:**  
*If SEO is a concern than go for SSR otherwise CSR is good.*


## 3. SSG Pattern (Static Site Generation)
In the SSR, every time a request is made, the server generates a new HTML page, which is time and resource-consuming as re-computation would take place.This would remove the need for re-computation thus we can remove the dependency of the server itself and also be faster as we are just returning pre-generated things.

*Example: Next.js,Gatsby etc.*  

**Pros :**
1. It resolves both the problem with SEO(CSR) and load times issue(SSR).

**Cons :**
1. Applications with static content, such as blog sites, are typically designed to be static because a pre-rendered bundle is created during the build process.


## 4. ISR Pattern (Incremental Site Generation)
1. While SSG, boots the performance, it is not suitable for all the scenarios, especially when we want to have the partial dynamic content in the pages at the runtime,It allows to update the pre-generated static HTML pages incrementally.

*sites : E-commerce can be created*

*Example: Next.js*  

**Pros :**
1. it's solves the problem of SSR , CSR and SSG.

**Cons :**
1. it's not suggested for real time application, beacuse it will lead to the perfomace issue.
