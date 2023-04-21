import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAS1KOT74WS-LgViBHT93APnDgoAhS8qaY",
    authDomain: "movie-app-dev-99779.firebaseapp.com",
    projectId: "movie-app-dev-99779",
    storageBucket: "movie-app-dev-99779.appspot.com",
    messagingSenderId: "975814748862",
    appId: "1:975814748862:web:16c1359deae25798058cef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;