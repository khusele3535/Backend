import express from "express";

import {
  books,
  searchByTitle,
  getBooksFromDb,
  getBookOrThrow,
  sum,
  isExpensive,
  getTitles,
  countAvailable,
  scCamelFormatPrice,
} from "./books.js";

import { users, findUserById, findByEmail } from "./users.js";

const titles = books.map((book) => book.title);
const labels = books.map((book) => `${book.title} - ${book.price}`);

console.log(titles);
console.log(labels);
console.log(books.length);

const app = express();
const PORT = 4000;

app.use(express.json());

app.get("/test-functions", async (req, res) => {
  const currentBooks = await getBooksFromDb();

  res.json({
    sum: sum(1500, 2500),
    isExpensive: isExpensive(currentBooks),
    getTitles: getTitles(currentBooks),
    countAvailable: countAvailable(),
    formatPrice: scCamelFormatPrice(currentBooks.price),
  });
});

app.get("/books", async (req, res) => {
  const q = req.query.title;
  const currentBooks = await getBooksFromDb();
  if (q) return res.json(searchByTitle(q));
  res.json(currentBooks);
});

app.get("/books/:id", (req, res) => {
  try {
    const id = Number(req.params.id);
    const book = getBookOrThrow(id);
    res.json(book);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

app.get("/users", (req, res) => {
  const safeUsers = users.map(
    ({ password, ...userWithoutPassword }) => userWithoutPassword,
  );
  res.json(safeUsers);
});

app.get("/users/search", (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ message: "И-мэйл хаяг оруулна уу" });
  }

  const user = findByEmail(email);

  if (!user) {
    return res
      .status(404)
      .json({ message: "Энэ и-мэйлтэй хэрэглэгч олдсонгүй" });
  }

  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = findUserById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "И-мэйл болон нууц үгийг заавал оруулна уу!" });
  }

  const user = findByEmail(email);

  if (!user) {
    return res
      .status(401)
      .json({ message: "И-мэйл эсвэл нууц үг буруу байна." });
  }

  if (user.password === password) {
    const { password, ...userWithoutPassword } = user;
    return res.json({
      message: "Амжилттай нэвтэрлээ!",
      user: userWithoutPassword,
    });
  } else {
    return res
      .status(401)
      .json({ message: "И-мэйл эсвэл нууц үг буруу байна." });
  }
});

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "Уучлаарай, таны хандсан хаяг олдсонгүй.",
  });
});

app.listen(PORT, () =>
  console.log(`Сервер http://localhost:${PORT} дээр ажиллаж эхэллээ...`),
);
