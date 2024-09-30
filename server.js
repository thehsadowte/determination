const express = require("express");
const cors = require("cors"); // Додаємо цей рядок
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Налаштування CORS
app.use(cors()); // Додаємо цей рядок

// Middleware для обробки JSON-даних
app.use(bodyParser.json());

// Віддаємо статичні файли (наприклад, HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Маршрут для отримання всіх коментарів
app.get("/comments", (req, res) => {
  fs.readFile("comments.json", "utf8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Помилка при зчитуванні коментарів" });
    }
    res.json(JSON.parse(data));
  });
});

// Маршрут для додавання нового коментаря
app.post("/comments", (req, res) => {
  const newComment = req.body;

  // Зчитуємо існуючі коментарі
  fs.readFile("comments.json", "utf8", (err, data) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Помилка при зчитуванні коментарів" });
    }

    const comments = JSON.parse(data);
    comments.push(newComment);

    // Записуємо оновлені коментарі у файл
    fs.writeFile("comments.json", JSON.stringify(comments), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Помилка при збереженні коментаря" });
      }
      res.status(201).json({ message: "Коментар успішно доданий!" });
    });
  });
});

// Запускаємо сервер
app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});
