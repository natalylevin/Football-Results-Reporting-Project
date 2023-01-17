import React, {useState} from "react";

const AppContext = React.createContext(null);

export function useAppContext() {
    const context = React.useContext(AppContext);

    if (context === undefined) {
        throw new Error(`useAppContext must be used within a AppContextProvider`)
    }

    return context;
}

export function AppContextProvider(props) {
    const value = useState({
        isLogged: false
    });
    return <AppContext.Provider value={value} {...props} />
}
