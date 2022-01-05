import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";
import { initializeApp } from "firebase/app";

const firebaseApp = initializeApp({
    //
    //INSERT CONFIG
    //
});

const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: "/logo192.png",
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// ===============================

// ===============================

// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// const firebaseConfig = {
//     apiKey: "AIzaSyDde0B7StUzhKnDnudJuM4dzpyoSWsz81A",
//     authDomain: "fir-notif-mock.firebaseapp.com",
//     projectId: "fir-notif-mock",
//     storageBucket: "fir-notif-mock.appspot.com",
//     messagingSenderId: "519098743683",
//     appId: "1:519098743683:web:d6cdc8e0435af657d614b6",
// };

// firebase.initializeApp(firebaseConfig);

// // Retrieve firebase messaging

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage(function (payload) {
//     console.log("Received background message ", payload);

//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//         icon: "/logo192.png",
//     };

//     // eslint-disable-next-line no-restricted-globals
//     self.registration.showNotification(notificationTitle, notificationOptions);
// });

// ===============================
