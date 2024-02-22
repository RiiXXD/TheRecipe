import React, { useState } from 'react';
import { Card,ButtonGroup,Box, Button,Divider,Image,CardBody, CardFooter,Heading,Stack,Text, Flex} from '@chakra-ui/react'
import { IoStar,IoStarHalf } from "react-icons/io5";
import {useDispatch,useSelector} from "react-redux";
import { singleton } from '../Redux/Recipe/action';

import { useNavigate } from 'react-router-dom';
export default function Recard( {rec}){
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const stars = [];

const viewRecipe=()=>{
  dispatch(singleton(rec._id))
  navigate(`/viewRecipe/${rec._id}`)
}
const roundedRating = Math.round(rec.rating);
for(let i=0;i<roundedRating;i++){
  stars.push(<IoStar color="#FFB000"/>);
}
return (
 
 <Card onClick={viewRecipe} maxW='sm' bg="4A4A4A" >
 {/* <Box> */}
 <Image
        src={rec.url}
        alt='recpie representation'
        borderRadius='lg'
        w="100%"
        h="70%"
      />
 {/* </Box> */}
    <CardBody>
    
      <Flex mt='2' justify={"space-between"} align="center">
        <Heading size='md'>{rec.title}</Heading>
       

      </Flex>
      {/* <Text>Ingredients Count -{rec.ingredients.length}</Text> */}
      <Flex justify={"space-between"} align="center">
      <Flex >
      {stars.map((star)=>{
        return <Text>{star}</Text>
      })}

      </Flex>
      <Text fontSize={"0.8em"}> By-{rec.authorId ? rec.authorId.name : 'Unknown'}</Text> 

      </Flex>
      <Flex justify="space-around">
      { rec.tags.map((tag)=>{return <Box>
        <Text>{tag}</Text>
    </Box>})}
      </Flex>
   
    
    </CardBody>
  
    </Card>

)
}