import firestore from "@react-native-firebase/firestore";
import Toast from "react-native-toast-message";

const usersCollection = firestore().collection("users");
const FirestoreService = {
  addUser: async (userData: any) => {
    try {
      await usersCollection.add(userData);
    } catch (error) {
      console.error("Error adding user: ", error);
      Toast.show({
        type: "error",
        text1: "Error adding user",
      });
    }
  },
};

export default FirestoreService;
