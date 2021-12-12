import styles from "./styles.module.css";
import { days } from "../../../constants/data";
export default function Days(props) {
  const { currentDay, handleDayChange } = props;
  const Day = ({ name, day, currentDay }) => (
    <p
      className={currentDay === day ? styles.today : styles.day}
      onClick={() => handleDayChange(day)}
    >
      {name.toUpperCase()}
    </p>
  );

  return (
    <div className={styles.daysSection}>
      {days.map((day, ind) => (
        <Day key = {day.full} name={day.short} day={ind} currentDay={currentDay} />
      ))}
    </div>
  );
}
