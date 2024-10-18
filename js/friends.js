
// FILTER
document.getElementById('search-friends').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const friends = document.querySelectorAll('.friend');
    
    friends.forEach(friend => {
    const name = friend.querySelector('.friend-name').textContent.toLowerCase();
    if (name.includes(searchTerm)) {
        friend.style.display = 'flex';
    } else {
        friend.style.display = 'none';
    }
    });
});

// DRAG AND DROP
const friendsContainer = document.getElementById('friends-container');
let draggedFriend = null;

document.querySelectorAll('.friend').forEach(friend => {
  friend.addEventListener('dragstart', () => {
    draggedFriend = friend;
    setTimeout(() => {
      friend.style.display = 'none';
    }, 0);
  });

  friend.addEventListener('dragend', () => {
    setTimeout(() => {
      friend.style.display = 'flex';
      draggedFriend = null;
    }, 0);
  });

  friend.addEventListener('dragover', e => {
    e.preventDefault();
  });

  friend.addEventListener('dragenter', function(e) {
    e.preventDefault();
    this.style.backgroundColor = '#f0f0f0';
  });

  friend.addEventListener('dragleave', function() {
    this.style.backgroundColor = '#e0e0e0';
  });

  friend.addEventListener('drop', function() {
    this.style.backgroundColor = '#e0e0e0';
    if (draggedFriend !== this) {
      friendsContainer.insertBefore(draggedFriend, this);
    }
  });
});
