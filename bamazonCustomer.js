var inquirer = require('inquirer');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "tobi1208",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

});

//Call function that will display database to user
displayItems();



//Function for displaying everything in the database
function displayItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err
        console.log("-----------------------------------");
        console.log("|  ID  |  Product Name  |  Price  |");
        for (var i = 0; i < res.length; i++) {
            console.log("|  " + res[i].item_id + "  |  " + res[i].product_name + "  |  " + res[i].price + "  |");
        }
        console.log("-----------------------------------");


    });
    //Funciton that will ask questions about 
    whatToBuy();
}

function whatToBuy() {
    inquirer
        .prompt([
            {
                message: "What would you like to buy?",
                name: "itemToBuy",
                type: "input"
            },
            {
                message: "How many of these would you like to buy?",
                name: "quantity",
                type: "input"
            }

        ]).then(function (response) {
            
            //BETTER WAY TO MAKE SQL QUERIES
            var selectQuery = "SELECT * FROM products WHERE product_name = ?"
           connection.query(selectQuery, [response.itemToBuy], function (err, res) {
                if (err) throw err;
                
                if (res[0].stock_quantity >= 0 && (res[0].stock_quantity - response.quantity) >= 0) {
                    connection.query("UPDATE products SET stock_quantity = stock_quantity - " + response.quantity + " WHERE stock_quantity > 0 AND product_name = '" + response.itemToBuy + "';", function (err, res) {
                        if (err) throw err

                        console.log("Your order for " + response.quantity + " " + response.itemToBuy + "(s) is complete!");
                        
                    });
                }
                else{
                    console.log("Not enough stock!");
                }
            });

        });
        connection.end();
}
