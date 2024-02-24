import React, { useState } from 'react';
import {
    Text,Textarea,Button,Box,Flex,InputRightElement,SearchIcon
    ,FormControl,Input,FormLabel,useToast, Checkbox, CheckboxGroup, Stack,FormHelperText, Heading, InputGroup
  } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
export default function Seaech() {
    return(
        <InputGroup w="40%">
          <Input variant='filled' bg="white" placeholder='Filled' />
          <InputRightElement pointerEvents='none'>
      <FaSearch color='gray.300' />
    </InputRightElement>
          </InputGroup>
    )
}
