import axios from "axios";
import {serverURL} from "./constants/data";

let ME = {
    id: 0,
    email: "email",
    name: "name",
    role: "role",
    group: "",
    group_id: -1

}

let timeTable = [{
    name: "",
    week_day: 0
}]

const initUser = async (name, email) => {
    console.log("pre init user > " + name + " " + email)
    const body = {
        name: name,
        email: email
    }
    const id = await axios.post(serverURL+"user", body)
    console.log("id > " + id.data)
    const user = await axios.get(serverURL+"user/" + id.data)
    ME = user.data
    const group = (await axios.get(serverURL + "group")).data
    ME.group = (group.find( e => e.id === ME.group_id) || { name: ""} ).name
    console.log(ME)
    timeTable = (await axios.get(serverURL + "user/" + id.data + "/events")).data
    console.log(timeTable)
    return "loaded"
}

export {timeTable, ME, initUser}