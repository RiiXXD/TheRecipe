import React, { useEffect, useState } from 'react';
import { Card,ButtonGroup,Box, Button,Divider,Image,CardBody, CardFooter,Heading,Stack,Text, Flex} from '@chakra-ui/react'
import { IoStar,IoStarHalf } from "react-icons/io5";
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux";
import { singleton } from '../Redux/Recipe/action';
export default function RecipePage(){
    const dispatch=useDispatch();
useEffect(()=>{
getSingleton()
},[]);
const getSingleton =()=>{
    dispatch(singleton())
}
return (
<>Heyyyyy</>
)}