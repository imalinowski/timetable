import * as ReactDOM from "react-dom";
import React from "react";
import './index.css'
import axios from "axios";
import App from "./components/app";

const test = async () => {
    const response = await axios.get('http://localhost:8080/')
    console.log("response from server > " + response.data)
}
test()

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

