const mongoose = require("mongoose");

const connectDB = async () => {
    //we are going to return a promise
    return mongoose.connect("mongodb+srv://Ykods:upRvsKM9ybdb4rnl@cluster0.cvi3gmx.mongodb.net/employee_db?retryWrites=true&w=majority")
    .then(() => console.log(`connection to Database established`))
    //if any error occurs while connecting to the database, we will catch it here. 
    .catch((err) => console.log(err)); 
};

//we are exporting the connectDB function so that we can use it in other files.
module.exports = connectDB;

//NOTES:

// A Promise is a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason. This lets asynchronous methods return values like synchronous methods: instead of immediately returning the final value, the asynchronous method returns a promise to supply the value at some point in the future.

//The then() method of a Promise object takes up to two arguments: callback functions for the fulfilled and rejected cases of the Promise . It immediately returns an equivalent Promise object, allowing you to chain calls to other promise methods. 