import express from "express";
import getBooks from "../services/books/getBooks.js";
import getBookById from "../services/books/getBookById.js";
import createBook from "../services/books/createBook.js";
import updateBookById from "../services/books/updateBookById.js";
import deleteBook from "../services/books/deleteBook.js";
import authMiddleware from "../middleware/advancedAuth.js";
import NotFoundError from "../errors/NotFoundError.js";

const booksRouter = express.Router();

// const checkHeader = (req, res, next) => {
//   if (req.get("X-Auth") === undefined) {
//     res.status(400).send("Missing header X-Auth");
//   } else {
//     next();
//   }
// };

// booksRouter.use(checkHeader);

booksRouter.get("/", (req, res) => {
  const { genre, available } = req.query;
  const books = getBooks(genre, available);
  res.status(200).json(books);
});

booksRouter.get(
  "/:id",
  (req, res) => {
    const { id } = req.params;
    const book = getBookById(id);

    res.status(200).json(book);
  },
  NotFoundError
);

booksRouter.post("/", authMiddleware, (req, res) => {
  const { title, author, isbn, pages, available, genre } = req.body;
  const newBook = createBook(title, author, isbn, pages, available, genre);
  res.status(201).json(newBook);
});

booksRouter.put("/:id", authMiddleware, (req, res) => {
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
  NotFoundError;
});

booksRouter.delete("/:id", authMiddleware, (req, res) => {
  const { id } = req.params;
  const deletedBookId = deleteBook(id);

  res.status(200).json({
    message: `Book with id ${deletedBookId} was deleted!`,
  });
});

export default booksRouter;
