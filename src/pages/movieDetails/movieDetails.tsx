/* eslint-disable jsx-a11y/alt-text */
import { connect, useDispatch, useSelector } from "react-redux";
import { img_baseUrl } from "../../http-common";
import "./movieDetails.scss";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import { bindActionCreators } from "@reduxjs/toolkit";
import { getMovieById, getMoviesByGenre, getSimilarMovies } from "../../redux/actions/actions";
import { RootState } from "../../redux/reducer/rootReducer";
import { MovieModel } from "../../models/movieModel";
import MoviePoster from "../../components/movie_poster/movie_poster";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GenreModel } from "../../models/genreModel";
import { saveToLocalStorage, FAV_MOVIES, removeItemFromStorage } from "../../utils/localStorage";

const MovieDetail = () => {
  const dispatch = useDispatch();
  const movie = useSelector((state: RootState) => state.movies.movie);
  const similar = useSelector((state: RootState) => state.movies.similar);
  const url = window.location.href;
  const genreNameSplittedList = url.split("/");
  const favMovies: any = JSON.parse(localStorage.getItem(FAV_MOVIES) || "[]");
  const favMoviesString = JSON.stringify(favMovies);
  const [isFav, setIsFav] = useState(false);

  function getMovieIdFromUrl() {
    console.log(url);
    console.log(genreNameSplittedList[4]);
    getMovieById(Number(genreNameSplittedList[4]))(dispatch);
  }

  function movieIsFavourite(movie: MovieModel) {
    if (favMoviesString !== "[]") {
      for (let i = 0; i < favMovies.length; i++) {
        if (favMovies.every((item: { id: number }) => item.id !== movie.id)) {
          saveToLocalStorage(FAV_MOVIES, movie)
          setIsFav(true);
        } else {
          removeItemFromStorage(movie.id)
          setIsFav(false);
        }
      }
    } else {
      saveToLocalStorage(FAV_MOVIES, movie)
      setIsFav(true);
    }
  }
  function movieIsFav(movie: MovieModel) {
    const favMovies: any = JSON.parse(localStorage.getItem(FAV_MOVIES) || "[]");
    const favMoviesString = JSON.stringify(favMovies);
    if (favMoviesString !== "[]") {
      for (let i = 0; i < favMovies.length; i++) {
        if (favMovies.every((item: { id: number }) => item.id !== movie.id)) {
          setIsFav(true);
        } else {
          setIsFav(false);
        }
      }
    } else {
      setIsFav(true);
    }
  }

  useEffect(() => {
    getMovieIdFromUrl();
    getSimilarMovies(Number(genreNameSplittedList[4]))(dispatch);
    movieIsFav(movie);
    console.log(similar);
  }, []);

  return (
    <div className="container">
      <Sidebar />
      <div className="movie-detail">
        <div className="movie-detail-poster">
          <img
            className="movie-detail-poster-img"
            src={img_baseUrl + movie?.poster_path}
          ></img>
          <div className="movie-detail-poster-title">{movie.title}</div>
          <div className="movie-detail-poster-genre">
            {/* {movie.genres.map((genre: GenreModel, index: number) => {
              return (
                <p className="movie-detail-poster-genre-txt" key={index}>
                  {genre.name}
                </p>
              );
            })} */}
          </div>
          <button 
            className="movie-detail-poster-button"
            onClick={() => movieIsFavourite(movie)}
          >
            {
             isFav ? 
              <><FaHeart className="movie-detail-poster-heart" /><p>Remove from favourite</p></>
              : 
              <><FaRegHeart className="movie-detail-poster-heart" /><p>Add to favourite</p></>
            }
          </button>
        </div>
        <div className="movie-detail-info">
          <img className="poster" src={img_baseUrl + movie?.poster_path}></img>
          <div className="movie-detail-info-first">
            <div className="movie-detail-info-second">
              <div className="movie-detail-info-sort">
                <p className="movie-detail-info-txt">Rating</p>
                <p className="movie-detail-info-data">{movie.vote_average}</p>
              </div>
              <div className="movie-detail-info-sort">
                <p className="movie-detail-info-txt">Year of release</p>
                <p className="movie-detail-info-data">{movie.release_date}</p>
              </div>
              <div className="movie-detail-info-sort">
                <p className="movie-detail-info-txt">Duration</p>
                <p className="movie-detail-info-data">{movie.runtime} min</p>
              </div>
            </div>
            <div className="movie-detail-info-third">
              <p className="movie-detail-info-txt">Storyline</p>
              <p className="movie-detail-info-txt-small">{movie.overview}</p>
            </div>
          </div>
        </div>

        <div className="movie-detail-similar">
          <p className="movie-detail-similar-txt">More like this</p>
          <div className="movie-detail-similar-row">
            {similar.map((movie: MovieModel, index: number) => {
              return (
                <MoviePoster
                  movie={movie}
                  isFromDetails={true}
                  key={index}
                ></MoviePoster>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      getMovieById: getMovieById,
      getSimilarMovies: getSimilarMovies,
    },
    dispatch
  );
}

export default connect(mapDispatchToProps)(MovieDetail);
