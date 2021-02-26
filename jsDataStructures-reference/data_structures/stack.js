const Stack = function () {
  
  //create data storage for the stack
  const data = [];

  //Method push:    Adds an item to the top of the stack.
  //                Returns the stack to allow method chaining.
  this.push = item => {
    data.push(item);
    return this;
  }

  //method pop:    Removes the top item from the stack if the stack is not empty
  this.pop = item => {

    //check to make sure the stack is not empty
    if (!data.length) {
      return "The stack is empty.";
    }

    //Remove the top item and give it to the user.
    return data.pop();
  }

  //Method peek: Displays the top item in the stack without removing it
  this.peek = item => {
    //Inform the user if the stack is empty
    if (!data.length) {
      return "The stack is empty.";
    }
    //Give the user a copy of the contents of the top element in the stack without removing it.  
    return data[data.length - 1];
  }

  //Method print:   Prints each item in the stack
  this.print = () => {
    if (!data.length) {
      console.log("The stack is empty.");
    }
    data.forEach((item) => {
      console.log(item);
    });
  }

  //Method toArray: Creates a copy of the stack as an array and gives it to the user.
  this.toArray = () => {
    return data.slice();
  }
}

module.exports = Stack;