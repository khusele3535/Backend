export let books = [
  { id: 1, title: "Хөх судар", price: 25000, isAvailable: true },
  { id: 2, title: "Тунгалаг тамир", price: 18000, isAvailable: true },
  { id: 3, title: "Ногоон морь", price: 15000, isAvailable: false }
];

let nextBookId = 4;

export function addBook(input) {
  const book = {
    id: nextBookId++,
    isAvailable: true,
    ...input
  };
  books.push(book);
  return book;
}
