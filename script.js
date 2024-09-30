// Функція для відображення коментарів на сторінці
function displayComments(comments) {
  const commentsList = document.getElementById("commentsSection");

  comments.forEach((comment) => {
    const commentItem = document.createElement("li");
    commentItem.innerHTML = `
      <span class="comment-author">${comment.name}</span>
      <span class="comment-time">(${comment.time})</span>
      <div class="comment-text">${comment.comment}</div>
    `;
    commentsList.appendChild(commentItem);
  });
}

// Функція для завантаження коментарів з сервера
function loadComments() {
  fetch("http://localhost:3000/comments")
    .then((response) => response.json())
    .then((data) => {
      displayComments(data); // Викликаємо функцію для відображення коментарів
    })
    .catch((error) => {
      console.error("Помилка при завантаженні коментарів:", error);
    });
}

// Викликаємо функцію завантаження коментарів після завантаження сторінки
window.addEventListener("DOMContentLoaded", loadComments);

// Функція для очищення введеного тексту (захист від XSS)
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Отримуємо поточний час у форматі "dd.mm.yyyy hh:mm"
function getCurrentTime() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

// Обробка форми
document
  .getElementById("feedbackForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Відключаємо стандартну поведінку форми

    const nameField = document.getElementById("name");
    const commentField = document.getElementById("comment");

    let name = nameField.value;
    let comment = commentField.value;

    // Очищуємо введені дані
    name = escapeHTML(name);
    comment = escapeHTML(comment);

    // Перевіряємо довжину коментаря
    if (comment.length > 500) {
      alert("Коментар надто довгий! Ліміт — 500 символів.");
      return;
    }

    // Отримуємо поточний час
    const time = getCurrentTime();

    // Створюємо об'єкт для коментаря
    const commentData = {
      name: name,
      comment: comment,
      time: time,
    };

    // Відправляємо дані на сервер
    fetch("http://localhost:3000/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((response) => {
        console.log("Response:", response);
        return response.json(); // Перетворення у JSON
      })
      .then((data) => {
        console.log("Data:", data); // Логуємо дані для перевірки
        if (data.message) {
          alert(data.message);
        }
        console.log(commentData);
        // Додаємо коментар до списку після успішного запису
        const commentsList = document.getElementById("commentsSection");
        if (commentsList) {
          const commentItem = document.createElement("li");
          commentItem.innerHTML = `
            <span class="comment-author">${name}</span>
            <span class="comment-time">(${time})</span>
            <div class="comment-text">${comment}</div>
          `;
          commentsList.appendChild(commentItem);
        } else {
          console.error("Список коментарів не знайдений в DOM!");
        }
      })
      .catch((error) => {
        console.error("Помилка при відправці коментаря:", error);
      });

    // Очищаємо поля вводу
    nameField.value = "";
    commentField.value = "";
  });
