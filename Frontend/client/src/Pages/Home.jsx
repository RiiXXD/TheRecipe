import React ,{useEffect,useState, }from 'react';
import Navbar from '../Components/Navbar';
import RecipeForm from '../Pages/Form';
import Recard from '../Components/Card';
import { Grid ,Box, Heading,Text,Image,Flex} from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, LinkProps,keyframes } from '@chakra-ui/react'
import { useScroll,useAnimation,useTransform, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
export default function Home(){
  const controls = useAnimation();
    
  const [ref, inView] = useInView({ once: false });
  const plateVariants = {
      visible: { opacity: 1, scale: 1,translateX:"5%", transition: { duration: 1 } },
      hidden: { opacity: 0, scale: 0 ,translateX:"60%"}
    };
    const textVariants = {
      visible: { opacity: 1, scale: 1,translateX:"0%", transition: { duration: 1 } },
      hidden: { opacity: 0, scale: 0 ,translateX:"-60%"}
    };
    useEffect(()=>{
      getRecipe();
    },[])
    useEffect(() => {
      if (inView) {
        controls.start("visible");
      } else {
        controls.start("hidden");
      }
    }, [controls, inView]);
    

    const [recipes,setRecipes]=useState([]);
    const plate = keyframes`
    0% { transform:translateX(70%);}
    25% {translate:transformX(60%); }
    50% {transform: rotate(-10deg); translate:transformX(50%);}
    50% {transform: rotate(-20deg); translate:transformX(30%); }
    100% {transform:rotate(0deg); translate:transformX(0%); }
`;

    const animation = `${plate} 2s cubic-bezier(0.1, 0.5, 0.7, 1) 0.5s`;
    // const animationText=`${textVariants} 2s cubic-bezier(0.1, 0.5, 0.7, 1) 0.5s`;
    const getRecipe=async()=>{
      const data=await fetch("http://localhost:8080/recipe/getRecipe");
      const response=await data.json();
      console.log(response);
      setRecipes(response.recipe);
    }
      
     
    return <Box bg="#e6e2e5" w="100%" color="#353232" >
    <Navbar/>
    {/* <RecipeForm/> */}
    <Box w="100%" p="1em" ref={ref} >
      <Flex justify="space-around" w="100%" align={"center"} >
      <Box  as={motion.div}   variants={textVariants}  animate={controls} initial="hidden">
      <Heading fontSize={"8em"}>Food Recipe</Heading>
      <Text fontSize={"2em"} >Helping you cook a variety of dishes from all over the world</Text>

      </Box>
      <Box w="50%"  as={motion.div}   variants={plateVariants}  animate={controls} initial="hidden" >
      <Image  src="plate.png" />

      </Box>
      
      
      </Flex>
    </Box>
    <Grid templateColumns={['repeat(1, 1fr)','repeat(2, 1fr)','repeat(3, 1fr)','repeat(4, 1fr)']} gap={7} p="2em"> 
      { recipes && recipes.map((rec,index)=>{
    return  <Recard  rec={rec} />

  })}

</Grid>  
  </Box>
}