import express from "express";
import getBooks from "../services/books/getBooks.js";
import getBookById from "../services/books/getBookById.js";
import createBook from "../services/books/createBook.js";
import updateBookById from "../services/books/updateBookById.js";
import deleteBook from "../services/books/deleteBook.js";
import authMiddleware from "../middleware/auth.js";
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

booksRouter.get("/", async (req, res) => {
  const { genre, available } = req.query;
  const books = await getBooks(genre, available);
  res.status(200).json(books);
});

booksRouter.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const book = await getBookById(id);

      res.status(200).json(book);
    } catch (error) {
      next(error);
    }
  },
  NotFoundError
);

booksRouter.post("/", authMiddleware, (req, res) => {
  const { title, author, isbn, pages, available, genre } = req.body;
  const newBook = createBook(title, author, isbn, pages, available, genre);
  res.status(201).json(newBook);
});

booksRouter.put(
  "/:id",
  authMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, author, isbn, pages, available, genre } = req.body;
      const updatedBook = await updateBookById(
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
      next(error);
    }
  },
  NotFoundError
);

booksRouter.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBookId = deleteBook(id);

    res.status(200).json({
      message: `Book with id ${deletedBookId} was deleted!`,
    });
  } catch (error) {
    next(error);
  }
});

export default booksRouter;
