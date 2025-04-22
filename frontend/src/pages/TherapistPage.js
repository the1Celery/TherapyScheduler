import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Views } from 'react-big-calendar';
import { dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek } from 'date-fns';
import { enUS } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Define localizer for BigCalendar with locale
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay: (date) => date.getDay(),
  locales: {
    'en-US': enUS, // Set the locale
  },
});

export default function TherapistPage() {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());

  // Function to handle adding a new event (time slot)
  const handleSelectSlot = ({ start, end }) => {
    const formattedStart = format(start, 'hh:mm a'); // Format start time
    const formattedEnd = format(end, 'hh:mm a'); // Format end time

    const newEvent = {
      title: `Available from ${formattedStart} to ${formattedEnd}`, // Add time range to title
      start,
      end,
    };
    setEvents([...events, newEvent]);
  };

  // Function to handle deleting an event
  const handleDeleteEvent = (eventToDelete) => {
    // Update the events array by removing the event that matches both start and end times
    const updatedEvents = events.filter(
      (event) => event.start !== eventToDelete.start || event.end !== eventToDelete.end
    );
    setEvents(updatedEvents);
  };

  // Handle View Change
  const handleViewChange = (newView) => {
    setView(newView);
  };

  // Navigate to Today
  const handleToday = () => {
    setDate(new Date());
  };

  // Navigate to Previous
  const handlePrevious = () => {
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1);
      return newDate;
    });
  };

  // Navigate to Next
  const handleNext = () => {
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1);
      return newDate;
    });
  };

  return (
    <div style={{ maxWidth: 1200, margin: '40px auto', textAlign: 'center' }}>
      <h2>Therapist Dashboard</h2>
      <p>Welcome to your therapist page.</p>

      {/* Manual Toolbar */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={handlePrevious}>Previous</button>
        <button onClick={handleToday}>Today</button>
        <button onClick={handleNext}>Next</button>
        <select onChange={(e) => handleViewChange(e.target.value)} value={view}>
          <option value={Views.MONTH}>Month</option>
          <option value={Views.WEEK}>Week</option>
          <option value={Views.DAY}>Day</option>
          <option value={Views.AGENDA}>Agenda</option>
        </select>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        view={view}
        date={date}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(event) => {
          if (window.confirm('Are you sure you want to delete this time slot?')) {
            handleDeleteEvent(event);
          }
        }} // Ensure this is bound correctly
        onNavigate={setDate}
        views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
        messages={{
          event: 'Time Slot',
          allDay: 'Available All Day',
          previous: 'Previous',
          next: 'Next',
          today: 'Today',
          month: 'Month',
          week: 'Week',
          day: 'Day',
          agenda: 'Agenda',
        }}
      />

      <Link to="/">
        <button style={{ marginTop: 20 }}>Home</button>
      </Link>
    </div>
  );
}
