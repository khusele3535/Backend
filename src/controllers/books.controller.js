
import { prisma } from "../db.js";


function buildWhere(query) {
  const where = {};

  if (query.authorId) {
    const id = Number(query.authorId);
    if (Number.isNaN(id)) {
      throw { status: 400, message: "authorId тоо байх ёстой" };
    }
    where.authorId = id;
  }

  if (query.available !== undefined) {
    where.isAvailable = query.available === "true";
  }

if (query.q) {
  where.title = {
    contains: query.q,
    mode: "insensitive",
  };
}

if (query.author) {
  where.author = {
    name: {
      contains: query.author,
      mode: "insensitive",
    },
  };
}

const price = {};

if (query.minPrice !== undefined) {
  const min = Number(query.minPrice);

  if (query.minPrice === "" || !Number.isFinite(min)) {
    throw { status: 400, message: "minPrice тоо байх ёстой" };
  }

  price.gte = min;
}

if (query.maxPrice !== undefined) {
  const max = Number(query.maxPrice);

  if (query.maxPrice === "" || !Number.isFinite(max)) {
    throw { status: 400, message: "maxPrice тоо байх ёстой" };
  }

  price.lte = max;
}

if (Object.keys(price).length > 0) {
  where.price = price;
}

if (query.ids) {
  const ids = query.ids.split(",").map(Number);

  if (ids.some(id => !Number.isInteger(id) || id <= 0)) {
    throw { status: 400, message: "ids зөв тоонууд байх ёстой" };
  }

  where.id = {
    in: ids,
  };
}

  return where;
}

function buildOrderBy(query) {
  const allowed = ["title", "price", "createdAt"];

  const rawSort = query.sort || "createdAt";
  const isDesc = rawSort.startsWith("-");
  const sort = isDesc ? rawSort.slice(1) : rawSort;

  const field = allowed.includes(sort) ? sort : "createdAt";

  const order = isDesc
    ? "desc"
    : query.order === "desc"
      ? "desc"
      : "asc";

  return { [field]: order };
}

export async function getBooks(req, res) {
  try {
    const books = await prisma.book.findMany({
      where: buildWhere(req.query),
      orderBy: buildOrderBy(req.query),
      include: { author: true },
    });

    res.json(books);
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "Серверийн алдаа гарлаа",
    });
  }
}

export async function getBook(req, res) {
  const id = Number(req.params.id);

  try {
    const book = await prisma.book.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!book) {
      return res.status(404).json({ message: "Ном олдсонгүй" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Серверийн алдаа гарлаа" });
  }
}

export async function createBook(req, res) {
  const { title, price, authorId } = req.body;

  if (!title || typeof price !== "number" || !authorId) {
    return res.status(400).json({ message: "Мэдээлэл дутуу" });
  }

  try {
    const book = await prisma.book.create({
      data: { title, price, authorId },
    });
    res.status(201).json(book);
  } catch (error) {
    if (error.code === "P2003") {
      return res.status(400).json({ message: "Зохиолч олдсонгүй" });
    }
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
