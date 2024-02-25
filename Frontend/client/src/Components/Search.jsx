import React, { useEffect, useState } from 'react';
import {
    Text,Textarea,Button,Box,Flex,InputRightElement,SearchIcon
    ,FormControl,Input,FormLabel,useToast, Checkbox, CheckboxGroup, Stack,FormHelperText, Heading, InputGroup
  } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
export default function Search() {
  const[key,setKey]=useState();
  const[debouncedValue,setDebouncedValue]=useState('');
  const searchKey=(e)=>{
  setKey(e.target.value);
  }

  useEffect(()=>{
    const id=setTimeout(()=>{
      setDebouncedValue(key);
    },1000);
    
    return ()=>{
      clearTimeout(id);
    }
 
  },[key]);
  console.log(debouncedValue===""?"nothing":debouncedValue);
  

  

    return(
        <InputGroup w="40%">
          <Input variant='filled' bg="white" placeholder='Search' onChange={(e)=>{searchKey(e);}} />
          <InputRightElement pointerEvents='none'>
      <FaSearch color='gray.300' />
    </InputRightElement>
          </InputGroup>
    )
}
