## Pure Function

A **pure function** is a function that, given the same input, always produces the same output. It has no side effects and does not modify any external state.

### Example :

````
function sum(a, b) {
  return a + b;
}

console.log(sum(2, 3)); // 5
console.log(sum(2, 3)); // 5
````
### Other Methods :
1. String.prototype.toUpperCase()
2. Maths.abs() etc .

### Impure Function
A **Impure functions** are functions whose output value may or may not change for the same arguments, it is not consistent.

```
var c = 0;
function sum(a, b){
  return a + b + c++;
}

console.log(sum(2, 3)); // 5
console.log(sum(2, 3)); // 6
```
### Other Methods :
1. Math.random()
2. Date.now() 
3. SetTimeOut etc .

### Pure Components
A **Pure Components** Pure Component will always render the same output for the same set of input data, ensuring no side effects during the render process.

```
import React from 'react';

class ItemList extends React.PureComponent {
  render() {
    const { items } = this.props;
    return (
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    );
  }
}

export default ItemList;

```

<!-- TODO with Deep copy compare -->
1.  React optimizes Pure Components by shallowly comparing the previous and current props. If there is no change in the props, React will skip re-rendering, thus improving performance.