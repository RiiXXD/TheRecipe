import { Button,ButtonGroup,Heading,Box,Flex, Spacer } from '@chakra-ui/react'
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,useDisclosure
  ,FormControl,Input,FormLabel,FormHelperText,FormErrorMessage,Avatar
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
import  Login from "./Login"
import {useDispatch,useSelector} from "react-redux";
import { sign,logOut } from "../Redux/Authentication/action";
import {store} from "../Redux/store"
import { useNavigate } from 'react-router-dom';
export default function Navbar(){
  const navigate=useNavigate();
  const baseUrl="http://localhost:8080/";
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isLogOpen} = useDisclosure()

  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [isWaiting,setisWaiting]=useState("");
  const[name,setName]=useState();
  const[userId,setUserId]=useState();
  const[email,setEmail]=useState();
  const[password,setPassword]=useState();
  // const[checkAuth,setCheckAuth]=useState(false);
  const[token,setToken]=useState("");
  const user = useSelector((store)=> store.authReducer.user)
  const checkAuth = useSelector((store)=> store.authReducer.checkAuth)

  const dispatch=useDispatch();
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:"",
  })
  const handleNameChange = (e) => setFormData((prev)=>({
    ...prev,
    name:e.target.value,
  }))
  const handleEmailChange = (e) =>  setFormData((prev)=>({
    ...prev,
    email:e.target.value,
  }))
  const handlePasswordChange = (e) => setFormData((prev)=>({
    ...prev,
    password:e.target.value,
  }))
   const createUser=()=>{
     dispatch(sign(formData));
   }   

  const isError=(email==="")

  const GoogleAuth= async ()=>{
     Google();
  }
  const Google= ()=>{
    window.open(`${baseUrl}user/auth/google`,"_self");
   console.log(checkAuth)
  }
 const postRecipe=async()=>{
  navigate('/postRecipe');
 }

    return <Flex minWidth='max-content' alignItems='center' gap='2' p={["1em","1em","1.5em","1.5em"]}>
    <Box p='2'>
      <Heading size='md'>Recipe Book</Heading>
    </Box>
    <Spacer />
    <ButtonGroup gap='2'>
      {/* <Button onclick={openForm} colorScheme='teal'>Sign Up</Button> */}
      {!checkAuth &&<><Button onClick={onOpen}>Sign Up</Button>
     
      <Login/>

<Modal
  initialFocusRef={initialRef}
  finalFocusRef={finalRef}
  isOpen={isOpen}
  onClose={onClose}
  isCentered
>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Create your account</ModalHeader>
    <ModalCloseButton />
    <ModalBody pb={6}>
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input ref={initialRef} placeholder='First name' type="name" value={name} onChange={handleNameChange}/>
      </FormControl>

      <FormControl mt={4} isRequired isInvalid={isError}>
        <FormLabel>Email</FormLabel>
        <Input placeholder='Email' value={email} onChange={handleEmailChange}/>
        {isError ? 
(
  <FormErrorMessage>Email is required.</FormErrorMessage>
) :(
  <FormHelperText>
   Enter your email address
  </FormHelperText>
)}
      </FormControl>
      <FormControl mt={4} isRequired>
        <FormLabel>Password</FormLabel>
        <Input placeholder='Password' type='password' value={password} onChange={handlePasswordChange} />
       
      </FormControl>
    </ModalBody>

    <ModalFooter>
      <Button isLoading={isWaiting} colorScheme='blue' mr={3} onClick={createUser}>
        Create Account
      </Button>
      <Button onClick={onClose}>Cancel</Button>
      
      
    </ModalFooter>
    <Text align="center">OR</Text>
     
      <Button w="80%" m="1em auto" onClick={GoogleAuth} ><FcGoogle/> Sign Up with Google</Button>
  </ModalContent>
</Modal></> }

{checkAuth &&  <>
  <Button onClick={postRecipe}>Post</Button>
  <Button onClick={()=>{dispatch(logOut())}}>Log Out</Button>
  <Text>{user.name}</Text>
  <Avatar name={user.name} src={user.profileImg?user.profileImg:'https://bit.ly/broken-link'} />
</> }
    </ButtonGroup>
  </Flex>

}