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
    week_day: 0,
    time: 0
}]

let groups = [{
    id: 0,
    name: ""
}]

let roles = [
    {id: 0, name: "Teacher"},
    {id: 1, name: "Student"}
]

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
    groups = (await axios.get(serverURL + "group")).data
    console.log(groups)
    ME.group = (groups.find(e => e.id === ME.group_id) || { name: ""} ).name
    console.log(ME)
    timeTable = (await axios.get(serverURL + "user/" + id.data + "/events")).data
    console.log("events")
    console.log(timeTable)
    return "loaded"
}

export {roles, groups, timeTable, ME, initUser}