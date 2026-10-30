import { prisma } from "../db.js";

export async function getBooks(req, res) {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Серверийн алдаа гарлаа" });
  }
}

export async function getBook(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "id буруу байна. Тоо байх ёстой." });
  }

  try {
    const book = await prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      return res.status(404).json({ message: "Олдсонгүй" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Серверийн алдаа гарлаа" });
  }
}

export async function createBook(req, res) {
  const { title, price, author } = req.body;

  if (!title || typeof price !== "number") {
    return res.status(400).json({ message: "Мэдээлэл дутуу" });
  }

  try {
    const book = await prisma.book.create({
      data: { 
        title, 
        price,
        author
      },
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: "Ном нэмэхэд алдаа гарлаа" });
  }
}

export async function updateBook(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "id буруу байна" });
  }

  try {
    const book = await prisma.book.update({
      where: { id },
      data: req.body,
    });
    res.json(book);
  } catch (error) {
    res.status(404).json({ message: "Олдсонгүй" });
  }
}

export async function deleteBook(req, res) {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: "id буруу байна" });
  }

  try {
    await prisma.book.delete({
      where: { id },
    });
    res.status(204).end();
  } catch (error) {
    res.status(404).json({ message: "Олдсонгүй" });
  }
}
