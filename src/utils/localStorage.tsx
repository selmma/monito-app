import { MovieModel } from "../models/movieModel";

export const readDataFromLocalStorage = (storageName: string) => {
  const saved: any = localStorage.getItem(storageName);
  const savedParsed: MovieModel[] = JSON.parse(saved);
  console.log(savedParsed);
  return savedParsed;
};

// [storageName] - name of the storage property
// [data] - data that will be saved in storage
export const saveToLocalStorage = (storageName: string, data: MovieModel) => {
  const favMovies: any = JSON.parse(localStorage.getItem(FAV_MOVIES) || "[]");
  const favMoviesString = JSON.stringify(favMovies);
  if (favMoviesString !== "[]") {
    for (let i = 0; i < favMovies.length; i++) {
      if (favMovies.every((item: { id: number }) => item.id !== data.id)) {
        addMovieToStorage(favMovies, data, storageName);
      }
    }
  } else {
    addMovieToStorage(favMovies, data, storageName);
  }
};

function addMovieToStorage(
  favMovies: any,
  data: MovieModel,
  storageName: string
) {
  favMovies = favMovies.concat(data);
  console.log(favMovies);
  localStorage.setItem(storageName, JSON.stringify(favMovies));
  console.log("Item saved to local storage by name: " + storageName);
}
export const removeItemFromStorage = (movieID: number) => {
  const favMovies: any[] = JSON.parse(localStorage.getItem(FAV_MOVIES) || "[]");
  const favMoviesString = JSON.stringify(favMovies);
  if (favMoviesString !== '[]') {
    for (var i = 0; i < favMovies.length; i++) {
      const favFiltered = favMovies.filter((item: MovieModel) => item.id !== movieID);
      console.log(favFiltered);
      localStorage.clear();
      localStorage.setItem(FAV_MOVIES, JSON.stringify(favFiltered));
    }
  }
}

export const clearAllItemsFromLocalStorage = () => {
  localStorage.clear();
}

export const FAV_MOVIES = "fav_movies";
