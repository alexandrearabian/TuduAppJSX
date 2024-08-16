// src/firestoreUtils.js
import { db } from '../authentication/FirebaseConfig';
import { doc, setDoc, getDoc, deleteDoc, updateDoc, collection, getDocs } from 'firebase/firestore';

// Function to get data from Firestore
export async function getData(collectionName, thing) {
    const docRef = doc(db, collectionName, thing);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document!");
        return null;
    }
}

// Function to set data in Firestore
export async function setData(collectionName, thing, value) {
    const docRef = doc(db, collectionName, thing);
    await setDoc(docRef, value);
}

// Function to update a single field in Firestore
export async function updateField(collectionName, thing, field, value) {
    const docRef = doc(db, collectionName, thing);
    await updateDoc(docRef, { [field]: value });
}

// Function to clear all data in Firestore (not recommended for large collections)
export async function clearData(collectionName) {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);

    querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
    });
}

// Function to remove data from Firestore
export async function removeData(collectionName, id) {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
}

// Function to get all documents from a Firestore collection
export async function getCollection(collectionName) {
    const collectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(collectionRef);

    if (querySnapshot.empty) {
        // Add a default document if the collection is empty
        const defaultDocRef = doc(collectionRef, 'default');
        await setDoc(defaultDocRef, { created: true });

        // Fetch the collection again after adding the default document
        const updatedQuerySnapshot = await getDocs(collectionRef);
        const data = [];
        updatedQuerySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    } else {
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        return data;
    }
}
