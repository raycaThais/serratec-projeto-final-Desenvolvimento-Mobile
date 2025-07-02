
import React from 'react';
import { Routes } from "./src/routes";
import { TemaProvider } from "./src/context";


const App = () => {
  return (
    <TemaProvider>
     <Routes />
     </TemaProvider>

  );
}

export default App;