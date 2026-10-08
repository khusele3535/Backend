import express from "express";

const app = express();
const PORT = 4000;

app.get("/", (req, res) => {
    res.json({ message: "Library API", version: "1.0.0" });
});

app.get("/health", (req, res) => {
    res.json({ status: "OK" });
});

app.get("/profile", (req, res) => {
    res.json({ name: "Bat", role: "User" });
});

app.get("/about", (req, res) => {
    res.status(200).json({
        projectName: "Library API",
        version: "1.0.0",
        author: "Бат"
    });
});

app.get("/students", (req, res) => {
    const studentsArray = [
        { id: 1, name: "Ану", age: 20 },
        { id: 2, name: "Төгсөө", age: 21 },
        { id: 3, name: "Солонго", age: 22 }
    ];
    res.status(200).json(studentsArray);
});

app.get("/courses", (req, res) => {
    const coursesArray = [
        { courseId: "CS101", title: "Backend Хөгжүүлэлт", credit: 3 },
        { courseId: "CS102", title: "Мэдээллийн Бааз", credit: 3 }
    ];
    res.status(200).json(coursesArray);
});

app.get("/books/:id", (req, res) => {
    const id = Number(req.params.id);
    res.json({ id, title: "Node.js" });
});


app.use((req, res) => {
    res.status(404).json({ 
        error: "Not Found", 
        message: `Уучлаарай, таны хандсан хаяг олдсонгүй.` 
    });
});

app.listen(PORT, () => console.log(`Сервер http://localhost:${PORT} порт дээр ажиллаж байна...`));
