import React, { useState } from "react";
import axios from "axios";
import { Card, Form, Input } from "antd";

const UploadRecipeForm = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipeImage, setRecipeImage] = useState(null);
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleImageChange = (e) => {
    setRecipeImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("recipeName", recipeName);
    formData.append("recipeImage", recipeImage);
    formData.append("ingredients", ingredients);
    formData.append("instructions", instructions);

    try {
      const response = await axios.post("/api/upload-recipe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Recipe uploaded successfully:", response.data);
      // Add any additional logic, such as showing a success message or redirecting the user
    } catch (error) {
      console.error("Error uploading recipe:", error);
      // Add any error handling logic here
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url(https://static.toiimg.com/photo/79828148.cms)",
        opacity: "90%",
      }}
    >
      <div className="w-1/2 p-10">
        <h2 style={{ font: "bold", fontSize: "80px", color: "yellow" }}>
          Upload Recipe
        </h2>
        <div className="flex justify-center items-center w-1/2">
          <Card
            style={{
              backgroundColor: " #C5CBE3",
              width: "500px",
              padding: "50px",
              marginRight: "-150px",
              marginTop: "0",
              marginBottom: "0",
              opacity: "90%",
            }}
          >
            <Form layout="vertical" onSubmit={handleSubmit}>
              <div style={{ fontSize: "20px", color: "black" }}>
                <Form.Item
                  name={"Recipe Name"}
                  label={"Recipe Name"}
                  rules={[
                    {
                      required: true,
                      message: "Please input a valid email!",
                    },
                  ]}
                >
                  <Input placeholder="Recipe Name" />
                </Form.Item>
              </div>
              <div>
                <Form.Item label="Recipe Image">
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="recipeImage"
                    type="file"
                    onChange={handleImageChange}
                    required
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  name="Ingredients"
                  label="Ingredients"
                  rules={[
                    {
                      required: true,
                      message: "Please provide a ingredients",
                    },
                  ]}
                >
                  <textarea placeholder="Ingredients"></textarea>
                </Form.Item>
              </div>
              <div style={{ fontSize: "20px", color: "black" }}>
                <Form.Item name="Instructions" label="Instructions">
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="instructions"
                    placeholder="Instructions"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    required
                  ></textarea>
                </Form.Item>
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  style={{ fontSize: "20px", color: "black" }}
                >
                  Upload Recipe
                </button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UploadRecipeForm;
