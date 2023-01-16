import { Notify } from 'notiflix/build/notiflix-notify-aio';

export { onEmpty, onFetchError, onSuccess, onEndSearch };

Notify.init({
  position: 'center-center',
  width: '500px',
  fontSize: '24px',
  distance: '10px',
  borderRadius: '10px',
});

function onEmpty() {
  return Notify.info('Enter your request, please.');
}

function onFetchError() {
  return Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function onSuccess(totalHits) {
  return Notify.success(`Hooray! We found ${totalHits} images.`);
}

function onEndSearch() {
  return Notify.info(
    "We're sorry, but you've reached the end of search results."
  );
}
