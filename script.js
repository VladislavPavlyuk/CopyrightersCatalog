// Определение типа данных User
class User {
    constructor(id, name, email, phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}

// Функция для получения данных пользователей
async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        return users.map(user => new User(user.id, user.name, user.email, user.phone));
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
    }
}

// Функция для отображения списка пользователей
async function displayUsers() {
    const userList = document.getElementById('userList');
    const users = await fetchUsers();
    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = user.name;
        listItem.addEventListener('click', () => displayUserDetails(user));
        userList.appendChild(listItem);
    });
}

// Функция для отображения подробной информации о пользователе
function displayUserDetails(user) {
    const userDetails = document.getElementById('userDetails');
    userDetails.innerHTML = `
                <h2>${user.name}</h2>
                <p>Email: ${user.email}</p>
                <p>Phone: ${user.phone}</p>
                <button onclick="showUserPosts(${user.id})">Show posts</button>
            `;
}

// Функция для отображения постов пользователя
async function showUserPosts(userId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        const posts = await response.json();
        const userDetails = document.getElementById('userDetails');
        const postsList = posts.map(post => `<li>${post.title}</li>`).join('');
        userDetails.innerHTML += `<ul>${postsList}</ul>`;
    } catch (error) {
        console.error('Ошибка при получении постов:', error);
    }
}

// Вызов функции для отображения пользователей при загрузке страницы
window.onload = displayUsers;