import { createContext } from "react";
import { useState } from "react";

const SessionContext = createContext({
    isLoggedIn: false
})


const SessionContextProvider = (props) => {
    const [isLoggedIn, setLoggedIn] = useState(false);

    return (
        <SessionContext.Provider value={{ isLoggedIn: isLoggedIn, setLoggedIn: setLoggedIn }}>
            {props.children}
        </SessionContext.Provider>
    )
}

export { SessionContextProvider, SessionContext };