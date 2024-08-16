import React, { useState } from 'react';
import HabitConfig from './HabitConfig';

const HabitCreation = ({ initialHabit, onAddHabit }) => {
    const [isHabitConfigOpen, setIsHabitConfigOpen] = useState(false);

    const handleOpenHabitConfig = () => {
        setIsHabitConfigOpen(true);
    };

    const handleCloseHabitConfig = () => {
        setIsHabitConfigOpen(false);
    };

    return (
        <div>
            {isHabitConfigOpen ? (
                <HabitConfig initialHabit={initialHabit} onSave={onAddHabit} onClose={handleCloseHabitConfig} />
            ) : (
                <button className="habit-field" onClick={handleOpenHabitConfig}>
                    Add a Habit
                </button>
            )}
        </div>
    );
};

export default HabitCreation;
