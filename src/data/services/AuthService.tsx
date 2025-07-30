import auth, {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "@react-native-firebase/auth";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { addUser } from "./FireStoreService";

const createAccount = async (email: string, password: string, name: string) => {
  return createUserWithEmailAndPassword(getAuth(), email, password)
    .then((user) => {
      if (user) {
        addUser({
          email: user.user.email,
          name: name,
          uid: user.user.uid,
        });
      }
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        Toast.show({
          type: "error",
          text1: "That email address is already in use!",
        });
        console.log("That email address is already in use!");
      }

      if (error.code === "auth/invalid-email") {
        Toast.show({
          type: "error",
          text1: "That email address is invalid!",
        });
        console.log("That email address is invalid!");
      }
    });
};
const signIn = async (email: string, password: string) => {
  return signInWithEmailAndPassword(getAuth(), email, password)
    .then((user) => {
      if (user) {
        return user;
      }
    })
    .catch((error) => {
      console.log("SIGN-IN ERROR:", error.code, error.message);

      if (error.code === "auth/wrong-password") {
        Toast.show({
          type: "error",
          text1: "Wrong password!",
        });
        console.log("Wrong password!");
      }
      if (error.code === "auth/invalid-email") {
        Toast.show({
          type: "error",
          text1: "Invalid email address!",
        });
        console.log("Invalid email address!");
      }
      if (error.code === "auth/invalid-credential") {
        Toast.show({
          type: "error",
          text1: "Invalid credentials provided!",
        });
        console.log("Invalid credentials provided!");
      }
      if (error.code === "auth/user-not-found") {
        Toast.show({
          type: "error",
          text1: "No user found with this email!",
        });
        console.log("No user found with this email!");
      }

      if (error.code === "auth/too-many-requests") {
        Toast.show({
          type: "error",
          text1: "Too many failed attempts. Try again later!",
        });
        console.log("Too many failed attempts.");
      }
    });
};

export { createAccount, signIn };
