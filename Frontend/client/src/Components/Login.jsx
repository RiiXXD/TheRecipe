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
  ,FormControl,Input,FormLabel,FormHelperText,FormErrorMessage,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
export default function Login(){
    const baseUrl="http://localhost:8080/";

    const[email,setEmail]=useState();
    const[password,setPassword]=useState();
    
    const initialLogRef = React.useRef(null)
    const finalLogRef = React.useRef(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isWaiting,setisWaiting]=useState("");

    const isError=(email==="")


   
    const handleEmailChange = (e) => setEmail(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)


   const login=async ()=>{ const res= await fetch(`${baseUrl}user/login`,{
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
      body: JSON.stringify({email,password})})
      setisWaiting(false); 
      
    const data = await res.json();
    setEmail("");
      setPassword("");
    console.log(data);
    }
    const googleLogin=()=>{
        
           window.open(`${baseUrl}user/auth/google`,"_self");
         
    }
    return(
       <><Button onClick={onOpen} colorScheme='teal'>Log in</Button>

        <Modal
        initialFocusRef={initialLogRef}
        finalFocusRef={finalLogRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
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
            <Button isLoading={isWaiting} colorScheme='blue' mr={3} onClick={login} >
              Log in
            </Button>
            <Button onClick={onClose}>Cancel</Button>
            
            
          </ModalFooter>
          <Text align="center">OR</Text>
           
            <Button w="80%" m="1em auto" onClick={googleLogin} ><FcGoogle/> Sign Up with Google</Button>
        </ModalContent>
      </Modal>
      </> 
    )
}