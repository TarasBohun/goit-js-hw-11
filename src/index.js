import { fetchPictures } from './fetchPictures';
import renderMarkup from './renderMarkup';
import './css/styles.css';
import * as message from './showMessage';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// import simpleLightbox from 'simplelightbox';

const searchForm = document.querySelector('.search-form');
const searchBtn = document.querySelector('.search-btn');
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
    return message.onEmpty();
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

        return message.onFetchError();
      }

      gallery.insertAdjacentHTML('beforeend', renderMarkup(data.hits));

      new SimpleLightbox('a', {
        captionsData: 'alt',
        captionDelay: 250,
      });

      // SimpleLightbox.refresh();

      if (page === 1) {
        message.onSuccess(data.totalHits);
      }

      if (page > 1) {
        btnLoadMore.classList.remove('is-hidden');
      }

      searchBtn.disabled = false;

      if (data.total / perPage < page && page > 1) {
        return message.onEndSearch();
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
