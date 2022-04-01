import { useDispatch, useSelector } from "react-redux";
import { img_baseUrl } from "../../http-common";
import { MovieModel } from "../../models/movieModel";
import { RootState } from "../../redux/reducer/rootReducer";
import "./movie_preview.scss";

import { useEffect } from "react";
import { getMovies } from "../../redux/actions/actions";
import Carousel from "nuka-carousel";
import React from "react";

const MoviePreview = (props: any): JSX.Element => {
  const dispatch = useDispatch();
  const movies: any = useSelector((state: RootState) => state.movies.movies);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const monito = require("../../assets/monito-logo-dark.svg").default;

  useEffect(() => {
    getMovies(1)(dispatch);
  }, []);

  return (
    <div>
      <Carousel autoplay={true} autoplayInterval={5000} wrapAround={true}>
        {movies.slice(0, 10).map((movie: MovieModel, index: number) => {
          return (
            <div key={index}>
              <img
                src={
                  movie?.poster_path !== null || movie?.poster_path !== ""
                    ? img_baseUrl + movie?.poster_path
                    : monito
                }
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
export default MoviePreview;
