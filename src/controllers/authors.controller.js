
import { prisma } from "../db.js";

// GET /authors

export async function getAuthors(req, res) {
  try {
    const authors = await prisma.author.findMany({
      where: req.query.q
        ? {
            name: {
              contains: req.query.q,
              mode: "insensitive",
            },
          }
        : {},
      include: {
        _count: {
          select: { books: true },
        },
      },
    });

    res.json(authors);
  } catch (error) {
    console.error("GET AUTHORS ERROR:", error);

    res.status(500).json({
      message: "Серверийн алдаа гарлаа",
    });
  }
}

// GET /authors/:id
export const getAuthor = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const author = await prisma.author.findUnique({
      where: { id },
      include: { books: true },
    });

    if (!author) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    res.json(author);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST /authors
export const createAuthor = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required",
      });
    }

    const author = await prisma.author.create({
      data: { name, email },
    });

    res.status(201).json(author);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    res.status(500).json({ message: "Server error" });
  }
};

// GET /authors/:id/books
export const getAuthorBooks = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const author = await prisma.author.findUnique({
      where: { id },
      include: { books: true },
    });

    if (!author) {
      return res.status(404).json({
        message: "Author not found",
      });
    }

    res.json(author.books);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// POST /authors/:id/books
export const createAuthorBook = async (req, res) => {
  const authorId = Number(req.params.id);
  const { title, price } = req.body;

  if (!title || typeof price !== "number") {
    return res.status(400).json({
      message: "Мэдээлэл дутуу",
    });
  }

  try {
    const book = await prisma.book.create({
      data: { title, price, authorId },
    });

    res.status(201).json(book);
  } catch (error) {
    if (error.code === "P2003") {
      return res.status(400).json({
        message: "Зохиолч олдсонгүй",
      });
    }

    res.status(500).json({
      message: "Серверийн алдаа",
    });
  }
};

// DELETE /authors/:id
export const deleteAuthor = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const author = await prisma.author.findUnique({
      where: { id },
      include: { books: true },
    });

    if (!author) {
      return res.status(404).json({
        message: "Зохиолч олдсонгүй",
      });
    }

    if (author.books.length > 0) {
      return res.status(409).json({
        message: "Энэ зохиолч номтой тул устгах боломжгүй",
      });
    }

    await prisma.author.delete({
      where: { id },
    });

    res.status(204).end();
  } catch (error) {
    res.status(500).json({
      message: "Серверийн алдаа",
    });
  }
};
