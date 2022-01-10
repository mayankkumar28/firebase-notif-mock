import { onMessageListener } from "./firebaseInit";
import { Notifications } from "./Notification";
import { updateCount } from "./Notification";
import React, { useState, useEffect } from "react";

function App() {
    const [count, setCount] = useState(0);
    onMessageListener()
        .then((payload) => {
            console.log(payload);
        })
        .catch((err) => console.log("failed: ", err));

    function handleClick() {
        setCount(count + 1);
        console.log(count);
        updateCount(count);
    }
    return (
        <div className="App">
            <Notifications />
            <h1>Push Notification service</h1>
            <button onClick={handleClick}>Send Notification</button>
        </div>
    );
}

export default App;
