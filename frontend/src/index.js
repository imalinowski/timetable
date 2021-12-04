import * as ReactDOM from "react-dom";
import React from "react";
import './index.css'
import axios from "axios";
import {Table} from "./components/timetable";

const test = async () => {
    const response = await axios.get('http://localhost:8080/')
    console.log("response from server > " + response.data)
}
test()

ReactDOM.render(
    <Table/>,
    document.getElementById("root")
)
;

