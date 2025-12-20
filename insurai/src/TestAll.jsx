import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import InsuranceSelection from './components/InsuranceSelection';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';
import TravelInsurance from './components/TravelInsurance';
import InsurancePlans from './components/InsurancePlans';
import PlanDetail from './components/PlanDetail';
import AppointmentManagement from './components/AppointmentManagement';
import AiAssistButton from './components/AiAssistButton';
import NotificationSystem from './components/NotificationSystem';
import VoiceQueryChat from './components/VoiceQueryChat';
import PlanInformationManagement from './components/PlanInformationManagement';
import PolicyInstruct from './components/PolicyInstruct';

const TestAll = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>InsurAI - Test All Components</h1>
            <p>This component is for testing all InsurAI components in one place.</p>

            <section>
                <h2>Login Component</h2>
                <Login />
            </section>

            <section>
                <h2>Register Component</h2>
                <Register />
            </section>

            <section>
                <h2>Dashboard Component</h2>
                <Dashboard />
            </section>

            <section>
                <h2>Insurance Selection Component</h2>
                <InsuranceSelection />
            </section>

            <section>
                <h2>Profile Component</h2>
                <Profile />
            </section>

            <section>
                <h2>Admin Dashboard Component</h2>
                <AdminDashboard />
            </section>

            <section>
                <h2>Travel Insurance Component</h2>
                <TravelInsurance />
            </section>

            <section>
                <h2>Insurance Plans Component</h2>
                <InsurancePlans />
            </section>

            <section>
                <h2>Plan Detail Component</h2>
                <PlanDetail />
            </section>

            <section>
                <h2>Appointment Management Component</h2>
                <AppointmentManagement />
            </section>

            <section>
                <h2>AI Assist Button Component</h2>
                <AiAssistButton />
            </section>

            <section>
                <h2>Notification System Component</h2>
                <NotificationSystem />
            </section>

            <section>
                <h2>Voice Query Chat Component</h2>
                <VoiceQueryChat />
            </section>

            <section>
                <h2>Plan Information Management Component</h2>
                <PlanInformationManagement />
            </section>

            <section>
                <h2>Policy Instruct Component</h2>
                <PolicyInstruct />
            </section>
        </div>
    );
};

export default TestAll;
