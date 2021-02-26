const LinkedList = function() {
  this.head = undefined;
  this.tail = undefined;

  function Node(data) {
    this.data = data;
    this.next = undefined;
  };

  this.insert = function (data) {
    if (!data) {
      console.error('You must provide the data to store in the linked list.');
      return false;
    }
    newNode = new Node(data);
    //If there is no existing head, make this the head and tail of the linked list
    if(!this.head) {
      this.head = newNode;
      this.tail = newNode;
    //Otherwise add it and make this the new tail
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  this.insertFront = function (data) {
    if (!data) {
      console.error('You must provide the data to store in the linked list.');
      return false;
    }
    newNode = new Node(data);
    //If there is no existing head, make this the head and tail of the linked list
    if(!this.head) {
      this.head = newNode;
      this.tail = newNode;
    //Otherwise make this the new head and have it's next property point at the old head
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  this.contains = function (value) {
    //Check if data is a reference or a value
    if (typeof value == 'object') {
      return "Sorry, the contains method only works for values such as numbers and strings.\nIt is unable to check for objects or arrays.";
    }
    //check the tail
    if (this.tail.data === value) {
      return true;
    }
    //Traverse the array and return true if you encounter the value
    var current = this.head;
    while (current.next !== undefined) {
      if (current.data === value) {
        return true;
      }
      current = current.next;
    }
    //If the while loop completes, we know we are at the tail and have not found the value
    return false;
  }

  this.findAndRemove = function (value) {
    //Check if the parameter is a reference or a value
    if (typeof value == 'object') {
      return false;
    }
    var current = this.head;
    //If head is the requested value, make the new head the second item in the list and delete the head.
    //As the former head is no longer referenced it will be removed at garbage cleanup
    if (current.data === value) {
      this.head = current.next;
      return current.data;      
    }
    //Traverse the list 
    while (current.next !== undefined) {
      //check if the next value is what we are looking for then move on
      if (current.next.data === value) {
        let target = current.next.data;
        current.next = current.next.next;
        return target;
      }
      return false;
    }
  }
  this.removeTail = function() {
    //check if the list is empty or has only one item.
    if (!this.head) {
      return 'The Linked List is empty.';
    }
    if (this.head.next === undefined){
      let target = this.head;
      this.head = undefined;
      return target;
    }
    //Traverse the list and find the node that comes just prior to the tail and replace it
    var current = this.head;
    while(current.next !== undefined){
      if (current.next.next == undefined) {
        let target = current.next.data;
        current.next = undefined;
        this.tail = current;
        return target;
      }
      current = current.next;
    };
  }
  this.removeHead = function() {
    //check if the list is empty
    if (!this.head) {
      return 'The Linked List is empty.';
    }
    //Set the head to undefined and return the value if the list has only one item
    if (this.head.next === undefined){
      let target = this.head;
      this.head = undefined;
      return target;
    }
    //Set the head to the next item in the list and remove the head if there are multiple items
    let target = this.head.data;
    this.head = this.head.next;
    //garbage collection should remove the previous head
    return target;
    }
}


module.exports = LinkedList;