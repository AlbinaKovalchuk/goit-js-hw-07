// Створи галерею з можливістю кліку по її елементах і перегляду повнорозмірного
//  зображення у модальному вікні.

// 1.+  Створи розмітку (зробила)
// 2.+  Реалізація делегування на div.gallery і отримання url великого зображення (зробила)
// 3.+  Підключення скрипту і стилів бібліотеки модального вікна basicLightbox.
//Використовуй CDN сервіс jsdelivr і додай у проект посилання на мініфіковані(.min) файли бібліотеки.(ЗРОБИЛА)
// 4. Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією і прикладами.
// 5.Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям.
//Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox.
// 6. Додай закриття модального вікна після натискання клавіші Escape. Зроби так, щоб прослуховування клавіатури було тільки доти, доки відкрите модальне вікно.
//  Бібліотека basicLightbox містить метод для програмного закриття модального вікна.

import { galleryItems } from './gallery-items.js';

const containerItems = document.querySelector('.gallery');
const itemsDivMarkup = createItemsMarkup(galleryItems);
containerItems.innerHTML = itemsDivMarkup;

containerItems.addEventListener('click', onGetBigImg);

function onGetBigImg(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  // === оголосити фукцію яка буде слухати Escape`и викликати instance.close()   ============
  // function onEscKeyPress(event) {
  //   if (event.code === 'Escape') {
  //     instance.close();
  //     return;
  //   }
  // }
//    або так..
  const onEscKeyPress = (event) => {
    if (event.code === 'Escape') {
      console.log('Ооо нажали Esc - все закрываю');
      instance.close();
      return;
    }
  };
  // // ============================================

  const url = event.target.dataset.source;
  const instance = basicLightbox.create(`<img width="1400" height="900" src=${url}>`, {
    onShow: (instance) => {
      window.addEventListener('keydown', onEscKeyPress);
       console.log('вішаю слухача Esc');
    },
    onClose: (instance) => {
      window.removeEventListener('keydown', onEscKeyPress);
      console.log('знімаю слухача Еsс');
    },
  });
  instance.show();
}

function createItemsMarkup(items) {
  return items
    .map(
      (item) =>
        `<div class="gallery__item">
        <a class="gallery__link" href=${item.original} >
          <img class="gallery__image"
          src=${item.preview}
          data-source=${item.original}
          alt=${item.description}/>
        </a>
      </div>`
    )
    .join('');
}

// ===========================================
// const arrayDiv = galleryItems.map((galleryItem) => {
//   const elemDiv = document.createElement('div');
//   elemDiv.classList.add('gallery__item');
//   const elemA = document.createElement('a');
//   elemA.classList.add('gallery__link');
//   elemA.href = galleryItem.original;
//   const elemImg = document.createElement('img');
//   elemImg.classList.add('gallery__image');
//   elemImg.src = galleryItem.preview;
//   elemImg.dataset.source = galleryItem.original;
//   elemImg.alt = galleryItem.description;

//   elemDiv.appendChild(elemA);
//   elemA.appendChild(elemImg);
//   return elemDiv;
// });
// containerItems.append(...arrayDiv);

// ===========================================

// function onShow(instance) {
//   containerItems.addEventListener('keydown', onEscKeyPress);
//   console.log('вішаю слухача Esc');
//   instance.show();
// }
// function onClose(instance) {
//   containerItems.removeEventListener('keydown', onEscKeyPress);
//   console.log('знімаю слухача Еsс');
//   instance.close();
// }

// function onEscKeyPress(event) {
//   console.log(event);
//   if (event.code === 'Escape') {
//     console.log('нажата клавиша Esc ');
//     onClose();
//     return;
//   }
// }
