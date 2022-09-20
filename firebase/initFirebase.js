import {getApps, initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";

const clientCredentials = {
  apiKey: "AIzaSyANiqMFoRwZUN4iuVfZjZ2vPAsiQBW_ELg",
  authDomain: "test-project-2403.firebaseapp.com",
  projectId: "test-project-2403",
  storageBucket: "test-project-2403.appspot.com",
  messagingSenderId: "52075358286",
  appId: "1:52075358286:web:900ed881740efc6fe8bb1f",
  measurementId: "G-5829C7YMKN"
};

const initFirebaseApp = function () {
  if (!getApps().length) {
      initializeApp(clientCredentials);
      console.log("Firebase has been init successfully");
  }
}

// Initialize Firebase
const app = initializeApp(clientCredentials);
const storage = getStorage(app);

export {initFirebaseApp, app, storage};
