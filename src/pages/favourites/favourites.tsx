import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { MovieModel } from "../../models/movieModel";
import "./favourites.scss";
import { FAV_MOVIES, readDataFromLocalStorage } from "../../utils/localStorage";
import MoviePoster from "../../components/movie_poster/movie_poster";
import Sidebar from "../../components/sidebar/sidebar";

const FavouritesPage: React.FC = () => {
  const [favMovies, setFavMovies] = useState([]);

  useEffect(() => {
    checkForSavedFavourites();
  }, [setFavMovies]);

  function checkForSavedFavourites() {
    const savedFavourites: any = readDataFromLocalStorage(FAV_MOVIES) ?? [];
    setFavMovies(savedFavourites);
  }

  return (
    <div className="favourite">
      <div className="favourite-sidebar">
        <Sidebar />
      </div>
      <div className="favourite-page">
        <div className="favourite-page-txt">
          Well, this is the list of your favourite movies
        </div>
        <div className="favourite-page-movies">
          {favMovies.map((movie: MovieModel, index: number) => {
            return <MoviePoster movie={movie} key={index} id={movie.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default connect()(FavouritesPage);
