import React from "react";
import styles from "./styles.module.css";
import {periodTime} from "../../../constants/data";

function TimeTableOfDay(props) {
  const { today, tableData } = props;
  const HourCard = (props) => {
    const { event } = props;
    return (
      <div className={styles.card}>
        <h1 className={styles.Period}>{ (event.name) || "subject" }</h1>
        <br /><br /><br /><br /><br />
        <p className={styles.Time}>{periodTime[today][event.time]}</p>
      </div>
    );
  };
  return (
    <div className={styles.CardContainer}>
        {tableData && tableData.map( event => (
            <HourCard key = {event.name + "" + event.time} event = {event} />
        ))}
    </div>
  );
}

export default TimeTableOfDay;
