import React from "react";
import {
    Text,Textarea,Button,Box,Flex,Form,FormControl,Input,FormLabel,useToast, Checkbox, CheckboxGroup, Stack,FormHelperText, Heading
  } from '@chakra-ui/react'
export default function Profile(){
    const[name,setName]=useState("");
return(
    <Box>
<FormControl margin={"0 auto"} w={["90%","90%","90%","60%","60%"]}>
<FormLabel my={"1em"}>Name</FormLabel>
<Input type="text" value={} onChange={(e)=>{setUrl(e.target.value)}}name="recipeImage"/>

</FormControl>
    </Box>
)
//     return <FormControl margin={"0 auto"} w={["90%","90%","90%","60%","60%"]}>
// // <FormControl/>    <FormLabel my={"1em"}>Title</FormLabel>
//     <Input placeholder='Your Recipe Title ' type='text' value={title} onChange={(e)=>{setTitle(e.target.value)}} />
//     <FormLabel my={"1em"}>Recipe Image URL</FormLabel>
//     <Input type="text" value={url} onChange={(e)=>{setUrl(e.target.value)}}name="recipeImage"/>

    
    
}