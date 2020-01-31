// require mongoose
const mongoose = require('mongoose');

// connect to the 27017 port and create your db (if it does not exist)
mongoose.connect("mongodb://localhost:27017/fruitsDB", {useNewUrlParser: true, useUnifiedTopology: true });

// create your schema - the basic structure that your documents will follow
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required..."] 
    },
    rating: Number,
    review: String
});    

// create a model that follows that schema
// this is essentially equal to creating a collection
const Fruit = mongoose.model("Fruit", fruitSchema);     //btw the first argument ("Fruit") is just a name of this new model/collection

// create a document to be added to your collection
const plum = new Fruit ({
    name : "Plum",
    rating : 8,
    review : "Outstanding fruit fellas"
});

// then save it
//plum.save();

const kiwi = new Fruit ({
    name : "kiwi",
    rating : 9,
    review: "Love kiwis"
});

const lychee = new Fruit({
    name: "lychee",
    rating: 10,
    review: "Wah"
});

// let's add several items in one go
// let's use the model - insertMany method
// takes in 2 inputs - an array of items to be added, and a callback

// Fruit.insertMany( [kiwi, lychee], function(err){
//     if (err) {
//         console.log(err);        
//     }
//     else {
//         console.log("Successfully added new fruits to fruitsDB");
//     }
// } );

// create a new schema - persons
const personSchema = new mongoose.Schema({
    name : String,
    age: Number,
    favoriteFruit: fruitSchema
});

// create a model (which ultimately creates a collection with the plural) 
// that follows that schema
const Person = mongoose.model("Person", personSchema);

// create a document that can be added to the collection
const person = new Person ({
    name : "John",
    age : 37
});

//person.save();

const orange = new Fruit ({
    name: "orange",
    rating: 9,
    review: "Wah bhuyee wah"
});

orange.save();

Person.updateOne({name: "John"}, {favoriteFruit: orange}, function(err) {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Successfully updated Johnoo bhai");        
    }
} );

// time to do some finding-- aka reading 
// Person.find(function(err, people){
//     if (err) {
//         console.log(err);        
//     }
//     else {
//         console.log(people);        
//     }
// });

// the find method takes in 1 input - it is an anonymous function
// this function runs once the finding is complete
// it can return an error or it can return the actual collection that we are
// trying to find
Fruit.find(function(err, fruits){
    if (err) {
        console.log(err);
    }
    else {

        // let's close the conncetion to the db here
        mongoose.connection.close();

        // the for each method takes in 1 input - an anonymous method
        // the anonymous method takes in 1 input - the iterator 
        fruits.forEach(function(fruit){
            console.log(fruit.name);            
        });
    }
});

// takes in 3 args
// 1- filter-- aka which doc to update
// 2- what to update in that doc
// 3- an anon func that provides an error report
// Fruit.updateOne({_id: "5de4b1950631f0047dd1a525"}, {name : "Aaloo"}, function(err){
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log("Successfully updated your fruits!");
//     }
// } );

// delete method
// takes in 2 params - 1- filter, 2- anon func that provides error report
// Fruit.deleteOne({_id: "5de4b251e77b0704852475a2"}, function(err) {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log("Successfully deleted a document");        
//     }
// } );