// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAc4_A0HK3eozjRpN2s2AzKAhym9ZhEyXQ",
	authDomain: "pneuzin-reviews.firebaseapp.com",
	databaseURL: "https://pneuzin-reviews-default-rtdb.firebaseio.com",
	projectId: "pneuzin-reviews",
	storageBucket: "pneuzin-reviews.appspot.com",
	messagingSenderId: "578192099583",
	appId: "1:578192099583:web:bc2cefce2a115626a264ca",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
