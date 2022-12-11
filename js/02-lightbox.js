import { galleryItems } from "./gallery-items.js";
// Change code below this line

// виборка елементів розмітки
const gelleryBox = document.querySelector(".gallery");
const galleryMarkup = createMarkupGallery(galleryItems);

gelleryBox.insertAdjacentHTML("beforeend", galleryMarkup);

// створення lightbox

const lightbox = new SimpleLightbox(".gallery a", { captionDelay: 250 });

// сет функцій

function createMarkupGallery(array) {
	return array
		.map(({ preview, original, description }) => {
			const markupItemGallery = `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" title="${description}" />
</a>`;
			return markupItemGallery;
		})
		.join("");
}
