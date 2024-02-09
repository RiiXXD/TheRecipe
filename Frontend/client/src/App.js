import './App.css';
import React from 'react';
import RecipeForm  from './Pages/Form';
import AllRoutes from './routers/Routers';
import { ChakraProvider } from '@chakra-ui/react'
function App() {
  return (
    <ChakraProvider>
    <div className="App" >
    <AllRoutes/>
    {/* <RecipeForm/> */}
    </div>
    </ChakraProvider>
    
  );
}

export default App;
