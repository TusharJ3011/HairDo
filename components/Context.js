import { createContext, useState } from 'react';


const GlobalContext = createContext();

const GlobalState = (props)=>{
    const [isLogged, setIsLogged] = useState(false);
    const [username, setUsername] = useState("");
    const [userid, setUserid] = useState("");
    const [userPic, setUserPic] = useState("");

    return (
        <GlobalContext.Provider value={{isLogged:isLogged, setIsLogged:setIsLogged, username:username, setUsername:setUsername, userid:userid, setUserid:setUserid, userPic:userPic, setUserPic:setUserPic}}>
            {props.children}
        </GlobalContext.Provider>
    );
}

export {GlobalState, GlobalContext};