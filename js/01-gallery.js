// Створи галерею з можливістю кліку по її елементах і перегляду повнорозмірного
//  зображення у модальному вікні.

// 1. Створи розмітку
// 2. повесить слушателя на контейнер з зображеннями(div.gallery)
// 3. по кліку виводить модальне вікно з великим зображенням
// 4.  по кліку  або по "Escape" на великому зображенні закривається
// Додай закриття модального вікна після натискання клавіші Escape.
// Зроби так, щоб прослуховування клавіатури було тільки доти, доки відкрите модальне вікно.
// Бібліотека basicLightbox містить метод для програмного закриття модального вікна.

import { galleryItems } from './gallery-items.js';

const containerItems = document.querySelector('.gallery');

// console.log(containerItems);

const arrayDiv = galleryItems.map((galleryItem) => {
  const elemDiv = document.createElement('div');
  elemDiv.classList.add('gallery__item');
  const elemA = document.createElement('a');
  elemA.classList.add('gallery__link');
  elemA.href = galleryItem.original;
  const elemImg = document.createElement('img');
  elemImg.classList.add('gallery__image');
  elemImg.src = galleryItem.preview;
  elemImg.dataset.source = galleryItem.original;
  elemImg.alt = galleryItem.description;

  elemDiv.appendChild(elemA);
  elemA.appendChild(elemImg);
  return elemDiv;
});
containerItems.append(...arrayDiv);

const itemsBigImg = document.querySelectorAll('img');
console.log(containerItems);
console.log(itemsBigImg);
//
containerItems.addEventListener('click', onOpenImg);

function onOpenImg(event) {
  event.preventDefault();
  //  если клик не на картинке не запускать basicLightbox
  if (event.target.nodeName !== 'IMG') {
    return;
  }
  // console.log('url великого зображення',event.target.dataset.source);
  const instance = basicLightbox.create(
    `<img width="1400" height="900" src=${event.target.dataset.source}>`
  );
  instance.show();

  containerItems.addEventListener('keydown', (event) => {
    if (event.code === 'Escape') {
      instance.close();
      return;
    }
  });
}
