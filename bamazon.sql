DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

SET SQL_SAFE_UPDATES = 0;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price INT(10) NOT NULL,
    stock_quantity INT(100) NOT NULL,
    primary key(item_id)
);

INSERT INTO products (product_name, department_name, price,stock_quantity) VALUES ("Vans", "Shoex", 60, 37);

UPDATE products SET stock_quantity = 10 WHERE product_name = 'As I Lay Dying';

UPDATE products SET stock_quantity = stock_quantity - 2 WHERE stock_quantity > 0;

select * from products;
