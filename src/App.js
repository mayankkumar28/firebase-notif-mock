import { onMessageListener } from "./firebaseInit";
import { tryGetToken } from "./firebaseInit";
import { updateCount } from "./firebasedb";
import React, { useState, useEffect } from "react";
import { sendNotification } from "./pushService";
import ToastComponent from "./toastNotification";

function App() {
    const [count, setCount] = useState(0);
    const [notification, setNotification] = useState({ title: "", body: "" });
    const [show, setShow] = useState(false);
    onMessageListener()
        .then((payload) => {
            setShow(true);
            setNotification({
                title: payload.notification.title,
                body: payload.notification.body,
            });
            console.log(payload);
        })
        .catch((err) => console.log("failed: ", err));

    function handleClick() {
        setCount(count + 1);
        updateCount(count);
        sendNotification();
    }
    tryGetToken();

    return (
        <div className="App">
            <h1>Push Notification service</h1>
            <button onClick={tryGetToken}>Give Permission</button>
            <button onClick={handleClick}>Send Notification</button>
            {show ? <ToastComponent title={notification.title} body={notification.body} /> : <></>}
        </div>
    );
}

export default App;
