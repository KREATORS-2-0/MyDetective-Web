import React from 'react'
import Button from './components/Button'
import UnorderedList from './components/UnorderedList'
import Image from './components/ImageComponent'
import './css/app.css'
import Connect from "./components/Connect";



const App = () => {
  return (
    <>
      <Connect />
      <div className="app-container">
        <h1>MyDetective</h1>
      </div>

      <div>
        <UnorderedList></UnorderedList>
      </div>
      
      <div>
        <Image></Image>
      </div>

      <div>
        <Button/>
      </div>
    </>
  );
};

export default App;
