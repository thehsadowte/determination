const mongoose = require("mongoose");

const uri =
  "mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Успішне підключення до MongoDB Atlas"))
  .catch((error) =>
    console.log("Помилка підключення до MongoDB Atlas:", error)
  );

const commentSchema = new mongoose.Schema({
  name: String,
  comment: String,
  time: String,
});

const Comment = mongoose.model("Comment", commentSchema);

const newComment = new Comment({
  name: "Ім'я з MongoDB Atlas",
  comment: "Це коментар, доданий через MongoDB Atlas",
  time: "30.09.2024 19:00",
});

newComment
  .save()
  .then(() => {
    console.log("Коментар успішно доданий до MongoDB Atlas!");
    mongoose.connection.close();
  })
  .catch((err) => console.log("Помилка при збереженні коментаря:", err));
