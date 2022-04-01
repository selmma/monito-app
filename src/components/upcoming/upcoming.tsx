/* eslint-disable react/jsx-pascal-case */
import { bindActionCreators } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect, useDispatch, useSelector } from "react-redux";
import { MovieModel } from "../../models/movieModel";
import { getUpcoming } from "../../redux/actions/actions";
import { RootState } from "../../redux/reducer/rootReducer";
import MoviePoster from "../../components/movie_poster/movie_poster";

const Upcoming: React.FC = () => {
  const upcoming = useSelector((state: RootState) => state.movies.upcoming);

  const [pagenum, setPageNum] = useState(1);

  const fetchMoreData = () => {
    setPageNum(pagenum + 1);
    console.log("PAGE NUMBER:" + pagenum);
    getUpcoming(pagenum)(dispatch);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    getUpcoming(pagenum)(dispatch);
  }, []);

  return (
    <div>
      <InfiniteScroll
        dataLength={upcoming.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<div></div>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="row">
          {upcoming.map((movie: MovieModel, index: number) => {
            return <MoviePoster movie={movie} key={index}></MoviePoster>;
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
};

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      getUpcoming: getUpcoming,
    },
    dispatch
  );
}

export default connect(mapDispatchToProps)(Upcoming);
