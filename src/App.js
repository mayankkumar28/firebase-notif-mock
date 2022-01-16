import { onMessageListener } from "./firebaseInit";
import { tryGetToken } from "./firebaseInit";
import { updateCount } from "./firebasedb";
import React, { useState } from "react";
import { sendNotification } from "./pushService";
import ToastComponent from "./toastNotification";
import * as workerTimers from "worker-timers";

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
        sendNotification("front");
    }
    function handleBackgroundClick() {
        window.open("", "_blank");
        sendNotification("back");
        workerTimers.setTimeout(() => {
            sendNotification("back");
        }, 500);
    }

    tryGetToken();
    return (
        <div className="App">
            <center>
                <h1>Push Notification service</h1>
                <button onClick={tryGetToken}>Give Permission</button>
                <span> </span>
                <button onClick={handleClick}>Send Foreground Notification</button>
                <span> </span>
                <button onClick={handleBackgroundClick}>Send Push (Background) Notification</button>
                <h3>
                    Note: A new tab will automatically open to recieve push notification in
                    background. <br></br> It will show up after 1 second.
                    <br></br> Push Notifications works even if you close the website.
                </h3>
            </center>
            {show ? <ToastComponent title={notification.title} body={notification.body} /> : <></>}
        </div>
    );
}

export default App;
