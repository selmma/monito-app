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
import InfiniteScroll from "react-infinite-scroll-component";

const MovieListByGenre = ({
  genres,
  moviesByGenre,
}: any): JSX.Element => {
  const dispatch = useDispatch();
  const [genreName, setGenreName] = useState("");
  const [pagenum, setPageNum] = useState(1);
  const [genreId, setGenreId] = useState(0);

  function getGenreNameFromUrl() {
    const url = window.location.href;
    const genreNameSplittedList = url.split("/");
    setGenreName(genreNameSplittedList[4]);
    getGenreIdByName();
  }

  const fetchMoreData = () => {
    setPageNum(pagenum + 1);
    console.log("PAGE NUMBER:" + pagenum);
    getMoviesByGenre(genreId,pagenum)(dispatch);
  };

  function getGenreIdByName() {
    genres.map((genre: GenreModel) => {
      if (
        genre.name ===
        genreName.charAt(0).toUpperCase() + genreName.slice(1)
      ) {
        getMoviesByGenre(genre.id, 3)(dispatch);
        setGenreId(genre.id);
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
        <InfiniteScroll  className="infinite-scroll"
          dataLength={moviesByGenre.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<div></div>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }>

          <div className="genre-page-movie">
            {moviesByGenre.map((movie: MovieModel, index: number) => {
              return <Movie_poster movie={movie} key={index}></Movie_poster>;
            })}
          </div>
        </InfiniteScroll>
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
