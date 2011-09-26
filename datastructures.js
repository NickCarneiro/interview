var pg = {}; //playground namespace

// Linked list index starts at ZERO
pg.linkedList = {
	head: null,
	length: 0,

	pop: function(){
		if(this.length == 0){
			return false;
		}
		var node = this.get(this.length - 1);
		this.remove(this.length - 1);
		return node;
	} ,
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

//Reverse the digits of an integer. Eg: 123 => 321
pg.reverseInt = function(integer){
	//find number of digits
	var digits = 1;
	while(integer / Math.pow(10, digits) > 1){
		digits++;
	}

	var result = 0;
	for(var i = 0; i < digits; i++){
		result += (integer % 10) * Math.pow(10, digits - i - 1);
		integer = Math.floor(integer / 10);
	}

	return result;
}

//maxLength is maximum number of characters allowed in result
pg.truncateAtWord = function (text, maxLength){
	//no truncation needed
	if (maxLength >= text.length){
		return text;
	}
	//last character is end of a word. 
	if(text.charAt(maxLength) == " "){
		return text.substr(0, maxLength);
	}

	//last character is inside a word, 
	//backtrack until a space is found.
	for(var i = maxLength - 1; i >= 0; i--){
		pg.printLn(text.charAt(i));
		if(text.charAt(i) == " "){
			return text.substr(0, i);
		}
	}
	//couldn't find a space. just do a hard break.
	pg.printLn("hard break");
	return text.substr(0, maxLength);

}

pg.BinarySearchTree = {
	root: null ,
	node: {
		init: function(data){
			this.data = data;
		} ,
		left: null ,
		right: null ,
		data: null
	} ,

	search: function(data, root){
		
	} ,

	delete: function(data){
		
	} ,

	max: function(root){
		if(root === undefined){
			//allows a call like: tree.max();
			//It hides recursion from the caller
			root = this.root;
		}

		if(root == null){
			return false;
		} else {
			//recursed all the way to right
			if(root.right == null){
				return root.data;
			//keep recursing right
			} else {
				return max(root.right);
			}
		}
		
	} ,

	min: function(){
		//traverse left until a leaf is found
		if(root === undefined){
			//allows a call like: tree.max();
			//It hides recursion from the caller
			root = this.root;
		}

		if(root == null){
			return false;
		} else {
			//recursed all the way to right
			if(root.left == null){
				return root.data;
			//keep recursing right
			} else {
				return max(root.left);
			}
		}
	} ,

	insert: function(data, root){
		if(root === undefined){
			//allows a call with one parameter like: tree.insert(4);
			//It hides recursion from the caller
			root = this.root;
		}
		if(root == null){
			//tree is empty. add root.
			this.root = Object.create(this.node).init(data);
		} else {
			//data is bigger than root, traverse right
			if(data > root.data){
				//reached a leaf, just add the node.
				if(root.right == null){
					root.right = Object.create(this.node).init(data);
				} else {
					//must recurse further right
					return this.insert(data, root.right);
				}

			//data is smaller than root, traverse left
			} else if(data < root.data){
				if(root.left == null){
					root.left = Object.create(this.node).init(data);
				} else {
					return this.insert(data, root.left);
				}
			} else {
				//don't allow duplicate keys
				return false;
			}
		}
	}


}
pg.printLn = function (message){
	$("#console").append("<li>" + message + "</li>");
	//scroll to show new message
	$("#console").prop('scrollTop',$("#console").prop('scrollHeight'));	
}

//I'll eventually turn these into real unit tests
pg.tests = {
	truncateAtWordTest: function(){
		var text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. " +
		"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown " + 
		"printer took a galley of type and scrambled it to make a type specimen book. It has survived not " +
		"only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. " +
		"It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, " +
		"and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

		pg.printLn(pg.truncateAtWord(text, 14));
	} ,

	linkedListTest: function(){
		//test linkedList
		var list = Object.create(pg.linkedList);
		list.push(1);
		list.push(2);
		list.push(6);
		list.push(3);

		for(var i = 0; i < list.length; i++){
			pg.printLn("List item " + i + ": " + list.get(i));
		}

		pg.printLn("Max: " + list.max());
		pg.printLn("Deleting index 2. ");
		list.remove(2);
		pg.printLn("Max: " + list.max());
		list.push(5);
		list.push(50);
		list.push(33);
		for(var i = 0; i < list.length; i++){
			pg.printLn("List item " + i + ": " + list.get(i));
		}
		pg.printLn("Deleting first node");
		list.remove(0);
		for(var i = 0; i < list.length; i++){
			pg.printLn("List item " + i + ": " + list.get(i));
		}
		pg.printLn("Deleting last node");
		list.remove(list.length - 1);
		for(var i = 0; i < list.length; i++){
			pg.printLn("List item " + i + ": " + list.get(i));
		}
		pg.printLn("Max: " + list.max());

		pg.printLn("popping element: " + list.pop());
		for(var i = 0; i < list.length; i++){
			pg.printLn("List item " + i + ": " + list.get(i));
		}

	} ,

	reverseIntTest: function() {
		//Test reverseInt
		var integers = [1, 123, 222, 0, 1010];
		for(var i = 0; i < integers.length; i++){
			pg.printLn("Reversing integer " + integers[i] + " => " + pg.reverseInt(integers[i]));
		}
	}
}

$(function(){
	pg.printLn("Welcome to the JavaScript Data Structures Playground");
	//test truncate at word
	pg.tests.linkedListTest();
	pg.tests.reverseIntTest();
	pg.tests.truncateAtWordTest();
})