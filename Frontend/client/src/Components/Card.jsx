import React, { useState } from 'react';
import { Card,ButtonGroup,Box, Button,Divider,Image,CardBody, CardFooter,Heading,Stack,Text, Flex} from '@chakra-ui/react'
import { IoStar,IoStarHalf } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
export default function Recard( {rec}){
  const navigate=useNavigate();
const viewRecipe=()=>{
  navigate(`/viewRecipe/${rec._id}`)
}

return (
 
 <Card onClick={viewRecipe} maxW='sm' bg="#FF6D60" >

    <CardBody>
     <Image
        src={rec.url}
        alt='recpie representation'
        borderRadius='lg'
        w="100%"
        h="50%"
      />
      <Flex mt='6' justify={"space-between"} align="center">
        <Heading size='md'>{rec.title}</Heading>
        <Text> {rec.authorId ? rec.authorId.name : 'Unknown'}</Text> 
       

      </Flex>
      <Text>Ingredients Count -{rec.ingredients.length}</Text>
    </CardBody>
    <Divider />
    <CardFooter>
      <ButtonGroup spacing='2'>
        <Button variant='solid' colorScheme='blue'>
          Save 
        </Button>
       
      </ButtonGroup>
    </CardFooter>
    </Card>

)
}