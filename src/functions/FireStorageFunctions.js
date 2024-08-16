// src/firestoreUtils.js
import { db } from '../authentication/FirebaseConfig';
import { doc, setDoc, getDoc, deleteDoc, updateDoc, collection, getDocs, query, where, addDoc, serverTimestamp, arrayRemove, arrayUnion } from 'firebase/firestore';

// Function to get data from Firestore
export async function getDocument(collectionName, id) {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}
// Function to get data from Firestore
export async function getDocuments(collectionName, field, operation, value) {
    const q = query(collection(db, collectionName), where(field, operation, value));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        return doc.data();
    });
}
// Function to get all documents from a Firestore collection
export async function getCollection(collectionName) {

    const querySnapshot = await getDocs(collection(db, collectionName));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        return doc.data();
    });
}
// Function to get all documents from a Firestore collection
export async function getSubColleciton(collectionName, id, subCollectionName) {

    const querySnapshot = await getDocs(collection(db, collectionName, id, subCollectionName));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        return doc.data();
    });
}

// Function to set data in Firestore
export async function setDocument(collectionName, values, id = null) {

    let docRef;
    const valuesWithTime = {
        ...values,
        createdAt: serverTimestamp()
    };

    // id is provided, use setDoc to create/update doc
    if (id) {
        docRef = await setDoc(doc(db, collectionName, id), valuesWithTime);
        return docRef.id;
    } else {
        // else, add new doc with auto-gen id
        try {
            docRef = await addDoc(collection(db, collectionName), valuesWithTime);
            return docRef.id;
        }
        catch (err) {
            console.log(err);
        }
    }
}

// Function to update fields in Firestore
export async function updateDocument(collectionName, id, values) {
    try {
        await updateDoc(doc(db, collectionName, id), values);

    } catch (err) {
        console.error("Error updating document:", err);
    }
}

// Function to update arrays in Firestore
export async function updateArray(collectionName, id, field, newElement, operation) {
    try {
        if (operation === "push") {

            const docRef = doc(db, collectionName, id);
            await updateDoc(docRef, {
                [field]: arrayUnion(newElement)
            });
        }
        else if (operation === "pop") {
            const docRef = doc(db, collectionName, id);
            await updateDoc(docRef, {
                [field]: arrayRemove(newElement)
            });
        }
        else {
            console.error("Error updating array, operation should be 'push' or 'pop' and was", operation);
        }

    } catch (err) {
        console.error("Error updating array:", err);
    }
}


// Function to remove data from Firestore
export async function removeData(collectionName, id) {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
}

