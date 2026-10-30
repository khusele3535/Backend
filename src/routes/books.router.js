import { Router } from "express";
import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/books.controller.js";

const booksRouter = Router();

booksRouter.get("/", getBooks);
booksRouter.get("/:id", getBook);
booksRouter.post("/", createBook);
booksRouter.patch("/:id", updateBook);
booksRouter.delete("/:id", deleteBook);

export default booksRouter;
