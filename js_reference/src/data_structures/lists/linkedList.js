/*////////////////////////////////////////////////
//                    Linked List               //
////////////////////////////////////////////////*/

const LinkedListNode = function(data) {
  this.data = data;
  this.next = undefined;
}

const LinkedList = function (data) {

  if (!arguments.length) {
    throw "You must provide a value when creating a new Linked List.  Linked List was not created";
  }

  let firstRecord = new LinkedListNode(data)
  this.head = firstRecord;
  this.tail = firstRecord;

}

LinkedList.prototype.insert = function(data) {

  let newTail = new LinkedListNode(data);

  if (this.head === undefined) {
    this.head = newTail;
    this.tail = newTail;
  }

  this.tail.next = newTail;
  this.tail = newTail;

}

LinkedList.prototype.insertAfter = function(targetNode, data) {
  let newRecord = new LinkedListNode(data); 
  let target = this.find(targetNode);
  if (target) {
    newRecord.next = target.next;
    target.next = newRecord;
    return `Record ${newRecord.data} added afer ${target.data}`;
  }
  console.warn(`Could not find ${targetNode} in the Linked List\n${data} was NOT added.`);
  return false;
}

LinkedList.prototype.insertHead = function(data) {
  let newHead = new LinkedListNode(data);
  newHead.next = this.head;
  this.head = newHead;
  return this;
}

LinkedList.prototype.find = function(data) {
  let currentNode = this.head;
  while (currentNode) {
    if (currentNode.data === data) {
      return currentNode;
    }
    currentNode = currentNode.next;
  }
  console.warn(`Could not find ${data} in the Linked List`);
  return false;
}

LinkedList.prototype.remove = function (item_to_remove_from_list) {
  if (this.head.value === item_to_remove_from_list) {
    this.head = this.head.next;
  }

  let currentNode = this.head;
  while (currentNode.next !== item_to_remove_from_list) {
    if (currentNode.next === undefined) {
      return `Item ${item_to_remove_from_list} was not found in the Linked List`;
    }
    if (currentNode.next.data === item_to_remove_from_list) {
      currentNode.next = currentNode.next.next;
      return `Item ${item_to_remove_from_list} was removed from the Linked List`;
    }
    currentNode = currentNode.next;
  }
}

LinkedList.prototype.removeAfter = function(item_before_item_to_remove_from_list) {

  if (this.head.value === item_before_item_to_remove_from_list) {
    //We need to handle the edge case where there is only 1 item in the list
    if (this.head.next === undefined) {
      return console.error(`There are no items in the list after ${item_before_item_to_remove_from_list}.  No item removed`)
    }
    //otherwise if the head is the item we first hit, just remove the second item by pointing the head next property to the third item in the list or undefined if there are only two.
    return this.head.next = this.head.next.next;
  }
  
  let currentNode = this.head;
  while (currentNode) {
    if (currentNode.data === item_before_item_to_remove_from_list) {
      if (currentNode.next === undefined) {
        return console.error(`The item ${item_before_item_to_remove_from_list} is already the tail of the list.  No item removed.`);
      }
      let item_to_remove = currentNode.next;
      currentNode.next = item_to_remove.next;
      return console.log(`Removed ${item_to_remove.data} from the list.`);
    }
    currentNode = currentNode.next;
  }
  return console.error(`The item ${item_before_item_to_remove_from_list} was not found in anywhere in the Linked List.  No item removed.`)
};

LinkedList.prototype.removeHead = function() {

  if (this.head === undefined) {
    return console.error('The Linked List is empty');
  }
  if (this.head.next === undefined) {
    return this.head = undefined;
  }
  
  let original_head = this.head.data; 
  this.head = this.head.next;
  let new_head = this.head.data;
  return console.log(`Previous head of linked list was ${original_head}.  It has been removed and the new head is ${new_head}`);
}

LinkedList.prototype.info = function() {
  let currentNode = this.head;
  while (currentNode) {
    console.log(currentNode.data);
    currentNode = currentNode.next;
  }
  console.log('End of Linked List');
}

