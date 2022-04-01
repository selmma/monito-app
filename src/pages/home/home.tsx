import React from "react";
import Currently_theaters from "../../components/currently_theaters/currently_theaters";
import MoviePreview from "../../components/movie_preview/movie_preview";
import Sidebar from "../../components/sidebar/sidebar";
import Upcoming from "../../components/upcoming/upcoming";

const Home = () => {
  return (
    <>
      <div className="movies">
        <div className="movies-sidebar">
          <Sidebar />
        </div>
        <div className="movies-main">
          <div className="movies-main-fav">
            <MoviePreview />
          </div>
          <div className="movies-main-row">
            <div className="movies-main-row-label">Currently in theaters</div>
            <div className="movies-main-row-movies">
              <Currently_theaters />
            </div>
          </div>
          <div className="movies-main-row">
            <div className="movies-main-row-label">Upcoming movies</div>
            <div className="movies-main-row-movies">
              <Upcoming />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
