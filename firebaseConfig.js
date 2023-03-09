import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  measurementId: '',
  apiKey: 'AIzaSyCCTzz1RXga3itwYv-YcW3zEmGLwe1mBL8',
  authDomain: 'monsy-demo-application.firebaseapp.com',
  projectId: 'monsy-demo-application',
  storageBucket: 'monsy-demo-application.appspot.com',
  messagingSenderId: '1058017311089',
  appId: '1:1058017311089:web:510cd36919bb68739c5ed0',
};

const app = initializeApp(firebaseConfig);
