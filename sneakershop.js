var mysql = require("mysql");
var displayTable = require("console.table");
var inquirer = require("inquirer");
let DB;
let result = [];

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "icewinddale",
  database: "sneakersstore_db"
});

connection.connect(function(err) {
    if (err) throw err;
    readFromDB();
  });

function readFromDB(){
    connection.query("SELECT * FROM goods", function(err, res) {
        if (err) throw err;
        console.log(console.table(res) + "\n");
        getUserData();
        DB = res;
        return DB;
    });
}

function writeDB(result){
    result[0]++;
     let query = "UPDATE goods SET stock_quantity = " + result[1] + " WHERE item_id = " + result[0];
      connection.query(query, function(err) {
          if (err) throw err;
      });
      //readFromDB();
      connection.end();
}

function getUserData(){
    inquirer.prompt([
        {
        type: "input",
        message: "Type item_id you want to buy",
        name: "consumer_item_id"
        },
        {
        type: "input",
        message: "How many items do you want to buy?",
        name: "consumer_quantity"
        }
    ])
    .then(function(inquirerResponse) {
        let userChoice = inquirerResponse.consumer_item_id;
        let userChoiceQuantity = inquirerResponse.consumer_quantity;
        if(userChoice && userChoiceQuantity == 'q'){
            connection.end();
            return;
        }
        if(checkItems(DB, userChoice) && checkQuantity(DB, userChoiceQuantity)) {
            console.log('Success! You bought ' +  userChoiceQuantity + ' ' + userChoice);
            writeDB(result);
        };
    });    
}

function checkItems(DB, userChoice){
    DB.forEach(((item, index) => {
        if(item.product_name == userChoice){
            result.push(index);
        } 
    }));
    if(result.length > 0){
        return true
    } else {
        console.log('Wrong item ID');
        result = [];
        getUserData();
    }
}

function checkQuantity(DB, userChoiceQuantity){
   if(DB[result[0]].stock_quantity >= userChoiceQuantity){
       result.push(DB[result[0]].stock_quantity - userChoiceQuantity);
       return true;
   } else {
       console.log('Insufficient quantity!')
       result = [];
       getUserData();
   }
}







