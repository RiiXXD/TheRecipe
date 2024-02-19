import {Route,Routes}  from "react-router";
import Home from "../Pages/Home";
import RecipePage from "../Pages/RecipePage";
import React from 'react';

export default function AllRoutes(){
    return <>
    <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/viewRecipe/:id" element={<RecipePage/>}></Route>
    </Routes></>
}