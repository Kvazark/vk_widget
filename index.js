const widget = document.getElementById('widget');
const apiUrl = 'https://api.vk.com/method/wall.get';
const ownerId = '-72495085'; // Идентификатор паблика VK
const version = '5.131'; // Версия API VK
const count = 10; // Количество постов для загрузки
let offset = 0; // Смещение для загрузки следующей партии постов
let posts = [];
const token = '1d7ddd241d7ddd241d7ddd24da1e6b89e611d7d1d7ddd24782a8f85f2db81ff7d86fceb';
const domain = 'tnull';

function createJSONP() {
    const script = document.createElement('script');
    script.src = `${apiUrl}?owner_id=${ownerId}&count=${count}&offset=${offset}&extended=1&access_token=${token}&v=${version}&callback=loadPosts`;
    document.getElementsByTagName("head")[0].appendChild(script);
    script.remove();
}

function formattedDate(timestamp) {
    const dateObject = new Date(timestamp * 1000);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return dateObject.toLocaleDateString('ru-RU', options);
}

function renderPosts() {
    const widgetContainer = document.getElementById('list-posts');
    widgetContainer.innerHTML = '';

    posts.forEach((post) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const dateSpan = document.createElement('span');
        dateSpan.textContent = formattedDate(post.date);
        postElement.appendChild(dateSpan);

        const textElement = document.createElement('p');
        textElement.textContent = post.text;
        postElement.appendChild(textElement);

        const containetMedia = document.createElement('div');
        post.attachments.forEach((attachment) => {
            if (attachment.type === 'photo') {
                const photoElement = document.createElement('img');
                photoElement.src = attachment.photo.sizes[2].url;
                containetMedia.appendChild(photoElement);
            } else if (attachment.type === 'video') {
                const videoElement = document.createElement('iframe');
                videoElement.src = `https://www.youtube.com/embed/${attachment.video.id}`;
                videoElement.allowFullscreen = true;
                containetMedia.appendChild(videoElement);
            }
        });

        postElement.appendChild(containetMedia);
        widgetContainer.appendChild(postElement);
    });
}

function loadPosts(response) {
    const newPosts = response.response.items;

    if (newPosts.length > 0) {
        posts = [...posts, ...newPosts];
        renderPosts();
        offset += count;
    }
}
//////кэширование данных
function cachePosts() {
    const cachedPosts = JSON.parse(localStorage.getItem('posts'));

    if (cachedPosts) {
        posts = cachedPosts;
        renderPosts();
    } else {
        createJSONP();
    }
}
window.addEventListener('beforeunload', () => {
    localStorage.setItem('posts', JSON.stringify(posts));
});

///вывод в консоль объем использованной памяти в LocalStorage.
function getLocalStorageUsage() {
    const memoryUsed = JSON.stringify(localStorage).length;
    const memoryLimit = (5 * 1024 * 1024); // 5MB
    console.log(`${memoryUsed} / ${memoryLimit}`);
}

cachePosts();

////обработка события прокрутки документа (загрузка новых постов при прокрутке до конца виджета).
document.addEventListener('scroll', () => {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
        createJSONP();
    }
});

getLocalStorageUsage();