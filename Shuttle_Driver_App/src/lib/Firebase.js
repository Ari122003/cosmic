// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCqqoWZ4dMl9J-hrzj0tY4635UPKvz80CA",
	authDomain: "cosmic-driver-app.firebaseapp.com",
	projectId: "cosmic-driver-app",
	storageBucket: "cosmic-driver-app.appspot.com",
	messagingSenderId: "548155568534",
	appId: "1:548155568534:web:9f9437e33b1ea733136db7",
	measurementId: "G-WHJK9LJCEK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const auth = getAuth(app);

export default app;
