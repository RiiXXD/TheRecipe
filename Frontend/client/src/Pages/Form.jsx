import React, { useState } from 'react';
import {
    Text,Textarea,Button,Box,Flex
    ,FormControl,Input,FormLabel,useToast
  } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
export default function RecipeForm() {
  const navigate=useNavigate();
  const toast = useToast()
    const [title, setTitle] = useState(''); // Initial state with one empty ingredient field
    // const [authorId,setAuthorId] = useState('');
    const [ingredients, setIngredients] = useState(['']); // Initial state with one empty ingredient field
   const [instructions,setInstructions] = useState('');
   const [totalTime,setTotalTime] = useState('');
   const[url,setUrl] = useState("");
   const [prepTime,setPreptime] = useState(0);
   const [cookTime,setCookTime] = useState(0);
   const[servings,setServings] = useState('');
   const[isWaiting,setIsWaiting] = useState(false);
   const baseUrl="http://localhost:8080/";
   let total=0;
  //  settotalTime(parseInt(prepTime)+parseInt(cookTime));
   const handleIngredientChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
};

const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
};

const handleRemoveIngredient = index => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
};

const handleSubmit = async(event) => {
    event.preventDefault();
    // Submit the form data, including the ingredients array
    setIsWaiting(true);
    try{
    const res= await fetch(`${baseUrl}recipe/postRecipe`,{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
    body: JSON.stringify({title,url,ingredients,instructions,prepTime,cookTime,servings})})
    setIsWaiting(false); 
  const data = await res.json();
  if(data)
  {toast({
    title: 'Recipe Shared',
    description: "We Shared Your Recipe for delicious cravings.",
    status: 'success',
    duration: 2000,
    isClosable: true,
  })}
  console.log(data);
}
  
  catch(err) {
    console.log(err);
  }
  setTitle("");
  setIngredients([""]);
  setInstructions("");
  setPreptime(0);
  setCookTime(0);
  setServings("");
}


  return(
    <Box  bg="" w="100%" h="100vh" p="2.5em" mX="2em">
      <Button onClick={()=>{navigate(-1)}}><FaArrowLeft /></Button>
    <FormControl margin={"0 auto"} w="50%">
    <FormLabel my={"1em"}>Title</FormLabel>
    <Input placeholder='Your Recipe Title ' type='text' value={title} onChange={(e)=>{setTitle(e.target.value)}} />
    <FormLabel my={"1em"}>Recipe Image URL</FormLabel>
    <Input type="text" value={url} onChange={(e)=>{setUrl(e.target.value)}}name="recipeImage"/>
    
    <FormLabel my={"1em"}>Ingredients</FormLabel>
    {
    ingredients.map((ingredient, index) => (
     <Box key={index}>
    <Input
    my={"1em"}
    type="text"
    value={ingredient}
    onChange={e => handleIngredientChange(index, e)}
    />
    {index === ingredients.length - 1 && (
                        <Button my={"0.5em"}  onClick={handleAddIngredient}>Add</Button>
                    )}
                    {index !== 0 && (
                        <Button my={"0.5em"} onClick={() => handleRemoveIngredient(index)}>Remove</Button>
                    )}
     </Box>
    ))
    }
    <FormLabel my={"1em"}>Instructions</FormLabel>
    <Textarea placeholder='Share that secret with us!' value={instructions} onChange={(e)=>{setInstructions(e.target.value)}}/>
   <Flex justify={"space-between"} > 
       <Box>
    <FormLabel my={"1em"}>Total Time (Minutes)</FormLabel>
    <Input type='number'  value={totalTime}/>
    <FormLabel my={"1em"}>PrepTime (Minutes)</FormLabel>
    <Input type='number'  value={prepTime} onChange={(e)=>{setPreptime(e.target.value); setTotalTime(parseInt(e.target.value)+total)}}/>

    </Box>
    <Box>
    <FormLabel my={"1em"}>Cook Time (Minutes)</FormLabel>
    <Input type='number' value={cookTime} onChange={(e)=>{setCookTime(e.target.value)}}/>
    <FormLabel my={"1em"}>Servings</FormLabel>
    <Input type='number'  value={servings} onChange={(e)=>{setServings(e.target.value)}}/>
    </Box>
    </Flex>
    <Button
            mt={4}
            colorScheme='teal'
            type='submit'
            isLoading={isWaiting}
            onClick={handleSubmit}
          >
            Share
    </Button>  
          </FormControl>
          </Box>
  )
  

  
}

