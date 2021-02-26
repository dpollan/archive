/*////////////////////////////////////////////////
//                    Linked List               //
////////////////////////////////////////////////*/

/*

This is a basic JS implementation of a Linked List, where each list item is treated as a node that contains a data property to store the value and a next property that points to the next item in the list.  All items will have access to the head and when the pointer to next is undefined we know we are at the end of the linked list.

Linked List Methods

insert - adds a new node to the end of the linked list
insertAfter - finds an element in the linked list and places the item after it
insertHead - places the new node at the front of the linked list
find - finds a given element based on the value
remove - removes an element from the list based on the value
removeAfter - finds an element and removes the element after on the linked list
removeHead - removes the first element and makes the second element the new head
info - logs the linked list and all contents to the console


We will use two constructor calls here, one for the LinkedList itself and the other for each individual Node in the LinkedList.]

Note: this implementation works for values only meaning that Arrays and Objects will not be supported by all of the methods.  If you intend to store complex data structures inside the linked list I recommend looking into underscore.js or lowdash.js and implelemnting their more advanced search and comparison methods.  While you will be able to store references (Arrays and Objects) in the linked list, you will not be able to access them using the basic methods implemented here.  In the future I plan to add a LinkedList with support for references build in but for now be aware of this caviat. 

*/

const LinkedListNode = function(data) {
  this.data = data;
  this.next = undefined;

  //This represents a single record in the linked list.  It has a value and a next property.  The value is simply what the user entered and next is pointing to undefined.  If we create a record for 7 by calling saying ourNewRecord = new LinkedListNode(7) we are basically saying build a new LinkedListNode or record for our linked list and put the value 7 into its data store.  Then have its next point at undefined.  (Null is sometimes used as well in more traditional low level representations.)  So our Record looks something like this:

  //               +-------------+
  //               |             |
  //      _________^___     ____________  
  //     | data |  ^  |   .             .
  //     |   7  | next|   .  undefined  . 
  //     -------------    ---------------      
}

const LinkedList = function (data) {

  //Ensure that the user initialized the linked list with some data
  if (!arguments.length) {
    throw "You must provide a value when creating a new Linked List.  Linked List was not created";
  }

  let firstRecord = new LinkedListNode(data)
  this.head = firstRecord;
  this.tail = firstRecord;

  //Here we create the LinkedList, a collection of LinkedListNodes like the ones we build above.  We create a new record and make that the head or the starting point of the linked list.  We also make it the tail or last item in the linked list since there is only one record.  Basically where the LinkedListNode is a single record, the LinkedList itself is the entire series of connected records.
}

LinkedList.prototype.insert = function(data) {
  //Create the new record
  let newTail = new LinkedListNode(data);

  //If the LinkedList is empty, make this item the new head and tail of the linked list
  if (this.head === undefined) {
    this.head = newTail;
    this.tail = newTail;
  }

  //Set the old tail's next value (which was undefined) to the new record
  this.tail.next = newTail;

  //Set the LinkedList's tail property to the new record whose next property is undefined
  this.tail = newTail;

  //The insert method puts the new record on the end of the linked list.  This provides a very fast way to insert new items on a linked list because we simply change the next value and point the tail at the newly created record.   
}

LinkedList.prototype.insertAfter = function(targetNode, data) {
  let newRecord = new LinkedListNode(data); 
  let target = this.find(targetNode);
  if (target) {
    // If the targetNode is found in the LinkedList this will be truthy, so this code gets executed

    //First on the new LinkedListNode we created we set next to the found target's next.  
    newRecord.next = target.next;

    //Now we set the found targetNode's next to be the new LinkedListNode we just created.  The order here is important as we need to have the targetNode point at the LinkedListNode we just created.  If we set the target.next to the new record first, we no longer have a reference to the node following the target node which needs to become the new LinkedListNode's next property.
    target.next = newRecord;

    return `Record ${newRecord.data} added afer ${target.data}`;
  }
  // If the targetNode is not found in the linked list we need to let the user know the new record was not added
  console.warn(`Could not find ${targetNode} in the Linked List\n${data} was NOT added.`);

  //finally return false as the operation was not successfully completed. 
  return false;
}

LinkedList.prototype.insertHead = function(data) {
  //First create the new head record
  let newHead = new LinkedListNode(data);

  //Now set the next on the new record to the current head of the list
  newHead.next = this.head;

  //Finally set the head of the Linked List to the new record
  this.head = newHead;

  //Return the Linked List 
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
  //If we reach the end and nothing has been returned let the user know the value was not in the list
  console.warn(`Could not find ${data} in the Linked List`);
  return false;
}

LinkedList.prototype.remove = function (item_to_remove_from_list) {
  //First make sure the item is not the head
  if (this.head.value === item_to_remove_from_list) {
    this.head = this.head.next;
  }

  let currentNode = this.head;
  var beforeTarget = this.head;
  while (currentNode.next !== item_to_remove_from_list) {
    //check to see if we are at the end of the list
    if (currentNode.next === undefined) {
      return `Item ${item_to_remove_from_list} was not found in the Linked List`;
    }
    //check if next is the value we are looking for
    if (currentNode.next.data === item_to_remove_from_list) {
      //Once we set the node before the target to have a next value of target.next we are done
      //Nothing will be referencing the LinkedListNode anymore in the Linked List and JavaScript shoudl perform garbage collection and remove it in a few cycles. 
      currentNode.next = currentNode.next.next;
      return `Item ${item_to_remove_from_list} was removed from the Linked List`;
    }
    //If the last tow cases are not met, continue traversing the Linked List
    currentNode = currentNode.next;
  }
}

LinkedList.prototype.removeAfter = function(item_before_item_to_remove_from_list) {
  //This is very similar to remove, only in this case we continue iterating and instead of swapping the next values for the preceding item and the removed item, we go one step further down the linked list

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
      //If we are at the item before the one to remove, check if it is the tail and if not point the current node next at the following node or undefined if it is just before.
      if (currentNode.next === undefined) {
        return console.error(`The item ${item_before_item_to_remove_from_list} is already the tail of the list.  No item removed.`);
      }
      let item_to_remove = currentNode.next;
      currentNode.next = item_to_remove.next;
      //Again garbage collection should pick up and clean up the unreferenced node after a few cycles.
      return console.log(`Removed ${item_to_remove.data} from the list.`);
    }
    //if none of these occurred keep traversing the linked list until we hit the tail
    currentNode = currentNode.next;
  }
  //If we got to here, it means we have traversed the entire list and the item we are targeting is not in the list.
  return console.error(`The item ${item_before_item_to_remove_from_list} was not found in anywhere in the Linked List.  No item removed.`)
};

LinkedList.prototype.removeHead = function() {
  //First check edge cases where there is a head and if the linked list is only 1 item
  
  if (this.head === undefined) {
    return console.error('The Linked List is empty');
  }
  if (this.head.next === undefined) {
    return this.head = undefined;
  }
  
  //If the Linked List is not empty and there is more than one item, remove the head and make the second item in the linked list the new head.
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

