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

const initialState = {
  movies: [],
  genres: [],
  upcoming: [],
  nowplaying: [],
  similar: [],
  search: [],
  movie: {},
  moviesByGenre: [],
  sortedMovies: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case GET_MOVIES:
      console.log(action.payload);
      return {
        ...state,
        movies: state.movies.concat(action.payload.movies),
      };
    case GET_GENRE:
      console.log(action.payload);
      return {
        ...state,
        genres: action.payload.genres,
      };
    case GET_UPCOMING:
      console.log(action.payload);
      return {
        ...state,
        upcoming: state.upcoming.concat(action.payload.upcoming),
      };
    case GET_NOWPLAYING:
      console.log(action.payload);
      return {
        ...state,
        nowplaying: state.nowplaying.concat(action.payload.nowplaying),
      };
    case GET_SIMILAR:
      console.log(action.payload);
      return {
        ...state,
        similar: state.similar.concat(action.payload.similar),
      };
    case GET_SEARCH:
      console.log(action.payload);
      return {
        ...state,
        search: state.search.concat(action.payload.search),
      };
    case GET_MOVIE_BY_ID:
      return {
        ...state,
        movie: action.payload.movie,
      };
    case GET_MOVIES_BY_GENRE:
      console.log(action.payload);
      return {
        ...state,
        moviesByGenre: state.moviesByGenre.concat(action.payload.moviesByGenre),
      };
    case SORT_MOVIES:
      console.log(action.payload);
      return {
        ...state,
        sortedMovies: state.sortedMovies.concat(action.payload.sortedMovies),
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        search: [],
      };
    case CLEAR_MOVIES:
      return {
        ...state,
        movies: [],
      };
    case CLEAR_SORT_MOVIES:
      return {
        ...state,
        sortedMovies: [],
      };
    default:
      return state;
  }
};
