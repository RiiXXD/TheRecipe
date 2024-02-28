import { Button,ButtonGroup,Heading,Box,Flex, Spacer, Divider } from '@chakra-ui/react'
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,useDisclosure,Stack
  ,FormControl,Input,FormLabel,FormHelperText,FormErrorMessage,Avatar,Image
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
import  Login from "./Login"
import  Search  from './Search';
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
 const [isHovered, setIsHovered] = useState(false);

 const handleMouseEnter = () => {
 navigate(`/editUser/${user.id}`);
 };



    return <Flex minWidth='max-content' align='center' gap='2' p={["1em"]} position={"relative"}>
    <Box p='2'>
      <Heading size='md'>Recipe Book</Heading>
    </Box>
    <Spacer  />
    <Search/>
   
    <ButtonGroup gap='2' >
      {/* <Button onclick={openForm} colorScheme='teal'>Sign Up</Button> */}
      {!checkAuth &&<><Button   onClick={onOpen}>Sign Up</Button>
     
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
</Modal></> 
}

{checkAuth &&      <ButtonGroup gap='2' >

  <Button  onClick={postRecipe}>Post</Button>
  <Button onClick={()=>{dispatch(logOut())}} bg='#403121' color="white" >Log Out</Button>
 

</ButtonGroup> }
    </ButtonGroup>
    {checkAuth && <Stack align={"center"}>
  <Avatar onClick={handleMouseEnter}
    size="md" name={user.name} src={user.profileImg?user.profileImg:'https://bit.ly/broken-link'} />
  </Stack>}
  
  </Flex>

}

