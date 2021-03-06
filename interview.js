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
		
		if(text.charAt(i) == " "){
			return text.substr(0, i);
		}
	}
	//couldn't find a space. just do a hard break.
	pg.printLn("hard break");
	return text.substr(0, maxLength);

}

//TODO: write tests for this. not tested at all.
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

	//returns reference to node if found, false otherwise
	search: function(data, root){
		if(root === undefined){
			root = this.root;
		}
		//tree is empty
		if(root === null){
			return false;
		}
		//key found
		if(data == root.data){
			return root.data;
		}
		else if(data < root.data){
			if(root.left === null){
				return false;
			} else{
				return pg.search(data, root.left);
			}
		} else if(data > root.data){
			if(root.right === null){
				return false;
			} else {
				return pg.search(data, root.right);
			}
		}

	} ,

	//returns true on success, false if node not found
	delete: function(data, root){
		if(root === undefined){
			root = this.root;
		}
		//tree is empty
		if(root === null){
			return false;
		}
		
		//look one level below root because deleting requires a reference to the parent.
		var node; //the node to be deleted. //root is its parent.
		if(data < root.data){
			if(root.left === null){
				return false;
			} else if(root.left.data == data){
				node = root.left;
			} else {
				//recurse further left
				return delete(data, root.left);
			}

		} else if (data > root.data){
			if(root.right === null){
				return false;
			} else if(root.right.data == data){
				node = root.right;
			} else {
				//recurse further left
				return delete(data, root.right);
			}
		}

		//case 1 root.left is a leaf. just delete it.
		if(node.left === null && node.right === null){
			if(root.left == node){
				root.left = null;
			} else {
				root.right = null;
			}
		} else if(node.left === null && node.right != null){
			//case 2: has one child on right
			if(root.left == node){
				root.left = node.right;
			} else {
				root.right = node.right;
			}
			return true;
		} else if(node.left != null && node.right === null){
			//case 3: has one child on left
			if(root.left == node){
				root.left = node.left;
			} else {
				root.right = node.left;
			}
			return true;
		} else {
			//case 4: has two children. 
			// replace value with left child and delete left child.
			node.data = node.left.data;
			return pg.delete(data, node.left);
		}
			
		
	} ,

	max: function(root){
		if(root === undefined){
			//allows a call like: tree.max();
			//It hides recursion from the caller
			root = this.root;
		}

		if(root === null){
			//got called on empty tree
			return false;
		} else {
			//recursed all the way to right
			if(root.right === null){
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
			//called on empty tree
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

//find first nonrepeated char in a string
// 2 passes is O(n)
pg.firstNonrepeatedChar = function(text){

	var histo = [];
	//zero out histogram
	for(var i = 0; i < 26; i++){
		histo[i] = 0;
	}
	for(var i = 0; i < text.length; i++){
		
		histo[text.charCodeAt(i) - 97]++;
	}

	//Remember that hoisting means that this i is the same as the previous i.
	for(var i = 0; i < text.length; i++){
		if(histo[text.charCodeAt(i) - 97] == 1){
			return text.charAt(i);
		}
	}
	//all characters repeated
	console.log(histo);
	return false;
};

//remove is an array of characters to be deleted from the String text.
//does not check for uppercase and lowercase values of the same letter.
// O(n * m). Concatenating here instead of using a character array takes more memory and is slower in IE.
pg.deleteChars = function(text, remove){
	var result = "";
	//javascript strings can be concatenated on the fly. no need for pointers
	for(var i = 0; i < text.length; i++){
		if(remove.indexOf(text.charAt(i)) == -1){
			//character not in remove array. add to result
			result += text.charAt(i).toString(); //force string type.
		}
	}

	return result;
}

//returns true if found, false otherwise
pg.binSearch = function(needle, body, low, high){
	if(low === undefined){
		low = 0;
	}
	if(high === undefined){
		high = body.length - 1;
	}
	if(high < low){
		return false;
	}
	var mid = Math.floor(low + (high - low) / 2);
	if(needle > body[mid]){
		return pg.binSearch(needle, body, mid + 1, high);
	} else if(needle < body[mid]){
		return pg.binSearch(needle, body, low, mid - 1);
	} else {
		return true;
	}
}

//O(n^2) insertion sort
//returns sorted array
//values is array of ints
pg.insertSort = function(values){
	for(var i = 0; i < values.length; i++){
		
		for(var j = 0; j < i; j++){
			var temp;
			if(values[i] < values[j]){
				//swap j and i
				temp = values[j];
				values[j] = values[i];
				values[i] = temp;
			}
		}
	}

	return values;
}


//find permutations of suffix.
//for each letter in suffix, move it to prefix and recurse on new suffix
pg.permute = function(suffix, prefix, result){

	var newprefix = "";
	var newsuffix = "";
	for(var i = 0; i < suffix.length; i++){
		newprefix = suffix.charAt(i);
		newsuffix = suffix.substr(0,i) + suffix.substr(i + 1);
		//base case: permuting a prefix with suffix length 1
		if(newsuffix.length == 1){
			var perm = prefix + newprefix + newsuffix;
			//pg.printLn("perm: " + perm);
			result.push(perm);
		} else {
			pg.permute(newsuffix, prefix + newprefix, result);
		}
	}
}

//test if a === b
pg.assert = function(a, b, test_name){
	
	if(test_name === undefined){
		test_name = "unnamed";
	}
	if(a === b){
		pg.printLn(test_name + " test PASSED");
		return true;
	} else {
		pg.printLn(test_name + " test FAILED");
		pg.printLn("a: " + a + " b: " + b);
		return false;
	}
};

pg.printLn = function (message){
	$("#console").append("<li>" + message + "</li>");
	//scroll to show new message
	$("#console").prop('scrollTop',$("#console").prop('scrollHeight'));	
};

pg.printBr = function(){
	$("#console").append("<li><br /></li>");
}


//I'll eventually turn these into real unit tests
pg.tests = {
	permuteTest: function(){
		pg.perms = [];
		pg.printBr();
		pg.printLn("Testing permute");	
		pg.permute("abc", "", pg.perms);
		pg.assert(pg.perms.toString(), "abc,acb,bac,bca,cab,cba", "abc");
		
	} ,

	insertSortTest: function(){
		pg.printBr();
		pg.printLn("Testing insertSort");
		pg.assert(pg.insertSort([3,1,2]).toString(), [1,2,3].toString(),"123");
		pg.assert(pg.insertSort([3,1,2,0,26,99]).toString(), [0,1,2,3,26,99].toString());
		pg.assert(pg.insertSort([0]).toString(), [0].toString());
	} ,

	binSearchTest: function(){
		pg.printBr();
		pg.printLn("Testing binSearch");
		var body1 = [1,2,3,23,25,28,40,70,99];
		var body2 = [1,2,3];
		var body3 = [1];
		pg.assert(pg.binSearch(1, body1),true, "1 in body1");
		pg.assert(pg.binSearch(28, body1),true, "28 in body1");
		pg.assert(pg.binSearch(29, body1),false, "29 in body1");

		pg.assert(pg.binSearch(2, body2),true, "2 in body2");
		pg.assert(pg.binSearch(4, body2),false, "4 in body2");

		pg.assert(pg.binSearch(2, body3),false, "2 in body3");
		pg.assert(pg.binSearch(1, body3),true, "1 in body3");
	} ,
	firstNonrepeatedCharTest: function(){
		pg.printBr();
		pg.printLn("Testing firstNonrepeatedChar");
		pg.assert(pg.firstNonrepeatedChar("baboon"), "a", "baboon");
		pg.assert(pg.firstNonrepeatedChar("fork"), "f", "fork");
		pg.assert(pg.firstNonrepeatedChar("total"), "o", "total");
		pg.assert(pg.firstNonrepeatedChar("teeter"), "r", "teeter");
	} ,
	truncateAtWordTest: function(){
		pg.printBr();
		pg.printLn("Testing truncateAtWord");

		var text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. " +
		"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown " + 
		"printer took a galley of type and scrambled it to make a type specimen book. It has survived not " +
		"only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. " +
		"It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, " +
		"and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

		pg.assert(pg.truncateAtWord(text, 14), "Lorem Ipsum is", "14");
		pg.assert(pg.truncateAtWord(text, 8), "Lorem", "8");
		
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
		pg.printBr();
		pg.printLn("Testing reverseInt");
		var integers = [{input: 123, output: 321}, {input: 222, output: 222}, {input: 0, output:0}, {input:101, output: 101}];
		for(var i = 0; i < integers.length; i++){
			pg.assert(pg.reverseInt(integers[i].input), integers[i].output, integers[i].input);
		}
	} ,

	deleteCharsTest: function(){
		pg.printBr();
		pg.printLn("Testing deleteChars");
		var remove = ["a", "e", "i", "o", "u"];
		var text = "and still i see no changes. can't a brother get a little peace?";
		var soln = "nd stll  s n chngs. cn't  brthr gt  lttl pc?";

		pg.assert(pg.deleteChars(text, remove), soln, "Tupac");
	}
};

$(function(){
	pg.printLn("Common interview questions implemented in JavaScript");
	//TODO: write tests for linked list and binary search tree
	//pg.tests.linkedListTest();
	pg.tests.reverseIntTest();
	pg.tests.truncateAtWordTest();
	pg.tests.firstNonrepeatedCharTest();
	pg.tests.deleteCharsTest();
	pg.tests.binSearchTest();
	pg.tests.insertSortTest();
	pg.tests.permuteTest();
	
});