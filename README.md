# Bamazon-store-cli-app
CLI Application using Node.js and SQL
# Overview
<p>This application is a command line Amazon-like store. The user is shown an inventory of current items with their associated prices per unit. The user will select the item they want by the item's ID and will then be prompted to select the number of that item they would like to purchase.</p>
<p>Once selected, if the number of items selected are in stock, the user will be shown the total price of their purchase. If the number of items selected is more than currently in stock, the user will be shown a message indicating the number of items they requested are not currently in stock.</p> 

## NPM Packages

#### [Dotenv](https://www.npmjs.com/package/dotenv): This package was used to store variables of api keys and passwords that I would like to keep private as I publish my project on GitHub pages, while still having access to the APIs I used in this project. <br> 
#### [Inquirer](https://www.npmjs.com/package/inquirer/v/0.2.3): This package was used to take user input from the command line and retrieve certain data elements from the database for user to interact with the application. <br> 
#### [Console.table](https://www.npmjs.com/package/console.table): This package was used to transform the normal command line look of a database in to a more readable table format to provide a better user experience (visually speaking).. <br>
#### [mysql](https://www.npmjs.com/package/mysql): This package was used to connect the mysql database to node.js.  <br> 


<code>npm install dotenv</code> 

## Application Commands and Screenshots

* <code>node app.js</code>
   <p>By running this command, the application will start with a set of instructions letting the user know how to navigate and perform tasks in the application</p>
![Application Start Command](images/start-application-img.png)

* <code>Enter the ID of the item from the table you want to shop for: </code>
![Search for Item](images/search-for-item-img.png)

* <code>Select number of items you would like to purchase{Item in stock}</code>
![Select Number of Items in stock](images/item-selection-img.png)

* <code>Select number of items you would like to purchase {Item NOT in stock}</code>
![Select Number of Items NOT in Stock](images/item-not-in-stock-img.png)
