import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/firestore'
import 'firebase/compat/analytics'
import { getDatabase } from 'firebase/database';
import {getAuth,GoogleAuthProvider } from "firebase/auth"
import { getStorage } from 'firebase/storage';




const firebaseConfig = {
    apiKey: "AIzaSyASEsfIWeNyLb3VvDz9MfakFNCVPCG30EI",
    authDomain: "alastore-67079.firebaseapp.com",
    databaseURL: "https://alastore-67079-default-rtdb.firebaseio.com",
    projectId: "alastore-67079",
    storageBucket: "alastore-67079.appspot.com",
    messagingSenderId: "439690590931",
    appId: "1:439690590931:web:445f0bdbe87ddf51d47226",
    measurementId: "G-9BF4L01EJ7"
};


const dataUser = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const database = firebase.database();
export const app = dataUser
export const data = getDatabase(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
export const provider = new GoogleAuthProvider()
export default firebase