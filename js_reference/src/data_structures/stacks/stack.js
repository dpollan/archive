/*///////////////////////////////////////
//  Stack implemented using an Array   //
///////////////////////////////////////*/

const Stack = function(maxSize) {
  if (maxSize) {
    this.maxSize = maxSize;
  }
  this.stack = [];
}

// Methods //

Stack.prototype.push = function(item_to_add_to_top) {
  if ( this.maxSize < this.stack.length + 1) { 
    throw "Stack Overflow";  
  }
  this.stack.push(item_to_add_to_top);
  return this.length();
}

Stack.prototype.pop = function() {
  if (this.isEmpty()) {
    throw "Stack Underflow";
  }
  let removed_item = this.stack.pop();
  return removed_item;
}

Stack.prototype.peek = function() {
  let top_of_stack = this.stack[this.stack.length - 1];
  return top_of_stack;
}

Stack.prototype.length = function() {
  return this.stack.length;
}

Stack.prototype.isEmpty = function() {
  return this.stack.length ? false : true;
}

Stack.prototype.info = function() {
  return console.log(this.stack.map(item => item));
}

