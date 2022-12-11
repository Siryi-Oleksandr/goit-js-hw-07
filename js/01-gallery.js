import { galleryItems } from "./gallery-items.js";
// Change code below this line

// виборка елементів розмітки
const gelleryBox = document.querySelector(".gallery");
const galleryMarkup = createMarkupGallery(galleryItems);

gelleryBox.insertAdjacentHTML("beforeend", galleryMarkup);
let instance; // оголошую змінну для створення Lightbox

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
	const isGalleryBox = evt.target.classList.contains("gallery__image");
	if (!isGalleryBox) return;
	const urlItemGallery = evt.target.dataset.source;

	showOriginPicture(urlItemGallery);
}

function showOriginPicture(url) {
	instance = basicLightbox.create(
		`
    <img src="${url}" width="800" height="600">
`,
		{
			onShow: instance => {
				window.addEventListener("keydown", onEscPress);
			},
			onClose: instance => {
				window.removeEventListener("keydown", onEscPress);
			},
		},
	);

	instance.show();
}

// закриття модалки по клавіші Esc

function onEscPress(event) {
	const ESC_KEY_CODE = "Escape";

	if (event.code === ESC_KEY_CODE) {
		instance.close();
		return;
	}
}
