# Chat UI System
A Chat UI system that uses NextJS for frontend and ExpressJS for backend

## Learning Purposes

### NextJS Project Structure
```public/``` folder
* folder to serve static assets
* Example: Images, SVG, etc

```app/``` folder
* All routes **MUST** be placed in this folder
* All routes **MUST** be named ```page.js``` or ```page.tsx```
* Folders correspond to path segments in the browser URL

### Routing using App Router
* Within the ```src/app/``` folder
* each "folder" corresponds to the "browser URL" in the browser
* Within each "folder", a file that is named ```page.js```, ```page.jsx``` or ```page.tsx``` will be used as the main file to render when the URL is visited
* Example: ```src/app/about/page.jsx``` will be rendered when the client visits ```www.{domain-name}/about``` in the browser
* Example 2: ```src/app/about/FooComponent.jsx``` will be used as a component as any other React Component

### Nested Routing using App Router
* Similar concept with normal Routing
* each "sub folder" also corresponds to the "browser URL" in the browser
* Within the "folder" that needs Nested Routing, create "sub folders" with their own ```page.js```, ```page.jsx``` or ```page.tsx``` files
* Example: ```src/app/blog/first/page.jsx``` will be rendered when the client visits ```www.{domain-name}/blog/first``` in the browser

### Dynamic Routing
* Similar concept with normal Routing, but folder name is to be surrounded by ```[]```
* ```src/app/products/page.jsx``` will be rendered when the client visits ```www.{domain-name}/products``` in the browser
* This page can be used to show a general products page
* Example: ```src/app/products/[productId]/page.jsx``` (note: notice the surrounding []) will be rendered dynamically when the client visits ```www.{domain-name}/products/{productId}``` in the browser
* eg: When the user visits ```www.{domain-name}/products/69``` in the browser, the component will receive a parameter of object arranged as
```
{
    params: {
        productId: {productId}
    }
}
```
* this parameter can be read by the component and rendered programmatically on the page based on how the developer uses it in the component
