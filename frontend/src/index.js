import * as ReactDOM from "react-dom";
import React from "react";
import './index.css'
import {Game} from "./components/game"
import axios from "axios";

// ========================================
const test = async () => {
    const response = await axios.get('http://localhost:8080/')
    console.log("response from server > " + response.data)
}
test()

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);

