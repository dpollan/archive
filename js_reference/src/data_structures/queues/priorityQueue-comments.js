/*//////////////////////////////////////////////////
// Priority Queue implementation in JavaScript    //
//////////////////////////////////////////////////*/


//The priority queue is a queue which takes priority into account when pulling items.  So for instance instead of a standard line where everyone waits for their turn think of a priority queue as a line where the most important things happen first.  For instance imagine you are taking a trip to Hawaii and think about boarding an airplane.  First they call all passengers needing special assistance, then once all those passngers are loaded they call all first class ticketholders.  They proceed to call boarding groups after that until the plane is full and the line is empty.  In this example you could think of the passengers needing special assistance as the highest priority, the first class passengers as the second highest priority and then the next boarding group would be third highest and the following boarding group the next highest and so on.  One way we can do this is to create a PriorityQueueItem constructor which will hold both the data for the item as well as a priority for the item and put them into a Priority Queue based upon the priority.


const PriorityQueueItem = function (item, priority) {
  //Here we simply take an item to put in the line and give it a priority
  this.item = item;
  this.priority = priority;
};

const PriorityQueue = function () {
  //This is the Priority queue itself.  We will create an array just like we did for regular queues but this one will only hold priority queue items
  this.priority_queue = [];
};

PriorityQueue.prototype.enqueue = function(item, priority) {
  //First lets handle a situation where the user forgot to give us priority for the item. Notice we check arguments 1 for undefined.  We are seeing if the user passed an arguement rather than checking if it is falsy because they may use zero as a priority.
  if (arguments[1] === undefined) {
    //We can either yell at them and not do anything like below
    //return console.error(`You must set a priority for the item when using a priority queue.  Item ${item} was not added to the Priority Queue.`);

    //We could also set a default priority and use that instead.  In our case the higher the number the lower the priority.  So in the airline example passengers needing assistance woudl be priority zero and passengers with first class would be priority 1.   We will say 50 is the default priority if the user forgot
    priority = 50;
  }

  //Now based on the item the user passed we will create a new priority queue item that wraps the value they passed to us.
  let item_to_enqueue = new PriorityQueueItem(item, priority);

  //now we create a boolean to track wether or not this item has been added.
  let item_was_added = false;

  //now we use an ordinary for loop to proceed until it finds an item that is a lower priority (higher number) than itself.  Once it does we use slice to put it into the priority_queue.  Also note that we use greater than instead of greater than or equal to, this keeps it a FIFO (first in first out) data structure where it pulls the first one in if priority is a tie
  for (let i = 0; i < this.priority_queue.length; i++) {

    if (this.priority_queue[i]. priority > item_to_enqueue.priority) {

      //as soon as we find an item that is lower priority (Remember that is a higher number) we use splice
      //splice will go to the index provided as the first parameter, remove the number of items provided by the second parameter, in our case zero.
      //finally the third parameter is the item we want to putinto the array.
      this.priority_queue.splice(i, 0, item_to_enqueue);

      //since we have added the item we will update the tracker boolean
      item_was_added = true;
      
      //we also must break out of the loop after we've enqueued the item in the proper place
      break;
    }
  }

  //If we went through the entire loop and never saw a lower priority item, we will add the item to the very end of the line
  if (!item_was_added) {
    this.priority_queue.push(item_to_enqueue);
  }
}


PriorityQueue.prototype.dequeue = function() {
  //The dequeue method always dequeues the highest priority item (the one with the lowest number) and since we added them in order of priority, it will always be the first item
 if (!this.priority_queue.length) {
   //first we check if the priority queue is empty
   return console.warn('The Priority Queue is empty.');
 }
 result = this.priority_queue.shift();
 //the shift command removes the first item from the priority queue but that item is a PriorityQueueItem and not the value stored in it.  Since the user will likely just want the item, we first must put it into the result variable.  Then we return the item property from the result variable.
 return result.item;
}

PriorityQueue.prototype.peek = function() {
  //Peek simply logs the first item in the Priority Queue to the console
  return console.log(this.priority_queue[0].item);
}

PriorityQueue.prototype.front = function() {
  //Front returns the first element in the Priority Queue without removing it
  return this.priority_queue[0].item;
}

PriorityQueue.prototype.info = function() {
  //Info will display all items in the priority queue
  console.log('Priority Queue Contents\nNote: Lower priority score is actually higer priority.\n\nBegining of Priority Queue')
  this.priority_queue.forEach((item, index) => {
    console.log(`Item: ${item.item}           Priority: ${item.priority}`)
  });
  console.log('End of Priority Queue');
}

