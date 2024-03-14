import React, { useEffect, useState } from 'react';
import Recard from '../Components/Card';

import {
    Text,Textarea,Button,Box,Flex,Image,Grid,Stat,StatLabel,StatNumber
    ,FormControl,Input,FormLabel,useToast, Checkbox, CheckboxGroup, Stack,FormHelperText, Heading, Spacer, Avatar
  } from '@chakra-ui/react'
  import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import {useDispatch,useSelector} from "react-redux";

import { FaArrowLeft } from "react-icons/fa";
export default function Profile() {
  const navigate=useNavigate();
  const user = useSelector((store)=> store.authReducer.user)
  useEffect(()=>{
    getUserRecipe();
  },[])
    const [recipes, setRecipes] = useState([]); // Initial state with one empty ingredient field
    const baseUrl="http://localhost:8080/";
    let total=0;

const getUserRecipe = async() => {
try{
const res= await fetch(`${baseUrl}recipe/getUserRecipe/${user.id}`);
const data = await res.json();
setRecipes([...data.recipe]);
console.log(recipes,data);
}
 catch(err) {
 console.log(err);
  }

}


  return(
    <Box  bg="" w="100%"  p={["0.5em","0.5em","2.5em","2.5em","2.5em"]} mX="2em">
      <Button onClick={()=>{navigate(-1)}}><FaArrowLeft /></Button>
      <Box >
         </Box>
        <Flex  align="center" justify={"space-around"} w="60%" margin={"0 auto"}>
        <Avatar  name={user.name} size="xl" src={user.profileImg?`${baseUrl}uploads/${user.profileImg}`:'https://bit.ly/broken-link'} />
        <Spacer/>
        <Box>
        <Heading fontSize={"3em"}>{user.name}</Heading>
       <Button  mt="1em" onClick={()=>{navigate("/editProfile")}}>Edit Profile</Button>
        </Box>
       
<Spacer/>
<Spacer/>
<Spacer/>

        </Flex>
        <Tabs w="75%" margin={"0 auto"}>
  <TabList>
    <Tab>Post</Tab>
    <Tab>Saved</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
    <TabOne recipes={recipes}/>
    </TabPanel>
    <TabPanel>
      <Heading>This Feature Coming Soon !</Heading>
    </TabPanel>
    <TabPanel>
      <p>three!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
         
          </Box>
  )
  

  
}

const TabOne=({recipes})=>{
return (
  <> 
    <Grid templateColumns={['repeat(1, 1fr)','repeat(2, 1fr)','repeat(2, 1fr)','repeat(3, 1fr)','repeat(4, 1fr)']} gap={7} p={["1em","1em","2em","2em","2em"]} > 
    {recipes && recipes.map((rec,index)=>{
  return  <Recard  rec={rec} key={index} />

})} 
</Grid>
   {recipes.length==0 &&   <Heading textAlign="center">NO POST YET!!</Heading>} 
   </>
  

)
}