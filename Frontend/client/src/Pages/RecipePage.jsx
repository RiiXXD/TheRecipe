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
// bg="#3C3633"
<Box align="center" p={["0.5em 1em","0.5em 1em","1em 2em","1em 2em","1em 2em"]} bg="#e6e2e5" >
    <Box align="left">
    <Button onClick={()=>{navigate(-1)}}><FaArrowLeft /></Button>

    </Box>

    <Flex align={["flex-start","flex-start","center","center","center"]} h="95vh" p={["0em","2em 0","1em 3em","1em 3em","1em 3em"]} flexDir={["column-reverse","column-reverse","row","row","row"]} justify={["space-around","space-around","center","center","center"]}>
        <Box  w={["100%","100%","50%","50%","50%"]} align="left">
        <Text fontSize={"1.5em"}>Author -{recipe.authorId?.name && recipe.authorId.name.charAt(0).toUpperCase()+ recipe.authorId.name.slice(1).toLowerCase()} </Text>
        <Heading fontSize={"3em"}>{recipe.title}</Heading>
        <Flex justify="space-around" w="50%">
        {/* { recipe.tags.map((tag)=>{
            return <Box>
        <Text>{tag}</Text>
           </Box>
        })} */}
    </Flex>
        </Box>

            <Image w={["100%","100%","50%","50%","50%"]}  h={["50%","70%","100%","100%","100%"]} src={recipe.url} ></Image>

    </Flex>


<Flex  p={["0.5em 1em","0.5em 1em","1em 2em","1em 2em","1em 2em"]} align="center" justify="space-between" borderRadius={"1em"} wrap="wrap">

    <Box my="0.5em" bg="green.100" p="1em" borderRadius={"20px"} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px" >
        <Text>Prep<Text as="span" fontWeight="bold">{(recipe.prep_time/60>=1?`${recipe.prep_time/60}hr`:"")}{recipe.prep_time%60}m</Text></Text>
    </Box>
    <Box  my="0.5em" bg="green.100" p="1em" borderRadius={"20px"} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"  >
    <Text>Cook<Text as="span" fontWeight="bold">{(recipe.cook_time/60>=1?`${recipe.cook_time/60}hr`:"")}{recipe.cook_time%60}m</Text></Text>
    </Box >
    <Box  my="0.5em" bg="green.100" p="1em" borderRadius={"20px"} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"  >
    <Text>Total<Text as="span" fontWeight="bold">{(recipe.prep_time+recipe.cook_time)/60>=1?`${Math.floor((recipe.prep_time+recipe.cook_time)/60)}h `:""}{(recipe.cook_time+recipe.prep_time)%60}m</Text></Text>
    </Box>
    <Box  my="0.5em" bg="green.100" p="1em" borderRadius={"20px"} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"  >
    <Text>Serving : {recipe.servings}</Text>
    </Box>
    <Box  my="0.5em" bg="green.100" p="1em" borderRadius={"20px"} boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"  >
    <Text>Calories :{recipe.caloriesPerServing}</Text>
    </Box>

</Flex>
<Flex p={["0em","0em","2em","2em","2em"]} justify={"space-between"} flexDir={["column", "column","row","row","row"]}>
    <Box my="1em" bg="white" w={["100%","100%","45%","45%","45%"]}  border={"1px solid black"} >
    <Heading>INGREDIENTS</Heading>

{recipe.ingredients && recipe.ingredients.map((ing,index)=>{
    return<Flex my="1em" w={["90%","90%","80%","80%","80%"]} fontSize="1.5em" >
     <Text >{index+1} .</Text>
    <Text textAlign={"center"} >{ing}</Text></Flex>
})}

    </Box>
<Box my="1em" bg="white" w={["100%","100%","50%","50%","50%"]} border={"1px solid black"} p="1em">
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