import React from "react";
import { onMessageListener } from "./firebaseInit";

function App() {
    onMessageListener()
        .then((payload) => {
            console.log(payload);
        })
        .catch((err) => console.log("failed: ", err));
    return <h1>Push Notification service</h1>;
}

export default App;
