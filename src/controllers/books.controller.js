import { books, addBook } from "../data/books.js";

export function search(req, res) {
  const { q } = req.query;
  if (!q) {
    return res.json(books);
  }
  const filtered = books.filter((b) => 
    b.title && b.title.toLowerCase().includes(q.toLowerCase())
  );
  res.json(filtered);
}

export function getOne(req, res) {
  const id = Number(req.params.id);
  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  res.json(book);
}

export function create(req, res) {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "title is required" });
  }

  const book = addBook({ title });
  res.status(201).json(book);
}
