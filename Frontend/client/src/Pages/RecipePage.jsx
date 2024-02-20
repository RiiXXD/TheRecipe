import React, { useEffect, useState } from 'react';
import { Card,ButtonGroup,Box, Button,Divider,Image,CardBody, CardFooter,Heading,Stack,Text, Flex} from '@chakra-ui/react'
import { IoStar,IoStarHalf } from "react-icons/io5";
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux";
import { singleton } from '../Redux/Recipe/action';
import {store} from "../Redux/store"

export default function RecipePage(){
   
    const recipe = useSelector((store)=> store.recipeReducer.recipe)
    // const checkAuth = useSelector((store)=> store.authReducer.checkAuth)
  const author=recipe.authorId.name;
  const ingredients=[...recipe.ingredients]
return (

<Box align="center" p="1em 2em">
    <Flex align="center" h="80vh">
        <Box  w="50%" align="left">
        <Text fontSize={"1.5em"}>Author - {author.charAt(0).toUpperCase()+ author.slice(1)}</Text>
        <Heading fontSize={"3em"}>{recipe.title}</Heading>

        </Box>

            <Image w="50%"  src={recipe.url} ></Image>

    </Flex>


<Flex bg="#7752FE" p="1em 2em" align="center" justify="space-between" borderRadius={"1em"}>

    <Text>Prep Time:{recipe.prep_time}</Text>
    <Text>Cook Time:{recipe.cook_time}</Text>
    <Text>Prep Time:{recipe.prep_time}</Text>

</Flex>
<Text>Serving:{recipe.servings}</Text>

{ingredients.map((ing,index)=>{
    return<Flex>
     <Text>{index+1} .</Text>
    <Text>{ing}</Text></Flex>
})}
<Box>
    <Text>
        {recipe.instructions}
    </Text>
</Box>
</Box>

)}