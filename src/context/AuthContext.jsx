import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    // Mock simple session for testing
    const [session, setSession] = useState({ user: { name: "System Admin", role: "admin", email: "admin@example.com" } });

    const signIn = (provider, options) => {
        console.log("Mock signIn", provider, options);
        return Promise.resolve({ ok: true });
    }

    const signOut = () => {
        console.log("Mock signOut");
        setSession(null);
    }

    return (
        <AuthContext.Provider value={{ data: session, status: session ? "authenticated" : "unauthenticated", signIn, signOut }}>
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

export const signIn = (provider, options) => {
    console.log("Mock SignIn triggered", provider, options);
}
