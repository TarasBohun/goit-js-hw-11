import { fetchPictures } from './fetchPictures';
import renderMarkup from './renderMarkup';
import './css/styles.css';

const searchForm = document.querySelector('.search-form');
const searchBtn = document.querySelector('.search-btn');
// const container = document.querySelector('.container');
const containerGallery = document.querySelector('.container-gallery');

searchForm.addEventListener('submit', onSearch);

let searchQuery = '';
let page = null;
let gallery = '';
const perPage = 40;
let btnLoadMore = '';

function onSearch(e) {
  e.preventDefault();
  searchQuery = e.currentTarget.elements.searchQuery.value;
  searchQuery = searchQuery.trim();

  page = 1;

  containerGallery.innerHTML = markupGallery();
  gallery = document.querySelector('.gallery');

  if (!searchQuery) {
    return console.log('Enter your request, please.');
  }

  searchAddPictures();

  setTimeout(() => {
    createLoadMoreBtn();
  }, 500);
}

function searchAddPictures() {
  searchBtn.disabled = true;

  fetchPictures(searchQuery, page, perPage)
    .then(data => {
      if (data.hits.length === 0) {
        searchBtn.disabled = false;

        return console.log(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      gallery.insertAdjacentHTML('beforeend', renderMarkup(data.hits));

      if (page === 1) {
        console.log(`Hooray! We found ${data.totalHits} images.`);
      }

      if (page > 1) {
        btnLoadMore.classList.remove('is-hidden');
      }

      searchBtn.disabled = false;

      if (data.total / perPage < page) {
        return console.log(
          "We're sorry, but you've reached the end of search results."
        );
      }

      page += 1;
    })

    .catch(err => console.log(err));
}

function createLoadMoreBtn() {
  if (page !== 2) {
    return;
  }

  gallery.insertAdjacentHTML('afterend', markupLoadMoreBtn());

  btnLoadMore = document.querySelector('.btnLoadMore');
  btnLoadMore.addEventListener('click', onLoadMore);
  btnLoadMore.classList.remove('is-hidden');
}

function markupLoadMoreBtn() {
  return `<div class='container-btn'><button class='btnLoadMore is-hidden' type="button">Load More</button></div>`;
}

function markupGallery() {
  return `<div class="gallery"></div>`;
}

function onLoadMore() {
  searchAddPictures();
  btnLoadMore.classList.add('is-hidden');
}
