import { useEffect, useState, createContext } from 'react';

const API_URL = 'http://localhost:5005';
const UserAuthContext = createContext();

function UserAuthProviderWrapper(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const storeToken = (token) => {
        localStorage.setItem('authToken', token);
    }

    return (
        <UserAuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken }}>
            {props.children}
        </UserAuthContext.Provider>
    )
}

export { UserAuthProviderWrapper, UserAuthContext };