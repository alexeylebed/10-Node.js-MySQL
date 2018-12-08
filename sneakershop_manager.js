var mysql = require("mysql");
var displayTable = require("console.table");
var inquirer = require("inquirer");
let DB;
const commands = ["View Products for Sale", "View Low Inventory", "Add new product" , "Add to Inventory" , "Quit"];
var connection;

function connect(){
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "icewinddale",
        database: "sneakersstore_db"
    });
};
connect();

function readQuery(){
    connect();
    connection.query("SELECT * FROM goods", function(err, res) {
        if (err) throw err;
        console.log(console.table(res) + "\n");
        DB = res;
        run();
    });
}

function lowInvetntoryQuery(){
    connect();
    connection.query("SELECT * FROM goods", function(err, res) {
        if (err) throw err;
        DB = res;
        let lowDB = [];
        DB.forEach((item) => {
            if(item.stock_quantity < 10){
                lowDB.push(item);
            }
        })
        console.log(console.table(lowDB));
        run();
    });
}

function addToInventoryQuery(){
    connect();
    let values = '';
    inquirer.prompt([
        {
            type: "input",
            message: "Type product name",
            name: "product_name"
        },
        {
            type: "input",
            message: "Type department name",
            name: "department_name"
        },
        {
            type: "input",
            message: "Type item price",
            name: "price"
        },
        {
            type: "input",
            message: "Type stock quantity",
            name: "stock_quantity"
        }
    ])
    .then(function(inquirerResponse) {
        values = '"' +  inquirerResponse.product_name +  '"' + ',' + '"' +  inquirerResponse.department_name + '"' +  ',' + inquirerResponse.price + ',' +  inquirerResponse.stock_quantity;
        let query = 'INSERT INTO goods(product_name, department_name, price, stock_quantity) VALUES(' + values + ')';
        console.log(query);
        connection.query(query, function(err, res) {
            if (err) throw err;
            console.log('Items were successfully added!');
            run();
        });
    });
}

function addQuantityQuery(){
    connect();
    let baseIsRead = new Promise((resolve) =>{
        connection.query("SELECT * FROM goods", function(err, res) {
            if (err) throw err;
            let selectChoises  = [];
            res.forEach((item) =>{
                selectChoises.push(item.product_name);
            })
            resolve(selectChoises)
        });
    })
    baseIsRead.then((selectChoises) => {
        inquirer.prompt([
            {
                type: "list",
                name: "product_name",
                message: "Choose product name",
                choices: selectChoises
            },
            {
                type: "input",
                name: "stock_quantity",
                message: "How many items are you adding?",
            }
        ])
        .then(function(inquirerResponse) {
            query = 'UPDATE  goods SET stock_quantity =stock_quantity+' +  inquirerResponse.stock_quantity + ' WHERE product_name = ' + '"' +  inquirerResponse.product_name + '"';
            connection.query(query, function(err, res) {
                if (err) throw err;
                console.log('Items were successfully added!');
                run();
            });
        });
    })
}

function run(){
    var endConnection = new Promise((resolve) =>{
        connection.end();
        resolve('Connection ended!');
    })
    endConnection.then(()=>{
        inquirer.prompt([
            {
                type: "list",
                message: "What do you want to do bro?",
                choices: commands,
                name: "comand"
            }
        ])
        .then(function(inquirerResponse) {
            if(inquirerResponse.comand == commands[0]){
                readQuery();
            } else if (inquirerResponse.comand == commands[1]){
                lowInvetntoryQuery();
            } else if (inquirerResponse.comand == commands[2]){
                addToInventoryQuery();
            }else if (inquirerResponse.comand == commands[3]){
                addQuantityQuery();
            } else if (inquirerResponse.comand == commands[4]){
                return;
            } 
        });  
    });  
}
run();