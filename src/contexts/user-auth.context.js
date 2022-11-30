import { useEffect, useState, createContext } from 'react';

const UserAuthContext = createContext();

function UserAuthProviderWrapper(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const storeToken = (token) => {
        localStorage.setItem('userAuthToken', token);
    }
    
    const storedToken = localStorage.getItem('userAuthToken');

    const authenticateUser = async() => {
        const storedToken = localStorage.getItem('userAuthToken');
        if (storedToken) {
            const res = await fetch(`${process.env.API_URL}user/verify`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                }
            })
            const parsed = await res.json()
            setIsLoggedIn(true);
            setIsLoading(false);
            setUser(parsed);
        } else {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
        }
    } 

    const removeToken = () => {
        localStorage.removeItem('userAuthToken');
    }

    const logOutUser = () => {
        removeToken();
        authenticateUser();
        
    }

    useEffect(() => {
        authenticateUser();
    }, [])

    return (
        <UserAuthContext.Provider value={{
            isLoggedIn,
            isLoading,
            user,
            storeToken,
            authenticateUser,
            setIsLoggedIn,
            logOutUser,
            storedToken
        }}>
            {props.children}
        </UserAuthContext.Provider>
    )
}

export { UserAuthProviderWrapper, UserAuthContext };