import React, { useEffect, useState } from 'react';
import { Card,ButtonGroup,Box, Button,Divider,Image,CardBody, CardFooter,Heading,Stack,Text, Flex, Spacer} from '@chakra-ui/react'
import { IoStar,IoStarHalf } from "react-icons/io5";
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux";
import { singleton } from '../Redux/Recipe/action';
import {store} from "../Redux/store"

export default function RecipePage(){
   const[author, setAuthor]=useState("");
    const recipe = useSelector((store)=> store.recipeReducer.recipe)
    // const checkAuth = useSelector((store)=> store.authReducer.checkAuth)
    useEffect(()=>{
  setAuthor(recipe.authorId.name);

    },[])
  const ingredients=[...recipe.ingredients]
  const instruction=[...recipe.instructions]
  console.log(instruction);
return (

<Box align="center" p="1em 2em">
    <Flex align="center" h="95vh" p="1em 3em">
        <Box  w="50%" align="left">
        <Text fontSize={"1.5em"}>Author -{author && author.charAt(0).toUpperCase()+ author.slice(1).toLowerCase()} </Text>
        <Heading fontSize={"3em"}>{recipe.title}</Heading>

        </Box>

            <Image w="50%"  h="100%" src={recipe.url} ></Image>

    </Flex>


<Flex bg="#7752FE" p="1em 2em" align="center" justify="space-between" borderRadius={"1em"}>

    <Text>Prep Time:{recipe.prep_time}</Text>
    <Text>Cook Time:{recipe.cook_time}</Text>
    <Text>Prep Time:{recipe.prep_time}</Text>
    <Text>Serving:{recipe.servings}</Text>
    <Text>Calories :{recipe.caloriesPerServing}</Text>

</Flex>
<Heading>INGREDIENTS</Heading>

{ingredients.map((ing,index)=>{
    return<Flex bg="red.300" my="1em" w="50%" fontSize="1.5em">
     <Text>{index+1} .</Text>
    <Text>{ing}</Text></Flex>
})}
<Box>
    <Heading>INSTRUCTION</Heading>
<Box >
        {instruction.map((ins,index)=>{
return <Flex my="1.5em" justify={"flex-start"} align="center" >
    <Box border="1px solid black" mr="1em" fontSize="2em" fontWeight="bold" borderRadius={"50%"} w="50px" h="50px"> {index+1}</Box>  
    <Text fontSize="1em" align={"left"}> {ins}</Text>

</Flex>
        })}
    </Box>
</Box>
</Box>

)}