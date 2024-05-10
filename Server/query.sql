CREATE DATABASE book_library;
CREATE TABLE `book_library`.`books`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `book_image_url` varchar(255) NOT NULL,
  `book_category` varchar(255) NOT NULL,
  `book_name` varchar(255) NOT NULL,
  `book_author` varchar(255) NOT NULL,
  `book_summary` varchar(255) NOT NULL,
  `have_sale` BOOLEAN NULL,
  `old_price` decimal(10) NULL,
  `price` decimal(10) NOT NULL,
  PRIMARY KEY (`id`)
);
CREATE TABLE `book_library`.`category`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);