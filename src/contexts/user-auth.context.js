import { useEffect, useState, createContext } from 'react';

const API_URL = 'http://localhost:5005';
const AuthContext = createContext();

function UserAuthProviderWrapper(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{ isLoggedIn, isLoading, user }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { UserAuthProviderWrapper, AuthContext };