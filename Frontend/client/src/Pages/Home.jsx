import React ,{useEffect,useState, }from 'react';
import Navbar from '../Components/Navbar';
import RecipeForm from '../Pages/Form';
import Recard from '../Components/Card';
import { Grid ,Box, Heading,Text,Image,Flex,Spacer, Divider} from '@chakra-ui/react'
import { useDispatch } from 'react-redux';
import { SINGLETON_RECIPE_SUCCESS } from "../Redux/Recipe/action-type";
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, LinkProps,keyframes } from '@chakra-ui/react'
import { useScroll,useAnimation,useTransform, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";


export default function Home(){
  const dispatch=useDispatch();

  const controls = useAnimation();
  const searchs = useSelector((store)=> store.recipeReducer.Searchs)
  const [pageNum, setPageNum] = useState(1);
  const [ref, inView] = useInView({ once: false });
  const plateVariants = {
      visible: { opacity: 1, scale: 1,translateX:"0%", transition: { duration: 1 } },
      hidden: { opacity: 0, scale: 0 ,translateX:"60%"}
    };
    const textVariants = {
      visible: { opacity: 1, scale: 1,translateX:"0%", transition: { duration: 1 } },
      hidden: { opacity: 0, scale: 0 ,translateX:"-60%"}
    };
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    useEffect(()=>{
      getRecipe();
    },[pageNum])
    useEffect(() => {
      if (inView) {
        controls.start("visible");
      } else {
        controls.start("hidden");
      }
    }, [controls, inView]);
    
    const navigate=useNavigate();

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
      const data=await fetch(`http://localhost:8080/recipe/getRecipe?page=${pageNum}&limit=10`);
      const response=await data.json();
      console.log(response);
      setRecipes((prevData) => [...prevData,...response.recipe]);
    }
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (Math.ceil(clientHeight + scrollTop) >= scrollHeight) {
        setPageNum((prevPageNum) => prevPageNum + 1);
        console.log("scrollHeight",pageNum);
      }
    }
     
    return <Box bg="#e6e2e5" w="100%"  color="#353232" >
    <Navbar/>
    {/* <RecipeForm/> */}
    <Box position={"relative"} >
      
      <Box position={"absolute"} top="0%" zIndex="12" right="13%" w="40%" bg="white" >
      { searchs && searchs.map((rec)=>{
            return<><Divider/> <Flex p="1.5em" align="center" onClick={()=>{dispatch({type: SINGLETON_RECIPE_SUCCESS,payload: rec}); navigate(`/viewRecipe/${rec._id}`)
          }}>
          
                   <Image w="60px" h="70px" src={rec.url}></Image>
                    <Spacer/>
                    <Text>{rec.title}</Text>
                    <Spacer/>
                    <Spacer/>
                    <Spacer/>
                    <Spacer/>
                    <Spacer/>
                    
                    </Flex>
                    <Divider/></> 
                   })}</Box>
          
          </Box>
    <Box w="100%" p={["0","0","1em","1em","1em"]} ref={ref}   >
      <Flex flexDir={["column-reverse","column-reverse","column-reverse","row","row"]}justify="space-around" w="100%" align={"center"} h={["80vh","80vh","80vh","80vh","80vh"]} >
      <Box  as={motion.div}   variants={textVariants} p={["1em","1em","1em","1em","1em"]}  animate={controls} initial="hidden">
      <Heading fontSize={["3em","3em","4em","7em","8em"]}>Food Recipe</Heading>
      <Text fontSize={["1.2em","1.5em","2em","2em","2em"]} >Helping you cook a variety of dishes from all over the world</Text>

      </Box>
      <Box w={["100%","80%","50%","50%","50%"]}  as={motion.div}   variants={plateVariants}  animate={controls} initial="hidden" >
      <Image  src="plate.png" />

      </Box>
      
      
      </Flex>
    </Box>
   
    <Grid templateColumns={['repeat(1, 1fr)','repeat(2, 1fr)','repeat(2, 1fr)','repeat(3, 1fr)','repeat(4, 1fr)']} gap={7} p={["1em","1em","2em","2em","2em"]} > 
      { recipes && recipes.map((rec,index)=>{
    return  <Recard  rec={rec} />

  })}

</Grid>  
  </Box>
}