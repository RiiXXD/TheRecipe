import React, { useEffect, useState } from 'react';
import { Card,ButtonGroup,Box, Button,Divider,Image,CardBody, CardFooter,Heading,Stack,Text, Flex, Spacer} from '@chakra-ui/react'
import { IoStar,IoStarHalf } from "react-icons/io5";
import { Link } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux";
import { singleton } from '../Redux/Recipe/action';
import {store} from "../Redux/store"
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function RecipePage(){
    const navigate=useNavigate();

   const[author, setAuthor]=useState("");
   const[ingredients, setIngredients]=useState([]);
   const[instructions, setInstructions]=useState([]);

    const recipe = useSelector((store)=> store.recipeReducer.recipe)
//     useEffect(()=>{
// //   setAuthor(recipe.authorId.name);
//   setIngredients([...recipe.ingredients])
//   setInstructions([...recipe.instructions])
//     },[])
  console.log(recipe.prep_time%60);
return (

<Box align="center" p="1em 2em" bg="#3C3633">
    <Box align="left">
    <Button onClick={()=>{navigate(-1)}}><FaArrowLeft /></Button>

    </Box>

    <Flex align="center" h="95vh" p="1em 3em">
        <Box  w="50%" align="left">
        <Text fontSize={"1.5em"}>Author -{recipe.authorId?.name && recipe.authorId.name.charAt(0).toUpperCase()+ recipe.authorId.name.slice(1).toLowerCase()} </Text>
        <Heading fontSize={"3em"}>{recipe.title}</Heading>

        </Box>

            <Image w="50%"  h="100%" src={recipe.url} ></Image>

    </Flex>


<Flex  p="1em 2em" align="center" justify="space-between" borderRadius={"1em"}>

    <Box bg="green.100" p="1em" borderRadius={"20px"} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" >
        <Text>Prep Time : {(recipe.prep_time/60>=1?`${recipe.prep_time/60}hr`:"")}{recipe.prep_time%60}m</Text>
    </Box>
    <Box bg="green.100" p="1em" borderRadius={"20px"} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"  >
    <Text>Cook Time : {(recipe.cook_time/60>=1?`${recipe.cook_time/60}hr`:"")}{recipe.cook_time%60}m</Text>
    </Box >
    <Box bg="green.100" p="1em" borderRadius={"20px"} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"  >
    <Text>Total Time : {(recipe.prep_time+recipe.cook_time)/60>=1?`${Math.floor((recipe.prep_time+recipe.cook_time)/60)}h `:""}{(recipe.cook_time+recipe.prep_time)%60}m</Text>
    </Box>
    <Box bg="green.100" p="1em" borderRadius={"20px"} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"  >
    <Text>Serving : {recipe.servings}</Text>
    </Box>
    <Box bg="green.100" p="1em" borderRadius={"20px"} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"  >
    <Text>Calories :{recipe.caloriesPerServing}</Text>
    </Box>

</Flex>
<Flex p="2em" justify={"space-between"}>
    <Box w="45%"  border={"1px solid black"} >
    <Heading>INGREDIENTS</Heading>

{recipe.ingredients && recipe.ingredients.map((ing,index)=>{
    return<Flex bg="red.300" my="1em" w="80%" fontSize="1.5em" >
     <Text >{index+1} .</Text>
    <Text textAlign={"center"} >{ing}</Text></Flex>
})}

    </Box>
<Box w="50%" border={"1px solid black"} p="1em">
    <Heading>INSTRUCTION</Heading>
     <Box >
        {recipe.instructions && recipe.instructions.map((ins,index)=>{
return <Flex my="1.5em" justify={"flex-start"} align="center" >
    <Box border="1px solid black" mr="1em" fontSize="2em" fontWeight="bold" borderRadius={"50%"} minW="50px" minH="50px"> {index+1}</Box>  
    <Text fontSize="1em" align={"left"}> {ins}</Text>

</Flex>
        })}
    </Box>
</Box>
</Flex>

</Box>

)}