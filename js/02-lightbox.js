import { galleryItems } from './gallery-items.js';
// Change code below this line

// Метод insertAdjacentHTML(додає) Сучасний метод для додавання рядка з HTML-тегами перед, після або всередину елемента.
// Вирішує проблему innerHTML(перезприсує)  з повторною серіалізацією вмісту елемента під час додавання розмітки до вже існуюч

const list = document.querySelector('.gallery');
const listItemsMarkup = createListItemsMarkup(galleryItems);

list.innerHTML = listItemsMarkup;

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  animationSpeed: 800,
});


function createListItemsMarkup(items) {
  return items
    .map(
      (item) => `<li> <a class="gallery__item" href=${item.original}>
  <img class="gallery__image" src=${item.preview} alt=${item.description}/>
</a></li>`
    )
    .join('');
}

