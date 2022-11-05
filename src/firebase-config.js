import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEZwQGY-KzvzcOUqAxp0rH5EDHkG5rE4o",
  authDomain: "arapaapp-31fbf.firebaseapp.com",
  databaseURL: "https://arapaapp-31fbf-default-rtdb.firebaseio.com",
  projectId: "arapaapp-31fbf",
  storageBucket: "arapaapp-31fbf.appspot.com",
  messagingSenderId: "1039868308295",
  appId: "1:1039868308295:web:340363a1c8626d4f603a62",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
