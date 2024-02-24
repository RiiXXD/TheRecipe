import React, { useState } from 'react';
import {
    Text,Textarea,Button,Box,Flex
    ,FormControl,Input,FormLabel,useToast, Checkbox, CheckboxGroup, Stack,FormHelperText, Heading
  } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
export default function RecipeForm() {
  const navigate=useNavigate();
  const toast = useToast()
    const [title, setTitle] = useState(''); // Initial state with one empty ingredient field
    // const [authorId,setAuthorId] = useState('');
    const [ingredients, setIngredients] = useState(['']); // Initial state with one empty ingredient field
   const [instructions,setInstructions] = useState(['']);
   const [mealType,setMealType] = useState([]);
   const [cuisine,setCuisine]=useState("");
   const [tags,setTags] = useState([]);
   const [totalTime,setTotalTime] = useState('');
console.log(tags)
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

const handleInstructionChange = (index, event) => {
  const newInstructions = [...instructions];
  newInstructions[index] = event.target.value;
  setInstructions(newInstructions);
};
const handleAddInstruction = () => {
  setInstructions([...instructions, '']);
};
const handleRemoveInstruction = index => {
  const newInstructions = [...instructions];
  newInstructions.splice(index, 1);
  setInstructions(newInstructions);
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
    body: JSON.stringify({title,url,ingredients,instructions,prepTime,cookTime,servings,mealType,cuisine})})
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
  setInstructions([""]);
  setPreptime(0);
  setCookTime(0);
  setServings("");
}
function searchAndDelete(arr, value) {
  // Find the index of the element
  const index = arr.indexOf(value);
  
  // If the element is found, remove it
  if (index !== -1) {
      arr.splice(index, 1);
      console.log(`Element ${value} deleted from the array.`);
  } else {
      console.log(`Element ${value} not found in the array.`);
  }
}

  return(
    <Box  bg="" w="100%"  p={["0.5em","0.5em","2.5em","2.5em","2.5em"]} mX="2em">
      <Button onClick={()=>{navigate(-1)}}><FaArrowLeft /></Button>
      <Box>
        <Heading align="center" fontSize="3em" p="1em 0">What's Your Recipe ?!</Heading> </Box>
    <FormControl margin={"0 auto"} w={["90%","90%","90%","60%","60%"]}>
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
    {
      // console.log(instructions.length());
    instructions.map((instruction, index) => (
     <Box key={index}>
    <Textarea my={"1em"} type="text" placeholder='Share that secret with us!' value={instruction} onChange={e => handleInstructionChange(index, e)}/>
    {index === instructions.length - 1 && (
      <Button my={"0.5em"}  onClick={handleAddInstruction}>Add</Button>
    )}
    {index !== 0 && (
    <Button my={"0.5em"} onClick={() => handleRemoveInstruction(index)}>Remove</Button>
                    )}
     </Box>
    ))
    }
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
    <FormLabel my={"1em"}>Meal Type</FormLabel>

    <CheckboxGroup colorScheme='green'>
  <Stack spacing={[1, 5]} direction={['column', 'row']} wrap={"wrap"}>
    <Checkbox value='Dinner' onChange={(e)=>{
    (e.target.checked?mealType.push('Dinner') :searchAndDelete(mealType,'Dinner'));
    console.log(mealType);
    }}>Dinner</Checkbox>
    <Checkbox value='Snack'
    onChange={(e)=>{
      (e.target.checked?mealType.push('Snack') :searchAndDelete(mealType,'Snack'));
      console.log(mealType);
      }}>Snack</Checkbox>
    <Checkbox value='Lunch'
    onChange={(e)=>{
      (e.target.checked?mealType.push('Lunch') :searchAndDelete(mealType,'Lunch'));
      console.log(mealType);
      }}>Lunch</Checkbox>
    <Checkbox value='Appetizer'
    onChange={(e)=>{
      (e.target.checked?mealType.push('Appetizer') :searchAndDelete(mealType,'Appetizer'));
      console.log(mealType);
      }}>Appetizer</Checkbox>
    <Checkbox value='Dessert'
    onChange={(e)=>{
      (e.target.checked?mealType.push('Dessert') :searchAndDelete(mealType,'Dessert'));
      console.log(mealType);
      }}>Dessert</Checkbox>
    <Checkbox value='BreakFast'
    onChange={(e)=>{
      (e.target.checked?mealType.push('BreakFast') :searchAndDelete(mealType,'BreakFast'));
      console.log(mealType);
      }}>BreakFast</Checkbox>
    <Checkbox value='Beverage'
    onChange={(e)=>{
      (e.target.checked?mealType.push('Beverage') :searchAndDelete(mealType,'Beverage'));
      console.log(mealType);
      }}>Beverage</Checkbox>

    
  </Stack>
</CheckboxGroup>
<FormLabel my={"1em"}>Cuisine</FormLabel>
    <Input placeholder='Which Cuisine is it? ' type='text' value={cuisine} onChange={(e)=>{setCuisine(e.target.value)}} />
    <FormLabel my={"1em"}>Tags</FormLabel>
    <Input placeholder='Top the search by tags!' type='text'  onChange={(e)=>{setTags((e.target.value).split(", "))}} />
    <FormHelperText>Tags separated by commas only eg- tag1, tag2.</FormHelperText>
    <Button
            my={4}
            bg='#353232'
            color="white"
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

