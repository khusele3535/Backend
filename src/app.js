import express from "express";
import booksRouter from "./routes/books.router.js";
import usersRouter from "./routes/users.router.js";
import { logger } from "./middlewares/logger.js";
import { notFound, errorHandler } from "./middlewares/error.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(logger);

app.use("/books", booksRouter);
app.use("/users", usersRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Сервер http://localhost:${PORT} дээр аслаа...`));
