CREATE DATABASE book_library;
CREATE TABLE `book_library`.`books`  (
  `id` int NOT NULL,
  `book_image_url` varchar(255) NOT NULL,
  `book_name` varchar(255) NOT NULL,
  `book_author` varchar(255) NOT NULL,
  `book_summary` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `book_library`.`books` (`id`, `book_image_url`, `book_name`, `book_author`, `book_summary`)
VALUES
(1, 'img/1.jpg', 'To Kill', 'Harper Lee', 'Set in the American South during the 1930s, this novel follows young Scout Finch as she navigates issues of race, class, and morality. '),
(2, 'img/2.jpg', '1984', 'George Orwell', 'In a dystopian society where Big Brother monitors every aspect of citizens lives, Winston Smith rebels against the oppressive regime'),
(3, 'img/3.jpg', 'Great Gatsby', 'F. Scott Fitzgerald', 'Narrated by Nick Carraway, this novel delves into the lavish and tumultuous world of Jay Gatsby, a mysterious millionaire, and his obsession with the enchanting Daisy Buchanan.'),
(4, 'img/4.jpg', 'Pride and Prejudice', 'Jane Austen', 'Austen s romantic comedy follows the independent-minded Elizabeth Bennet as she navigates the social norms of early 19th-century England.'),
(5, 'img/5.jpg', 'To the Lighthouse', 'Virginia Woolf', 'Set on the Isle of Skye, this modernist masterpiece captures the inner thoughts and experiences of the Ramsay family and their guests over the course of two days.'),
(6, 'img/6.jpg', 'Beloved', 'Toni Morrison', 'Sethe, a former slave, grapples with the trauma of her past when the ghost of her deceased daughter, Beloved, returns.'),
(7, 'img/7.jpg', 'The Lord', 'J.R.R. Tolkien', 'Frodo Baggins embarks on a perilous journey to destroy the One Ring and save Middle-earth from the dark lord Sauron.'),
(8, 'img/8.jpg', 'The Road', 'Cormac McCarthy', 'In a post-apocalyptic world ravaged by an unspecified catastrophe, a father and his young son journey across a desolate landscape, struggling to survive and retain their humanity.');
