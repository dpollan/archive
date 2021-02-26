/*////////////////////////////////////////////////
//          Queue implemented using an Array    //
////////////////////////////////////////////////*/

/*

This is the most basic JS implementation of a queue, a common First In First Out data structure where the first item entered gets removed first and the last item entered must 
wait for all items in front of it to be removed before getting accessed.  Queues are useful in situations where you need to allow requests to be made and each request to be completed in the order in which it was recieved.  Queues are excellent data structures for things like lobbys in video game matchmaking or in algorithms where we need to process each branch in a specific order before going on to the next task


Queue Methods:

enqueue - Adds an item to the back of the queue
dequeue - Removes the item at the front of the line
peek - Returns a copy of the item at the front of the line without removing it
length - Returns the number of items in the queue
isEmpty - Returns true if the queue is empty   */

const Queue = function(maxSize) {
  //  ^^^^^  We use capital Q in Queue because this is a constructor call 
  // When we call this function we are saying "Build a new Queue"
  // Later when we reference "queue" with a lowercase S we are talking about the specific queue created by the constructor

  //Limit the size of the queue if the user passes in a maxSize parameter, otherwise ignore
  if (maxSize) {
    this.maxSize = maxSize;
  }
    this.queue = [];
}

//When adding methods to our constructor, use "{Constructor}.prototype.{method} = Your_Function where {Constructor} is the name of the thing we are building with a Capital letter by convention and {method} is the name of the function we are making.

//As a side-note when creating Prototype methods:  While you may be more comfortable using ES6 arrow functions when creating functions such as "() => what_gets_returned" I highly recommend using the conventional "function" keyword here.  If you use the "function" keyword you can use the "this" parameter and it will always reference the object built by the constructor (in this case the Queue) when we need to use it. Arrow functions typically misbehave when we try to use this parameter in them.  

Queue.prototype.enqueue = function(item_to_go_to_back_of_queue) {
  //first check if adding the item will go over the limit set by the user
  if (this.maxSize < this.queue.length + 1) {
     //If adding one more element will push the size of the queue above the maxSize value entered, we will throw an error letting the user know there is a queue Overflow meaining we have tried to add an item where there is no more room and the item did not get added.
    throw "Queue Overflow";
  }
  this.queue.unshift(item_to_go_to_back_of_queue);
  //   ^^^^^ lowercase queue means we are using the array we created when we "built" the queue object using the constructor.  In this case we are adding "item_to_go_to_back_of_queue" to the back of the line.  For example you might think of a queue array [3,9,4,5] as looking like this:
  
  // Back of line -->  | 3 | 9 | 4 | 5 |  <-------front of line
  //                     ^           ^  
  //                    last       first

  // if we call ourQueue.enqueue(7), it will put 7 at the end of the line so while now the queue array looks like this [7,3,9,4,5] our line looks like this

  // New back of Line -->  | 7 | 3 | 9 | 4 | 5 | <--------- Still front of line
  //                        ^^^              ^ 
  //                     new last           first

  // Note: we could have done this backwards and made the last item in the array the back of the line and used push for the enqueue method but then we would have to use shift for dequeuing meaning either way we are going to face inneficiency on one of the two operations as we will need to move everything in the array back.
}

Queue.prototype.dequeue = function() {
  //Check if the queue is empty
  if (this.isEmpty()) {
    throw "Queue Underflow";
  }
  //remove the item at the front of the queue and return it to the user
  var removed_item = this.queue.pop(); // <--- this mutates the array

  //So returning to our previous example [7,3,9,4,5] looks like this:
  //   Back of Queue ----->  | 7 | 3 | 9 | 4 | 5 |   <-----  Front of Queue
  //                           ^               ^           
  //                          Back           Front - to be removed

  //When we say ourQueue.dequeue() We create a removed_item variable. Next we remove the item at the front of the queue and store it in the removed_item variable. So now ourQueue is actually this [7,3,9,4] and the line looks like this:

  //  Still back of line ---> | 7 | 3 | 9 | 4 |  <--- new front of line
  //  removed item --> | 5 |

  // This is like waiting in a line for a ride, the people behind you have to wait for you and everyone else in front of them to go first and anyone behind them has to wait even loner.  Finally we return the removed item.

  return removed_item;

}

Queue.prototype.peek = function() {
    
  //The peek method just looks at the front of our queue.  Think of it as checking who is at the front of the line without actually letting them pass and thus not removing them from the line.  We get the front by taking the length or total number of items in the entire array (which should be 1 higher because of zero index) and subtracting 1 from it. 

  //Note that if we use Push for enqueue and shift for dequeue we will need to look at the first element in the array instead.
  var front_of_queue = this.queue[this.queue.length - 1];
  console.log(this.queue[this.queue.length - 1]);

  //If we don't mind manipulating the value at the front of the line or need the value later in the program we can return the value instead of just logging it to the console. Just remember that if the value is an Array or Object changing it will also change the result in the queue. 

    // return front_of_queue;  //<-- comment out the first return statement and uncomment this line if you need to get copy a copy of the first item in the queue.
}

Queue.prototype.length = function() {

  //The built in array methods will not work on our Queue object created by the constructor.  One method we may want is to be able to look at the number of items in our line. One thing to note is that we will need to call the length function by invoking ourStack.length() unlike with built in array.  Entering ourQueue.length will give us 'undefined' whereas entering ourQueue.length() will give us 4 in the example above.

  return this.queue.length;
}

Queue.prototype.isEmpty = function() {

  //Sometimes we need to check if the queue has any items in it.  This method is used to make sure there is an item and that the line is not empty. First we need to check if there is any items in the queue and return false if there are and true if there are not.

  if (this.queue.lenght > 0) {
    return false;
  }

  // if the queue was empty, we've already returned false, so now we can just return true
  return true;

  //a less verbose way to achieve the same in 1 line of code using ternary operator
  // return this.queue.length ? false : true;

}

Queue.prototype.info = function() {
  //For debugging and visibility I added a info function to display all the values stored in the queue in order.

  return this.queue.forEach(function(item,index,collection) {
    if (index === 0) {
      console.log(`Back of Queue  : ${item}`);
    }
    if (index === collection.length - 1) {
      console.log(`Front of Queue : ${item}`);
    }
    if (index > 0 && index !== collection.length - 1){
      console.log(`                 ${item}`); 
    }
  });
}