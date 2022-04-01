import "./movie_poster.scss";
import { useNavigate } from "react-router-dom";
import { img_baseUrl } from "../../http-common";
import { FAV_MOVIES } from "../../utils/localStorage";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const MoviePoster = ({ movie, isFromDetails }: any): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const monito = require("../../assets/monito-logo-dark.svg").default;
  const navigate = useNavigate();
  const favMovies: any = JSON.parse(localStorage.getItem(FAV_MOVIES) || "[]");
  const favMoviesString = JSON.stringify(favMovies);

  function refreshPage() {
    window.location.reload();
  }

  function isFavMovie(movieId: number) {
    if (favMoviesString !== "[]") {
      for (let i = 0; i < favMovies.length; i++) {
        if (favMovies.every((item: { id: number }) => item.id !== movieId)) {
          return false;
        } else {
          return true;
        }
      }
    } else {
      return false;
    }
  }

  return (
    <div className="poser-overlay">
      {
        <div
          onClick={() => {
            if (isFromDetails) {
              navigate(`/movie/${movie?.id}/${movie?.title.toLowerCase()}`);
              refreshPage();
            } else {
              navigate(`/movie/${movie?.id}/${movie?.title.toLowerCase()}`);
            }
          }}
        >
          {movie !== undefined ? (
            <div className="poster-contener">
              <img
                className="poster"
                src={
                  movie?.poster_path !== null
                    ? img_baseUrl + movie?.poster_path
                    : monito
                }
              ></img>
              <div>
                {isFavMovie(movie.id) ? (
                  <div className="overlay">
                    <FaHeart className="poster-fav" />
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      }
    </div>
  );
};

export default MoviePoster;
