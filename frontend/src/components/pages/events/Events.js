import React, {useState} from "react";
import styles from "../Edit/styles.module.css";
import {periodTime, serverURL} from "../../../constants/data";
import axios from "axios";
import {ME} from "../../../ME";
import {useNavigate} from "react-router";

const Events = () => {
    const navigate = useNavigate();
    let [events, setEvents] = useState(undefined)

    const loadEvents = async () => {
        const result = await axios.get(serverURL + "event")
        console.log(result.data)
        return result.data
    }
    if (!events) loadEvents().then(r => setEvents(r))

    const Event = (props) => {
        const {event} = props;
        return (
            <div className={styles.card}>
                <h1 className={styles.Period}>{(event.name) || "subject"}</h1>
                <br/><br/><br/><br/><br/>
                <p className={styles.Time}>{periodTime[0][event.time]}</p>
            </div>
        );
    };

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.titleSection}>
                <div className={styles.mainTitle}>TIME TABLE</div>
                <div className={styles.subTitle}>Saint Petersburg State University</div>
            </div>
            {ME.role === "Teacher" && (<div className={styles.showBtn}>
                <button className={styles.button} onClick={() => navigate("/create")}>
                    Create Event
                </button>
            </div>)}
            {events && (<div className={styles.MiddleContent}>
                {events && events.map(event => (
                    <Event key={event.name + "" + event.time} event={event}/>
                ))}
            </div>)}
            {!events && (<div className={styles.MiddleContent}>
                Data loading...
            </div>)}
        </div>
    );
};

export default Events;
