import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const name = localStorage.getItem('name');

        if (token) {
            setSession({ user: { name: name || "User", role: role || "user" } });
            setStatus("authenticated");
        } else {
            setSession(null);
            setStatus("unauthenticated");
        }
    }, []);

    const signIn = (userData) => {
        localStorage.setItem('token', userData.token);
        localStorage.setItem('role', userData.role);
        localStorage.setItem('name', userData.name || userData.fullname);
        setSession({ user: { name: userData.name || userData.fullname, role: userData.role } });
        setStatus("authenticated");
    }

    const signOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('name');
        setSession(null);
        setStatus("unauthenticated");
    }

    return (
        <AuthContext.Provider value={{ data: session, status, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useSession = () => {
    const context = useContext(AuthContext);
    if (!context) {
        return { data: null, status: "unauthenticated" };
    }
    return context;
};
