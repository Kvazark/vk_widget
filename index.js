const widget = document.getElementById('widget');
const apiUrl = 'https://api.vk.com/method/wall.get';
const ownerId = '-72495085'; // Идентификатор паблика VK
const version = '5.131'; // Версия API VK
const count = 10; // Количество постов для загрузки
let offset = 0; // смещение для загрузки следующей партии постов
let posts = [];
const token = '1d7ddd241d7ddd241d7ddd24da1e6b89e611d7d1d7ddd24782a8f85f2db81ff7d86fceb';
const domain = 'tnull';

function createJSONP() {
    const script = document.createElement('SCRIPT');
    script.src = `http://api.vk.com/method/wall.get?owner_id=${ownerId}&count=${count}&offset=${offset}&&extended=1&&access_token=${token}&v=${version}&callback=loadPosts`;
    document.getElementsByTagName("head")[0].append(script);
    script.remove()
}

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



// function calcLocal() {
//     let n = ''
//     let free = ''
//     let value = ''
//     for (let i = 0; i < 1024 * 100; i++) n += 1
//     try {
//         for (let j = 0; j < 10500; j += 100) {
//             free += n
//             localStorage.setItem('local storage', free)
//             console.log('calculating...');
//         }
//     } catch (e) {
//         for (let k in localStorage) {
//             if (typeof localStorage[k] === 'string') value += localStorage[k]
//         }
//         localStorage.removeItem('local storage')
//         console.log('local storage', `Total: ${(value.length / 1024000).toFixed(0)}/${(value.length / 1024000 - (free.length - 100) / 1024000).toFixed(1)} MB`)
//     }
// }

// list.addEventListener('scroll', () => {
//     let scrolled = list.scrollTop / (list.scrollHeight - list.clientHeight) * 100
//     if (scrolled >= 99.999) {
//         toggle = false
//         createJSONP()
//     }
// })

// function loadPosts(result) {
//     const newPosts = result.response.items;
//
//     if (newPosts.length > 0) {
//         posts = [...posts, ...newPosts];
//         renderPosts();
//         offset += count;
//     }
//     renderPosts(result);
//     // const {items, groups} = result.response
//     // console.log(result.response)
//     // try {
//     //     if (localStorage.getItem('store') && toggle) {
//     //         JSON.parse(localStorage.getItem('store')).map(e => {
//     //             list.insertAdjacentHTML('beforeend', createPost(e, groups[0]))
//     //         })
//     //     } else if(!localStorage.getItem('store')) {
//     //         localStorage.setItem('store', JSON.stringify(items))
//     //         JSON.parse(localStorage.getItem('store')).map(e => {
//     //             list.insertAdjacentHTML('beforeend', createPost(e, groups[0]))
//     //         })
//     //     } else {
//     //         localStorage.setItem('store', JSON.stringify([].concat(JSON.parse(localStorage.getItem('store')), items)))
//     //         localStorage.setItem('offset', offset = Number(offset) + 20)
//     //         items.map(e => {
//     //             list.insertAdjacentHTML('beforeend', createPost(e, groups[0]))
//     //         })
//     //     }
//     // } catch(e) {
//     //     console.log('Overload');
//     //     let cut = JSON.parse(localStorage.getItem('store'))
//     //     cut.splice(0,40)
//     //     localStorage.setItem('store', JSON.stringify([].concat(cut, items)))
//     //     localStorage.setItem('offset', offset = Number(offset) + 20)
//     //     JSON.parse(localStorage.getItem('store')).map(e => {
//     //         list.insertAdjacentHTML('beforeend', createPost(e, groups[0]))
//     //     })
//     //     list.scroll(0, list.scrollHeight - list.clientHeight - 5000)
//     // }
// }

// function loadPosts() {
//    // const url = 'https://api.vk.com/method/wall.get?callback=handleResponse&domain=map_proger&count=10&offset=&v=5.131&access_token=1d7ddd241d7ddd241d7ddd24da1e6b89e611d7d1d7ddd24782a8f85f2db81ff7d86fceb'
//     const url = `${apiUrl}?callback=${handleResponse}&domain=${encodeURIComponent(domain)}&count=${count}&offset=${offset}&v=${version}&access_token=${encodeURIComponent(token)}`
//     fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             const newPosts = data.response.items;
//
//             if (newPosts.length > 0) {
//                 posts = [...posts, ...newPosts];
//                 renderPosts();
//                 offset += count;
//             }
//         })
//         .catch(error => {
//             console.error('Ошибка при выполнении запроса:', error);
//         });
// }
// function createPost(e, group) {
//     return `
//   <article>
//     <div class="title">
//       <div class="icon"><img src="${group.photo_50}"/></div>
//       <div class="name">
//         <span>${group.name}</span>
//         <span>${new Date(e.date * 1000).toLocaleDateString()}</span>
//       </div>
//     </div>
//     <div class="text">${e.text}</div>
//     <div class="media">
//     ${e.attachments.length ? e.attachments.map(p => {
//         if (p.type === 'photo') return `<div><img src="${p.photo.sizes[2].url}"></div>`
//         if (p.type === 'video') return `<div><img src="${p.video.image[2].url}"></div>`
//     }).join('') : ''}
//     </div>
//     <div class="info">
//       <div class="info-wrapper">
//         <div class="like">
//           <span class="material-symbols-outlined">favorite</span>
//           <span>${e.likes.count}</span>
//         </div>
//         <div class="comment">
//           <span class="material-symbols-outlined">chat_bubble</span>
//         </div>
//         <div class="reply">
//           <span class="material-symbols-outlined">reply</span>
//           <span>${e.reposts.count}</span>
//         </div>
//       </div>
//       <div class="view">
//         <span class="material-symbols-outlined">visibility</span>
//         <span>${e.views.count}</span>
//       </div
//     </div>
//   </article>`
// }

///////////////////////////////////////////
// function renderPosts() {
//     widget.innerHTML = '';
//
//     posts.forEach(post => {
//         const postElement = document.createElement('div');
//         postElement.classList.add('post');
//         postElement.textContent = post.text;
//         widget.appendChild(postElement);
//     });
// }
//
// function handleScroll() {
//     const scrollTop = widget.scrollTop;
//     const scrollHeight = widget.scrollHeight;
//     const clientHeight = widget.clientHeight;
//
//     if (scrollTop + clientHeight >= scrollHeight) {
//         createJSONP();
//     }
// }
//
// function cachePosts() {
//     const cachedPosts = JSON.parse(localStorage.getItem('widgetPosts'));
//
//     if (cachedPosts) {
//         posts = cachedPosts;
//         renderPosts();
//     } else {
//         createJSONP();
//     }
// }
//
// widget.addEventListener('scroll', handleScroll);
//
// window.addEventListener('beforeunload', () => {
//     localStorage.setItem('widgetPosts', JSON.stringify(posts));
// });
//
// cachePosts();
///////////////////////////

function formattedDate(str){
    var year = str.getFullYear();
    var month = ('0' + (str.getMonth() + 1)).slice(-2);
    var day = ('0' + str.getDate()).slice(-2);
    var hours = ('0' + str.getHours()).slice(-2);
    var minutes = ('0' + str.getMinutes()).slice(-2);
    var newDate = day + '.' + month + '.' + year + 'г. '  + hours + ':' + minutes;
    return newDate;

}
// Функция отображения постов в виджете
function renderPosts() {
    const widgetContainer = document.getElementById('list-posts');
    widgetContainer.innerHTML = '';
    console.log(posts)

    posts.forEach((post) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        // Отображаем даты поста
        const dateSpan = document.createElement('span');
        var timestamp = post.date;
        var date = new Date(timestamp * 1000);
        dateSpan.textContent = formattedDate(date);
        postElement.appendChild(dateSpan);

        // Отображаем текст поста
        const textElement = document.createElement('p');
        textElement.textContent = post.text;
        postElement.appendChild(textElement);

        // Отображаем медиа-контент (картинки и видео)
        const containetMedia = document.createElement('div');
        post.attachments.forEach((attachment) => {
            if (attachment.type === 'photo') {

                const photoElement = document.createElement('img');
                photoElement.src = attachment.photo.sizes[2].url;
                containetMedia.appendChild(photoElement)
                postElement.appendChild(containetMedia);
            } else if (attachment.type === 'video') {
                const videoElement = document.createElement('iframe');
                videoElement.src = `https://www.youtube.com/embed/${attachment.video.id}`;
                videoElement.allowFullscreen = true;
                containetMedia.appendChild(videoElement);
                postElement.appendChild(containetMedia);
            }
        });

        widgetContainer.appendChild(postElement);
    });
}
// Функция загрузки постов
function loadPosts(response) {
    const newPosts = response.response.items;

    if (newPosts.length > 0) {
        // Обрабатываем новые посты
        handlePosts(newPosts);
        offset += count;
    }
}
function handlePosts(newPosts) {
    // Обрабатываем полученные посты
    posts = [...posts, ...newPosts];
    renderPosts();
}

// Функция кэширования данных
function cachePosts() {
}

// Функция инициализации виджета
function initWidget() {
    cachePosts();
    if (posts.length === 0) {
        createJSONP();
    } else {
        renderPosts();
    }
}
// Вызываем функцию инициализации виджета при загрузке страницы
window.addEventListener('DOMContentLoaded', initWidget);