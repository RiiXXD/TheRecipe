import React,{useState} from 'react';
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
import { useSelector } from 'react-redux';
// import {useDispatch,useSelector} from "react-redux";

export default function Edit(){
    const user=useSelector((store)=>store.authReducer.user)
const [name,setName]=useState(user.name);
const [email,setEmail]=useState(user.email);
const [file, setFile] = useState(null);
const [previewUrl, setPreviewUrl] = useState(null);
    // Create a URL for the selected file and set it as the preview URL

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    
        // Create a URL for the selected file and set it as the preview URL
        const fileReader = new FileReader();
        fileReader.onload = () => {
          setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(selectedFile);
        console.log(setFile)
      };
    return (
        <>
        <FormControl margin={"0 auto"} w={["90%","90%","90%","60%","60%"]}>
        <FormLabel my={"1em"}>Name</FormLabel>
        <Input placeholder='Change your Name ' type='text' value={name} onChange={(e)=>{setName(e.target.value)}} />
        <FormLabel my={"1em"}>Email</FormLabel>
        <Input placeholder='Change your Email ' type='text' disabled value={email}  />
        <FormLabel my={"1em"}>Profile Image</FormLabel>
        <Input placeholder='Change your Email ' onChange={handleFileChange} type='file' accept="image/*"  />

        </FormControl>
           {/* <FormControl margin={"0 auto"} w={["90%","90%","90%","60%","60%"]}>
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

          </FormControl> */}
        </>
    )
}