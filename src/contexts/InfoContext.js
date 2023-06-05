import { createContext, useContext, useEffect, useState } from "react";

const InfoContext = createContext();

export function useInfo() {
    return useContext(InfoContext);
}


export default function InfoProvider({ children }) {
    const [information, setInformation] = useState();
    const [visible, setVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const viewInformation = (movie) => {
        setInformation(movie);
        setVisible(true);
    }

    const removeInfo = () => setVisible(false);
    const setLoadingState = () => {
        setIsLoading(false)
        console.log(isLoading)
    };

    const value = {
        information,
        viewInformation,
        visible,
        removeInfo,
        isLoading,
        setLoadingState,
    };

    return (
        <InfoContext.Provider value={value}>{children}</InfoContext.Provider>
    )
}
