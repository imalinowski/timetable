import styles from "./styles.module.css";
import React, {useState} from "react";
import Header from "./Header";
import Days from "./Days";
import TimeTableOfDay from "./TimeTableOfDay";
import {months} from "../../../constants/data";
import {ME, timeTable} from "../../../ME";
import {useNavigate} from "react-router";

export default function TimeTable() {

    const navigate = useNavigate();

    const getChangedDate = (changedDate) => {
        const date = new Date();
        date.setDate(
            date.getDate() +
            (changedDate - weekDayInd(date.getDay())) +
            (date.getDay() === 6 || date.getDay() === 0 ? 2 : 0)
        );
        return `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()} ${
            months[date.getMonth()]
        } ${date.getFullYear()}`;
    };
    const weekDayInd = (day) => {
        const weekDay = (day - 1) % 5;
        return weekDay < 0 ? Math.sqrt(weekDay * weekDay) : weekDay;
    };
    const today = new Date();
    const day = weekDayInd(today.getDay());
    const [selectedDate, setSelectedDate] = useState(getChangedDate(day));
    const [selectedDay, setSelectedDay] = useState(day);

    const handleDayChange = (day) => {
        setSelectedDate(getChangedDate(day));
        setSelectedDay(day);
    };

    return (
        <>
            <div className={styles.contentWrapper}>
                {(
                    <>
                        <Header date={selectedDate} selectedDay={selectedDay}/>
                        <Days currentDay={selectedDay} handleDayChange={handleDayChange}/>
                        <TimeTableOfDay
                            today={selectedDay}
                            tableData={timeTable.filter(e => e.week_day === selectedDay)}
                        />
                        {ME.role === "Teacher" && (<div className={styles.showBtn}>
                            <button className={styles.button} onClick={() => navigate("/create")}>
                                Create Event
                            </button>
                        </div>)}
                    </>
                )}
            </div>
        </>
    );
}
