// Import the functions you need from the SDKs you need
import app from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
import { doc, setDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: 'AIzaSyBGn1bWcoj-QPE4fa9pSYU6g1vM7y3ySJY',
  // authDomain: 'gestion-test-uat.firebaseapp.com',
  // projectId: 'gestion-test-uat',
  // storageBucket: 'gestion-test-uat.appspot.com',
  // messagingSenderId: '749882516781',
  // appId: '1:749882516781:web:ec68788645dbce130c9fa4',

  // apiKey: 'AIzaSyBemXHE1bGXWTKL0EuEhj_pEQoXWcCf7ZU',
  // authDomain: 'mobileappgestiontest.firebaseapp.com',
  // projectId: 'mobileappgestiontest',
  // storageBucket: 'mobileappgestiontest.appspot.com',
  // messagingSenderId: '730301013908',
  // appId: '1:730301013908:web:d1bf80202399a94a673981',

  // apiKey: 'AIzaSyAdmQ6dyVydzQ1e-4fQER4SBWT5u9Dy3WQ',
  // authDomain: 'mobileappgestiontest-e2ac2.firebaseapp.com',
  // projectId: 'mobileappgestiontest-e2ac2',
  // storageBucket: 'mobileappgestiontest-e2ac2.appspot.com',
  // messagingSenderId: '1067877859479',
  // appId: '1:1067877859479:web:b0cf9107affc4b0f42e9d2',
  // measurementId: 'G-T73FH8KL6W',

  apiKey: 'AIzaSyA8h8NlOh-BdUANAXFIOCWH7omIy6q3j64',
  authDomain: 'gestiontest-553fe.firebaseapp.com',
  projectId: 'gestiontest-553fe',
  storageBucket: 'gestiontest-553fe.appspot.com',
  messagingSenderId: '235328410962',
  appId: '1:235328410962:web:1da3802dbd1c6dae01968b',
  measurementId: 'G-3B9TF35GKY',
};

// Initialize Firebase
const initfirebase = app.initializeApp(firebaseConfig);

export default initfirebase;
