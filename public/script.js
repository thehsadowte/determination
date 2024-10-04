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

function loadComments() {
  // fetch("https://physics-e8ff.onrender.com/comments")
  fetch("http://localhost:3000/comments")
    .then((response) => response.json())
    .then((data) => {
      displayComments(data); //
    })
    .catch((error) => {
      console.error("Помилка при завантаженні коментарів:", error);
    });
}

window.addEventListener("DOMContentLoaded", loadComments);

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getCurrentTime() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

document
  .getElementById("feedbackForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); //

    const nameField = document.getElementById("name");
    const commentField = document.getElementById("comment");

    let name = nameField.value;
    let comment = commentField.value;

    name = escapeHTML(name);
    comment = escapeHTML(comment);

    if (comment.length > 500) {
      alert("Коментар надто довгий! Ліміт — 500 символів.");
      return;
    }

    const time = getCurrentTime();

    const commentData = {
      name: name,
      comment: comment,
      time: time,
    };

    fetch("http://localhost:3000/comments", {
      // fetch("https://physics-e8ff.onrender.com/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    })
      .then((response) => {
        console.log("Response:", response);
        return response.json();
      })
      .then((data) => {
        console.log("Data:", data);
        if (data.message) {
          alert(data.message);
        }
        console.log(commentData);

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

    nameField.value = "";
    commentField.value = "";
  });
