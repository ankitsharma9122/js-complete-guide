// "use strict"

// if any time value of this keyword is undefined or null then 
// this keywords will be replaced with global object 
// only in non strict mode.

// this with global space 
console.log("this ",this); // Global object : for browser -> window obj


//  this inside function
function a(){
    // value depend on strict mode and non strict mode 
    // if strict then value of this = undefined
    // if non strict mode then then this = window object 
    console.log("within Function",this);
}
a();
// window.x() in strict mode ==> window obj (so value of this is depends on how it get called)

// Function within object is called as method 
// value of this within method 

const obj={
    a:10,
    x:function(){
        console.log(this); // refer to obj 
    }
}
obj.x();

// this within in arrow function
// arrow with this is not binding with anything (this value reatains the value of enclosing lexical context).
const obj1 = {
    a: 10,
    x: () => {
      console.log(this);
    }
};
  
obj1.x();

// here this refer to window object as lexical scope of this this obj1 , where this refer to window 
  
const obj2 = {
    a: 10,
    x: function () {
      const y = () => {
        console.log("this value:", this);
      };
      y();
    }
};

obj2.x();
  
// this refers to obj2 because the lexical scope of y is function x, and inside x, this refers to obj2.