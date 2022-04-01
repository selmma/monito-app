import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { clearSortState, sortMovies } from "../../redux/actions/actions";
import { bindActionCreators } from "@reduxjs/toolkit";
import { RootState } from "../../redux/reducer/rootReducer";
import { MovieModel } from "../../models/movieModel";
import MoviePoster from "../../components/movie_poster/movie_poster";
import Sidebar from "../../components/sidebar/sidebar";
import "./sortMovies.scss";
import InfiniteScroll from "react-infinite-scroll-component";

const TITLE_ASC = "original_title.asc";
const TITLE_DESC = "original_title.desc";
const YEAR_ASC = "primary_release_date.asc";
const YEAR_DESC = "primary_release_date.desc";

const SortMovies = () => {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState("");
  const [pagenum, setPageNum] = useState(2);

  const sortedMovies = useSelector(
    (state: RootState) => state.movies.sortedMovies
  );

  const fetchMoreData = () => {
    setPageNum(pagenum + 1);
    console.log("PAGE NUMBER:" + pagenum);
    sortMovies(sortBy, pagenum)(dispatch);
  };

  useEffect(() => {
    setPageNum(2);
    clearSortState()(dispatch);
    sortMovies(sortBy, 1)(dispatch);
  }, [sortBy]);

  return (
    <div className="sort">
      <div className="sort-sidebar">
        <Sidebar />
      </div>
      <div className="sort-page">
        <div className="sort-page-buttons">
          <button
            className="sort-page-buttons-one"
            onClick={() => {
              setSortBy(TITLE_ASC);
            }}
          >
            Sort By Title Ascending
          </button>
          <button
            className="sort-page-buttons-one"
            onClick={() => {
              setSortBy(TITLE_DESC);
            }}
          >
            Sort By Title Descending
          </button>
          <button
            className="sort-page-buttons-one"
            onClick={() => {
              setSortBy(YEAR_ASC);
            }}
          >
            Sort By Release date Ascending
          </button>
          <button
            className="sort-page-buttons-one"
            onClick={() => {
              setSortBy(YEAR_DESC);
            }}
          >
            Sort By Release date Descending
          </button>
        </div>
        <div className="sort-page-movies">
          <InfiniteScroll
            className="infinite-scroll"
            dataLength={sortMovies.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<div></div>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {sortedMovies.map((movie: MovieModel, index: number) => {
              return <MoviePoster key={index} movie={movie} />;
            })}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      sortMovies: sortMovies,
    },
    dispatch
  );
}

export default connect(mapDispatchToProps)(SortMovies);
