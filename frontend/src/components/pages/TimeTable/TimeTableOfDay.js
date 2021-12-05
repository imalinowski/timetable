import React from "react";
import styles from "./styles.module.css";
import {periodTime} from "../../../constants/data";

function TimeTableOfDay(props) {
  const { today, tableData } = props;
  const HourCard = (props) => {
    const { hour, time } = props;
    return (
      <div className={styles.card}>
        <h1 className={styles.Period}>{ (hour.sub) || "subject" }</h1>
        <h2 className={styles.Teacher}>{ (hour.teacher) || "teacher"}</h2>
        <br />
        <br />
        <br />
        <br />
        <br />
        <p className={styles.Time}>{periodTime[today][time]}</p>
      </div>
    );
  };
  return (
    <div className={styles.CardContainer}>
        <HourCard hour={0} time={0}/>
        <HourCard hour={0} time={0}/>
        <HourCard hour={0} time={0}/>
    </div>
  );
}

export default TimeTableOfDay;
