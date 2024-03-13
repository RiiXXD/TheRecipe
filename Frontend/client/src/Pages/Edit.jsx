import React,{useState,useRef} from 'react';
import { Flex, Box, FormControl,Input,FormLabel, Heading, Button
  } from '@chakra-ui/react'
import { useSelector,useDispatch } from 'react-redux';
import { editUser } from '../Redux/Authentication/action';
export default function Edit(){
    const baseUrl="http://localhost:8080/";
   const dispatch = useDispatch();
    const user=useSelector((store)=>store.authReducer.user)

const [dbname,setDbname]=useState(user.name);
const [userId,setUserId]=useState(user.id);
const [name,setName] = useState("");

const [email,setEmail]=useState(user.email);
const[dbImg,setDbImg]=useState(user.profileImg?`${baseUrl}uploads/${user.profileImg}`:'https://bit.ly/broken-link');
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

const handleSubmit=async()=>{
    dispatch(editUser(image,dbImg,baseUrl,userId,name))
  
}
    return (
        <Flex p="2em" justify={"space-between"} h="100vh" align={"flex-start"}>
            <Box w="60%">
            <FormControl margin={"0 auto"} w={["100%","100%","100%","100%","100%"]}>
        <FormLabel my={"1em"}>Name</FormLabel>
        <Input placeholder='Change your Name ' type='text' value={dbname} onChange={(e)=>{setName(e.target.value); setDbname(e.target.value)}} />
        <FormLabel my={"1em"}>Email</FormLabel>
        <Input placeholder='Change your Email ' type='text' disabled value={email}  />
        </FormControl>
       <Button my={"1em"}  onClick={handleSubmit}>Edit</Button>
            </Box>
            <Box w="30%">
            <FormLabel my={"1em"}>Profile Image</FormLabel>

        {
            dbImg?
            (
                    <div onClick={handleImageClick} style={{border:"4px dashed grey",padding:"2em",margin:"0 auto"}}>
                    <img src={dbImg} alt="" style={{margin:"0 auto"}}/>
                    <input type="file" ref={inputRef} onChange={handleChange}style={{display:"none"}}></input>
              </div>
              ):
              (
            <div onClick={handleImageClick} style={{border:"4px dashed black",width:"80%",margin:"0 auto"}}>
                {
                image?
                (
                 <img src={URL.createObjectURL(image)} alt="uploaded" style={{width:"90%",margin:"0 auto"}}/>
                ):
                (
                    // <img style={{width:"90%",margin:"0 auto"}} src="hero.png"/>
                <Heading p="2em 1em" fontSize="1em" textAlign={"center"}>Click To Upload Profile Picture</Heading>
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