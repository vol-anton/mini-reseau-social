document.addEventListener("DOMContentLoaded", function() {
    fetch("data/posts.json")
      .then(response => response.json())
      .then(posts => {
        const container = document.getElementById("posts-container");
        posts.forEach(post => {
          const postDiv = document.createElement("div");
          postDiv.className = "post";
          postDiv.innerHTML = `
            <p>${post.text}</p>
            <img src="${post.image}" alt="Post image">
            <div>
              <button class="like-btn">Like (${post.reactions.like})</button>
              <button class="dislike-btn">Dislike (${post.reactions.dislike})</button>
              <button class="love-btn">Love (${post.reactions.love})</button>
            </div>
          `;
          container.appendChild(postDiv);
        });
      });
  });
  