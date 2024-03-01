import React, { useEffect, useState } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform your login logic here
    setIsLoggedIn(true);
  };
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    setBookmarkedItems(savedRecipes);
  }, []);
  const handleUpload = () => {
    if (!isLoggedIn) {
      // Show notification or error message
      notification.warning({
        message: "Please Log In or Sign Up",
        description: (
          <>
            You need to <a href="/login">log in</a> or{" "}
            <a href="/signup">sign up</a> first to upload a recipe.
          </>
        ),
      });
      return; // Exit the function if user is not logged in
    }

    // Navigate to the UploadRecipeForm page
    navigate("/upload");
  };

  return (
    <>
      <Menu borderless fixed="top" className="navbar">
        <Menu.Item>
          <Link to={"/"}>
            <img
              src={logo}
              alt=""
              className="logo"
              style={{ fontWeight: "bold", fontSize: "1.4em" }}
            />
          </Link>
        </Menu.Item>
        <Menu.Item className="menu">
          <Link
            to="/"
            className="menu-item"
            style={{ fontWeight: "bold", fontSize: "1.4em" }}
          >
            Home
          </Link>
          <Link
            to="/meal"
            className="menu-item"
            style={{ fontWeight: "bold", fontSize: "1.4em" }}
          >
            Recipes
          </Link>
        </Menu.Item>

        <Menu.Item
          onClick={handleUpload}
          className="menu-item"
          style={{ fontWeight: "bold", fontSize: "1.4em" }}
        >
          Upload Recipe
        </Menu.Item>

        <Menu.Item position="right">
          <Dropdown
            icon="bookmark"
            className="icon"
            style={{ fontWeight: "bold", fontSize: "1.4em", color: "black" }}
          >
            <Dropdown.Menu>
              {bookmarkedItems.length === 0 ? (
                <Dropdown.Item disabled>No Bookmarked Items</Dropdown.Item>
              ) : (
                bookmarkedItems.map((item) => (
                  <Dropdown.Item key={item.idMeal}>
                    {item.strMeal}
                  </Dropdown.Item>
                ))
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Link
            to="/login"
            onLogin={handleLogin}
            className="menu-item"
            style={{ fontWeight: "bold", fontSize: "1.4em" }}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="menu-item"
            style={{ fontWeight: "bold", fontSize: "1.4em" }}
          >
            Signup
          </Link>
        </Menu.Item>
      </Menu>

      {isLoggedIn}
      <div style={{ marginTop: "60px", padding: "20px" }}>
        {/* Add margin-top and padding to avoid content being hidden */}
        {/* Your Meal.js content goes here */}
      </div>
    </>
  );
};
export default NavBar;
