/* eslint-disable react/no-children-prop */
import { useEffect, useState } from "react";
import { FaListUl, FaRegHeart } from "react-icons/fa";
import { BsSortUpAlt } from "react-icons/bs";
import { GoSearch } from "react-icons/go";
import { HiOutlineFilter } from "react-icons/hi";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Offcanvas, OffcanvasProvider, Trigger } from "react-simple-offcanvas";
import { GenreModel } from "../../models/genreModel";
import "./sidebar.scss";
import { getGenre } from "../../redux/actions/actions";

const Sidebar = ({ props }: any) => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const monito = require("../../assets/monito-logo-light.svg").default;
  const [genreClicked, setGenreClicked] = useState(false);
  const dispatch = useDispatch();

  const styles = {
    container: {
      width: "40px",
      height: "100vh",
      backgroundColor: "rgba(67, 97, 238, 0.6)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontWeight: "bold",
    },
    body: {
      width: "20vw",
      height: "100vh",
      backgroundColor: "rgba(67, 97, 238)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontWeight: "bold",
    },
  } as const;

  function refreshPage() {
    window.location.reload();
  }

  useEffect(() => {
    getGenre()(dispatch);
  }, []);

  return (
    <OffcanvasProvider>
      <Trigger className="side-menu" component="div" styles={styles.container}>
        <img className="logo" src={monito} alt=""></img>
        <FaRegHeart className="icon" />
        <GoSearch className="icon" />
        <BsSortUpAlt className="icon" />
        <HiOutlineFilter className="icon" />
        <FaListUl className="icon" />
      </Trigger>
      <Offcanvas
        styles={styles.body}
        position="left"
        title={""}
        children={
          <div className="sidebar-scroll">
            <div onClick={() => navigate(`/`)} className="logo-inside">
              <img className="logo-inside" src={monito} alt=""></img>
            </div>
            <div onClick={() => navigate(`/movies/favourite`)}>
              <FaRegHeart className="icon" />
            </div>
            <div onClick={() => navigate(`/movies`)}>
              <GoSearch className="icon" />
            </div>
            <div onClick={() => navigate(`/sort`)}>
              <BsSortUpAlt className="icon" />
            </div>
            <div onClick={() => navigate(`/filter`)}>
              <HiOutlineFilter className="icon" />
            </div>
            <FaListUl
              className="icon"
              onClick={() =>
                genreClicked ? setGenreClicked(false) : setGenreClicked(true)
              }
            />
            {genreClicked ? (
              props.map((item: GenreModel, index: number) => {
                return (
                  <div key={index} className="genre-list">
                    <p
                      onClick={() => {
                        navigate(`/movies/${item.name.toLowerCase()}`);
                        refreshPage();
                      }}
                    >
                      {item.name}
                    </p>
                  </div>
                );
              })
            ) : (
              <div></div>
            )}
          </div>
        }
      ></Offcanvas>
    </OffcanvasProvider>
  );
};

function mapStateToProps(state: any) {
  return {
    props: state.movies.genres,
  };
}

export default connect(mapStateToProps)(Sidebar);
