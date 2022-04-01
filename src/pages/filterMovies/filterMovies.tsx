import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoviePoster from "../../components/movie_poster/movie_poster";
import Sidebar from "../../components/sidebar/sidebar";
import { MovieModel } from "../../models/movieModel";
import { clearMovieState, getMovies } from "../../redux/actions/actions";
import { RootState } from "../../redux/reducer/rootReducer";
import "./filterMovies.scss";

const FilterMovies = () => {
  const year = new Date().getFullYear();
  const years = Array.from(new Array(100), (val, index) => year - index);
  const [selectedYear, setSelectedYear] = useState(null);
  const [filterVotes, setFilterVotes] = useState("_");
  const movies = useSelector((state: RootState) => state.movies.movies);
  const dispatch = useDispatch();

  function handleSelectChange(event: any) {
    setSelectedYear(event.target.value);
    console.log(event.target.value);
  }

  useEffect(() => {
    clearMovieState()(dispatch);
    getMovies(1)(dispatch);
  }, [year]);

  return (
    <div className="filter">
      <div className="filter-sidebar">
        <Sidebar />
      </div>
      <div className="filter-page">
        <div className="filter-page-row">
          <div className="filter-page-row-txt">
            Hm which year do you wanna check?
          </div>
          <select
            onChange={handleSelectChange}
            className="filter-page-row-select"
          >
            {years.map((year, index) => {
              return (
                <option
                  className="filter-page-row-select-option"
                  key={`year${index}`}
                  value={year}
                >
                  {year}
                </option>
              );
            })}
          </select>
          <div className="filter-page-movies">
            {movies
              .filter((movie: MovieModel) =>
                movie.release_date.includes(`${selectedYear}`)
              )
              .map((filteredMovie: MovieModel, index: number) => {
                return (
                  <MoviePoster key={index} movie={filteredMovie}></MoviePoster>
                );
              })}
          </div>
        </div>

        <div className="filter-page-row">
          <div className="filter-page-row-txt">And which movie rating</div>
          <input
            className="filter-page-row-input"
            placeholder="Filter by number of votes"
            onChange={(event) => {
              setFilterVotes(event.target.value);
            }}
          />
          <div className="filter-page-movies-column">
            {movies
              .filter((movie: MovieModel) =>
                movie.vote_count.toString().includes(`${filterVotes}`)
              )
              .map((filteredMovie: MovieModel, index: number) => {
                return (
                  <MoviePoster key={index} movie={filteredMovie}></MoviePoster>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterMovies;
