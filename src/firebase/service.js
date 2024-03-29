import { collection, doc, getDoc, setDoc, updateDoc,query, where, onSnapshot } from "@firebase/firestore";
import _ from "lodash";
import { db } from "./config"

export const addDocument = (collectionName, data, dataId) => {
    // db.collection(collection);
    setDoc((doc(db, collectionName, dataId), {
        ...data,
        createdAt: Date.now(),
    }));

}

// export const updateDocumentField = (collectionName, dataId, fieldName, fieldValue) => {
//     updateDoc((doc(db, collectionName, dataId), {
//         fieldName: fieldValue
//     }));
// }

export const getDocument = async(collectionName, dataId) => {  
    const docRef = doc(db, collectionName, dataId);
    return (await getDoc(docRef)).data();
}

export const getDateTimeShow = (dateTime) => {
    const time = dateTime.toString();
    return time.substring(0, 4) + "-" + 
        time.substring(4, 6) + "-" + 
        time.substring(6, 8) + " " + 
        time.substring(8, 10) + ":" + 
        time.substring(10)
}

export const getNowDateTime = () => {
    const time = new Date();
    return time.getFullYear() + "-" + 
        (time.getMonth()+1).toString().padStart(2, 0) + "-" + 
        time.getDate().toString().padStart(2, 0) + " " + 
        time.getHours().toString().padStart(2, 0) + ":" + 
        time.getMinutes().toString().padStart(2, 0)
}

export const getNowDateTimeCode = () => {
    const time = new Date();
    const result = time.getFullYear() + "" + 
        (time.getMonth()+1).toString().padStart(2, 0) + "" + 
        time.getDate().toString().padStart(2, 0) + "" + 
        time.getHours().toString().padStart(2, 0) + "" + 
        time.getMinutes().toString().padStart(2, 0) + "" + 
        time.getSeconds().toString().padStart(2, 0);
    return parseInt(result);
}

export const listenDocumentSnapshot = (collection, dataId) => {
    const unsub = onSnapshot(doc(db, collection, dataId), (doc) => {
        //console.log("Current data: ", doc.data());
    });
}

export const listenSnapshot = () => {
    const q = query(collection(db, "users"), where("email", "!=", ""));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
                console.log("Added : ", change.doc.data());
            }
            if (change.type === "modified") {
                console.log("Modified : ", change.doc.data());
            }
            if (change.type === "removed") {
                console.log("Removed : ", change.doc.data());
            }
        });
    });

}

export const addRoom = (id1, id2) => {
    console.log("created room of " + id1 + " and " + id2);
    setDoc(doc(db, "rooms", getNowDateTimeCode() + id1 + id2), {
        id: getNowDateTimeCode() + id1 + id2,
        members: [id1, id2],
        length: 0,
        description: '',
        name: '',
        avatarURL: '',
    });
}