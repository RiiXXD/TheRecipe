import React, { useEffect, useState } from 'react';
import {
    Text,Textarea,Button,Box,Flex,InputRightElement,SearchIcon,Image
    ,FormControl,Input,FormLabel,useToast, Checkbox, CheckboxGroup, Stack,FormHelperText, Heading, InputGroup
  } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { FaSearch } from "react-icons/fa";
import { fetchSearchResults } from '../Redux/Recipe/action';
export default function Search() {
  const[key,setKey]=useState();
  const dispatch=useDispatch();
  const searchs = useSelector((store)=> store.recipeReducer.Searchs)

  const searchKey=(e)=>{
  setKey(e.target.value);
  }

  useEffect(()=>{
    const id=setTimeout(()=>{
      dispatch(fetchSearchResults(key));
    },1000);
   
    return ()=>{
      clearTimeout(id);
    }
  
  },[key]);
  

 
console.log(searchs);
    return(
      <>
        <InputGroup w="40%">
          <Input variant='filled' bg="white" placeholder='Search' onChange={(e)=>{searchKey(e);}} />
          <InputRightElement pointerEvents='none'>
      <FaSearch color='gray.300' />
    </InputRightElement>
          </InputGroup>
          {/* <Box position={"absolute"} top="2%" zIndex="12" bg="white" right="40%" >
           { searchs && 
           searchs.map((rec)=>{
            return <Flex p="2em" align="center">
           
                   <Image w="60px" h="70px" src={rec.url}></Image>
                    <Text>{rec.title}</Text>
                    </Flex>
                   })}
          </Box> */}
          </>
    )
}
