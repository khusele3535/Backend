export const books = [
    { id: 1, title: "Node", price: 45000, isAvailable: true },
    { id: 2, title: "Express", price: 52000, isAvailable: true },
    { id: 3, title: "Prisma", price: 61000, isAvailable: false },
    { id: 4, title: "React", price: 48000, isAvailable: true }
];

export function findBookById(id) {
    return books.find((book) => book.id === id);
}

export function searchByTitle(keyword) {
    return books.filter((book) => 
        book.title
            .toLowerCase()
            .includes(keyword.toLowerCase())
    );
}

export function countAvailable() {
    return books.filter((b) => b.isAvailable).length;
}

export function sum(a, b) {
    return a + b;
}

export function isExpensive(book) {
    return book.price > 50000;
}

export function getTitles(booksArray) {
    return booksArray.map((book) => book.title);
}

export const scCamelFormatPrice = (price) => {
    return `${price}₮`;
};

export function getBooksFromDb() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(books);
        }, 500);
    });
}

export function getBookOrThrow(id) {
    const book = findBookById(id);
    if (!book) {
        throw new Error("Book not found");
    }
    return book;
}
