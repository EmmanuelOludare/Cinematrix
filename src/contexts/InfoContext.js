import { createContext, useContext, useEffect, useState } from "react";

const InfoContext = createContext();

export function useInfo() {
    return useContext(InfoContext);
}


export default function InfoProvider({ children }) {
    const [information, setInformation] = useState();
    const [visible, setVisible] = useState(false);
    const [bookmarks, setBookmarks] = useState([]);
    const [bookmarkAlert, setBookmarkAlert] = useState('');
    const [bookmarkAlertState, setBookmarkAlertState] = useState(false)

    const viewInformation = (movie) => {
        setInformation(movie);
        setVisible(true);
    }
    const handleTimeout = () => {
        setBookmarkAlertState(true);
        setTimeout(() => {
            setBookmarkAlertState(false);
        }, 3000);
    }

    const addBookmark = (e, information) => {
        e.preventDefault();
        if (!bookmarks.includes(information))
            try {
                const updatedBookmarks = [...bookmarks, information];
                setBookmarks(updatedBookmarks);
                localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
                setBookmarkAlert('Added to Bookmarks!');
                handleTimeout();
            } catch (error) {
                console.log(error);
            }
    }

    const removeBookmark = (e, information) => {
        e.preventDefault();
        if (bookmarks.includes(information)) {
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
            const newBookmarks = [...bookmarks];
            const index = newBookmarks.findIndex(b => b.id === information.id);
            if (index !== -1) {
                newBookmarks.splice(index, 1);
            }
            setBookmarks(newBookmarks);
            localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
            setBookmarkAlert('Removed from Bookmarks!');
            handleTimeout();
        }
    };

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
        addBookmark,
        removeBookmark,
        bookmarkAlert,
        bookmarkAlertState
    };

    return (
        <InfoContext.Provider value={value}>{children}</InfoContext.Provider>
    )
}
