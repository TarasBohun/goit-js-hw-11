import { fetchImages } from './fetchPictures.js';

const searchForm = document.querySelector('.search-form');
const input = document.querySelector('input');
const gallery = document.querySelector('.gallery');

searchForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const inputValue = input.value;
  //   console.log(inputValue);

  fetchImages(inputValue, 5, 10)
    .then(data => {
      //   console.log(data.hits);
      gallery.innerHTML = renderMarkup(data.hits);
    })
    .catch(err => console.log(err));
}

function renderMarkup(images = []) {
  //   console.log(images);
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes${likes}</b>
    </p>
    <p class="info-item">
      <b>Views${views}</b>
    </p>
    <p class="info-item">
      <b>Comments${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads${downloads}</b>
    </p>
  </div>
</div>`;
      }
    )
    .join('');
}
