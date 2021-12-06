import axios from "axios";
import {serverURL} from "./constants/data";

let ME = {
    id: 0,
    email: "",
    name: "",
    role: 0,
    group_id: 0
}

const initUser = async (name, email) => {
    console.log("pre init user > " + name + " " + email)
    const body = {
        name: name,
        email: email
    }
    const response = await axios.post(serverURL+"user", body)
    console.log("id > " + response.data)
    const user = await axios.get(serverURL+"user/" + response.data)
    ME = user.data
    console.log(user.data)
}

export {ME, initUser}