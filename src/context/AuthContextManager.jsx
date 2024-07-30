import React, { useEffect, useState } from 'react';
import { auth } from '../configs/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from '../configs/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';

// Create a context; these context variables are accessible within every component.
const AuthContext = React.createContext({
    user: null,
    login: () => { },
    logout: () => { },
});

const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const usersCollection = collection(db, 'users');

        const fetchUserDetails = async (user) => {
            if (user) { // check if user is already loged in
                const q = query(usersCollection, where('uid', '==', user.uid));

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    setAuthUser({
                        first_name: doc.data().first_name,
                        last_name: doc.data().last_name,
                        account_type: 'customer',
                        uid: doc.data().uid,
                        email: user.email
                    })
                });
            }
        };



        const unsubscribe = onAuthStateChanged(auth, fetchUserDetails);

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // Set user data when they login
    const login = (user) => {
        if (user) {
            setAuthUser(user);
        }
    };

    // Reset user data when they logout
    const logout = () => {
        setAuthUser(null);
    };

    return (
        <AuthContext.Provider value={{ authUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
