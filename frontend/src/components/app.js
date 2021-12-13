import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TimeTable from "./pages/TimeTable/TimeTable";
import Create from "./pages/create/Create";
import Edit from "./pages/Edit/Edit";
import Events from "./pages/events/Events";
import Home from "./pages/Home/Home";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route exact path='/timetable' element={<TimeTable/>}/>
                <Route exact path='/edit' element={<Edit/>}/>
                <Route exact path='/create' element={<Create/>}/>
                <Route exact path='/events' element={<Events/>}/>
            </Routes>
        </BrowserRouter>
    );
}