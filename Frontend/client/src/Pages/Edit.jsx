import React,{useState,useRef} from 'react';
import {
    Text,
    Flex,
    Box,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,useDisclosure,Stack
    ,FormControl,Input,FormLabel,FormHelperText,FormErrorMessage,Avatar,Image, Heading
  } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
// import {useDispatch,useSelector} from "react-redux";

export default function Edit(){
    const user=useSelector((store)=>store.authReducer.user)
    console.log(user);
const [name,setName]=useState(user.name);
const [email,setEmail]=useState(user.email);
const[dbImg,setDbImg]=useState(user.profileImg);
const [image,setImage]=useState("");

const inputRef =useRef(null);
const handleImageClick=()=>{
inputRef.current.click();
setDbImg("");
}
const handleChange=(event)=>{
    const file=event.target.files[0];
     setImage(file);
}
    return (
        <Flex p="2em" justify={"space-between"} h="100vh" align={"flex-start"}>
            <Box w="60%">
            <FormControl margin={"0 auto"} w={["100%","100%","100%","100%","100%"]}>
        <FormLabel my={"1em"}>Name</FormLabel>
        <Input placeholder='Change your Name ' type='text' value={name} onChange={(e)=>{setName(e.target.value)}} />
        <FormLabel my={"1em"}>Email</FormLabel>
        <Input placeholder='Change your Email ' type='text' disabled value={email}  />
        <FormLabel my={"1em"}>Profile Image</FormLabel>
        </FormControl>

            </Box>
            <Box w="30%">
        {
            dbImg?
            (
                    <div onClick={handleImageClick} style={{border:"4px dashed grey",padding:"3em",margin:"0 auto"}}>
                    <img src={dbImg} alt="" style={{margin:"0 auto"}}/>
                    <input type="file" ref={inputRef} onChange={handleChange}style={{display:"none"}}></input>
              </div>
              ):
              (
            <div onClick={handleImageClick} style={{border:"4px dashed black",width:"80%",padding:"3em",margin:"0 auto"}}>
                {
                image?
                (
                 <img src={URL.createObjectURL(image)} alt="uploaded" style={{width:"90%",margin:"0 auto"}}/>
                ):
                (
                    // <img style={{width:"90%",margin:"0 auto"}} src="hero.png"/>
                <Heading textAlign={"center"}>Click To Upload Profile Picture</Heading>
                )
                }
                
               
                <input type="file" ref={inputRef} onChange={handleChange}style={{display:"none"}}></input>
              </div>
              )
        }
       
          
        </Box>

    
        
        </Flex>
    )
}