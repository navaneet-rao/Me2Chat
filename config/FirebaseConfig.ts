// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

import Constants from "expo-constants"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCAyxC843Hg7MOFyFWbEnhtaFF-pivoHNE" ,
  authDomain: "me2chat-91764.firebaseapp.com",
  projectId: "me2chat-91764",
  storageBucket: "me2chat-91764.appspot.com",
  messagingSenderId: "138501640989",
  appId: "1:138501640989:web:951d23b8cad867617d07f4"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP)

//////////////////////////////////////////////////////////////////////////////////

// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth"
// import { getFirestore } from "firebase/firestore"

// import Constants from "expo-constants"

// interface ManifestExtra {
//   databaseURL?: any;
//   authDomain?: any;
//   projectId?: any;
//   storageBucket?: any;
//   messagingSenderId?: any;
//   appId?: any;
//   apikey?: string;
//   // Add other properties as needed
// }


// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//   apiKey: (Constants.manifest2?.extra as ManifestExtra)?.apikey,
//   authDomain: (Constants.manifest2?.extra as ManifestExtra)?.authDomain,
//   projectId: (Constants.manifest2?.extra as ManifestExtra)?.projectId,
//   storageBucket: (Constants.manifest2?.extra as ManifestExtra)?.storageBucket,
//   messagingSenderId: (Constants.manifest2?.extra as ManifestExtra)?.messagingSenderId,
//   appId: (Constants.manifest2?.extra as ManifestExtra).appId,
//   databaseURL: (Constants.manifest2?.extra as ManifestExtra)?.databaseURL
// };

// // Initialize Firebase
// export const FIREBASE_APP = initializeApp(firebaseConfig);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// export const FIREBASE_DB = getFirestore(FIREBASE_APP)
