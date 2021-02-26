//var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var should = chai.should();
var assert = chai.assert;
var stdout = require('test-console').stdout;
var Stack = require('../data_structures/stack.js');
var Queue = require('../data_structures/queue.js');
var LinkedList = require('../data_structures/linkedList.js');
//var Tree = require('../data_structures/tree.js')

//TODO: Add beforeEach hooks instead of IFEEs to initialize tests
var testStack = (() => {
  var testStack = new Stack();
  testStack.push('Charlie').push('Dennis').push('Dee').push('Mac');
  return testStack;
})();

//Stack Test

describe('Stack Tests', () => {
  describe('All Stack methods work properly', () => {
    it('Users can use push method to add items to top of the stack', () => {
      testStack.push('Frank');
      expect(testStack.peek()).to.equal("Frank");
      expect(testStack.peek()).to.not.equal("Mac");
    });
    it('Users can use the pop method to remove the top item on the stack', () => {
      var testRemove = testStack.pop();
      testRemove.should.equal("Frank");
      //assert.equal(testRemove, "Frank");
      testStack.peek().should.not.equal("Frank");
      expect(testStack.peek()).to.equal("Mac");
    });
    it('Users can use the peek method to aquire a copy of the top element', () => {
      var testPeek = testStack.peek();
      expect(testPeek).to.equal("Mac");
      expect(testStack.peek()).to.not.equal("Dee");
    });
    it('Users cannot mutate the original stack by changing the copy aquired from the peek method', () => {
      var testPeek = testStack.peek();
      testPeek = "The Night Man";
      expect(testPeek).to.equal("The Night Man");
      testStack.peek().should.not.equal("The Night Man");
      testStack.peek().should.be.equal("Mac");
    });
    it('Users can use the print method to print out the entire stack', () => {
      let output = stdout.inspectSync(testStack.print);
      output[0].should.be.equal("Charlie\n");
      output[1].should.be.equal("Dennis\n");
      output[2].should.be.equal("Dee\n");
      output[3].should.be.equal("Mac\n");
      expect(output[4]).to.not.exist;
    });
    it('The print method tells the user if the stack is empty', () => {
      //empty the stack
      testStack.pop();testStack.pop();testStack.pop();testStack.pop();
      let output = stdout.inspectSync(testStack.print);
      assert.equal(output, "The stack is empty.\n");
    });
    it('The user can use the toArray method to obtain a copy of the stack in it\'s current state', () => {
      let testEmpty = testStack.toArray();
      expect(testEmpty).to.be.an("array");
      expect(testEmpty.length).to.equal(0);
      //populate stack
      testStack.push('Charlie').push('Dennis').push('Dee').push('Mac').push('Frank');
      let testArray = testStack.toArray();

      testArray[0].should.be.equal("Charlie");
      testArray[2].should.be.equal("Dee");
      testArray[3].should.not.be.equal("Charlie");
      testArray.length.should.equal(5);
      testArray[4].should.be.equal("Frank");
    })
    it('The user does not mutate the original array when using toArray method', () => {
      let testArray = testStack.toArray();
      testArray[1] = "The Day Man";
      testArray[3] = "The Night Man";
      let output = stdout.inspectSync(testStack.print);
      expect(output[1]).to.equal("Dennis\n");
      expect(output[3]).to.equal("Mac\n");
    })
  });
});

//TODO: Add beforeEach hooks instead of IFEEs to initialize tests
var testQueue = (() => {
  var testQueue = new Queue();
  return testQueue;
})();

//Queue Tests

describe('Queues tests', () => {
  describe('All Queue methods work properly', () => {
    it('Users can use the enqueue method to add items to the front of the queue', () => {
      testQueue.enqueue('Charlie').enqueue('Mac').enqueue('Dee').enqueue('Dennis');
      expect(testQueue.peek()).to.equal("Charlie");
    });
    it('Users can use the peek method to get a copy of the first item in the queue', () => {
      expect(testQueue.peek()).to.equal("Charlie");
    })
    it('Users cannot mutate the queue by changing the value returned by peek', () => {
      let peekTest = testQueue.peek();
      expect(peekTest).to.equal("Charlie");
      peekTest = "SuperCharlie";
      expect(testQueue.peek()).to.equal("Charlie");
      expect(testQueue.peek()).to.not.equal("SuperCharlie");
    });
    it('Users can use the dequeue method to remove the first element in the queue', () => {
      let testDequeue = testQueue.dequeue();
      testDequeue.should.equal("Charlie");
      testQueue.peek().should.not.equal("Charlie");
      testQueue.peek().should.equal("Mac");
    });
    it('The dequeue method tells the user if the queue is empty', () => {
      let emptyQueue = new Queue();
      emptyQueue.dequeue().should.equal("The queue is empty.");
    });
    it('Users can use the print method to print the entire queue', () => {
      let output = stdout.inspectSync(testQueue.print);
      expect(output[0]).to.equal( "Mac\n");
      expect(output[1]).to.equal( "Dee\n");
      expect(output[2]).to.equal( "Dennis\n");
      expect(output[3]).to.equal( "END OF QUEUE\n");
    }); 
    it('Users can use the toArray method to aquire a copy of the queue as an array', () => {
      let testArray = testQueue.toArray();
      testArray.should.be.a("array");
      expect(testArray[0]).to.equal("Mac")
      testArray[0] = "The Night Man";
      expect(testQueue.peek()).to.equal("Mac");
      expect(testQueue.peek()).to.not.equal("The Night Man");
      testArray.pop();
      expect(testQueue.peek()).to.equal("Mac");
    });
  });
});

  //TODO: Add beforeEach hooks instead of IFEEs to initialize tests
var testLL = (() => {
  var testLL = new LinkedList();
  return testLL;
})();

//Linked List tests

describe('Linked Lists tests', () => {
  describe('All Linked List methods function as expected', () => {
    it('Users can add items to the linked list using the insert method', () => {
      testLL.insert('Charlie');
      expect(testLL.head.data).to.equal("Charlie");
      expect(testLL.tail.data).to.equal("Charlie");
      expect(testLL.head.next).to.be.undefined;
    });
    it('The insert method should place the new node afer the tail of the Linked list', () => {
      testLL.insert('Mac');
      expect(testLL.head.data).to.equal("Charlie");
      expect(testLL.tail.data).to.equal("Mac");
    });
    it('The next property of the former tail should update to point at the new tail', () => {
      testLL.insert('Dennis');
      expect(testLL.head.data).to.equal("Charlie");
      expect(testLL.tail.data).to.equal("Dennis");
      expect(testLL.head.next.data).to.equal("Mac");
      expect(testLL.head.next.next.data).to.equal("Dennis");
      expect(testLL.head.next.next.next).to.be.undefined;
    });
    it('The insertFront method allows the user to put a new item at the head of the list', () => {
      testLL.insertFront('Dee');
      expect(testLL.head.data).to.equal("Dee");
      expect(testLL.head.next.data).to.equal("Charlie");
      expect(testLL.head.next.next.data).to.equal("Mac");
    });
    it('The contains method allows users to check if the list contains value such as a string or number', () => {
      expect(testLL.contains("Dennis")).to.be.true;
      expect(testLL.contains("Frank")).to.be.false;
    });
    it('The contains method informs the user it checks only values and it cannot check for compound objects', () => {
      testLL.contains({obj: "someObj"}).should.be.equal("Sorry, the contains method only works for values such as numbers and strings.\nIt is unable to check for objects or arrays.")
      testLL.contains([1,2,3,4,5]).should.be.equal("Sorry, the contains method only works for values such as numbers and strings.\nIt is unable to check for objects or arrays.")
    });
    it('The findAndRemove method returns the data property for the value entered and removes it from the list', () => {
      expect(testLL.head.next.data).to.equal("Charlie");
      expect(testLL.contains("Charlie")).to.be.true;
      expect(testLL.findAndRemove("Charlie")).to.equal("Charlie");
      expect(testLL.contains("Charlie")).to.be.false;
    });
    it('The findAndRemove method updates the next properties of ajacent nodes correctly', () => {
      expect(testLL.head.next.data).to.equal("Mac");
    });
    it('The findAndRemove method returns false if the user enters a value not in the list', () => {
      expect(testLL.findAndRemove("Charlie")).to.be.false;
    });
    it('The findAndRemove method returns false if the user enters a compound object', () => {
      expect(testLL.findAndRemove(["Frank"])).to.be.false;
    });
    it('The removeTail method returns the data property of the tail', () => {
      expect(testLL.removeTail()).to.equal("Dennis");
    });
    it('The removeTail method updates the Linked List tail property and the new tail\'s next property accordingly.', () => {
      expect(testLL.tail.data).to.equal("Mac");
      expect(testLL.head.next.data).to.equal("Mac");
    });
    it('The removeHead method returns the data property of the head', () => {
      expect(testLL.removeHead()).to.equal("Dee");
    });
    it('The removeHead method updates the Linked List head property accordingly', () => {
      expect(testLL.head.data).to.equal("Mac");
    });
    it('The removeHead and removeTail methods both inform the user if the list is empty', () => {
      testLL.findAndRemove('Mac');
      expect(testLL.removeHead()).to.equal("The Linked List is empty.");
      expect(testLL.removeTail()).to.equal("The Linked List is empty.");
    });
    it('The insert and insertFront methods both create a new linked list with the head and tail pointing at the value inserted if the Linked List is empty.', () => {
      testLL.insert('Artimes');
      expect(testLL.head.data).to.equal("Artimes");
      expect(testLL.tail.data).to.equal("Artimes");
      expect(testLL.head.next).to.be.undefined;
      testLL.findAndRemove('Artimes');
      testLL.insertFront('Frank');
      expect(testLL.head.data).to.equal("Frank");
      expect(testLL.tail.data).to.equal("Frank");
      expect(testLL.head.next).to.be.undefined;
    }); 
  });
});


// Tree Tests

  //TODO: Add beforeEach hooks instead of IFEEs to initialize tests
  
  var testTree = (() => {
    var testTree = new Tree('Frank');
    return testTree;
  })();
