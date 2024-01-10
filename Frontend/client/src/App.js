import './App.css';
import React from 'react';
import AllRoutes from './routers/Routers';
import { ChakraProvider } from '@chakra-ui/react'
function App() {
  return (
    <ChakraProvider>
    <div className="App">
    <AllRoutes/>
    </div>
    </ChakraProvider>
    
  );
}

export default App;
