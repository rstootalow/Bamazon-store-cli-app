var mysql = require("mysql");
var table = require("console.table");
var inquirer = require("inquirer");


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
    console.log("\nConnected with id: " + connection.threadID + "\n");
    startApp()
});

// function to display database when app runs
function startApp() {
    connection.query("SELECT item_id, product_name, price FROM products", function(err, response) {
        // throw error if something wrong with query
        if (err) throw err;
        console.table(response);
        userInput();
        connection.end();
    })
}

function userInput() {
    // prompt users to ask for the id of the product they want to buy
    inquirer
        .prompt([
            {
                name: "itemInquiry",
                type: "input",
                message: "Please enter the id of the item you would like to shop for:"
                
            },
            //prompt user to ask how many units of that product they would like to buy.
            {
                name: "quantityInquiry",
                type: "input",
                message: "Please enter the number of items you would like to purchase:"
            }
             //THEN
            //take user input (id and quant) & check it user quant is >= id iventory
        ]).then(function(answer){
            console.log(answer.itemInquiry);
            console.log(answer.quantityInquiry);
        })
    }
