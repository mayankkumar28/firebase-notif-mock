import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { writeUserToken } from "./firebasedb";

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

export const tryGetToken = () => {
  let currentToken = "";
  try {
    Notification.requestPermission()
      .then((permission) => {
        console.log("Permission", permission);
        if (permission === "granted") {
          getToken(messaging, {
            vapidKey: process.env.REACT_APP_VAPID_KEY,
          }).then((currentToken) => {
            console.log("Token genrated: ", currentToken);
            writeUserToken(currentToken);
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }
  return currentToken;
};
export const token = tryGetToken();

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
