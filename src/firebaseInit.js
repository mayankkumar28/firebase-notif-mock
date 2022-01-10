import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDde0B7StUzhKnDnudJuM4dzpyoSWsz81A",
    authDomain: "fir-notif-mock.firebaseapp.com",
    databaseURL: "https://fir-notif-mock-default-rtdb.firebaseio.com",
    projectId: "fir-notif-mock",
    storageBucket: "fir-notif-mock.appspot.com",
    messagingSenderId: "519098743683",
    appId: "1:519098743683:web:d6cdc8e0435af657d614b6",
});

const messaging = getMessaging(firebaseApp);
const { REACT_APP_VAPID_KEY } = process.env;
const publicKey = REACT_APP_VAPID_KEY;

export const TrygetToken = async (setTokenFound) => {
    let currentToken = "";
    try {
        currentToken = await getToken(messaging, { vapidKey: publicKey });
        if (currentToken) {
            setTokenFound(true);
        } else {
            setTokenFound(false);
        }
    } catch (error) {
        console.log("An error occurred while retrieving token. ", error);
    }
    return currentToken;
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
