# js-circularLinkedList
a javascript circular linked list implementation.


cll.js is an implementation of a circular linked list, where there are no initial or end nodes, but all nodes are currently linked with some previous and next node. 

usage: 

```js


var goku = {'name' : 'goku' , 'race' : 'saiyan'};

var gohan = {'name' : 'gohan' , 'race' : 'human/saiyan'};

var vegeta = {'name' : 'vegeta' , 'race' : 'saiyan'};

var krilin = {'name' : 'krilin' , 'race' : 'human'};

//create will return the first node:
var first = CLL.create(goku);


//find , create , push , prev and next are chainable functions:
first.push(gohan).push(vegeta).push(krilin);

//iterate throught the list:
first.iterate( function( elem ){ console.log(elem )});


var clone = { 'name' : 'krilin' , 'race' : 'human' };

console.log(first.find(clone).get() ); //finds the 'krilin' object despite clone and krilin points to different objects. keep in mind .get() call would fail if target is not found.

console.log(first.findObject(clone) ); //null. findObject checks for strict object comparison.

console.log(first.findObject(vegeta).get().name ); //vegeta. The vegeta var does trigger the strict findObject recognition.

var fruits = [{'name' : 'banana' , 'color' : 'yellow'} , {'name' : 'apple' , 'color' : 'red'} , {'name' : 'avocado' , 'color' : 'green'}  ]

//createFromArray always returns a node containing the first object in the array:
var fruitNode = CLL.createFromArray(fruits);	

console.log(fruitNode.next().next().get().name ); //did you know avocados are actually fruits, and not vegetables? :-D

```
