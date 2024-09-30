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
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Місяці починаються з 0
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

    // Додаємо коментар до списку
    const commentsList = document.getElementById("comments");
    const commentItem = document.createElement("li");
    commentItem.innerHTML = `
    <span class="comment-author">${name}</span>
    <span class="comment-time">(${time})</span>
    <div class="comment-text">${comment}</div>
  `;

    commentsList.appendChild(commentItem);
    // Очищаємо поля вводу
    nameField.value = "";
    commentField.value = "";
  });
