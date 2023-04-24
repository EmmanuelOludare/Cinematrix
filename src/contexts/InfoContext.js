import { createContext, useContext, useEffect, useState } from "react";

const InfoContext = createContext();

export function useInfo() {
    return useContext(InfoContext);
}


export default function InfoProvider({ children }) {
    const [information, setInformation] = useState();
    const [visible, setVisible] = useState(false);
    const [bookmarks, setBookmarks] = useState([]);

    const viewInformation = (movie) => {
        setInformation(movie);
        setVisible(true);
    }

    const handleBookmark = (e, information) => {
        e.preventDefault();
        if (bookmarks.indexOf(information) !== -1) {
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            const newBookmarks = [...bookmarks];
            const index = newBookmarks.findIndex(b => b.id === information.id);
            if (index !== -1) {
                newBookmarks.splice(index, 1);
            }
            setBookmarks(newBookmarks);
            localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
        } else {
            try {
                const updatedBookmarks = [...bookmarks, information];
                setBookmarks(updatedBookmarks);
                localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        setBookmarks(storedBookmarks);
    }, []);

    const removeInfo = () => setVisible(false);
    const value = {
        information,
        viewInformation,
        visible,
        removeInfo,
        bookmarks,
        handleBookmark
    };

    return (
        <InfoContext.Provider value={value}>{children}</InfoContext.Provider>
    )
}
