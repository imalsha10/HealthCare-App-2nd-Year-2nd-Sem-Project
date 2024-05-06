import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJZtckpvrjt2YiH3y75_bH8MvpQVkGbjM",
  authDomain: "blog-event-16042501.firebaseapp.com",
  projectId: "blog-event-16042501",
  storageBucket: "blog-event-16042501.appspot.com",
  messagingSenderId: "604669671160",
  appId: "1:604669671160:web:a9305744c4cc717a232d0d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
