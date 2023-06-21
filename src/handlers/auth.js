import {GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import {auth} from "../lib/firebase.config";

const provider = new GoogleAuthProvider();
const FirebaseAuth = {
  signIn: () => {
    return new Promise(resolve => {
      signInWithPopup(auth, provider)
          .then((result) => {
            resolve(result.user);
          })
          .catch((error) => {
            console.error(error);
          });
    });
  },
  signOut: () => {
    signOut(auth)
        .then(() => console.log("User logged out"))
        .catch((error) => console.error(error));
  },
  getCurrentUser: () => {
    return new Promise(resolve => {
      return auth.onAuthStateChanged(resolve);
    });
  }
};

export default FirebaseAuth;
