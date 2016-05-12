
/**
*@author Sergeon https://github.com/sergeon
*@version 1.0
*
*Implementation of an index-less circular linked list with double link,
*where every node points to the previous and the next node and stores
*an object.
*
* both create(object) and createFromArray(array) returns a node of the chain.
*
* get() method from nodes return the stored object.
*
* iterate( callback ) performs iteration and calls callback in every node
* passing the object stored as parameter.
*
*prev, next, create, createFromArray, find and findObject functions
*are chainable.
*
*/

module = module || {};



var CLL = (function (){

	var create = function( firstNode ){


		if (Array.isArray(firstNode))
			return createFromArray(firstNode);

		var init = Node(firstNode  );
		return init;
	};

	var _cloneArray = function( array ){
		return array.slice(0);
	};

    /**
    *Creates a circular linked list from array. Last element will
    *point to the first, despite its current array index.
    */
	var createFromArray = function( collection ){

		var current = null;
		var initialElement = null;

		var col = _cloneArray( collection);

		current = Node( col.shift() );

		initialElement = current;

		for ( var index in col){
			current = current.push(col[index]);

		}

		return initialElement;
	};



	/**
	*A Node encapsulates an object with a pointer to a next
	*and a previous element in the linked list.
	*/
	var Node = function( object  , from , to ) {

		var nextNode = null;
		var previousNode = null;

		if (typeof to !== 'undefined' )
			 nextNode = to;

		if (typeof from !== 'undefined' )
			previousNode = from;


		var value = object;

        /**
        *Returns the object itself.
        */
		var get = function(){
			return value;
		};



        /**
        *returns the next pointer.
        */
		var next = function(){
			return nextNode;
		};

        /**
        *returns the previous pointer.
        */
		var prev = function(){

			return previousNode;

		};


		/**
        *Changes the next() pointer of the node.
        */
		var pointTo = function( object ){

			nextNode = object;
		};


        /**
        *Changes the previous pointer
        */
		var setPrev = function( node ){
			previousNode = node;
		};


        /**
        *push a new node after this
        */
		var push = function( object ){

			var cacheNext = this.next();

			if ( cacheNext === null)
				cacheNext = this;

			var newNode = Node(object , this , cacheNext );


			pointTo( newNode );

			//special case: there is currently only one node in the list:
			if( this.prev() === null)
				setPrev(newNode);


			return newNode;

		};


        /**
        *finds a node in the list that equals to the target parameter.
        * by 'equals', we intent that objects point to the same object
        * or share all its properties.
        */
		var find = function( target ){

			if (deepCompare(this.get() , target ))
				return this;

			var current = this;

			while (current = current.next() ){

				if (current === this )
					return null; //cicle complete, nothin' found.

				if(deepCompare( current.get() , target ))
					return current;
			}

		};

		var findObject = function(target ){

			if(this.get() === target )
				return this;

			var current = this;
			while (current = current.next() ){

				if (current === this )
					return null; //cicle complete, nothin' found.

				if(current.get() === target )
					return current;
			}



		}

		/**
		 * Iterates from the current node to previous, performing a callback function wich gets the
         the iterating node as argument
		 * @param  {Function} callback A function to perform on every node.
		 * @return void
		 */
		var iterate = function( callback  ){

			var first =  this;
			var current = this;
			var firstIteration = true;

            while(true){

                callback(current.get() );

                current = current.next();

                if(current === first || current === null )
                    break;

            }
		};




		/**
		 * compare two or more objects and return whether they are the same.
		 * Thanks to Peter Mortensen:
		 * http://stackoverflow.com/questions/1068834/object-comparison-in-javascript
		 * @return {Boolean}
		 */
		function deepCompare () {
			var i, l, leftChain, rightChain;

			function compare2Objects (x, y) {
			var p;

			// remember that NaN === NaN returns false
			// and isNaN(undefined) returns true
			if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
				 return true;
			}

			// Compare primitives and functions.
			// Check if both arguments link to the same object.
			// Especially useful on step when comparing prototypes
			if (x === y) {
				return true;
			}

			// Works in case when functions are created in constructor.
			// Comparing dates is a common scenario. Another built-ins?
			// We can even handle functions passed across iframes
			if ((typeof x === 'function' && typeof y === 'function') ||
			   (x instanceof Date && y instanceof Date) ||
			   (x instanceof RegExp && y instanceof RegExp) ||
			   (x instanceof String && y instanceof String) ||
			   (x instanceof Number && y instanceof Number)) {
				return x.toString() === y.toString();
			}

			// At last checking prototypes as good a we can
			if (!(x instanceof Object && y instanceof Object)) {
				return false;
			}

			if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
				return false;
			}

			if (x.constructor !== y.constructor) {
				return false;
			}

			if (x.prototype !== y.prototype) {
				return false;
			}

			// Check for infinitive linking loops
			if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
				 return false;
			}

			// Quick checking of one object beeing a subset of another.
			// todo: cache the structure of arguments[0] for performance
			for (p in y) {
				if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
					return false;
				}
				else if (typeof y[p] !== typeof x[p]) {
					return false;
				}
			}

			for (p in x) {
				if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
					return false;
				}
				else if (typeof y[p] !== typeof x[p]) {
					return false;
				}

				switch (typeof (x[p])) {
					case 'object':
					case 'function':

						leftChain.push(x);
						rightChain.push(y);

						if (!compare2Objects (x[p], y[p])) {
							return false;
						}

						leftChain.pop();
						rightChain.pop();
						break;

					default:
						if (x[p] !== y[p]) {
							return false;
						}
						break;
				}
			}

			return true;
			}

			if (arguments.length < 1) {
				throw "Need two or more arguments to compare";
			}

			for (i = 1, l = arguments.length; i < l; i++) {

			  leftChain = []; //Todo: this can be cached
			  rightChain = [];

			  if (!compare2Objects(arguments[0], arguments[i])) {
				  return false;
			  }
			}

			return true;
		}//end DeepCompare

		return {

			get : get,

			next : next,
			prev : prev,

			push : push,

			find : find,
			findObject : findObject,

			iterate : iterate,

		};



	};//End Node

	return CLL = {

		create : create ,

		createFromArray : createFromArray

		};


})();//end CLL

module.exports = CLL;
