ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'icewinddale';

DROP DATABASE IF EXISTS  sneakersstore_db;
CREATE DATABASE  sneakersstore_db;
USE sneakersstore_db;

CREATE TABLE goods(
item_id INTEGER(10) AUTO_INCREMENT, 
product_name VARCHAR(30), 
department_name VARCHAR(30), 
price INTEGER(10),
stock_quantity INTEGER(10),
PRIMARY KEY(item_id)
);

INSERT INTO goods(product_name, department_name, price, stock_quantity)
VALUES(
"Converse 782", "Men", 200 , 10
);
INSERT INTO goods(product_name, department_name, price, stock_quantity)
VALUES(
"Converse 784", "Men", 300 , 34
);
INSERT INTO goods(product_name, department_name, price, stock_quantity)
VALUES(
"Converse 785", "Men", 500 , 7
);
INSERT INTO goods(product_name, department_name, price, stock_quantity)
VALUES(
"Converse 752", "Woman", 150 , 16
);
INSERT INTO goods(product_name, department_name, price, stock_quantity)
VALUES(
"Converse 762", "Woman", 200 , 5
);
INSERT INTO goods(product_name, department_name, price, stock_quantity)
VALUES(
"Converse 773", "Woman", 300 , 7
);
INSERT INTO goods(product_name, department_name, price, stock_quantity)
VALUES(
"Converse 334", "Kids", 100 , 22
);
INSERT INTO goods(product_name, department_name, price, stock_quantity)
VALUES(
"Converse 345", "Kids", 120 , 9
);
INSERT INTO goods(product_name, department_name, price, stock_quantity)
VALUES(
"Converse 346", "Kids", 140 , 71
);
UPDATE  goods SET stock_quantity = stock_quantity+5 WHERE product_name = "Converse 785";
SELECT *FROM goods;