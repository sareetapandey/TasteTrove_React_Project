import { Button } from "antd";
import Header from "../comman/Header";
import { Link } from "react-router-dom";
import NavBar from "../comman/NavBar";
const Home = () => {
  return (
    <div>
      <NavBar />
      <Header title="Our Recipes" bgClass="bg-image">
        <Link to="/meal">
          <Button
            type="primary"
            size="big"
            style={{ background: "#1890ff", color: "#fff" }}
          >
            SEARCH RECIPES
          </Button>
        </Link>
      </Header>
    </div>
  );
};
export default Home;
