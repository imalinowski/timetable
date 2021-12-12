import React from "react";
import styles from "../Edit/styles.module.css";
import {useNavigate} from "react-router";

const Create = () => {
    const navigate = useNavigate();

    const handleCreate = () => {
        navigate("/timetable");
    };

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.titleSection}>
                <div className={styles.mainTitle}>TIME TABLE</div>
                <div className={styles.subTitle}>Saint Petersburg State University</div>
            </div>
            <div className={styles.MiddleContent}>
                <div className={styles.LoginBox}>
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
