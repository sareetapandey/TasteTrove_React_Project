import React, { useEffect, useState } from "react";
import MealItem from "./MealItem";
import { Pagination } from "antd";
import NavBar from "./comman/NavBar";

const Meal = () => {
  const [url, setUrl] = useState(
    "https://www.themealdb.com/api/json/v1/1/search.php?f=a"
  );
  const [item, setItem] = useState([]);
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setItem(data.meals || []);
        setShow(true);
      });
  }, [url]);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    setUrl(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
    );
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = item.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <NavBar />
      <div className="main">
        <div className="heading">
          <h1
            style={{
              fontFamily: "Arial, sans-serif",
              color: "#ff6347",
              textShadow: "2px 2px 2px rgba(0,0,0,0.5)",
              fontSize: "3rem",
              letterSpacing: "0.1em",
            }}
          >
            Food{" "}
            <span style={{ color: "#4682b4", fontStyle: "italic" }}>
              Recipes
            </span>
          </h1>
        </div>

        <div className="searchBox">
          <input
            type="search"
            className="search-bar"
            placeholder="Search for your food recipes..."
            value={searchTerm}
            onChange={handleSearch}
            style={{
              fontSize: "1.5rem",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              border: "2px solid #ccc",
              width: "50%",
            }}
          />
        </div>

        <div className="container">
          {show ? <MealItem data={currentItems} /> : <p>Loading...</p>}
        </div>

        <div className="pagination" style={{ textAlign: "center" }}>
          <Pagination
            current={currentPage}
            total={item.length}
            pageSize={itemsPerPage}
            onChange={paginate}
            showSizeChanger={false}
            showQuickJumper={true}
            style={{ marginTop: "20px" }}
          />
        </div>
      </div>
    </>
  );
};

export default Meal;
