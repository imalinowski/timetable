import * as ReactDOM from "react-dom";
import React from "react";
import {Auth0Provider, useAuth0} from "@auth0/auth0-react";
import './index.css'
import {Game} from "./components/game"
import axios from "axios";

// ========================================
const test = async () => {
    const response = await axios.get('http://localhost:8080/')
    console.log("response from server > " + response.data)
}
test()
const LoginButton = () => {
    const {loginWithRedirect} = useAuth0();
    return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogoutButton = () => {
    const {logout} = useAuth0();
    return <button onClick={() => logout({returnTo: window.location.origin})}>Log Out</button>;
};

const Profile = () => {
    const {user, isAuthenticated, isLoading} = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }

    if (!isAuthenticated) {
        return <div> Authenticate ...</div>;
    }

    return (isAuthenticated && (
            <div>
                <img src={user.picture} alt={user.name}/>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
        )
    );
};

ReactDOM.render(
    <Game/>,
    <Auth0Provider
        domain="dev-x8crmkcg.us.auth0.com"
        clientId="QdQZrrvlvbuAmPNih9xLiXA3SW3oDQoE"
        redirectUri={window.location.origin}>
        <LoginButton/>,
        <LogoutButton/>,
        <Profile/>,
    </Auth0Provider>,
    document.getElementById("root")
);

