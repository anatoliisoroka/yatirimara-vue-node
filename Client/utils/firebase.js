import firebase from 'firebase/app'
import "firebase/auth";
// import 'firebase/storage'
// import 'firebase/messaging'
// import 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyD7dLvJs4bMUFcPGdZOI4z7Oq63ScR7oSs",
    authDomain: "invest-51778.firebaseapp.com",
    projectId: "invest-51778",
    storageBucket: "invest-51778.appspot.com",
    messagingSenderId: "1039683399076",
    appId: "1:1039683399076:web:f7fd50db0d22bf2042a531",
    measurementId: "G-6QSS45D7VW"
};

firebase.initializeApp(firebaseConfig)
export const auth = firebase.auth();
export const google = new firebase.auth.GoogleAuthProvider();
export const facebook = new firebase.auth.FacebookAuthProvider();

export default firebase
