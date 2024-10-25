import { createContext, useState } from "react";
import { initialState } from "../data/data";
export const Context = createContext();

export const ContextProvider = (props) => {
    
    const [globalForm, setGlobalForm ]= useState(initialState)

    const handleChangeForm = (key, value) => { 
        // console.log(key, value)
        setGlobalForm(prevState => ({
            ...prevState,
            [key]: value
          }));
    }

    return (
        <Context.Provider
            value={{
                globalForm, 
                handleChangeForm
            }}
        >
            {props.children}
        </Context.Provider>
    );
}