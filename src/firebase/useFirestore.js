import React, { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, orderBy, limit } from "firebase/firestore";
import { db } from './config';

export default function useFirestore(collectionName, condition, callback) {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        if (condition) {
            if(!condition.compareValue || !condition.compareValue.length || !condition.fieldName) {
                return;
            }
        }

        const collectionRef = collection(db, collectionName);
        const whereRef = where(condition.fieldName, condition.operator, condition.compareValue);
        
        const q = query(collectionRef, whereRef);

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const document = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            setDocuments(document);
            if (callback) callback();
        });

        return unsubscribe;
    }, [collectionName, condition]);
    
    return documents;
};

export function GetUser(userId) {
    const [documents, setDocuments] = React.useState([]);

    useEffect(() => {

        const collectionRef = collection(db, "users");

        const q = query(collectionRef, where("id", "==", userId));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const document = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            setDocuments(document);
        });

        return unsubscribe;
    }, [userId]);
    
    return documents;
}

export function GetMessages(roomCondition, amount) {
    const [documents, setDocuments] = useState([]);

    const timeCondition = {
        fieldName: 'createdAt',
        operator: '>',
        compareValue: 20210101000000
    }

    useEffect(() => {
        if (roomCondition) {
            if(!roomCondition.compareValue || !roomCondition.compareValue.length || !roomCondition.fieldName) {
                return [];
            }
        }
        else{
            return [];
        }

        const collectionRef = collection(db, "messages");

        const roomWhereRef = where(roomCondition.fieldName, roomCondition.operator, roomCondition.compareValue);
        const timeWhereRef = where(timeCondition.fieldName, timeCondition.operator, timeCondition.compareValue);
        
        const q = query(collectionRef, timeWhereRef, roomWhereRef, orderBy("createdAt", "desc"), limit(amount));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const document = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            setDocuments(document);
        });

        return unsubscribe;
    }, [roomCondition, amount]);
    
    return documents;
};