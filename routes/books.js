import express from "express";
import getBooks from "../services/books/getBooks.js";
import getBookById from "../services/books/getBookById.js";
import createBook from "../services/books/createBook.js";
import updateBookById from "../services/books/updateBookById.js";
import deleteBook from "../services/books/deleteBook.js";
import authMiddleware from "../middleware/auth.js";

const booksRouter = express.Router();

const checkHeader = (req, res, next) => {
  if (req.get("X-Auth") === undefined) {
    res.status(400).send("Missing header X-Auth");
  } else {
    next();
  }
};

booksRouter.use(checkHeader);

booksRouter.get("/", (req, res) => {
  try {
    const { genre, available } = req.query;
    const books = getBooks(genre, available);
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("something went wrong getting the list of books.");
  }
});

booksRouter.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const book = getBookById(id);

    if (!book) {
      res.status(404).send(`Book with id ${id} was not found!`);
    } else {
      res.status(200).json(book);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong getting your book by id!");
  }
});

booksRouter.post("/", authMiddleware, (req, res) => {
  // throw new Error("no implementation");
  try {
    const { title, author, isbn, pages, available, genre } = req.body;
    const newBook = createBook(title, author, isbn, pages, available, genre);
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while creating new book!");
  }
});

booksRouter.put("/:id", authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, isbn, pages, available, genre } = req.body;
    const updatedBook = updateBookById(
      id,
      title,
      author,
      isbn,
      pages,
      available,
      genre
    );
    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while updating book by id!");
  }
});

booksRouter.delete("/:id", authMiddleware, (req, res) => {
  try {
    const { id } = req.params;
    const deletedBookId = deleteBook(id);

    if (!deletedBookId) {
      res.status(404).send(`Book with id ${id} was not found!`);
    } else {
      res.status(200).json({
        message: `Book with id ${deletedBookId} was deleted!`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while deleting book by id!");
  }
});

export default booksRouter;
