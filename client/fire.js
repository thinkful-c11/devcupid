import firebase from 'firebase';
// import {
//   FIREBASE_API_KEY,
//   FIREBASE_AUTH_DOMAIN,
//   FIREBASE_DATABASE_URL,
//   FIREBASE_PROJECT_ID,
//   FIREBASE_STORAGE_BUCKET,
//   FIREBASE_MESSAGING_SENDER_ID } from '../config/firebaseConfig';

const config = {
  apiKey: 'AIzaSyAkoL7gY5AMqCwKDhJ_RF3hNnBcQZv4kfg',
  // || FIREBASE_API_KEY,
  authDomain: 'devcupid-400c8.firebaseapp.com',
  // || FIREBASE_AUTH_DOMAIN,
  databaseURL: 'https://devcupid-400c8.firebaseio.com',
  // || FIREBASE_DATABASE_URL,
  projectId: 'devcupid-400c8',
  // || FIREBASE_PROJECT_ID,
  storageBucket: 'devcupid-400c8.appspot.com',
  // || FIREBASE_STORAGE_BUCKET,
  messagingSenderId: '287438957512'
  // || FIREBASE_MESSAGING_SENDER_ID
};

const fire = firebase.initializeApp(config);
export default fire;
