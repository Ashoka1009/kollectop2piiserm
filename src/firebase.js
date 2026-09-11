import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Live Firebase Configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAJfZ-I-P45krv9K03XYxkdxPIJnENyGq0",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "kollectop2p-iiserm-58388.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "kollectop2p-iiserm-58388",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "kollectop2p-iiserm-58388.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1073623071180",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1073623071180:web:00b4e3768bce96a44ac569",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-E1YS9329SV"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);

/**
 * Upload a File object to Firebase Storage under /products/
 * @param {File} file - The file object to upload
 * @returns {Promise<string>} Download URL of the uploaded image
 */
export async function uploadProductImage(file) {
  try {
    const filename = `products/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const storageRef = ref(storage, filename);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image to Firebase Storage:", error);
    throw error;
  }
}
