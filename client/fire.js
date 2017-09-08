import firebase from 'firebase';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID } from '../config/firebaseConfig';

const config = {
  apiKey: process.env.FIREBASE_API_KEY || FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL || FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID || FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || FIREBASE_MESSAGING_SENDER_ID
};

const fire = firebase.initializeApp(config);
export default fire;
