import { connect, useDispatch, useSelector } from "react-redux";
import "./popularMovies.scss";
import Sidebar from "../../components/sidebar/sidebar";
import Search from "../../components/search/search";

const PopularMovies: React.FC = () => {
  return (
    <div className="container">
      <div className="container-sidebar" >
      <Sidebar/>
      </div>
      <div className="container-poster">
        <Search />
      </div>
    </div>
  );
};

export default connect()(PopularMovies);
