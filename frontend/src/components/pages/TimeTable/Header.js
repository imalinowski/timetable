import React from "react";
import styles from "./styles.module.css";
import { days } from "../../../constants/data";

export default function Header(props) {
  const { date, selectedDay } = props;
  const day = new Date().getDay() - 1;
  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <p className={styles.date}>{date}</p>
        <div className={styles.heading}>
          {day === selectedDay
            ? "Today's Time Tables"
            : `${days[selectedDay].full}'s TimeTable`}
        </div>
      </div>
    </div>
  );
}
