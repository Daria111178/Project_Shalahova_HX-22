'use strict'

document.addEventListener("DOMContentLoaded", () => {
    console.log('Скрипт отработал корректно')
});

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
