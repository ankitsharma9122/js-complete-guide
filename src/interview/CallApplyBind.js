const obj1 = {
    firstName: "Ankit",
    secondName: "Kumar",
  };
  
  const obj2 = {
    firstName: "Shivam",
    secondName: "Kumar",
  };
  
  function printFullDetails(state, city) {
    console.log(
      "My first name is " +
        this.firstName +
        " second name is " +
        this.secondName +
        " living in state " +
        state +
        " in city " +
        city
    );
  }
  
  // call → arguments passed one by one
  printFullDetails.call(obj1, "Jharkhand", "Ranchi");
  
  // apply → arguments passed as an array
  printFullDetails.apply(obj2, ["Jharkhand", "Ranchi"]);
  
  // bind → returns a new function
  const func = printFullDetails.bind(obj1, "Jharkhand", "Ranchi");
  func();
  