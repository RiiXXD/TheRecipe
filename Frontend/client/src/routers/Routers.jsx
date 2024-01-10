import {Route,Routes}  from "react-router";
import Home from "../Pages/Home";
import React from 'react';

export default function AllRoutes(){
    return <>
    <Routes>
    <Route path="/" element={<Home/>}></Route>
    {/* <Route path="/login" element={<Login/>}></Route> */}
    </Routes></>
}