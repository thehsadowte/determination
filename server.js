const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static("public")); // або 'path/to/your/static/files'
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
MONGODB_URI =
  "mongodb+srv://shadowte:WREsQhGehNvxgIz8@cluster0.xk279.mongodb.net/";

// Отримання URI зі змінних середовища
const uri = MONGODB_URI;

// Перевірка наявності URI
if (!uri) {
  console.error("Помилка: MONGODB_URI не визначена");
  process.exit(1); // Припиняємо виконання програми, якщо змінна не визначена
}

// Підключення до MongoDB
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Підключено до MongoDB"))
  .catch((error) => console.error("Помилка підключення до MongoDB:", error));

// Схема і модель коментарів
const commentSchema = new mongoose.Schema({
  name: String,
  comment: String,
  time: String,
});

const Comment = mongoose.model("Comment", commentSchema);

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

// Створення коментарів
app.post("/comments", (req, res) => {
  const newComment = new Comment(req.body);
  newComment
    .save()
    .then(() => res.status(201).json({ message: "Коментар успішно доданий!" }))
    .catch((error) =>
      res
        .status(500)
        .json({ message: "Помилка при збереженні коментаря", error })
    );
});

// Отримання коментарів
app.get("/comments", (req, res) => {
  Comment.find() //
    .then((comments) => res.json(comments)) //
    .catch((error) =>
      res
        .status(500)
        .json({ message: "Помилка при завантаженні коментарів", error })
    );
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});
