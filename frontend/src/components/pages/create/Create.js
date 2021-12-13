import React, {useState} from "react";
import styles from "../create/styles.module.css";
import {useNavigate} from "react-router";
import {common, days, serverURL} from "../../../constants/data";
import axios from "axios";
import {ME, roles} from "../../../ME";
import {useAuth0} from "@auth0/auth0-react";

const Create = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [time, setTime] = useState(0)
    const [week_day, setWeekDay] = useState(0)
    let [locations, setLocations] = useState(undefined)
    let [location, setLocation] = useState(undefined)
    const {isAuthenticated} = useAuth0();

    const loadLocations = async () => {
        const result = await axios.get(serverURL + "location")
        console.log(result.data)
        return result.data
    }
    React.useEffect(() => {
        if (!isAuthenticated)
            navigate("/")
    });

    if (ME.role !== roles[0].name) // not teacher
        return <div> Only Teachers have such type of access  </div>

    if (!locations) {
        loadLocations().then(r => setLocations(r))
        return <div> loading... </div>
    }
    if (!location)
        setLocation(locations[0])

    const handleCreate = async () => {
        const body = {
            name: name,
            location: location,
            time: time,
            week_day: week_day
        }
        console.log(body)
        try {
            const result = await axios.post(serverURL + "event", body)
            window.alert(result.data)
            navigate("/timetable");
        } catch (err) {
            console.log(err.response.data)
        }
    };

    const handleInput = (e) => {
        setName(e.target.value)
    }

    const Option = ({name, value}) => (
        <option className={styles.selectOption} value={value}>
            {name}
        </option>
    );

    //console.log("OK")
    return (
        <div className={styles.contentWrapper}>
            <div className={styles.titleSection}>
                <div className={styles.mainTitle}>TIME TABLE</div>
                <div className={styles.subTitle}>Saint Petersburg State University</div>
            </div>
            <div className={styles.MiddleContent}>
                <div className={styles.LoginBox}>
                    <input type="text" value={name} onChange={handleInput} className={styles.input}/>
                    <div className={styles.selectSection}>
                        <select
                            className={styles.selectBox}
                            id="dropdown"
                            onChange={(e) => {
                                setWeekDay(e.target.value)
                            }}
                            value={week_day}
                        >
                            {days.map((day, ind) => (
                                <Option key={day.full} name={day.full} value={ind}/>
                            ))}
                        </select>
                    </div>
                    <div className={styles.selectSection}>
                        <select
                            className={styles.selectBox}
                            id="dropdown"
                            onChange={(e) => {
                                setTime(e.target.value)
                            }}
                            value={time}
                        >
                            {common.map((time, ind) => (
                                <Option key={time} name={time} value={ind}/>
                            ))}
                        </select>
                    </div>
                    <div className={styles.selectSection}>
                        <select
                            className={styles.selectBox}
                            id="dropdown"
                            onChange={(e) => {
                                setLocation(locations[e.target.value])
                            }}
                            value={locations.indexOf(location)}
                        >
                            {locations.map((location, ind) => (
                                <Option key={location.id} name={location.name} value={ind}/>
                            ))}
                        </select>
                    </div>
                    <div className={styles.showBtn}>
                        <button className={styles.button} onClick={handleCreate}>
                            Create
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Create;
