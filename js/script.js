'use strict'

document.addEventListener("DOMContentLoaded", () => {
    console.log('Скрипт отработал корректно')

    // * 1. Начало.
    // * 2. Получаем все элементы изображений с описанием.
    // * 3. Для каждого изображения (проверяем есть ли такие изображения):
    // * 3.1. Добавляем обработчик наведения курсора на изображение:
    // * 3.1.1. Да:
    // * 3.1.1.1. показываем текст при наведении.
    // * 3.1.2. Нет: продолжаем.
    // * 3.2. Добавляем обработчик курсор уходит с изображения:
    // * 3.3.1. Да:
    // * 3.3.1.1. Скрываем элемент с описанием.
    // * 3.3.2. Нет: продолжаем.
    // * 4. Конец
    const intensivelmg = document.querySelectorAll('.gallery__imj');
    intensivelmg.forEach((item, index) => {
        const intensiveText = document.querySelectorAll('.intensive__description');
        item.addEventListener('mouseenter', () => {
            item.style.opacity = 0.5;
            intensiveText[index].removeAttribute('hidden');
        });
        item.addEventListener('mouseleave', () => {
            item.style.opacity = 1;
            intensiveText[index].setAttribute('hidden', true);
        });
    });


    //Объявляем переменную welcоmeButtonModal и сохраняем в нее кнопку c классом welcome__button
    const welcоmeButtonModal = document.querySelector(".signin");
    //объявляем переменную modalApplication и сохраняем в нее модальное окно, которое хотим увидеть
    const modalApplication = document.querySelector(".applications");

    //Если есть такая кнопка и модальное окно
    if (welcоmeButtonModal && modalApplication) {
        //Для кнопки «Записаться на курс» добавляем обработчик события клика по этой кнопке:
        welcоmeButtonModal.addEventListener("click", () => {
            // удаляем атрибут hidden у модального окна modalApplication и модальное окно становится видимым
            modalApplication.removeAttribute("hidden");
        });
    }

    // добавляем обработчик события при клике вне области формы. Тогда каждый раз, когда пользователь кликает где-либо на фоне вокруг появившейся формы, будет вызываться функция,
    window.addEventListener("click", (event) => {
        // проверяем, был ли клик на фоне модального окна
        if (event.target === modalApplication) {
            //если условие выполняется, добавляем атрибут hidden у модального окна modalApplication и модальное окно становится невидимым
            modalApplication.setAttribute("hidden", true);
        }
    });

    //Объявляем переменную closeModalButton и сохраняем в нее кнопку c классом application__button
    const closeModalButton = document.querySelector(".application__close");
    closeModalButton.addEventListener("click", () => {
        modalApplication.setAttribute("hidden", true);
    });
    //Объявляем переменную headerMenu и сохраняем в нее header__menu
    const headerMenu = document.querySelector('.header__menu');
    // Если такой элемент существует
    if (headerMenu) {
        //Объявляем переменную headerList и сохраняем в нее header__list, чтобы мы могли добавить новые элементы
        const headerList = headerMenu.querySelector('.menu');

        //Создаем объект menuData, который содержит данные для трех ссылок меню.
        const menuData = {
            // Каждая ссылка содержит link (адрес ссылки; если ссылка никуда не ведет, то можно оставить #) и title (текст ссылки).
            link1: {
                UrlLink: 'about.html',
                title: 'О нас',
            },
            link2: {
                UrlLink: 'gallery.html',
                title: 'Галерея',
            },
            link3: {
                UrlLink: 'catalog.html',
                title: 'Каталог',
            },
            link4: {
                UrlLink: 'events.html',
                title: 'События',
            },
            link5: {
                UrlLink: 'index.html',
                title: 'Главная',
            }
        }

        //Создаем функцию createLink, которая будет добавлять ссылку в меню. Внутри функции 2 переменные: UrlLink – адрес, а title — текст ссылки.
        const createLink = (UrlLink, title) => {
            // создаем переменную  link, которая будет содержать HTML-код ссылки и вставляем в него 2 переменные
            const link = `
            <li class="menu__item"><a href="${UrlLink}" class="menu__link">${title}</a></li>
            `;
            return link;
        }

        // Создаем цикл for и проходим по всем элементам объекта menuData.
        for (const linkItem in menuData) {
            //Получаем данные для ссылки и сохраняем в переменную link.
            const link = menuData[linkItem];
            //Создаем переменную linkIndex и вызываем функцию createLink, куда передаем адрес и заголовок.
            const linkIndex = createLink(link.UrlLink, link.title);
            // С помощью метода insertAdjacentHTML добавляем созданный HTML-код в конец списка headerList.
            headerList.insertAdjacentHTML('beforeend', linkIndex);

        }
    }


    //3.6
    const cardsImages = document.querySelector(".images");
    if (cardsImages) {
        const cardListImages = cardsImages.querySelector(".images_list");

        // Пример URL для получения данных с сервера
        const apiUrl = "images.json";

        // Функция для создания карточки
        const createCard = (imageUrl, imageAlt, imageWidth) => {
            // Шаблонные строки и подстановки
            const image = `
        <li class="images__item">
            <img class="images__picture" src="${imageUrl[0]}" alt="${imageAlt}" width="${imageWidth}">
            <img class="images__picture" src="${imageUrl[1]}" alt="${imageAlt}" width="${imageWidth}" style="display: none;">
        </li>
    `;

            return image;
        };


        // Загрузка данных с сервера
        fetch(apiUrl)
            .then((response) => response.json())
            .then((images) => {
                console.log(images); // Данные
                console.log(typeof images); // Тип полученных данных

                images.forEach((item) => {
                    const cardElement = createCard(
                        item.imageUrl,
                        item.imageAlt,
                        item.imageWidth
                    );
                    cardListImages.insertAdjacentHTML("beforeend", cardElement);
                });
                const pictures = document.querySelectorAll(".images__picture");
                if (pictures) {
                    // Перебираем каждое изображение
                    pictures.forEach((picture) => {
                        picture.addEventListener("click", () => {
                            // Получаем родительский элемент (li)
                            const parentItem = picture.parentElement;

                            // Получаем все изображения в родительском элементе
                            const parentPictures =
                                parentItem.querySelectorAll(".images__picture");

                            // Переключаем видимость изображений
                            parentPictures.forEach((parentPictures) => {
                                if (parentPictures !== picture) {
                                    parentPictures.style.display = "block"; // Показываем другое изображение
                                } else {
                                    parentPictures.style.display = "none"; // Скрываем текущее изображение
                                }
                            });
                        });
                    });
                }

            });

    }
    const sliders = document.querySelector('.swiper');
    if (sliders) {
   const swiper1 = new Swiper(".mySwiper", {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    }
});
