const mysql = require("mysql");
const table = require("console.table");
const inquirer = require("inquirer");
var dot = require("dotenv");



var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "NYJets05061984",
    database: "bamazon_db"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("\nConnected with id: " + connection.threadID + "\n");
    // startApp()
});

// function to display database when app runs
function startApp() {
    connection.query("SELECT item_id, product_name, price FROM products", function(err, response) {
        // catch error/exception if one is thrown if something wrong with query
        if (err) throw err;
        console.table(response);
        userInput();
        // connection.end();
    })
}

function userInput() {
    // prompt users to ask for the id of the product they want to buy
    inquirer
        .prompt([
            {
                type: "input",
                name: "item_id",
                message: "Please enter the id of the item you would like to shop for:",
                filter: Number
                
            },
            //prompt user to ask how many units of that product they would like to buy.
            {
                type: "input",
                name: "quantity",
                message: "Please enter the number of items you would like to purchase:",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                },
                filter: Number
            }
        ]).then(function(answer){
            var userRequest = answer.item_id;
            var quantity = answer.quantity;

            var newQuery = "SELECT * FROM products WHERE ?";

            connection.query(newQuery, {item_id: userRequest}, function(err, data){
                  if (err) throw err;
                  connection.on('err', function(err) {
                      console.log("[mysql err]", err);
                  });
                if (data.length === 0) {
                    console.log("\n" + "********************");
                    console.log("Error: Invalid data type. Please enter a valid ID");
                    console.log("********************");
                    console.log("Restarting Application..." + "\n");
                    startApp();
                } else {
                    // compare user quant request to count of item in stock
                    var merchData = data[0];
                    if (quantity <= merchData.stock_quantity) {
                        console.log("\nWe have that amount in stock! Your order is being placed! ");
                        console.log("Thank you for your business!\n");
                            console.log("********************");
                            console.log("The total charge for this order is: " + "$" + merchData.price * quantity);
                            console.log("********************");
                        //create new SQL query for updating the database
                        var queryUpdate = "UPDATE products SET stock_quantity = " + (merchData.stock_quantity - quantity) + "WHERE item_id = " + userRequest

                        connection.query(queryUpdate, function(err, data){
                            if (err) throw err; 
                            //break connection to database once order is placed
                            connection.end();
                        })
                    } else {
                        console.log("\nApologies. We currently do not have that amount of product in stock.");
                        console.log("\n********************");
                        console.log("\nPlease check back later or modify the quantity of your order.\n");
                        //break connection if it gets to this point
                        connection.end();
                    }
                }
            });
        });
    }

    //run application
    startApp();
        
        
        
        
        
        
        
        
        
