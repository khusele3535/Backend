import "dotenv/config";
import express from "express";
import booksRouter from "./routes/books.router.js";
import usersRouter from "./routes/users.router.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use("/books", booksRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.json({ message: "UFE Tech BED411 - Week 5 API ажиллаж байна." });
});

app.listen(PORT, () => {
  console.log(`Сервер http://localhost:${PORT} дээр аслаа.`);
});
