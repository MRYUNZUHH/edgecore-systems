import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Auth Functions
export const loginWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: result.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const registerWithEmail = async (email: string, password: string, username: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    // Create user profile in Firestore
    await setDoc(doc(db, 'users', result.user.uid), {
      username,
      email,
      avatar: '😎',
      balance: 10000,
      vipTier: 0,
      totalBets: 0,
      totalWins: 0,
      totalLosses: 0,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    });
    return { success: true, user: result.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // Check if user exists, if not create profile
    const userDoc = await getDoc(doc(db, 'users', result.user.uid));
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', result.user.uid), {
        username: result.user.displayName || 'Player',
        email: result.user.email,
        avatar: '😎',
        balance: 10000,
        vipTier: 0,
        totalBets: 0,
        totalWins: 0,
        totalLosses: 0,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      });
    }
    return { success: true, user: result.user };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

// Firestore Functions
export const getUserProfile = async (uid: string) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const updateUserProfile = async (uid: string, data: any) => {
  const docRef = doc(db, 'users', uid);
  await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
};

export const updateBalance = async (uid: string, amount: number) => {
  const docRef = doc(db, 'users', uid);
  await updateDoc(docRef, {
    balance: increment(amount),
    totalBets: increment(1),
    totalWins: amount > 0 ? increment(1) : increment(0),
    totalLosses: amount < 0 ? increment(1) : increment(0),
  });
};

export const recordBet = async (uid: string, betData: any) => {
  const betsRef = doc(db, 'bets', betData.id);
  await setDoc(betsRef, {
    ...betData,
    uid,
    timestamp: serverTimestamp(),
  });
};

// Storage Functions
export const uploadAvatar = async (uid: string, file: File) => {
  const storageRef = ref(storage, `avatars/${uid}/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  await updateDoc(doc(db, 'users', uid), { avatar: url });
  return url;
};

export { auth, db, storage };
