import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32774194-792e23631cb879969b998331a';

export async function fetchPictures(searchQuery, page, perPage) {
  try {
    const url = `${BASE_URL}?key=${KEY}&q=${searchQuery}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`;
    const { data } = await axios.get(url);
    // console.log(data);
    // console.log({ data });
    // page += 1;

    return data;
  } catch (error) {
    console.log(error);
  }
}
