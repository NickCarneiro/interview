// Linked list index starts at ZERO
var linkedList = {
	head: null,
	length: 0,

	//Add node to end of the list
	push: function (data){
		
		//list is empty, set head
		if(this.length == 0){
			
			this.head = {
				data: data,
				next: null
			}
		//list not empty, update a next property on the tail
		} else {
			var node = this.head;
			for(var i = 0; i < this.length - 1; i++){
				node = node.next;
			}
			node.next = {
				data: data,
				next: null
			}
		}
		
		
		this.length++;
	},

	remove: function (index){
		if(this.length == 0){
			return false;
		}
		//case 1: remove first element
		if(index == 0){
			//there are more than 1 nodes
			if (this.length > 1){
				this.head = this.head.next;
			//head is the only node
			} else {

				this.head = null;
			}
			

		//case 2: element to delete is last element, n
		} else if(index == this.length - 1){
			//traverse to second to last element
			var node = this.head;
			for(var i = 0; i < index - 1; i++){
				node = node.next;
			}
			node.next = null;
		//case 3: element is somewhere between 0 and n
		// List looks like this: HEAD=====LEFT=DELETE_ME=RIGHT=====N
		// Connect LEFT to RIGHT: HEAD=====LEFT=RIGHT=====N
		} else {
			//traverse to element before the one to be deleted (LEFT)
			var node = this.head;
			for(var i = 0; i < index - 1; i++){
				node = node.next;
			}

			//Connect LEFT to RIGHT, losing DELETE_ME
			node.next = node.next.next;
		}

		this.length--;
	},

	// O(n) traversal to find largest value
	// assumes all values are numeric
	max: function(){
		if(this.length == 0){
			return false;
		}
		var max = -Infinity;
		var node = this.head;
		for(var i = 0; i < this.length; i++){
			//update max if larger number encountered
			max = max > node.data ? max : node.data;
			node = node.next;
		}
		return max;
		
	},

	// get data in specified node from list
	get: function(index){
		if(this.length == 0){
			return false;
		}
		var node = this.head;
		for(var i = 0; i < index; i++){
			node = node.next;
		}

		return node.data;
	}
}

function printLn(message){
	$("#console").append("<li>" + message + "</li>");
	//scroll to show new message
	$("#console").prop('scrollTop',$("#console").prop('scrollHeight'));	
}

$(function(){
	printLn("Welcome to the JavaScript Data Structures Playground");
	var list = Object.create(linkedList);
	list.push(1);
	list.push(2);
	list.push(6);
	list.push(3);

	for(var i = 0; i < list.length; i++){
		printLn("List item " + i + ": " + list.get(i));
	}

	printLn("Max: " + list.max());
	printLn("Deleting index 2. ");
	list.remove(2);
	printLn("Max: " + list.max());
	list.push(5);
	list.push(50);
	list.push(33);
	for(var i = 0; i < list.length; i++){
		printLn("List item " + i + ": " + list.get(i));
	}
	printLn("Deleting first node");
	list.remove(0);
	for(var i = 0; i < list.length; i++){
		printLn("List item " + i + ": " + list.get(i));
	}
	printLn("Deleting last node");
	list.remove(list.length - 1);
	for(var i = 0; i < list.length; i++){
		printLn("List item " + i + ": " + list.get(i));
	}
	printLn("Max: " + list.max());
})