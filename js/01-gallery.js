import { galleryItems } from "./gallery-items.js";
// Change code below this line

// виборка елементів розмітки
const gelleryBox = document.querySelector(".gallery");
const galleryMarkup = createMarkupGallery(galleryItems);

gelleryBox.insertAdjacentHTML("beforeend", galleryMarkup);

// додаємо слухачів
gelleryBox.addEventListener("click", onGalleryItemClick);

// сет функцій

function createMarkupGallery(array) {
	return array
		.map(({ preview, original, description }) => {
			const markupItemGallery = `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
			return markupItemGallery;
		})
		.join("");
}

function onGalleryItemClick(evt) {
	evt.preventDefault();
	window.addEventListener("keydown", onEscPress); // вішаємо прослуховування з клавіатури при відкритій модалці
	const isGalleryBox = evt.target.classList.contains("gallery__image");
	if (!isGalleryBox) return;
	const urlItemGallery = evt.target.dataset.source;

	showOriginPicture(urlItemGallery);
}

let outerIstance; // оголошую зовнішє посилання на створений у функції Lightbox

function showOriginPicture(url) {
	const instance = basicLightbox.create(`
    <img src="${url}" width="800" height="600">
`);
	outerIstance = instance;
	instance.show();
}

// закриття модалки по клавіші Esc

function onEscPress(event) {
	const ESC_KEY_CODE = "Escape";

	if (event.code === ESC_KEY_CODE) {
		outerIstance.close();
	}
	window.removeEventListener("keydown", onEscPress); // знімаємо прослуховування з клавіатури при закриванні модалки
}
