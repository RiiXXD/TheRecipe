import {Route,Routes}  from "react-router";
import Home from "../Pages/Home";
import RecipePage from "../Pages/RecipePage";
import React from 'react';
import RecipeForm  from "../Pages/Form";
import Profile from "../Pages/Profile";
import Edit from "../Pages/Edit";
export default function AllRoutes(){
    return <>
    <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/postRecipe" element={<RecipeForm/>}></Route>

    <Route path="/viewRecipe/:id" element={<RecipePage/>}></Route>
    <Route path="/profile" element={<Profile/>}></Route>
    <Route path="/editprofile" element={<Edit/>}></Route>

    </Routes></>
}