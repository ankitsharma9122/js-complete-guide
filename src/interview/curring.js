// Breaking a function that takes multiple arguments into a chain of functions that take one argument at a time.
function curry(fn) {
    return function curried(...args) {
  
      // If enough arguments collected → execute original function
      if (args.length >= fn.length) {
        return fn(...args);
      }
  
      // Otherwise, return a function to collect more arguments.
      return (...next) => curried(...args, ...next);
    };
}
  

function add(a, b, c, d, e, f, g, h) {
    return a + b + c + d + e + f + g + h;
  }
  
const addCurried = curry(add);

const result = addCurried(1)(2,2)(2,1)(1)(1,2,3);
console.log(result);

  
// You are repeatedly using the same value (10) as the first argument.
// add(10, 1);
// add(10, 5);
// add(10, 20);
// Currying solves it by fixing 10 once and letting you supply the remaining value later
