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
const perPage = 3;
let btnLoadMore = '';

function onSearch(e) {
  e.preventDefault();
  searchQuery = e.currentTarget.elements.searchQuery.value;

  searchBtn.disabled = true;

  page = 1;

  containerGallery.innerHTML = markupGallery();
  gallery = document.querySelector('.gallery');

  if (searchQuery === '') {
    return;
  }

  searchAddPictures();

  setTimeout(() => {
    createLoadMoreBtn();
  }, 500);
}

function searchAddPictures() {
  fetchPictures(searchQuery, page, perPage)
    .then(data => {
      gallery.insertAdjacentHTML('beforeend', renderMarkup(data.hits));
    })
    .then(data => {
      page += 1;
      searchBtn.disabled = false;
      btnLoadMore.disabled = false;
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
}

function markupLoadMoreBtn() {
  return `<div class='container-btn'><button class='btnLoadMore is-hidden' type="button">Load More</button></div>`;
}

function markupGallery() {
  return `<div class="gallery"></div>`;
}

function onLoadMore() {
  searchAddPictures();
  btnLoadMore.disabled = true;
}
