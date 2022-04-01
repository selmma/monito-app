import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { MovieModel } from "../../models/movieModel";
import MoviePoster from "../movie_poster/movie_poster";
import {
  clearMovieState,
  clearSearchState,
  getMovies,
  getSearchMovies,
} from "../../redux/actions/actions";
import { bindActionCreators } from "@reduxjs/toolkit";
import { RootState } from "../../redux/reducer/rootReducer";
import "./search.scss";
import InfiniteScroll from "react-infinite-scroll-component";

const SearchComponent = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [pagenum, setPageNum] = useState(2);
  const [pagenumSearch, setPageNumSearch] = useState(2);
  const searchedMovies = useSelector((state: RootState) => state.movies.search);
  const movies = useSelector((state: RootState) => state.movies.movies);

  const fetchMoreDataMovies = () => {
    setPageNum(pagenum + 1);
    console.log("PAGE NUMBER:" + pagenum);
    getMovies(pagenum)(dispatch);
  };

  const fetchMoreDataSearchedMovies = () => {
    setPageNumSearch(pagenumSearch + 1);
    console.log("PAGE NUMBER:" + pagenumSearch);
    getSearchMovies(pagenumSearch, query)(dispatch);
  };

  useEffect(() => {
    clearMovieState()(dispatch);
    if (query !== "") {
      const delayDebounceFn = setTimeout(() => {
        console.log(query);
        getSearchMovies(1, query)(dispatch);
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    } else {
      clearSearchState()(dispatch);
      getMovies(1)(dispatch);
    }
  }, [query]);

  return (
    <div className="search-overlay">
      {query === "" ? (
        <InfiniteScroll
          className="infinite-scroll"
          dataLength={movies.length}
          next={fetchMoreDataMovies}
          hasMore={true}
          loader={<div></div>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="search-input">
            <input
              className="placeholder"
              placeholder="Search title"
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            />
          </div>
          <div className="search-movies">
            {movies.map((movie: MovieModel, index: number) => {
              return <MoviePoster key={index} movie={movie}></MoviePoster>;
            })}
          </div>
        </InfiniteScroll>
      ) : (
        <InfiniteScroll
          className="infinite-scroll"
          dataLength={searchedMovies.length}
          next={fetchMoreDataSearchedMovies}
          hasMore={true}
          loader={<div></div>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="infinite-scroll-inside">
            <input
              className="placeholder"
              placeholder="Search title"
              onChange={(event) => {
                // setPageNum(1);
                setQuery(event.target.value);
              }}
            />
          </div>
          {searchedMovies.map((movie: MovieModel, index: number) => {
            return <MoviePoster key={index} movie={movie}></MoviePoster>;
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      getSearchMovies: getSearchMovies,
      getMovies: getMovies,
    },
    dispatch
  );
}

export default connect(mapDispatchToProps)(SearchComponent);
