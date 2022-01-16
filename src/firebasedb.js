import { getDatabase, ref, set, onValue } from "firebase/database";
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
const database = getDatabase(firebaseApp);

export const writeUserToken = (token) => {
    set(ref(database, "users/user1"), {
        token: token,
    });
};

export const updateCount = (count) => {
    set(ref(database, "click/"), {
        clicks: count + 1,
    });
};

export const getCurrentToken = () => {
    const starCountRef = ref(database, "/users/user1/token");
    let data = "";
    onValue(starCountRef, (snapshot) => {
        data = snapshot.val();
    });
    console.log("New token:", data);
    return data;
};
