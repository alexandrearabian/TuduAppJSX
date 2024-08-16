import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Profile from '../pages/Profile';
import SignInPage from '../pages/SignInPage';
import GoalsPage from '../pages/GoalsPage';
import ToDoList from '../pages/ToDoList';
import CustomCalendar from '../pages/CustomCalendar';
import HabitTracker from '../pages/HabitTracker';
import LeftMenu from './LeftMenu';
import Dashboard from '../pages/Dashboard';
import { auth } from '../authentication/FirebaseConfig';

const RouteAssigner = ({ changeAuth }) => {
    const [routes, setRoutes] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setRoutes(
                    <Router>
                        <LeftMenu />
                        <Routes>
                            <Route path="*" element={<Navigate to="/todolist" />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/todolist" element={<ToDoList />} />
                            <Route path="/calendar" element={<CustomCalendar />} />
                            <Route path="/habits" element={<HabitTracker />} />
                            <Route path="/goals" element={<GoalsPage />} />
                            <Route path="/" element={<Dashboard />} />
                        </Routes>
                    </Router>
                );
            } else {
                setRoutes(
                    <Router>
                        <Routes>
                            <Route path="*" element={<Navigate to="/signin" />} />
                            <Route path="/signin" element={<SignInPage />} />
                        </Routes>
                    </Router>
                );
            }
        });

        return () => unsubscribe(); // Clean up subscription on unmount
    }, [changeAuth]);

    if (!routes) {
        return <div>Loading...</div>; // or any loading indicator you prefer
    }

    return routes;
}

export default RouteAssigner;
