/*//////////////////////////////////////////////////
// Priority Queue implementation in JavaScript    //
//////////////////////////////////////////////////*/

const PriorityQueueItem = function (item, priority) {
  this.item = item;
  this.priority = priority;
};

const PriorityQueue = function () {
  this.priority_queue = [];
};

PriorityQueue.prototype.enqueue = function(item, priority) {
  if (arguments[1] === undefined) {
    throw 'A priority value is required to enqueue an item';
  }
  let item_to_enqueue = new PriorityQueueItem(item, priority);
  let item_was_added = false;
  for (let i = 0; i < this.priority_queue.length; i++) {
    if (this.priority_queue[i]. priority > item_to_enqueue.priority) {
      this.priority_queue.splice(i, 0, item_to_enqueue);
      item_was_added = true;
      break;
    }
  }

  if (!item_was_added) {
    this.priority_queue.push(item_to_enqueue);
  }
}


PriorityQueue.prototype.dequeue = function() {
 if (!this.priority_queue.length) {
   return console.warn('The Priority Queue is empty.');
 }
 result = this.priority_queue.shift();
 return result.item;
}

PriorityQueue.prototype.peek = function() {
  return console.log(this.priority_queue[0].item);
}

PriorityQueue.prototype.front = function() {
  return this.priority_queue[0].item;
}

PriorityQueue.prototype.info = function() {
  console.log('Priority Queue Contents\nNote: Lower priority score is actually higer priority.\n\nBegining of Priority Queue')
  this.priority_queue.forEach((item, index) => {
    console.log(`Item: ${item.item}           Priority: ${item.priority}`)
  });
  console.log('End of Priority Queue');
}

