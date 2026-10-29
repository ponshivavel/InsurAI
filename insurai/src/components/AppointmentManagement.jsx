import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    userId: '',
    agentId: '',
    dateTime: '',
    purpose: '',
    status: 'scheduled'
  });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/appointments');
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewAppointment({ ...newAppointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/appointments', newAppointment);
      setNewAppointment({
        userId: '',
        agentId: '',
        dateTime: '',
        purpose: '',
        status: 'scheduled'
      });
      fetchAppointments();
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/appointments/${id}`);
      fetchAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  return (
    <div className="appointment-management">
      <h2>Appointment Management</h2>

      <form onSubmit={handleSubmit} className="appointment-form">
        <input
          type="number"
          name="userId"
          placeholder="User ID"
          value={newAppointment.userId}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="agentId"
          placeholder="Agent ID"
          value={newAppointment.agentId}
          onChange={handleInputChange}
          required
        />
        <input
          type="datetime-local"
          name="dateTime"
          value={newAppointment.dateTime}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="purpose"
          placeholder="Purpose"
          value={newAppointment.purpose}
          onChange={handleInputChange}
          required
        />
        <select name="status" value={newAppointment.status} onChange={handleInputChange}>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button type="submit">Schedule Appointment</button>
      </form>

      <div className="appointments-list">
        <h3>Appointments</h3>
        {appointments.map(appointment => (
          <div key={appointment.id} className="appointment-item">
            <p>User ID: {appointment.userId}</p>
            <p>Agent ID: {appointment.agentId}</p>
            <p>Date: {new Date(appointment.dateTime).toLocaleString()}</p>
            <p>Purpose: {appointment.purpose}</p>
            <p>Status: {appointment.status}</p>
            <button onClick={() => handleDelete(appointment.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentManagement;
