import axios from "axios";
import {serverURL} from "./constants/data";

let ME = {
    id: -1,
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

const initTimeTable = async () => {
    try {
        console.log(serverURL + "user/" + ME.id + "/events")
        timeTable = (await axios.get(serverURL + "user/" + ME.id + "/events")).data
    } catch (err) {
        console.log(err.response.data)
    }
}

const initUser = async (name, email) => {
    try {
        console.log("pre init user > " + name + " " + email)
        const body = {
            name: name,
            email: email
        }
        const id = await axios.post(serverURL + "user", body)
        console.log("id > " + id.data)
        const user = await axios.get(serverURL + "user/" + id.data)
        ME = user.data
        groups = (await axios.get(serverURL + "group")).data
        console.log(groups)
        ME.group = (groups.find(e => e.id === ME.group_id) || {name: ""}).name
        console.log(ME)
        console.log("events")
        await initTimeTable()
        console.log(timeTable)
        return "loaded"
    } catch (err) {
        console.log(err.response.data)
    }
}

export {roles, groups, timeTable, ME, initUser, initTimeTable}