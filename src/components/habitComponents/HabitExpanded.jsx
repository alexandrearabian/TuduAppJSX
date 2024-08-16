// src/components/habitComponents/HabitExpanded.jsx

import React, { useState } from 'react';
import HabitConfig from './HabitConfig';

const HabitExpanded = ({ habit, onEdit, onClose }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleClose = () => {
        setIsEditing(false);
    };

    const handleSave = (updatedHabit) => {
        onEdit(updatedHabit);
        setIsEditing(false);
    };

    const calculateStreak = () => {
        return habit.streak || 0;
    };

    const formatDate = (date) => {
        if (!date || date === 'Indefinitely') return 'Indefinitely';
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    };

    if (isEditing) {
        return <HabitConfig editableHabit={habit} onSave={handleSave} onClose={handleClose} />;
    }

    return (
        <div className="habit-expanded-card">
            <button onClick={onClose}>Close</button>
            <div>
                <span className="habit-emoji">{habit.emoji}</span>
                <h2 className="habit-title">{habit.title}</h2>
                <p className="habit-frequency">Frequency: {habit.frequency}</p>
                <p className="habit-endDate">End Date: {formatDate(habit.endDate)}</p>
                <p className="habit-streak">Streak: {calculateStreak()}</p>
                <button onClick={handleEditClick}>Edit</button>
            </div>
        </div>
    );
};

export default HabitExpanded;
