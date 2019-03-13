var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "NYJets05061984",
    database: "bamazon_db"
});

connection.connect(function(err, response){
    if (err) throw err; // throw error if something wrong with connection
    // display thread ID to confirm connection
    console.log("Connected with id: " + connection.threadID);
    // display database with function
    displayDb();
    // run userPropt function here!
});

// function to display database when app runs
function displayDb() {
    connection.query("SELECT item_id, product_name, price FROM products", function(err, response) {
        // throw error if something wrong with query
        if (err) throw err;
        // console log the response(full database at this point)
        // var output = table(response.data);
        console.table(response);
        connection.end();
    })
}

function userPrompts() {

}



