import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import React from "react";

const ToastComponent = ({ title, body }) => {
  let hideNotif = title === "";

  if (!hideNotif) {
    toast.info(<Display />);
  }

  function Display() {
    return (
      <div>
        <h4>{title}</h4>
        <p>{body}</p>
      </div>
    );
  }

  return (
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

ToastComponent.defaultProps = {
  title: "This is title",
  body: "Some body",
};

ToastComponent.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
};

export default ToastComponent;
