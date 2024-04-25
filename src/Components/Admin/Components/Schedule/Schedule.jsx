import React from "react";
import styled from "styled-components";
import { Scheduler } from "@aldabil/react-scheduler";
import { EVENTS } from "./Event";
const TimetableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const DayHeader = styled.h2`
  color: #333;
  margin-bottom: 10px;
`;

const EventList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
`;

const EventItem = styled.li`
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  padding: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
`;

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const HorizontalTimetable = () => {
  // Dummy data for timetable (replace with actual data)
  const timetableData = {
    Monday: ["Meeting with team", "Coding session"],
    Tuesday: ["Project presentation", "Lunch with client"],
    Wednesday: ["Design review", "Team brainstorming"],
    Thursday: ["Client meeting", "Training session"],
    Friday: ["Project deployment", "Team outing"],
    Saturday: ["Workshop", "Family time"],
    Sunday: ["Rest day", "Movie night"],
  };

  return (
    <Scheduler
      view="week"
      events={EVENTS}
      selectedDate={new Date(2024, 3, 25)}
    />
  );
};

export default HorizontalTimetable;
