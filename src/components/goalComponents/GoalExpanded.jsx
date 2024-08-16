// src/components/goalComponents/GoalExpanded.jsx

import React, { useState } from 'react';
import GoalConfig from './GoalConfig';

const GoalExpanded = ({ goal, onEdit, onClose }) => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleClose = () => {
        setIsEditing(false);
    };

    const handleSave = (updatedGoal) => {
        onEdit(updatedGoal);
        setIsEditing(false);
    };

    const calculateStreak = () => {
        return goal.streak || 0;
    };

    const formatDate = (date) => {
        if (!date || date === 'Indefinitely') return 'Indefinitely';
        const [year, month, day] = date.split('-');
        return `${day}-${month}-${year}`;
    };

    if (isEditing) {
        return <GoalConfig editableGoal={goal} onSave={handleSave} onClose={handleClose} />;
    }

    return (
        <div className="goal-expanded-card">
            <button onClick={onClose}>Close</button>
            <div>
                <span className="goal-emoji">{goal.emoji}</span>
                <h2 className="goal-title">{goal.title}</h2>
                <p className="goal-frequency">Frequency: {goal.frequency}</p>
                <p className="goal-endDate">End Date: {formatDate(goal.endDate)}</p>
                <p className="goal-streak">Streak: {calculateStreak()}</p>
                <button onClick={handleEditClick}>Edit</button>
            </div>
        </div>
    );
};

export default GoalExpanded;
