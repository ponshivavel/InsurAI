import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ name: '', password: '', confirmPassword: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
            return;
        }

        fetchProfile();
    }, [navigate]);

    const fetchProfile = async () => {
        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const response = await axios.get(`http://localhost:8080/api/user/profile/${storedUser.email}`);
            setUser(response.data);
            setFormData({ name: response.data.name, password: '', confirmPassword: '' });
        } catch (err) {
            setError('Failed to load profile');
            console.error('Profile error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (formData.password && formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            await axios.put(`http://localhost:8080/api/user/profile/${storedUser.email}`, {
                name: formData.name,
                password: formData.password || undefined
            });
            setEditMode(false);
            fetchProfile();
        } catch (err) {
            setError('Failed to update profile');
            console.error('Update profile error:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-fullscreen">
                <div className="loading-spinner">Loading...</div>
            </div>
        );
    }

    if (error && !user) {
        return (
            <div className="dashboard-fullscreen">
                <div className="error-message">{error}</div>
                <button onClick={fetchProfile} className="retry-btn">Retry</button>
            </div>
        );
    }

    return (
        <div className="dashboard-fullscreen">
            <div className="dashboard-header">
                <h1>Profile</h1>
                <button onClick={() => navigate('/dashboard')} className="back-btn">Back to Dashboard</button>
            </div>
            <div className="profile-content">
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {editMode ? (
                    <form onSubmit={handleUpdateProfile}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>New Password (leave blank to keep current):</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm New Password:</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit" className="sign-up-btn" disabled={loading}>
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>
                        <button type="button" onClick={() => setEditMode(false)} className="cancel-btn">
                            Cancel
                        </button>
                    </form>
                ) : (
                    <div className="profile-info">
                        <p><strong>Name:</strong> {user?.name}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Member Since:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                        <button onClick={() => setEditMode(true)} className="edit-btn">Edit Profile</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
