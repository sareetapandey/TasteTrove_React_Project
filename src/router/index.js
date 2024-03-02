import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import { lazy } from "react";
const Home = lazy(() => import("../component/pages/Home"));
const NavBar = lazy(() => import("../component/comman/NavBar"));
const RecipeInfo = lazy(() => import("../component/RecipeInfo"));
const Meal = lazy(() => import("../component/Meal"));
const Login = lazy(() => import("../component/auth/Login"));
const SignUp = lazy(() => import("../component/auth/SignUp"));
const UploadRecipeForm = lazy(() =>
  import("../component/pages/UploadRecipeForm")
);

export const Routers = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadRecipeForm />} />
        <Route path="/navbar" element={<NavBar />} />

        <Route path="/meal" element={<Meal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/:MealId" element={<RecipeInfo />} />
      </Route>
    </>
  )
);
