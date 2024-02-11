import React ,{useEffect,useState}from 'react';
import Navbar from '../Components/Navbar';
import RecipeForm from '../Pages/Form';

export default function Home(){
    const [recipes,setRecipes]=useState([]);
    const getRecipe=async()=>{

        const data=await fetch("http://localhost:8080/");
        const response=await data.json();
        console.log(response.posts);
       setRecipes(response.posts);
      }
      useEffect(()=>{
        getRecipe();
        
      },[])
    return <>
    <Navbar/>
    <RecipeForm/>
   { recipes && recipes.map((rec,index)=>{
    return <div key={index}><h1 >{rec.title}</h1>
    {/* <img width="50%" src={rec.url}></img> */}
    <p>{}</p>
    </div>
   })}
    </>
}