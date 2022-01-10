import { token } from "./firebaseInit";

const { SERVER_KEY } = process.env;
const ServerKey = SERVER_KEY;

export const sendNotification = () => {
    const mytoken = token;
    const title = "Hello world";
    const msg = "This is your notification";
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
            Authorization: ServerKey,
            "Content-Type": "application/json",
        }),
        body: JSON.stringify(body),
    };

    fetch("https://fcm.googleapis.com/fcm/send", options)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
        .catch((e) => console.log(e));
};
