/* eslint-disable react/jsx-pascal-case */
import { bindActionCreators } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect, useDispatch, useSelector } from "react-redux";
import { MovieModel } from "../../models/movieModel";
import "./currently_theaters.scss";
import { getNowPlaying } from "../../redux/actions/actions";
import { RootState } from "../../redux/reducer/rootReducer";
import MoviePoster from "../../components/movie_poster/movie_poster";

const CurrentlyTheaters: React.FC = () => {
  const now_playing = useSelector(
    (state: RootState) => state.movies.nowplaying
  );

  const [pagenum, setPageNum] = useState(1);

  const fetchMoreData = () => {
    setPageNum(pagenum + 1);
    console.log("PAGE NUMBER:" + pagenum);
    getNowPlaying(pagenum)(dispatch);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    getNowPlaying(pagenum)(dispatch);
  }, []);

  return (
    <div>
      <InfiniteScroll
        dataLength={now_playing.length}
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
          {now_playing.map((movie: MovieModel, index: number) => {
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
      getNowPlaying: getNowPlaying,
    },
    dispatch
  );
}

export default connect(mapDispatchToProps)(CurrentlyTheaters);
