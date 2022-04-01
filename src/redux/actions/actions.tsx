import { apiKey, instance } from "../../http-common";
import {
  CLEAR_MOVIES,
  CLEAR_SEARCH,
  CLEAR_SORT_MOVIES,
  GET_GENRE,
  GET_MOVIES,
  GET_MOVIES_BY_GENRE,
  GET_MOVIE_BY_ID,
  GET_NOWPLAYING,
  GET_SEARCH,
  GET_SIMILAR,
  GET_UPCOMING,
  SORT_MOVIES,
} from "../actionNames";

//get list of all popular movies
export const getMovies = (data: number) => (dispatch: any) => {
  instance
    .get(`/movie/popular?api_key=${apiKey}&page=${data}`)
    .then((response) => {
      dispatch({
        type: GET_MOVIES,
        payload: {
          movies: response.data.results,
        },
      });
    });
};

//get all genre
export const getGenre = () => (dispatch: any) => {
  instance.get(`genre/movie/list?api_key=${apiKey}`).then((response) => {
    dispatch({
      type: GET_GENRE,
      payload: {
        genres: response.data.genres,
      },
    });
  });
};

//get upcoming movies
export const getUpcoming = (data: number) => (dispatch: any) => {
  instance
    .get(`/movie/upcoming?api_key=${apiKey}&page=${data}`)
    .then((response) => {
      dispatch({
        type: GET_UPCOMING,
        payload: {
          upcoming: response.data.results,
        },
      });
    });
};

//get movies which playing now
export const getNowPlaying = (data: number) => (dispatch: any) => {
  instance
    .get(`/movie/now_playing?api_key=${apiKey}&page=${data}`)
    .then((response) => {
      dispatch({
        type: GET_NOWPLAYING,
        payload: {
          nowplaying: response.data.results,
        },
      });
    });
};

//get similar movies by movie id
export const getSimilarMovies = (movieId: number) => (dispatch: any) => {
  instance
    .get(`/movie/${movieId}/similar?api_key=${apiKey}`)
    .then((response) => {
      dispatch({
        type: GET_SIMILAR,
        payload: {
          similar: response.data.results,
        },
      });
    });
};

//get search movies by name
export const getSearchMovies =
  (data: number, name: string) => (dispatch: any) => {
    instance
      .get(`/search/movie?api_key=${apiKey}&page=${data}&query=${name}`)
      .then((response) => {
        dispatch({
          type: GET_SEARCH,
          payload: {
            search: response.data.results,
          },
        });
      });
  };

// get movies by id
export const getMovieById = (data: number) => (dispatch: any) => {
  console.log(data);
  instance.get(`/movie/${data}?api_key=${apiKey}`).then((response) => {
    console.log(response);
    dispatch({
      type: GET_MOVIE_BY_ID,
      payload: {
        movie: response.data,
      },
    });
  });
};

//get movies by genre
export const getMoviesByGenre =
  (data: number, page: number) => (dispatch: any) => {
    instance
      .get(`/discover/movie?api_key=${apiKey}&with_genres=${data}&page=${page}`)
      .then((response) => {
        dispatch({
          type: GET_MOVIES_BY_GENRE,
          payload: {
            moviesByGenre: response.data.results,
          },
        });
      });
  };
// sort movies by title or year
export const sortMovies = (data: string, page: number) => (dispatch: any) => {
  console.log(data);
  instance
    .get(`/discover/movie?api_key=${apiKey}&sort_by=${data}&page=${page}`)
    .then((response) => {
      console.log(response);
      dispatch({
        type: SORT_MOVIES,
        payload: {
          sortedMovies: response.data.results,
        },
      });
    });
};

// clear search state
export const clearSearchState = () => (dispatch: any) => {
  dispatch({
    type: CLEAR_SEARCH,
    payload: {
      sortedMovies: [],
    },
  });
};

// clear movie state
export const clearMovieState = () => (dispatch: any) => {
  dispatch({
    type: CLEAR_MOVIES,
    payload: {
      movies: [],
    },
  });
};

// clear sort state
export const clearSortState = () => (dispatch: any) => {
  dispatch({
    type: CLEAR_SORT_MOVIES,
    payload: {
      sortedMovies: [],
    },
  });
};
