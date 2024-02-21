import React ,{useEffect,useState, }from 'react';
import Navbar from '../Components/Navbar';
import RecipeForm from '../Pages/Form';
import Recard from '../Components/Card';
import { Grid ,Box, Heading,Text,Image,Flex} from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'

export default function Home(){
    const [recipes,setRecipes]=useState([]);
  
    const getRecipe=async()=>{
      const data=await fetch("http://localhost:8080/recipe/getRecipe");
      const response=await data.json();
      console.log(response);
      setRecipes(response.recipe);
    }
      
      useEffect(()=>{
        getRecipe();
      },[])
    return <Box bg="#ff9249" w="100%">
    <Navbar/>
    {/* <RecipeForm/> */}
    <Box w="100%">
      <Flex justify="space-around" w="100%">
      <Box>
      <Heading fontSize={"8em"} color={"#403121"}>Food Recipe</Heading>
      <Text fontSize={"2em"} color={"#403121"}>Helping you cook a variety of dishes from all over the world</Text>

      </Box>
        <Image src="plate.png"/>
      
      
      </Flex>
      
    </Box>
    <Grid templateColumns='repeat(4, 1fr)' gap={7} p="2em"> 
      { recipes && recipes.map((rec,index)=>{
    return  <Recard  rec={rec} />

  })}

</Grid>  
  </Box>
}