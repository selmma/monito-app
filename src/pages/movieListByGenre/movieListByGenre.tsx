import { connect, useDispatch } from "react-redux";
import { GenreModel } from "../../models/genreModel";
import { useEffect } from "react";
import { useState } from "react";
import { getMoviesByGenre, sortMovies } from "../../redux/actions/actions";
import { bindActionCreators } from "redux";
import { MovieModel } from "../../models/movieModel";
import Sidebar from "../../components/sidebar/sidebar";
import "./movieListByGenre.scss";
import MoviePoster from "../../components/movie_poster/movie_poster";
import Movie_poster from "../../components/movie_poster/movie_poster";

const MovieListByGenre = ({
  genres,
  moviesByGenre,
  sortedMovies,
}: any): JSX.Element => {
  const dispatch = useDispatch();
  const [genreName, setGenreName] = useState("");

  function getGenreNameFromUrl() {
    const url = window.location.href;
    const genreNameSplittedList = url.split("/");
    setGenreName(genreNameSplittedList[4]);
    getGenreIdByName();
  }

  function getGenreIdByName() {
    genres.map((genre: GenreModel) => {
      if (
        genre.name ===
        genreName.charAt(0).toUpperCase() + genreName.slice(1)
      ) {
        getMoviesByGenre(genre.id, 3)(dispatch);
      }
      // eslint-disable-next-line react/jsx-key
      return <div></div>;
    });
  }
  useEffect(() => {
    getGenreNameFromUrl();
  }, [genreName, genres]);

  return (
    <div className="genre">
      <div className="genre-sidebar">
        <Sidebar />
      </div>
      <div className="genre-page">
        <div className="genre-page-name">{genreName}</div>
        <div className="genre-page-movie">
          {moviesByGenre.map((movie: MovieModel, index: number) => {
            return <Movie_poster movie={movie} key={index}></Movie_poster>;
          })}
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state: any) {
  return {
    moviesByGenre: state.movies.moviesByGenre,
    genres: state.movies.genres,
  };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      getMoviesByGenre: getMoviesByGenre,
      sortMovies: sortMovies,
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieListByGenre);
