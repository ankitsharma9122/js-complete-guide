## How a Page served To Client

1. In each HTTP request that browser makes for an HTML page, the server returns the data into bytes, these **bytes are then converted to Characters, Tokens, Nodes, and finally DOM (Document Object Model)**.

2. Once the DOM is generated, the parsing of the page starts, the HTML contains CSS code or links, JavaScript code or links, media elements such as images, etc, each of them is then parsed separately and plugged together to create a render tree, which is then converted to the layout and then is painted on the screen.

**steps :**
1. Creation of DOM
2. Creation of CSSOM
3. Formation of Render tree
4. Layouting
5. Paint

## Different loading strategies to increase the website speed
<!-- TODO -->
<!-- https://learnersbucket.com/examples/interview/different-loading-strategies-to-increase-the-website-speed/ -->




