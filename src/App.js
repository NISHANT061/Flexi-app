import React from "react";
import "./App.scss";
import Flexi from "./Components/Flexi/Flexi";

function App() {
  const flexiConfig = {
    items: [
      {
        name: "person_name",

        label: "Person's Name",

        type: "TextField",
      },

      {
        name: "states",

        label: "Person's state",

        type: "DropDown",

        values: ["Maharashtra", "Kerala", "Tamil Nadu"],
      },
    ],
  };
  const onSubmitHandler=(data)=>{
    alert(`Data Recieved: Person's Name -> ${data.person_name},Person's state ->${data.state}`)
  }
  return <div className="App">
    <div className="App-title"><h1>Flexi Tree</h1></div>
    <div className="flexi-tree">
    <Flexi config={flexiConfig} onSubmitHandler={onSubmitHandler}>
    <Flexi config={flexiConfig} onSubmitHandler={onSubmitHandler}>
    <Flexi config={flexiConfig} onSubmitHandler={onSubmitHandler}/>
    <Flexi config={flexiConfig} onSubmitHandler={onSubmitHandler}>
    <Flexi config={flexiConfig} onSubmitHandler={onSubmitHandler}/>
    <Flexi config={flexiConfig} onSubmitHandler={onSubmitHandler}/>
      </Flexi>
      </Flexi>
    <Flexi config={flexiConfig} onSubmitHandler={onSubmitHandler}/>
    <Flexi config={flexiConfig} onSubmitHandler={onSubmitHandler}/>
      </Flexi>
      </div>
  </div>;
}

export default App;
