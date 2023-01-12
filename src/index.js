import { fetchPictures } from './fetchPictures';
import renderMarkup from './renderMarkup';
import './css/styles.css';

const searchForm = document.querySelector('.search-form');
const input = document.querySelector('input');
const gallery = document.querySelector('.gallery');
const body = document.querySelector('body');
const container = document.querySelector('.container');
const btnLoadMore = document.querySelector('.btnLoadMore');
// console.log(searchForm);

searchForm.addEventListener('submit', onSearch);

let searchQuery = '';
let page = 1;
const perPage = 5;

// btnLoadMore.classList('visuallyhidden') = 'false';

function onSearch(e) {
  e.preventDefault();
  searchQuery = e.currentTarget.elements.searchQuery.value;

  if (searchQuery === '') {
    return;
  }

  searchPictures();

  // if (container.insertAdjacentHTML('beforeend', addLoadMoreBtn())) {
  //   return;
  // }

  container.insertAdjacentHTML('beforeend', addLoadMoreBtn());

  const btnLoadMore = document.querySelector('.btnLoadMore');
  btnLoadMore.addEventListener('click', onLoadMore);

  // perPage += 1;

  clearPictures();
}

// renderMarkup(images);

function searchPictures() {
  fetchPictures(searchQuery, page, perPage)
    .then(data => {
      gallery.insertAdjacentHTML('beforeend', renderMarkup(data.hits));
    })
    .then(data => {
      page += 1;
    })
    .catch(err => console.log(err));
}

function addLoadMoreBtn() {
  return `<button class='btnLoadMore' type="button">Load More</button>`;
}

function clearPictures() {
  gallery.innerHTML = '';
  // perPage = 0;
}

// btnLoadMore.addEventListener('click', onLoadMore);

function onLoadMore() {
  searchPictures();
}
