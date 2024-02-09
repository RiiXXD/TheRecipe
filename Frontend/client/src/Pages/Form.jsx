import React, { useState } from 'react';
import {
    Text,Textarea,Button,Box,Flex
    ,FormControl,Input,FormLabel,
  } from '@chakra-ui/react'
function RecipeForm() {
    const [title, setTitle] = useState(''); // Initial state with one empty ingredient field
    // const [authorId,setAuthorId] = useState('');
    const [ingredients, setIngredients] = useState(['']); // Initial state with one empty ingredient field
   const [instructions,setInstructions] = useState('');
   const [prepTime,setPreptime] = useState('');
   const [cookTime,setCookTime] = useState('');
   const[servings,SetServings] = useState('');
   const[isWaiting,setIsWaiting] = useState(false);
   const baseUrl="http://localhost:8080/";

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
    const res= await fetch(`${baseUrl}user/sign`,{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
    body: JSON.stringify({title,ingredients,instructions,prepTime,cookTime,servings})})
    setIsWaiting(false); 
  const data = await res.json();
  console.log(data);
  }
// const postRecipe=()=>{

// }
  return(
    <Box  bg="" w="100%" h="100vh" p="2.5em 0">
    <FormControl margin={"0 auto"} w="50%">
    <FormLabel my={"1em"}>Title</FormLabel>
    <Input placeholder='Your Recipe Title ' type='text' value={title} onChange={(e)=>{setTitle(e.target.value)}} />
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
    <FormLabel my={"1em"}>Total Time</FormLabel>
    <Input type='text'  value={prepTime+cookTime} onChange={(e)=>{setTitle(e.target.value)}}/>
    <FormLabel my={"1em"}>PrepTime</FormLabel>
    <Input type='number'  value={prepTime} onChange={(e)=>{setPreptime(e.target.value)}}/>

    </Box>
    <Box>
    <FormLabel my={"1em"}>Cook Time</FormLabel>
    <Input type='number' value={cookTime+"min"} onChange={(e)=>{setCookTime(e.target.value)}}/>
    <FormLabel my={"1em"}>Servings</FormLabel>
    <Input type='number'  value={servings+"min"} onChange={(e)=>{SetServings(e.target.value)}}/>
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
          </Button>  </FormControl>
          </Box>
  )
  

  
}

export default RecipeForm;
