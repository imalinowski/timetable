import React from "react";
import Home from "./pages/Home/Home";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import TimeTable from "./pages/TimeTable/TimeTable";
import Create from "./pages/create/Create";
import Edit from "./pages/Edit/Edit";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route exact path='/timetable' element={<TimeTable/>}/>
                <Route exact path='/edit' element={<Edit/>}/>
                <Route exact path='/create' element={<Create/>}/>
            </Routes>
        </Router>
    );
}