import React ,{useEffect,useState, }from 'react';
import Navbar from '../Components/Navbar';
import RecipeForm from '../Pages/Form';
import Recard from '../Components/Card';
import { Grid ,Box} from '@chakra-ui/react'
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
      // const handleAuth=async()=>{
      //   const data=await fetch(`http://localhost:8080/user/getUserDetails`)
      //   const res=await data.json();
      //   console.log(res);
      // }
      useEffect(()=>{
        getRecipe();
        // handleAuth();
      },[])
    return <Box bg="#F3E99F">
    <Navbar/>
    {/* <RecipeForm/> */}
    <Grid templateColumns='repeat(4, 1fr)' gap={7} p="2em">   { recipes && recipes.map((rec,index)=>{
    return  <Recard  rec={rec} />

  })}

</Grid>  
  </Box>
}