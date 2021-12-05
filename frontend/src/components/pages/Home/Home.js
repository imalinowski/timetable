import React, {useEffect, useState} from "react";
import styles from "./styles.module.css";
import {STORAGE_KEYS} from "../../../constants/data";
import {useNavigate} from "react-router";
import Login from "../../auth/login";
import Logout from "../../auth/logout";
import Profile from "../../auth/Profile";
import {useAuth0} from "@auth0/auth0-react";

const Home = () => {
    const [department, setDepartment] = useState("0");
    const [semester, setSemester] = useState("0");
    const navigate = useNavigate();
    const {isAuthenticated} = useAuth0();

    const Option = ({name, value}) => (
        <option className={styles.selectOption} value={value}>
            {name}
        </option>
    );
    const handleShowTimeTable = () => {
        localStorage.setItem(STORAGE_KEYS.SEMESTER, semester);
        localStorage.setItem(STORAGE_KEYS.DEPARTMENT, department);
        navigate("/timetable");
    };

    useEffect(() => {
        if (
            localStorage.getItem(STORAGE_KEYS.DEPARTMENT) !== "undefined" &&
            localStorage.getItem(STORAGE_KEYS.SEMESTER) !== "undefined"
        ) {
            setDepartment(localStorage.getItem(STORAGE_KEYS.DEPARTMENT));
            setSemester(localStorage.getItem(STORAGE_KEYS.SEMESTER));
        }
    }, []);
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
                            <div className={styles.showBtn} style={{color: "white"}}>
                                <Profile/>
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
