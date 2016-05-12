

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



    });


    describe("createFromArray() function" , function(){


        it('should work properly when passed an array of obects' , function(){


            var goku = {'name' : 'goku' , 'race' : 'saiyan'};
            var gohan = {'name' : 'gohan' , 'race' : 'human/saiyan'};
            var vegeta = {'name' : 'vegeta' , 'race' : 'saiyan'};

            var c = new CLL.createFromArray([goku, gohan, vegeta]);

            expect(c.next().next().get() ).to.be.eql(vegeta);

        })


        it("should throw an error if no Array is provided" , function(){

            expect(CLL.createFromArray.bind(CLL , "a string") , "createFromArray should throw an error when passed no Array as param" ).to.throw('collection parameter should be an array.');

        });


        it("should return the first object of the set" , function(){

            var goku = {'name' : 'goku' , 'race' : 'saiyan'};
            var gohan = {'name' : 'gohan' , 'race' : 'human/saiyan'};
            var vegeta = {'name' : 'vegeta' , 'race' : 'saiyan'};

            var c = new CLL.createFromArray([goku, gohan, vegeta]);

            expect(c.get() ).to.be.deep.equal(goku);    

        })
    });



    describe("next and prev methods" , function(){


        it("actually points to the next node when next() is called" , function(){

            var goku = {'name' : 'goku' , 'race' : 'saiyan'};
            var gohan = {'name' : 'gohan' , 'race' : 'human/saiyan'};
            var vegeta = {'name' : 'vegeta' , 'race' : 'saiyan'};

            var c = new CLL.createFromArray([goku, gohan, vegeta]);

            expect(c.next().get() ).to.be.eql(gohan);

        })


        it("next() should point to null when there is only one node" , function(){

            var goku = {'name' : 'goku' , 'race' : 'saiyan'};

            var list = CLL.create(goku);

            expect(list.next()).to.be.null;

        })


        it("next() and prev() should point to the same in a 2 sized list" , function(){

            var goku = {'name' : 'goku' , 'race' : 'saiyan'};
            var gohan = {'name' : 'gohan' , 'race' : 'human/saiyan'};

            var list = CLL.createFromArray([goku , gohan ]);

            expect( list.prev() ).to.be.eql(list.next() );

        })

        it("nor next() or prev() should modify current list object" , function(){

            var goku = {'name' : 'goku' , 'race' : 'saiyan'};
            var gohan = {'name' : 'gohan' , 'race' : 'human/saiyan'};

            var list = CLL.createFromArray([goku , gohan ]);

            expect( list.prev() ).to.be.eql(list.prev() );

            expect( list.next() ).to.be.eql(list.next() );
        })


    });//next and prev methods


    describe("find() and findObject()  methods" , function(){

        it("find should match clones" , function(){

            var krilin = {'name' : 'krilin' , 'race' : 'human'};

            var clone = { 'name' : 'krilin' , 'race' : 'human' };

            var list = CLL.create(krilin);

            expect(list.find(clone).get() ).to.be.deep.equal(krilin);

        })

        it("findObject()  should not match clones" , function(){

            var krilin = {'name' : 'krilin' , 'race' : 'human'};

            var clone = { 'name' : 'krilin' , 'race' : 'human' };

            var list = CLL.create(krilin);

            expect(list.findObject(clone) ).to.be.null;


        })

        it("A lonely item can find itself in the dust" , function(){

            var durham = {'name' : 'Paul' , 'race' : 'Elysian'};

            var list = CLL.create(durham);

            expect(list.findObject(durham).get() ).to.be.deep.equal(durham);


        })

        it("A non-lonely item can find itself in the dust too" , function(){

                var durham = {'name' : 'Paul' , 'race' : 'Elysian'};
                var yatima = {'name' : 'Yatima' , 'race' : 'AI' };

                var list = CLL.create(durham);

                expect(list.findObject(durham).get() ).to.be.deep.equal(durham);

        })



    });


})
