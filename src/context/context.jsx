import { createContext, useState } from "react";
// import { initialState } from "../data/data";
export const Context = createContext();

export const ContextProvider = (props) => {
    
    const [globalForm, setGlobalForm ]= useState({})

    const handleChangeForm = (key, value) => { 
        // console.log(key, value)
        setGlobalForm(prevState => ({
            ...prevState,
            [key]: value
          }));
    }

    const handleSubmit = () => {
        console.log("finalForm", JSON.stringify(globalForm, null, 2))
      
    }

    return (
        <Context.Provider
            value={{
                globalForm, 
                handleChangeForm, 
                handleSubmit
            }}
        >
            {props.children}
        </Context.Provider>
    );
}