import {ToastContainer} from "react-toastify";
import React from "react";

export const GlobalToast = () => {
    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
    )
}