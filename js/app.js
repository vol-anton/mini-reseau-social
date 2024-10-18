// FETCH POSTS DATA FROM JSON
fetch("data/posts.json")
  .then((response) => response.json())
  .then((posts) => {
    const postsContainer = document.getElementById("posts-container");

    posts.forEach((post) => {
      const postDiv = document.createElement("div");
      postDiv.classList.add("post");

      // post content
      postDiv.innerHTML = `
        <p>${post.text}</p>
        ${post.image ? `<img src="${post.image}" alt="Post Image">` : ""}
        <div class="reactions">
          <button class="like-btn">Like (<span class="like-count">${
            post.reactions.like
          }</span>)</button>
          <button class="dislike-btn">Dislike (<span class="dislike-count">${
            post.reactions.dislike
          }</span>)</button>
          <button class="love-btn">Love (<span class="love-count">${
            post.reactions.love
          }</span>)</button>
        </div>
        <div class="comments-section">
          <div class="comments-list"></div>
          <input type="text" class="comment-input" placeholder="Add a comment...">
          <button class="add-comment-btn">Comment</button>
        </div>
      `;

      // append post
      postsContainer.appendChild(postDiv);

      // full-screen image functionality
      const postImage = postDiv.querySelector("img");
      if (postImage) {
        postImage.addEventListener("click", () => {
          const fullScreenDiv = document.createElement("div");
          fullScreenDiv.classList.add("full-screen");
          fullScreenDiv.innerHTML = `<img src="${postImage.src}" alt="Full Image">`;
          document.body.appendChild(fullScreenDiv);

          // close on click
          fullScreenDiv.addEventListener("click", () => {
            fullScreenDiv.remove();
          });

          // close on esc
          document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
              fullScreenDiv.remove();
            }
          });
        });
      }

      // reaction functionality
      const likeBtn = postDiv.querySelector(".like-btn");
      const dislikeBtn = postDiv.querySelector(".dislike-btn");
      const loveBtn = postDiv.querySelector(".love-btn");

      // PARTICLES
      function createParticles(buttonElement, type) {
        const particleCount = 12; 
        const angleIncrement = (Math.PI * 2) / particleCount; 

        const rect = buttonElement.getBoundingClientRect();
        const centerX = rect.width / 2; 
        const centerY = rect.height / 2; 

        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement("div");
          particle.classList.add("particle", type);

          const angle = angleIncrement * i;
          const moveX = Math.cos(angle) * (Math.random() * 50);
          const moveY = Math.sin(angle) * (Math.random() * 50);

          particle.style.position = "absolute";
          particle.style.left = `${centerX}px`;
          particle.style.top = `${centerY}px`;

          buttonElement.appendChild(particle);

          particle.style.setProperty("--moveX", `${moveX}px`);
          particle.style.setProperty("--moveY", `${moveY}px`);

          // remove particle after the animation ends
          setTimeout(() => {
            particle.remove();
          }, 1200);
        }
      }

      // like button event listener
      likeBtn.addEventListener("click", () => {
        const likeCount = postDiv.querySelector(".like-count");
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
        createParticles(likeBtn, "like");
      });

      // dislike button event listener
      dislikeBtn.addEventListener("click", () => {
        const dislikeCount = postDiv.querySelector(".dislike-count");
        dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
        createParticles(dislikeBtn, "dislike");
      });

      // love button event listener
      loveBtn.addEventListener("click", () => {
        const loveCount = postDiv.querySelector(".love-count");
        loveCount.textContent = parseInt(loveCount.textContent) + 1;
        createParticles(loveBtn, "love");
      });

      // render existing comments
      const commentsList = postDiv.querySelector(".comments-list");
      post.comments.forEach((comment) => {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");
        commentDiv.innerHTML = `
          <p>${comment.text}</p>
          <input type="text" class="reply-input" placeholder="Reply...">
          <button class="add-reply-btn">Reply</button>
          <div class="replies-list"></div>
        `;

        // append comment to comments list
        commentsList.appendChild(commentDiv);

        // render existing replies for each comment
        const repliesList = commentDiv.querySelector(".replies-list");
        comment.replies.forEach((reply) => {
          const replyDiv = document.createElement("div");
          replyDiv.classList.add("reply");
          replyDiv.innerHTML = `<p>${reply.text}</p>`;
          repliesList.appendChild(replyDiv);
        });

        // reply feature
        const replyBtn = commentDiv.querySelector(".add-reply-btn");
        replyBtn.addEventListener("click", () => {
          const replyInput = commentDiv.querySelector(".reply-input");
          const replyText = replyInput.value.trim();
          if (replyText !== "") {
            const newReplyDiv = document.createElement("div");
            newReplyDiv.classList.add("reply");
            newReplyDiv.innerHTML = `<p>${replyText}</p>`;
            repliesList.appendChild(newReplyDiv);
            replyInput.value = ""; // clear the input
          }
        });
      });

      // comment feature
      const commentBtn = postDiv.querySelector(".add-comment-btn");
      commentBtn.addEventListener("click", () => {
        const commentInput = postDiv.querySelector(".comment-input");
        const commentText = commentInput.value.trim();
        if (commentText !== "") {
          const newCommentDiv = document.createElement("div");
          newCommentDiv.classList.add("comment");
          newCommentDiv.innerHTML = `
            <p>${commentText}</p>
            <input type="text" class="reply-input" placeholder="Reply...">
            <button class="add-reply-btn">Reply</button>
            <div class="replies-list"></div>
          `;
          commentsList.appendChild(newCommentDiv);
          commentInput.value = ""; // clear the input

          // reply to comment
          const replyBtn = newCommentDiv.querySelector(".add-reply-btn");
          replyBtn.addEventListener("click", () => {
            const replyInput = newCommentDiv.querySelector(".reply-input");
            const replyText = replyInput.value.trim();
            if (replyText !== "") {
              const newReplyDiv = document.createElement("div");
              newReplyDiv.classList.add("reply");
              newReplyDiv.innerHTML = `<p>${replyText}</p>`;
              const repliesList = newCommentDiv.querySelector(".replies-list");
              repliesList.appendChild(newReplyDiv);
              replyInput.value = ""; 
            }
          });
        }
      });
    });
  })
  .catch((err) => console.error("Error fetching posts:", err));