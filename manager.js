var fs = require("fs");
var inquirer = require("inquirer");
var mysql = require("mysql");
var dot = require("dotenv");
var table = require("console.table"); 

// establish connection
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "NYJets05061984",
    database: "bamazon.db"
});

// prompt manager input
function promptManager() {
    // give manager list of options to pick from with inquirer
    inquirer
        .prompt([
            {
                type: "list", 
                name: "option",
                message: "What option would you like to view?",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
                filter: function(selection) {
                    if (selection === "View Products for Sale") {
                        return sale;
                    } else if (selection === "View Low Inventory") {
                        return inventory;
                    } else if (selection === "Add to Inventory") {
                        return addExisting;
                    } else if (selection === "Add New Product") {
                        return addNew;
                    } else { // log error by chance no or incorrect selection is made
                        console.log("********************")
                        console.log("Cannot find that option. Please re-enter selection")
                        console.log("********************")
                        exit(1);
                    }

                    }
                }
        ]).then(function(answer) {
            if (answer.choices[0] === "sale") {
                showSaleItems();
            } else if (answer.choices[1] === "inventory") {
                showLowInventory();
            } else if (answer.choices[2] === "addExisting") {
                addToInventory();
            } else if (answer.choices[3] === "addNew") {
                addNew();
            } else {
                console.log("Error. Option not found!")
            }
        })
};

// take that selection and pass that value to a function that will call other functions 
function showSaleItems() {
    connection.query("SELECT * FROM products", function(err, response) {
        // catch error/exception if one is thrown if something wrong with query
        if (err) throw err;
        console.table(response);
        connection.end();
    });
}
function showLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 10") {
        if (err) throw err;

        console.log("********************");
        console.log("LOW INVENTORY ITEMS");
        console.log("********************\n");
        console.table(response);
    }
}
function addToInventory() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "item_id",
                message: "Please enter the item id you would like to add stock to:",
                filter: Number;
            },
            {
                type: "input",
                name: "quantity",
                message: "How many items would you like to add?",
                filer: Number
            }
        ]).then(function(answer) {
            var userRequest = answer.item_id;
            var quantity = answer.quantity;
            var query = "Select * FROM products WHERE ?";

            connection.query(query, {item_id: userRequest}, functionerr, data) {
                if (err) throw err;

                if (data.length === 0) {
                    console.log("INVALID ENTRY! Please enter a valid item_id");
                    //restart the function if invalid entry
                    addToInventory();
                } else {
                    var merchData = data[0];

                    console.log("********************")
                    console.log("Currently Updating Inventory...");
                    console.log("********************");

                    var newQuery = "UPDATE products SET stock_quantity = " + (merchData.stock_quantity + quantity) + "WHERE item_id = " + userRequest;

                    connection.query(newQuery, function(err, data) {
                        if (err) throw err;

                        console.log("This item now has: " + merchData.stock_quantity + quantity);

                        connection.end();
                    })
                }
            }
        })
}
// function addToStock() {
//     inquirer
//         .prompt([
//             {
//                 type: "input",
//                 name: "product_name",
//                 message: "Please enter the name of the product you would like to add to your inventory:",
//             },

//             {
//                 type: "input",
//                 name: "department_name",
//                 message: "What department should this item be labeled under?",
//             },

//             {
//                 type: "input",
//                 name: "price",
//                 message: "WHat is the price of this item?",
//                 filter: Number
//             },

//             {
//                 type: "input",
//                 name: "stock_quantity",
//                 message: "How many of these items would you like to order?",
//                 filter: Number
//             }
//         ]).then(function(answer) {

//         })
// }