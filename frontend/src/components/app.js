import React from "react";
import Home from "./pages/Home/Home";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TimeTable from "./pages/TimeTable/TimeTable";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route exact path='/timetable' element={<TimeTable/>}/>
            </Routes>
        </Router>
    );
}