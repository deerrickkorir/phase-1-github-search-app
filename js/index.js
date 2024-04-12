document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        
        const searchQuery = document.getElementById('search').value.trim();
        if (searchQuery === '') {
            alert('Please enter a search query');
            return;
        }
        
        const url = `https://api.github.com/search/users?q=${searchQuery}`;
        const headers = {
            'Accept': 'application/vnd.github.v3+json'
        };

        fetch(url, { headers })
            .then(response => response.json())
            .then(data => {
                displayUsers(data.items);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });
    
    function displayUsers(users) {
        userList.innerHTML = ''; // Clear previous search results
        
        users.forEach(user => {
            const userItem = document.createElement('li');
            const userLink = document.createElement('a');
            userLink.href = user.html_url;
            userLink.target = '_blank';
            userLink.textContent = user.login;
            
            const userAvatar = document.createElement('img');
            userAvatar.src = user.avatar_url;
            userAvatar.alt = `${user.login}'s avatar`;
            userAvatar.width = 50;
            userAvatar.height = 50;
            
            userItem.appendChild(userAvatar);
            userItem.appendChild(userLink);
            
            userList.appendChild(userItem);
        });
    }
});
