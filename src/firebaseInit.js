import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";

const firebaseApp = initializeApp({
    //
    //INSERT CONFIG
    //
});

const messaging = getMessaging(firebaseApp);

getToken(messaging, {
    vapidKey: "INSERT VAPID KEY",
})
    .then((currentToken) => {
        if (currentToken) {
            console.log("Token: ", currentToken);
        } else {
            console.log("No registration token available. Request permission to generate one.");
        }
    })
    .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
    });

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });
