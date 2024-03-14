import React, { useEffect, useState } from 'react';
import { Card,ButtonGroup,Box, Button,Divider,Image,CardBody, CardFooter,Heading,Stack,Text, Flex} from '@chakra-ui/react'
import { IoStar,IoStarHalf } from "react-icons/io5";
import {useDispatch,useSelector} from "react-redux";
import { singleton ,delRecipe} from '../Redux/Recipe/action';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaRegHeart ,FaHeart} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import {liked,unLiked} from '../Redux/Authentication/action';

export default function Recard( {rec}){
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user=useSelector((store)=>store.authReducer.user)
  const recipes=useSelector((store)=>store.recipeReducer.recipes)


  const stars = [];
  const [saved,setSaved]=useState(false);
  const [likedRecipe,setLikedRecipe]=useState([]);
  
const viewRecipe=()=>{
  dispatch(singleton(rec._id))
  navigate(`/viewRecipe/${rec._id}`)
}
const roundedRating = Math.round(rec.rating);
for(let i=0;i<roundedRating;i++){
  stars.push(<IoStar color="#FFB000"/>);
}
const handleLiked=()=>{
  setSaved(!saved);
   if(!saved) {
    dispatch(liked(user.id,rec._id));
    setLikedRecipe([...likedRecipe,rec._id])
    console.log(likedRecipe);

  }
   else{
     dispatch(unLiked(user.id,rec._id));
    }
}

const deleteRecipe=()=>{
  console.log("hey")
  dispatch(delRecipe(rec._id,user.id))
  // dispatch(getRecipe(1));
  console.log("after deleting",recipes)

}
return (
 <Box position={"relative"} >
  <Flex  position={"absolute"} right={0} zIndex={"2"}>
 {     (user.id===rec.authorId._id) && <Button  background={"rgba(6,0,6,0.5)"} onClick={deleteRecipe}> <RiDeleteBin6Fill color="white" /></Button> 
}
<Button onClick={handleLiked} background={"rgba(6,0,6,0.5)"}> {saved?<FaHeart  color={'#FF3EA5'}/>:<FaRegHeart color={'white'}/>}</Button> 
</Flex>
 <Card onClick={viewRecipe} maxW={['md','md','sm','sm','sm']} bg="4A4A4A" >
 
 <Image
        src={rec.url}
        alt='recpie representation'
        borderRadius='lg'
        w="100%"
        h={["70%","50%","70%","70%","70%"]}
      />
 {/* </Box> */}
    <CardBody>
    
      <Flex mt='2' justify={"space-between"} align="center">
        <Heading size='md'>{rec.title}</Heading>
       

      </Flex>
      {/* <Text>Ingredients Count -{rec.ingredients.length}</Text> */}
      <Flex justify={"space-between"} align="center">
      <Flex >
      {stars.map((star,index)=>{
        return <Text key={index}>{star}</Text>
      })}

      </Flex>
{     (user.id!==rec.authorId._id) && <Text fontSize={"0.8em"}> By-{rec.authorId ? rec.authorId.name : 'Unknown'}</Text> 
}
{     (user.id===rec.authorId._id) && <Text fontSize={"0.8em"}> By-{rec.authorId ? "You": 'Unknown'}</Text> 
}

      </Flex>
      {/* 
      { rec.tags.map((tag)=>{return
         })} */}
      {/*  */}
      <Flex justify="space-between" align="center" wrap={"wrap"}>
      <Box p="0.2em 1em" borderRadius={"5px"} bg={rec.difficulty==="Easy"?"green.500":"red.400"}>
        <Text >{rec.difficulty}</Text>
    </Box>
    {rec.mealType.map((meal)=>{
      return <Box p="0.2em 1em" borderRadius={"20px"} bg="pink.100" m="0.5em 0">
         <Text>{meal}</Text>
     </Box>
     
        })}
   </Flex>
    </CardBody>
  
    </Card>

 </Box>
 
)
}