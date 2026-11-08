
import { Router } from "express";

import {
  getAuthors,
  getAuthor,
  createAuthor,
  getAuthorBooks,
  createAuthorBook,
  deleteAuthor,
} from "../controllers/authors.controller.js";

const router = Router();

router.get("/", getAuthors);
router.get("/:id/books", getAuthorBooks);
router.get("/:id", getAuthor);
router.post("/", createAuthor);
router.post("/:id/books", createAuthorBook);
router.delete("/:id", deleteAuthor);

export default router;
