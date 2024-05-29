function imageTemplate({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<li class="gallery">
      <a href=${largeImageURL}>
        <img src=${webformatURL} alt="${tags}" />
        <div class="info">
        <div class="info-rating">
        <h3>Likes</h3>
        <p>${likes}</p>
        </div>
        <div class="info-rating">
        <h3>Views</h3>
        <p>${views}</p>
        </div>
        <div class="info-rating">
        <h3>Comments</h3>
        <p>${comments}</p>
        </div>
        <div class="info-rating">
        <h3>Downloads</h3>
        <p>${downloads}</p>
        </div>
        </div>
        </a>
    </li>`;
}

export function imagesTemplate(images) {
  return images.map(imageTemplate).join('');
}
