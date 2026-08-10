import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCQl3u_BhRaIxiRUuQJD5-vBMkLQSBBihQ",
  authDomain: "vishal-portfolio-10811.firebaseapp.com",
  projectId: "vishal-portfolio-10811",
  storageBucket: "vishal-portfolio-10811.firebasestorage.app",
  messagingSenderId: "175017167365",
  appId: "1:175017167365:web:ee3c4fc302f135430baa6c",
  measurementId: "G-87VSX65C51",
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);

export default app;