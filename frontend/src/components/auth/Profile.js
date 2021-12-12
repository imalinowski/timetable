import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import {ME} from "../../ME";

const Profile = () => {
    const {isAuthenticated, isLoading} = useAuth0();
    if (isLoading)
        return (<div>Loading...</div>)
    return (isAuthenticated &&
        <div>
            <div>
                <div>{"email : " + ME.email}</div>
                <div>{"name : " + ME.name}</div>
                <div>{"group : " + (ME.group || "не задана") }</div>
                <div>{"role : " + ME.role}</div>
            </div>
        </div>
    );
};

export default Profile;