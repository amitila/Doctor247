import React, { useEffect, useState, useMemo, useContext } from 'react';

export const AppContext =  React.createContext();

export default function AppProvider({children}) {
    const [currentMenuItem, setCurrentMenuItem] = useState(1);
    
    return (
        <AppContext.Provider 
        value={{
            currentMenuItem, 
            setCurrentMenuItem
        }}>
            {children}
        </AppContext.Provider>
    );
}

