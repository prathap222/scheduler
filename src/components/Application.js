
import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from 'axios';
import { getAppointmentsForDay, getInterview,getInterviewersForDay } from "helpers/selectors";
import useApplicationData, {state, setDay, bookInterview, cancelInterview} from "hooks/useApplicationData";


export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewersByDay = getInterviewersForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewersByDay}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });




  return (
    <main className="layout">
      <section className="sidebar">
            <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"/>
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
          <DayList
          days={state.days}
          day={state.day}
          onChange={setDay}
          
        /> 
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"/>
      </section>
      <section className="schedule">
        {schedule}
        {<Appointment key="last" time="5pm" bookInterview={bookInterview}/>}
      </section>
    </main>
  );
}
