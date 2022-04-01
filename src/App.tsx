/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react/jsx-no-undef */
import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FilterMovies from "./pages/filterMovies/filterMovies";
import MovieListByGenre from "./pages/movieListByGenre/movieListByGenre";
import PopularMovies from "./pages/popularMovies/popularMovies";
import SortMovies from "./pages/sortMovies/sortMovies";
import MovieDetail from "./pages/movieDetails/movieDetails";
import FavouritesPage from "./pages/favourites/favourites";
import Home from "./pages/home/home";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movies/favourite" element={<FavouritesPage />}></Route>
        <Route path="/movie/:id/:name" element={<MovieDetail />}></Route>
        <Route path="/movies" element={<PopularMovies />}></Route>
        <Route path="/sort" element={<SortMovies />}></Route>
        <Route path="/filter" element={<FilterMovies />}></Route>
        <Route
          path={"/movies/:genreName"}
          element={<MovieListByGenre />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
