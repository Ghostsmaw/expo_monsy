import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase (DONE)
const firebaseConfig = {
  measurementId: "G-0R28YR8VKN",
  apiKey: "AIzaSyApnX3B25-osqrmjNhYPcrvw5gO6v16tQk",
  authDomain: "kollo-app-8295a.firebaseapp.com",
  projectId: "kollo-app-8295a",
  storageBucket: "kollo-app-8295a.appspot.com",
  messagingSenderId: "244032969090",
  appId: "1:244032969090:web:06d6cf99e3ca5ec1f4579b",
};

const app = initializeApp(firebaseConfig);
