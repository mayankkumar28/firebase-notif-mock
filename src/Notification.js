import { getDatabase, ref, set } from "firebase/database";
import { initializeApp } from "firebase/app";
import { TrygetToken } from "./firebaseInit";
import React, { useState, useEffect } from "react";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDde0B7StUzhKnDnudJuM4dzpyoSWsz81A",
    authDomain: "fir-notif-mock.firebaseapp.com",
    databaseURL: "https://fir-notif-mock-default-rtdb.firebaseio.com",
    projectId: "fir-notif-mock",
    storageBucket: "fir-notif-mock.appspot.com",
    messagingSenderId: "519098743683",
    appId: "1:519098743683:web:d6cdc8e0435af657d614b6",
});
const database = getDatabase(firebaseApp);

const writeUserToken = (token) => {
    set(ref(database, "users/user1"), {
        token: token,
    });
};

export const updateCount = (count) => {
    set(ref(database, "click/"), {
        clicks: count + 1,
    });
};

export const Notifications = () => {
    const [isTokenFound, setTokenFound] = useState(false);
    console.log("Token found", isTokenFound);
    // To load once
    useEffect(() => {
        let data;
        async function tokenFunc() {
            data = await TrygetToken(setTokenFound);
            if (data) {
                console.log("Token is", data);
                writeUserToken(data);
            }
            return data;
        }
        tokenFunc();
    }, [setTokenFound]);

    return <></>;
};
