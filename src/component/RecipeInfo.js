import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Icon, Image, Button, Grid, Segment } from "semantic-ui-react";

const RecipeInfo = () => {
  const [item, setItem] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { MealId } = useParams();

  useEffect(() => {
    if (MealId !== "") {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${MealId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.meals && data.meals.length > 0) {
            setItem(data.meals[0]);
          }
        })
        .catch((error) => {
          console.error("Error fetching recipe:", error);
        });
    }
  }, [MealId]);

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    const isCurrentlyBookmarked = savedRecipes.some(
      (recipe) => recipe.idMeal === item?.idMeal
    );
    setIsBookmarked(isCurrentlyBookmarked);
  }, [item]);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    if (isBookmarked) {
      const updatedRecipes = savedRecipes.filter(
        (recipe) => recipe.idMeal !== item.idMeal
      );
      localStorage.setItem("savedRecipes", JSON.stringify(updatedRecipes));
    } else {
      localStorage.setItem(
        "savedRecipes",
        JSON.stringify([...savedRecipes, item])
      );
    }
  };

  const renderIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredientName = item[`strIngredient${i}`];
      const ingredientMeasure = item[`strMeasure${i}`];
      if (ingredientName && ingredientMeasure) {
        ingredients.push(
          <li key={i}>
            {ingredientName}: {ingredientMeasure.replace(/:/g, "")}
          </li>
        );
      }
    }
    return ingredients;
  };

  return (
    <>
      {item && (
        <Grid columns={2} stackable>
          <Grid.Column>
            <Image src={item.strMealThumb} fluid />
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Button
                icon
                color={isBookmarked ? "red" : "grey"}
                onClick={handleBookmark}
                style={{ float: "right" }}
              >
                <Icon name="bookmark" />
              </Button>
              <h1>{item.strMeal}</h1>
              <h2>{item.strArea} Food</h2>
              <h3>Category {item.strCategory}</h3>
            </Segment>
            <Segment>
              <h2>Ingredients</h2>
              <ul>{renderIngredients()}</ul>
            </Segment>
            <Segment>
              <h2>Instructions</h2>
              <p>{item.strInstructions}</p>
            </Segment>
            {item.strYoutube && (
              <Segment>
                <h2>Video Link</h2>
                <a
                  href={item.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Video
                </a>
              </Segment>
            )}
          </Grid.Column>
        </Grid>
      )}
    </>
  );
};

export default RecipeInfo;
