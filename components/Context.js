import { createContext, useState } from 'react';


const GlobalContext = createContext();

const GlobalState = (props)=>{
    const [isLogged, setIsLogged] = useState(false);
    const [username, setUsername] = useState("");
    const [userid, setUserid] = useState("");

    return (
        <GlobalContext.Provider value={{isLogged:isLogged, setIsLogged:setIsLogged, username:username, setUsername:setUsername, userid:userid, setUserid:setUserid}}>
            {props.children}
        </GlobalContext.Provider>
    );
}

export {GlobalState, GlobalContext};