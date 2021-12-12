import React, {useState} from "react";
import styles from "../Edit/styles.module.css";
import {days, periodTime, serverURL} from "../../../constants/data";
import axios from "axios";
import {initTimeTable, ME} from "../../../ME";
import {useNavigate} from "react-router";
import {useAuth0} from "@auth0/auth0-react";

const Events = () => {
    const navigate = useNavigate();
    let [events, setEvents] = useState(undefined)
    const {isAuthenticated} = useAuth0();

    const loadEvents = async () => {
        const result = await axios.get(serverURL + "event")
        console.log(result.data)
        return result.data
    }
    if (!events) loadEvents().then(r => setEvents(r))

    const enroll = async (event_id) => {
        try {
            const result = await axios.post(serverURL + "event/" + event_id + "/adduser/" + ME.id)
            window.alert(result.data)
            loadEvents().then(r => setEvents(r)) // update events
            await initTimeTable()
        } catch (err) {
            window.alert(err.response.data)
        }
    }

    const Event = (props) => {
        const {event} = props;
        const part = event.members.find(m => m.id === ME.id)
        return (
            <div className={styles.card}>
                <h1 className={styles.Period}>{(event.name) || "subject"}</h1>
                <p className={styles.Time}>{periodTime[0][event.time]}</p>
                <p className={styles.Time}>{days[event.week_day].short}</p>
                {!part && (<button className={styles.button} onClick={() => enroll(event.id)}>
                    Enroll
                </button>)}
            </div>
        );
    };

    React.useEffect(() => {
        if (!isAuthenticated)
            navigate("/")
    });

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
