const Queue = function() {
  const data = {};

  //Create start queue and end queue properties on the Queue object
  //These point to begining and end of line and ensure we maintain O(1) for enqueue and dequeue methods
  this.back_of_queue = 0;
  this.front_of_queue = 0;

  //Method enqueue: Adds an item to the end of the queue and updates the end of the queue.
  //                Returns the stack to allow method chaining.
  this.enqueue = item => {
    data[this.back_of_queue] = item;
    this.back_of_queue++;
    return this;
  }

  //Method dequeue: Removes the item at the front of the queue and updates the front of the line.
  //                Returns the item that was removed. 
  this.dequeue = item => {
    //Check if the queue is empty
    if (this.back_of_queue - this.front_of_queue === 0) {
      return "The queue is empty.";
    }
    //Store the item at the front before deleting it.
    let item_dequeued = data[this.front_of_queue];
    delete data[this.front_of_queue];

    //increment the front of the queue
    this.front_of_queue++;

    //give the user the stored item
    return item_dequeued;
  }

  //Method peek:    Creates a copy of the item at the front of the queue without removing it.
  //                Returns the copied item or a string notifying the user if empty.  
  this.peek = item => {
    //Check if the queue is empty
    if (this.back_of_queue - this.front_of_queue === 0) {
      return "The queue is empty.";
    }
    return data[this.front_of_queue];
  }

  //Method print:   Prints the current state of the queue to the console
  this.print = item => {
    //Check if the queue is empty
    if (this.back_of_queue - this.front_of_queue === 0) {
      console.log("The queue is empty.");
      return this;
    }
    let current = this.front_of_queue;
    while(current < this.back_of_queue) {
      console.log(data[current]);
      current++;
    }
    console.log("END OF QUEUE");
    return this;    
  };

  //Method toArray: Creates a copy of the Queue in its current state and returns it to the user
  this.toArray = item => {
    let queue_to_array = [];
    let current = this.front_of_queue;
    while(current < this.back_of_queue) {
      queue_to_array.push(data[current]);
      current++;
    }
    return queue_to_array;
  }




  

};

module.exports = Queue;