import React, {useState} from "react";
import styles from "./styles.module.css";
import {useNavigate} from "react-router";
import Login from "../../auth/login";
import {useAuth0} from "@auth0/auth0-react";
import {initUser} from "../../../ME";
import Profile from "../../auth/Profile";
import Logout from "../../auth/logout";

const Home = () => {
    const navigate = useNavigate();
    const [state, setState] = useState("not loaded") // loading state
    const {isAuthenticated, user} = useAuth0();

    if (isAuthenticated && state === "not loaded") {
        initUser(user.name, user.email)
            .then((value) => {
                setState(value)
            })
    }

    const handleShowTimeTable = () => {
        navigate("/timetable");
    };

    const handleEdit = () => {
        navigate("/edit");
    };

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.titleSection}>
                <div className={styles.mainTitle}>TIME TABLE</div>
                <div className={styles.subTitle}>Saint Petersburg State University</div>
            </div>
            <div className={styles.MiddleContent}>
                <div className={styles.LoginBox}>
                    {isAuthenticated &&
                        <div>
                            <div style={state === "loaded" ? {color: "green"} : {color: "red"}}> {state} </div>
                            <div className={styles.itemMargin} style={{color: "white"}}>
                                <Profile/>
                            </div>
                            <div style={{textAlign: "end"}}>
                                <button className={styles.button} onClick={handleEdit}>
                                    Edit
                                </button>
                            </div>
                            <div className={styles.showBtn}>
                                <button className={styles.button} onClick={handleShowTimeTable}>
                                    Show Timetable
                                </button>
                            </div>
                            <div className={styles.showBtn}>
                                <Logout/>
                            </div>
                        </div>
                    }
                    {!isAuthenticated && <Login/>}
                </div>
            </div>
            <div className={styles.bottomTitle}>
                made by Malinowski Ilya with ❤️
            </div>
        </div>
    );
};

export default Home;
