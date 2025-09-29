import { createContext, useState, useEffect } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { getDatabase, ref, get, set } from 'firebase/database'; // Add these imports
import { app } from "../firebaseConfig"
import axios from "axios";
import { registerUser } from '../utils/APIrequests';

// Initialize Database
const db = getDatabase(app);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get user data from Realtime Database
        const userRef = ref(db, `users/${firebaseUser.uid}`);
        const snapshot = await get(userRef);
        const userData = snapshot.exists() ? snapshot.val() : {};

        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: userData.name || firebaseUser.email.split('@')[0],
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userRef = ref(db, `users/${userCredential.user.uid}`);
      const snapshot = await get(userRef);
      const userData = snapshot.exists() ? snapshot.val() : {};

      const currentUser = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        name: userData.name || userCredential.user.email.split('@')[0],
        // isAdmin: userData.isAdmin || false  // Critical for redirection logic
      };

      setUser(currentUser);
      return currentUser;  // Return user data to Login.jsx
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      console.log("Registered in firebase");

      const user = userCredential.user;
      await updateProfile(user, {
        displayName: name
      });

      await set(ref(db, 'users/' + user.uid), {
        name,
        email
      });

      //-- SEND UID, API call 
      let response;
      axios.post(registerUser, {
        "username": name,
        "firebase_uid": user.uid
      }).then(res => {
        // response = res.data;
        console.log("Registered in backend");
        console.log(response);
        // setData(response);
      }).catch(err => { })

      return userCredential;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('current-user');
      localStorage.removeItem('user-uid');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const deleteUser = async () => {
    try {
      //delete from firebase
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        deleteUser(user)
          .then(() => {
            console.log("User deleted successfully from firebase");
            //remove from local storage
            localStorage.removeItem('current-user');
            localStorage.removeItem('user-uid');
            console.log("User removed from local storage");
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
          });
      } else {
        console.log("No user is logged in");
      }



    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
};