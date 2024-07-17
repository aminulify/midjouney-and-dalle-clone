import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateCurrentUser, updateProfile} from "firebase/auth";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(false);

    const createUser = (email, password) =>{
        setUserLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const moreDetailUser = (name) =>{
        return updateProfile(auth.currentUser,{
            displayName: name, photoURL: null
        })
    }

    const signInUser = (email, password) =>{
        setUserLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleVerify = () =>{
        setUserLoading(true);
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    const logOut = () =>{
        return signOut(auth);
    }

    useEffect(()=>{
        setUserLoading(true);
        const unSubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            console.log(currentUser);
            setUserLoading(false);
        })
        return ()=>{
            unSubscribe();
        }
    },[])

    const authInfo = {
        user,
        userLoading,
        createUser,
        moreDetailUser,
        signInUser,
        googleVerify,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;