const widget = document.getElementById('widget');
const apiUrl = 'https://api.vk.com/method/wall.get?';
const ownerId = '-61817535'; // Идентификатор паблика VK
const version = '5.131'; // Версия API VK
const count = 10; // Количество постов для загрузки
let offset = 0; // смещение для загрузки следующей партии постов

// function loadPosts(offset, count) {
//     VK.Api.call('wall.get', {
//         owner_id: ownerId,
//         count: count,
//         offset: offset,
//         domain: 'https://vk.com/map_proger',
//         access_token: '1d7ddd241d7ddd241d7ddd24da1e6b89e611d7d1d7ddd24782a8f85f2db81ff7d86fceb',
//         v: version
//     },(response) => {
//         const posts = response.response.items;
//         renderPosts(posts);
//         // offsetGlobal += count;
//
//         // if (calculateLocalStorageSize() >= MAX_LOCAL_STORAGE_SIZE) {
//         //     cachedData.splice(0, 10);
//         // }
//         //
//         // cachedData = cachedData.concat(posts);
//         //
//         // saveLocalStorage('widgetPosts', cachedData);
//         // saveLocalStorage('widgetOffset', offsetGlobal);
//     });
//     // return new Promise((resolve, reject) => {
//     //     VK.Api.call('wall.get', {
//     //         owner_id: ownerId,
//     //         count: count,
//     //         offset: offset,
//     //         v: version
//     //     }, (response) => {
//     //         if (response.error) {
//     //             reject(response.error);
//     //         } else {
//     //             resolve(response.response.items);
//     //         }
//     //     });
//     // });
// }
//
// // Функция для отображения постов
// function renderPosts(posts) {
//     const widget = document.getElementById('widget');
//
//     posts.forEach(post => {
//         const postElement = document.createElement('div');
//         postElement.className = 'post';
//         postElement.textContent = post.text;
//         widget.appendChild(postElement);
//     });
// }
//
// // Функция для обработки прокрутки виджета
// function handleScroll(event) {
//     const { scrollHeight, scrollTop, clientHeight } = event.target;
//
//     if (scrollTop + clientHeight >= scrollHeight) {
//         loadMorePosts();
//     }
// }
//
// // Запускает подгрузку новых постов при прокрутке до конца виджета
// function loadMorePosts() {
//     offset += count;
//
//     loadPosts(offset, count)
//         .then(posts => {
//             renderPosts(posts);
//         })
//         .catch(error => {
//             console.error('Ошибка загрузки постов:', error);
//         });
// }
//
// // Получаем разрешение пользователя на доступ к его аккаунту
// // VK.Auth.login((response) => {
// //     if (response.session) {
// //         // Подгружаем посты при успешной авторизации
// //         loadPosts(offset, count)
// //             .then(posts => {
// //                 renderPosts(posts);
// //             })
// //             .catch(error => {
// //                 console.error('Ошибка загрузки постов:', error);
// //             });
// //     } else {
// //         console.error('Ошибка авторизации:', response.error);
// //     }
// // });
//
// widget.addEventListener('scroll', handleScroll);
// loadPosts();

/////////////////////////////////////////////////////
// VK.Auth.login((response) => {
//     if (response.status === 'connected') {
//         const token = response.session.access_token;
//         window.location.hash = `#access_token=${token}`;
//     }
// });
// console.log(window.location.hash)
// // const token = window.location.hash.split("=")[1].split("&")[0] //! токен авторизации для взаимодействия с апи
// const token = '1d7ddd241d7ddd241d7ddd24da1e6b89e611d7d1d7ddd24782a8f85f2db81ff7d86fceb';
// //! Установим области и переменные для работы виджета
// const postsList = document.querySelector('#list-posts'); //! блок постов
// let offset = 0; //! смещение для загрузки следующей партии постов
// let posts = []; //! массив постов для кэширования
//
// //! Загрузка постов из VK API
// function loadPosts() { //! объявляем функцию загрузки постов
//     const count = 10; //! количество постов для загрузки
//
//     VK.Api.call('wall.get', { //! запрос использует ключевые слова VK.Api.call для вызова метода получения постов первый аргумент это метод вызова второй параметры
//         owner_id: ownerId,
//         domain: 'https://vk.com/map_proger',
//         count: count,
//         offset: offset,
//         access_token: token,
//         v: 5.131
//     }, (r) => { //! обрабатываем ответ от апи
//         if (r.response) { //! проверка пришло ли нам что либо
//             const newPosts = r.response.items; //! задаём как массив объектов пришедший с апи
//             const html = newPosts //! создаём новый массив при помощи метода map который вернёт нам вёрстку новых элементов для дальнейших действий
//                 .map(
//                     (p) => `
//           <li class="vk-widget-post">
//             <div class="vk-widget-post-title">${p.text}</div>
//             <div class="vk-widget-post-date">${new Date(
//                         p.date * 1000
//                     ).toLocaleDateString()}</div>
//             <img class=ImgAll src=${p.attachments[0]['photo']?.sizes[4].url}
//           </li>
//         `
//                 )
//                 .join(''); //! соединяем верстку
//             postsList.insertAdjacentHTML('beforeend', html); //! добавляем посты в список
//
//             posts = posts.concat(newPosts); //! добавляем посты в массив для кэширования
//             offset += count; //! увеличиваем смещение
//             observer.observe(document.querySelector('.vk-widget-post:last-child')) //! Устанавливаем слежку за последним элементом
//         }
//     });
// }
//
// //! Обработка скроллинга
// const observer = new IntersectionObserver(posts => { //!! Взять с MDN
//     posts.forEach(post => { //! следим за тем как проходим по постам
//         if (post.isIntersecting) { //! если посты кончаются подгружаем новые
//             loadPosts(); //! вызываем функцию подргузки постов
//         }
//     });
// });
//
// //! Кэширование данных в localStorage
// function saveData() {
//     localStorage.setItem('posts', JSON.stringify(posts)); //! сохраняем массив постов в localStorage
//     localStorage.setItem('offset', offset); //! сохраняем смещение в localStorage
// }
//
// //! Загрузка кэшированных данных при перезагрузке страницы
// function loadData() {
//     const cachedPosts = localStorage.getItem('posts');
//     const cachedOffset = localStorage.getItem('offset');
//
//     if (cachedPosts) {
//         posts = JSON.parse(cachedPosts); //! загружаем массив постов из localStorage
//         offset = cachedOffset ? parseInt(cachedOffset) : 0; //! загружаем смещение из localStorage
//
//         const html = posts
//             .map(
//                 (p) => `
//         <li class="vk-widget-post">
//           <div class="vk-widget-post-title">${p.text}</div>
//           <div class="vk-widget-post-date">${new Date(
//                     p.date * 1000
//                 ).toLocaleDateString()}</div>
//           <img class=ImgAll src=${p.attachments[0]['photo']?.sizes[4].url}
//         </li>
//       `
//             )
//             .join('');
//         postsList.innerHTML = html; //! отображаем кэшированные посты в списке
//     }
// }
//
// //! Вытеснение старых данных при переполнении localStorage
// function evictData(postsToEvict) {
//     posts.splice(0, postsToEvict); //! удаляем старые посты из массива для кэширования
//
//     const remainingPosts = posts
//         .map(
//             (p) => `
//       <li class="vk-widget-post">
//         <div class="vk-widget-post-title">${p.text}</div>
//         <div class="vk-widget-post-date">${new Date(
//                 p.date * 1000
//             ).toLocaleDateString()}</div>
//         <img class=ImgAll src=${p.attachments[0]['photo']?.sizes[4].url}
//       </li>
//     `
//         )
//         .join('');
//     postsList.innerHTML = remainingPosts; //! отображаем оставшиеся посты в списке
// }
//
// //! Проверка на переполнение localStorage
// function checkLocalStorage() {
//     const currentSize = JSON.stringify(posts).length;
//
//     if (currentSize > 5000000) { //! максимальный размер, который мы можем хранить в localStorage
//         const postsToEvict = Math.round(posts.length / 2); //! вытесняем половину постов из массива
//         evictData(postsToEvict); //! удаляем старые посты из массива и списка
//         saveData(); //! сохраняем оставшуюся часть массива в localStorage
//     }
// }
//
// //! Запускаем виджет
// loadData(); //! загружаем кэшированные данные при перезагрузке страницы
// loadPosts(); //! загружаем первую партию постов
// setInterval(checkLocalStorage, 1000); //! проверяем localStorage каждые 1000 мсек
// Импортируем необходимые данные и инициализируем переменные
// function loadPosts() { //! объявляем функцию загрузки постов
//     console.log('fsdfdssd')
//     VK.Api.call('wall.get', { //! запрос использует ключевые слова VK.Api.call для вызова метода получения постов первый аргумент это метод вызова второй параметры
//         owner_id: ownerId,
//         domain: 'map_proger',
//         count: count,
//         offset: offset,
//         access_token: '1d7ddd241d7ddd241d7ddd24da1e6b89e611d7d1d7ddd24782a8f85f2db81ff7d86fceb',
//         v: version
//     }, (r) => { //! обрабатываем ответ от апи
//         if (r.response) { //! проверка пришло ли нам что либо
//             console.log(r.response)
//         }
//         console.log(r)
//     });
// }
const token = '1d7ddd241d7ddd241d7ddd24da1e6b89e611d7d1d7ddd24782a8f85f2db81ff7d86fceb';
const domain = 'map_proger';
function loadPosts() {
    fetch(`${apiUrl}callback=handleResponse&domain=${domain}&count=${count}&offset=${offset}&v=${version}&access_token=${token}`,{
        mode: 'no-cors',
    })
        .then(response => response.json())
        .then(data => {
            const newPosts = data.response.items;

            if (newPosts.length > 0) {
                posts = [...posts, ...newPosts];
                renderPosts();
                offset += count;
            }
        });
}

function renderPosts() {
    widget.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.textContent = post.text;
        widget.appendChild(postElement);
    });
}

function handleScroll() {
    const scrollTop = widget.scrollTop;
    const scrollHeight = widget.scrollHeight;
    const clientHeight = widget.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight) {
        loadPosts();
    }
}

function cachePosts() {
    const cachedPosts = JSON.parse(localStorage.getItem('widgetPosts'));

    if (cachedPosts) {
        posts = cachedPosts;
        renderPosts();
    } else {
        loadPosts();
    }
}

widget.addEventListener('scroll', handleScroll);

window.addEventListener('beforeunload', () => {
    localStorage.setItem('widgetPosts', JSON.stringify(posts));
});

cachePosts();