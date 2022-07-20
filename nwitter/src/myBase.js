import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA7snWKCR0RyuD0SdfFu3JM8fEphmnUFQk",
    authDomain: "nwitter-b42c8.firebaseapp.com",
    projectId: "nwitter-b42c8",
    storageBucket: "nwitter-b42c8.appspot.com",
    messagingSenderId: "379344828263",
    appId: "1:379344828263:web:00f45e621b060ba310e1c2"
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();