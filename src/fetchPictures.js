import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32774194-792e23631cb879969b998331a';

export async function fetchImages(searchQuery, page, perPage) {
  try {
    const { data } = await axios.get(
      `${BASE_URL}?key=${KEY}&q=${searchQuery}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    // console.log(data);
    // console.log({ data });

    return data;
  } catch (error) {
    console.log(error);
  }
}
