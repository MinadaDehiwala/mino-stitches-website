import React, { useEffect, useState, createContext } from 'react';
import { auth } from '../configs/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from '../configs/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';

// Create a context; these context variables are accessible within every component.
const AuthContext = createContext({
    user: null,
    login: () => { },
    logout: () => { },
});

const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const usersCollection = collection(db, 'users');

        const fetchUserDetails = async (user) => {
            if (user) { // check if user is already logged in
                const q = query(usersCollection, where('uid', '==', user.uid));

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    const userData = {
                        first_name: doc.data().first_name,
                        last_name: doc.data().last_name,
                        account_type: doc.data().account_type, // assuming 'account_type' field exists
                        uid: doc.data().uid,
                        email: user.email
                    };
                    setAuthUser(userData);
                    localStorage.setItem('userType', userData.account_type); // Save user type in local storage
                });
            }
        };

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                fetchUserDetails(user);
            } else {
                setAuthUser(null);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    // Set user data when they login
    const login = (userData) => {
        setAuthUser(userData);
    };

    // Reset user data when they logout
    const logout = () => {
        setAuthUser(null);
        localStorage.removeItem('userType');
    };

    return (
        <AuthContext.Provider value={{ authUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
