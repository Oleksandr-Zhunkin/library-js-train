import { getPhotos, currentPage, perPage } from './js/pixabay-api.js';
import { imagesTemplate } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconEr from './img/error.svg';
import iconWarn from './img/caution.svg';
import iconOk from './img/imgok.svg';
import iconHello from './img/hello.svg';

const formEl = document.querySelector('.js-form');
const galleryEl = document.querySelector('.js-gallery-list');
const loader = document.querySelector('.loader');
const loadBtn = document.querySelector('.js-load-more');
const loadText = document.querySelector('.js-text-load');

const lightbox = new SimpleLightbox('.gallery a');
let loadPage = currentPage;
let searchQuery = null;
let maxPages = 1;

formEl.addEventListener('submit', onSubmit);
loadBtn.addEventListener('click', onClick);
document.addEventListener('DOMContentLoaded', hello);

async function onSubmit(e) {
  e.preventDefault();

  searchQuery = e.currentTarget.elements.search.value.trim();

  if (searchQuery === '') {
    hideLoadBtn();
    return showError('Sorry, the input field cannot be empty!');
  }

  showLoading();

  try {
    loadPage = 1;
    const result = await getPhotos(searchQuery, loadPage);

    if (result.hits.length === 0) {
      hideLoadBtn();
      showError(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }
    if (result.totalHits !== 0) {
      showMessage(`We found ${result.totalHits} images for your request!`);
    }

    galleryEl.innerHTML = imagesTemplate(result.hits);

    maxPages = Math.ceil(result.totalHits / perPage);

    result.totalHits < 15 ? hideLoadBtn() : showLoadBtn();

    lightbox.refresh();
  } catch (error) {
    console.log(error);
  } finally {
    hideLoading();
    e.target.reset();
  }
}

async function onClick(e) {
  loadPage += 1;
  loader.classList.remove('visually-hidden');
  hideLoadBtn();
  showLoading();

  try {
    const result = await getPhotos(searchQuery, loadPage);

    galleryEl.insertAdjacentHTML('beforeend', imagesTemplate(result.hits));

    lightbox.refresh();

    if (loadPage === maxPages) {
      showCaution("We're sorry, but you've reached the end of search results.");
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoading();
    if (loadPage !== maxPages) {
      showLoadBtn();
    }
    loader.classList.add('visually-hidden');
    scrollPage();
  }
}

function showLoadBtn() {
  loadBtn.classList.remove('visually-hidden');
}

function hideLoadBtn() {
  loadBtn.classList.add('visually-hidden');
}

function showLoading() {
  loader.classList.remove('visually-hidden');
  loadText.classList.remove('visually-hidden');
}
function hideLoading() {
  loadText.classList.add('visually-hidden');
  loader.classList.add('visually-hidden');
}

function showError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    maxWidth: 360,
    position: 'topRight',
    iconUrl: iconEr,
    backgroundColor: '#ef4040',
    messageColor: '#fff',
  });
}

function showMessage(message) {
  iziToast.success({
    title: 'OK',
    message: message,
    maxWidth: 360,
    position: 'topRight',
    iconUrl: iconOk,
    backgroundColor: '#59a10d',
    messageColor: '#fff',
  });
}
function showCaution(message) {
  iziToast.warning({
    message: message,
    maxWidth: 360,
    position: 'topRight',
    iconUrl: iconWarn,
    backgroundColor: '#ffa000',
    messageColor: '#fff',
  });
}
function hello() {
  iziToast.info({
    message: 'Welcome to our website',
    maxWidth: 360,
    position: 'topRight',
    iconUrl: iconHello,
    backgroundColor: '#6c8cff',
    messageColor: '#fff',
  });
}
function scrollPage() {
  const pictureHeight =
    galleryEl.firstElementChild.getBoundingClientRect().height;

  window.scrollBy({
    top: pictureHeight * 2,
    behavior: 'smooth',
  });
}
