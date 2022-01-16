import { getCurrentToken } from "./firebasedb";

export const sendNotification = async (notification_type) => {
    const mytoken = getCurrentToken();
    const title = "Hello world";
    const msg =
        notification_type === "front"
            ? "This is your Foreground notification"
            : "This is your Push (background) notification";
    let body = {
        to: mytoken,
        notification: {
            title: title,
            body: msg,
            image: "../public/logo192.png",
        },
    };
    const options = {
        method: "POST",
        headers: new Headers({
            Authorization: process.env.REACT_APP_SERVER_KEY,
            "Content-Type": "application/json",
        }),
        body: JSON.stringify(body),
    };

    await fetch("https://fcm.googleapis.com/fcm/send", options)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((e) => console.log(e));
};
