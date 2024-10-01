const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3001;

const MONGODB_URI =
  "mongodb+srv://shadowte:WREsQhGehNvxgIz8@cluster0.xk279.mongodb.net/";
const uri = process.env.MONGODB_URI;

mongoose

  .connect(process.env.uri)
  .then(() => console.log("Підключено до MongoDB"))
  .catch((error) => console.error("Помилка підключення до MongoDB:", error));

const commentSchema = new mongoose.Schema({
  name: String,
  comment: String,
  time: String,
});

const Comment = mongoose.model("Comment", commentSchema);

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

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

app.get("/comments", (req, res) => {
  Comment.find() //
    .then((comments) => res.json(comments)) //
    .catch((error) =>
      res
        .status(500)
        .json({ message: "Помилка при завантаженні коментарів", error })
    );
});

app.listen(PORT, () => {
  console.log(`Сервер працює на http://localhost:${PORT}`);
});
