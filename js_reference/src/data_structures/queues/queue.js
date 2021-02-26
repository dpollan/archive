/*////////////////////////////////////////////////
//          Queue implemented using an Array    //
////////////////////////////////////////////////*/

const Queue = function(maxSize) {

  if (maxSize) {
    this.maxSize = maxSize;
  }
    this.queue = [];
}

Queue.prototype.enqueue = function(item_to_go_to_back_of_queue) {

  if (this.maxSize < this.queue.length + 1) {
    throw "Queue Overflow";
  }
  this.queue.unshift(item_to_go_to_back_of_queue);
}

Queue.prototype.dequeue = function() {

  if (this.isEmpty()) {
    throw "Queue Underflow";
  }
  var removed_item = this.queue.pop(); 
  return removed_item;

}

Queue.prototype.peek = function() {
  var front_of_queue = this.queue[this.queue.length - 1];
  console.log(front_of_queue);
}

Queue.prototype.length = function() {
  return this.queue.length;
}

Queue.prototype.isEmpty = function() {
  return this.queue.length ? false : true;
}

Queue.prototype.info = function() {
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