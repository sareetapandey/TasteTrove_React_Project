import React from "react";
import { useNavigate } from "react-router-dom";

const MealItem = ({ data }) => {
  console.log(data);
  const navigate = useNavigate();
  return (
    <>
      {data.length === 0
        ? "Not Found"
        : data.map((item) => (
            <div
              className="card"
              key={item.idMeal}
              onClick={() => {
                navigate(`/${item.idMeal}`);
              }}
            >
              <img src={item.strMealThumb} alt="no image" />
              <h3>{item.strMeal}</h3>
            </div>
          ))}
    </>
  );
};

export default MealItem;
