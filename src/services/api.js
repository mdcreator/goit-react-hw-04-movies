// import axios from 'axios';

// const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '14395659-9e9c935ac58e7e08d55a10421';
// axios.deaults.baseURL = BASE_URL;
// axios.deaults.params = {
//   key: API_KEY,
//   image_type: 'photo',
//   orientation: 'horizontal',
//   per_page: 12,
// };
// const getImages = async ({ q, page }) => {
//   try {
//     const { data } = await axios.get('', {
//       params: { q, page },
//     });
//     return data.hits;
//   } catch (error) {
//     console.log('error', { error });
//     return [];
//   }
// };
// export default {
//   getImages,
// };

const API_KEY = '9bc134247462ae6a5927de0341a3dea9';
const BASE_URL = 'https://api.themoviedb.org/3/';

function fetchTrending() {
  return fetch(`${BASE_URL}trending/movie/day?api_key=${API_KEY}`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(
        new Error(`Не удалось загрузить популярные фильмы`),
      );
    },
  );
}

function fetchQuery(query, page = 1) {
  return fetch(
    `${BASE_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=true`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Не удалось найти фильм по запросу "${query}"`),
    );
  });
}

function fetchMovieById(id) {
  return fetch(`${BASE_URL}movie/${id}?api_key=${API_KEY}&language=en-US`).then(
    response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(
        new Error(`Не удалось найти фильм с идентификатором "${id}"`),
      );
    },
  );
}

function fetchCreditsById(id) {
  return fetch(
    `${BASE_URL}movie/${id}/credits?api_key=${API_KEY}&language=en-US`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(
        `Не удалось найти информации о актёрском составе фильма с идентификатором "${id}"`,
      ),
    );
  });
}

function fetchReviewsById(id, page = 1) {
  return fetch(
    `${BASE_URL}movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=${page}`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Не удалось найти обзоры фильма с идентификатором "${id}"`),
    );
  });
}

const api = {
  fetchTrending,
  fetchQuery,
  fetchMovieById,
  fetchCreditsById,
  fetchReviewsById,
};

export default api;
