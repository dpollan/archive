/*///////////////////////////////////////
//  Stack implemented using an Array   //
/////////////////////////////////////////

This is the most basic JS implementation of a stack, a common Last In First Out data structure where we can only access the top item in the collection.  

Stack Methods:

push - Adds an item to the top of the stack
pop - Removes the top item from the stack
peek - Returns a copy of the top item in the stack without removing it
length - Returns the size of the stack, a freebie when using JS Arrays
isEmpty - Returns true if there are no items in the stack   */

const Stack = function(maxSize) {
  //  ^^^^^  We use capital S in Stack because this is a constructor call 
  // When we call this function we are saying "Build a new Stack"
  // Later when we reference "stack" with a lowercase S we are talking about the specific instance of the stack built by this function.

  //Limit the size of the stack if the user passes in a maxSize parameter, otherwise ignore
  if (maxSize) {
    this.maxSize = maxSize;
  }

  //Array containing our stack
  this.stack = [];
}

//When adding methods to our constructor, use "{Constructor}.prototype.{method} = Your_Function where {Constructor} is the name of the thing we are building with a Capital letter by convention and {method} is the name of the function we are making.

//As a side-note when creating Prototype methods:  While you may be more comfortable using ES6 arrow functions when creating functions such as "() => what_gets_returned" I highly recommend using the conventional "function" keyword here.  If you use the "function" keyword you can use the "this" parameter and it will always reference the object built by the constructor (in this case the Stack) when we need to use it. Arrow functions typically misbehave when we try to use this parameter in them.  

Stack.prototype.push = function(item_to_add_to_top) {

  //Check to see if there are already too many items on the stack
  if ( this.maxSize < this.stack.length + 1) {
    //If adding one more element will push the size of the stack above the maxSize value entered, we will throw an error letting the user know there is a Stack Overflow meaining we have tried to add an item where there is no more room and the item did not get added. 
    throw "Stack Overflow";  
  }

  this.stack.push(item_to_add_to_top);
  //   ^^^^^ lowercase stack means we are using the array we created when we "built" the stack object using the constructor.  In this case we are adding "item_to_add_to_top" to the top of the tower.  For example you might think of a stack array [3,9,4,5] as looking like this:

  //  |5| <-- Top of tower
  //  |4|
  //  |9|
  //  |3| <-- Bottom of tower

  // If we call ourStack.push(7) here we are taking the value |7| and putting it on top of the stack or tower.  While our array becomes [3,9,4,5,7] it now looks like this

  //  |7| <-- just got added
  //  |5|
  //  |4| 
  //  |9|
  //  |3| <-- still on bottom

  // You may be wondering "If we can just use the built in Array method that comes with JS, why bother to learn how to make a stack, isn't this just extra work???"  

  // It may be a little extra work, but by doing it this way we are defining what methods can be called on our stack and compartmentalizing it to its own private container.  If someone tries to call a traditional array method that would mutate (fancy word for change) the values in our stack it will throw an error and not let us.  For example:  calling the method ourStack.shift() will break because we have not defined a shift method for the Stack.prototype.  If you are intertested in learning more about prototypal inheritance check out the You Don't Know JS series by Kyle Simpson here: 
  // https://github.com/getify/You-Dont-Know-JS
  // He gives a really detailed explaination of what is going on
  
  return this.length(); // Returns the total size of the stack
}



Stack.prototype.pop = function() {

  //Here we are doing the exact oposite.  We are pulling the top item of the stack and giving it to the user.

  //first we need to make sure the stack is not empty.  We will use the method isEmpty below.
  if (this.isEmpty()) {
    // if there is nothing on the stack and we try to pull something off the top we need to let the user know there was an error and we could not complete it. 
    throw "Stack Underflow";
  }

  let removed_item = this.stack.pop();  // <-- pop mutates (changes) the original array

  //So returning to our previous example [3,9,4,5,7] looks like this:
  //  |7| <-- top of tower
  //  |5|
  //  |4| 
  //  |9|
  //  |3| <-- bottom of tower

  //When we say ourStack.pop() We create a removed_item variable. Next we pull the item on top of the tower off and store it in the removed_item variable. So now ourStack is actually this [3,9,4,5] and the tower looks like this:
  
  //  |5| <-- new top of the tower            removed_item variable --> |7|
  //  |4|
  //  |9|
  //  |3| <-- still bottom of tower

  // This is basically like pulling the top card off of a deck.  Finally we need to return the removed item value.

  return removed_item;
}

Stack.prototype.peek = function() {
  
  //The peek method just looks at the top of our stack.  Think of it as looking at the top card in a deck but not actually removing it.  We get the top by taking the length or total number of items in the entire array (which should be 1 higher because of zero index) and subtracting 1 from it. 

  let top_of_stack = this.stack[this.stack.length - 1];

  // We don't want to actually manipulate the value on top of the stack, we just want to look at it.  As such, we will console.log(top_of_stack).  If you need to use the data from the top_of_stack without removing it, return top_of_stack.  Since we didn't mutate the original, we can use it, just remember if the stack contains an object or array changing the top of stack that gets returned will also change the value that is stored inside the stack.

  return console.log(top_of_stack);
  
  // return top_of_stack;  //<-- comment out the first return statement and uncomment this line if you need to get copy a copy of the top item in the stack.

}

Stack.prototype.length = function() {

  //As mentioned earlier, the built in array methods will not work on our stack.  One method we may want is to be able to look at the length (or more appropriately the height) of our stack. One thing to note is that we will need to call the length function by invoking ourStack.length() unlike with built in array.  Entering ourStack.length will give us 'undefined' whereas entering ourStack.length() will give us 4 in the example above.
  
  return this.stack.length;
  
}

Stack.prototype.isEmpty = function() {
  
  //Sometimes we need to check if the stack has any values left in it.  This method is used to make sure there is an item to pull off the top in the pop function when we defined it earlier. First we need to check if there is any items in the stack and return false if there are and true if there are not.
  
  if (this.stack.lenght > 0) {
    return false;
  }

  // if the stack was empty, we've already returned false, so now we can just return true
  return true;

  //a less verbose way to achieve the same in 1 line of code using ternary operator
  // return this.stack.length ? false : true;

}

Stack.prototype.info = function() {

  //I always try to add an info function that displays the entirity of the data structure for debugging.  Here we just iterate through the entire stack and print both the index and the value stored in it.

  this.stack.forEach(function (item, index) {
    console.log(`Item ${index + 1}:   ${item}`);
  })

  //if working with objects and arrays nested in the stack, we will get [Object, Object] for item.  If you need a higher level of detail when debugging, try using the map method and return the array it generates.

  /*let result = this.stack.map(function (item) {
    return item;
  }); return result;*/

  return true;  
}

