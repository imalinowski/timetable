import React, {useState} from "react";
import styles from "./styles.module.css";
import {useNavigate} from "react-router";
import Profile from "../../auth/Profile";
import {groups, ME, roles} from "../../../ME";
import axios from "axios";
import {serverURL} from "../../../constants/data";

const Edit = () => {
    const navigate = useNavigate();
    const [group, setGroup] = useState(groups.indexOf(groups.find(e => e.id === ME.group_id)) || 0)
    const [role, setRole] = useState(ME.role === "Teacher" ? 0 : 1)

    const Option = ({name, value}) => (
        <option className={styles.selectOption} value={value}>
            {name}
        </option>
    );

    const handleDone = () => {
        navigate("/");
    };

    const handleGroupChange = async () => {
        const result = await axios.put(serverURL + "user/" + ME.id + "/toGroup/" + ME.group_id)
        console.log(result.statusText)
    }

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.titleSection}>
                <div className={styles.mainTitle}>TIME TABLE</div>
                <div className={styles.subTitle}>Saint Petersburg State University</div>
            </div>
            <div className={styles.MiddleContent}>
                <div className={styles.LoginBox}>
                    <div className={styles.itemMargin} style={{color: "white"}}>
                        <Profile/>
                    </div>
                    <div className={styles.selectSection}>
                        <select
                            className={styles.selectBox}
                            id="dropdown"
                            onChange={(e) => {
                                ME.group = groups[e.target.value].name
                                ME.group_id = groups[e.target.value].id
                                console.log(ME.group)
                                // todo make server request
                                handleGroupChange().then(r => {
                                })
                                setGroup(e.target.value)
                            }}
                            value={group}
                        >
                            {groups.map((group, ind) => (
                                <Option key={group.name} name={group.name} value={ind}/>
                            ))}
                        </select>
                    </div>
                    <div className={styles.selectSection}>
                        <select
                            className={styles.selectBox}
                            id="dropdown"
                            onChange={(e) => {
                                ME.role = roles[e.target.value].name
                                console.log(ME.role)
                                // todo make server request
                                setRole(ME.role === "Teacher" ? 0 : 1)
                            }}
                            value={role}
                        >
                            {roles.map((role, ind) => (
                                <Option key={role.name} name={role.name} value={ind}/>
                            ))}
                        </select>
                    </div>
                    <div className={styles.showBtn}>
                        <button className={styles.button} onClick={handleDone}>
                            Done
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Edit;
