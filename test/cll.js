

/*run tests with npm test (having defined 'test' in package json)*/

var expect    = require("chai").expect;
var CLL   = require("../cll.js");



describe("Circular Linked List" , function(){

    describe("create() function" , function(){


        it('should return an empty node if create() is called with no parameters' , function(){

            expect(CLL.create().get() ).to.be.undefined;

        });



        it('should return a node when create() function is properly called' , function(){

            var c = CLL.create("something");

            expect(c).to.have.property( 'get' );
            expect(c.get).to.be.function;

            expect(c).to.have.property( 'next' );
            expect(c.next).to.be.function;

            expect(c).to.have.property( 'prev' );
            expect(c.prev).to.be.function;


        })

        it('should delegate to createFromArray when passed an array' , function(){

            var goku = {'name' : 'goku' , 'race' : 'saiyan'};
            var gohan = {'name' : 'gohan' , 'race' : 'human/saiyan'};
            var vegeta = {'name' : 'vegeta' , 'race' : 'saiyan'};

            var c = new CLL.create([goku, gohan, vegeta]);

            expect(c.next().next().get() ).to.be.eql(vegeta);

        })



    })


    describe("createFromArray() function" , function(){


        it('should work properly when passed an array of obects' , function(){


            var goku = {'name' : 'goku' , 'race' : 'saiyan'};
            var gohan = {'name' : 'gohan' , 'race' : 'human/saiyan'};
            var vegeta = {'name' : 'vegeta' , 'race' : 'saiyan'};

            var c = new CLL.createFromArray([goku, gohan, vegeta]);

            expect(c.next().next().get() ).to.be.eql(vegeta);

        })


    })


})
