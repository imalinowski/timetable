import * as ReactDOM from "react-dom";
import React from "react";
import './index.css'
import axios from "axios";
import App from "./components/app";
import {Auth0Provider} from "@auth0/auth0-react";

const test = async () => {
    const response = await axios.get('http://localhost:8080/')
    console.log("response from server > " + response.data)
}
test()

ReactDOM.render(
    <Auth0Provider
        domain="dev-vh043x6h.us.auth0.com"
        clientId="jKxu49tbTJkpnEHDOjGWO7qbjLdhmxOZ"
        redirectUri={window.location.origin}
    >
        <App/>
    </Auth0Provider>,
    document.getElementById('root')
)
;

