import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export let currentPage = 1;
export const perPage = 15;

export async function getPhotos(q, currentPage) {
  const options = {
    params: {
      key: '44033528-44943d254def6182670dcc208',
      q,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: currentPage,
      per_page: perPage,
    },
  };
  const response = await axios.get('', options);
  return response.data;
}
