import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';

const RightMenu = ({ balance, completedTasks, completedHabits, completedGoals, totalTasks, totalHabits, totalGoals }) => {
    return (
        <div className="right-menu">
            <div style={{
                top: '1%',
                right: '1%',
                borderRadius: '10px',
            }}>
                🟡 {balance}
            </div>
            <p style={{ marginTop: '120px' }}>Completed Tasks: {completedTasks}/{totalTasks}</p>
            <ProgressBar completed={completedTasks} total={totalTasks} />

            <p>Completed Habits: {completedHabits}/{totalHabits}</p>
            <ProgressBar completed={completedHabits} total={totalHabits} />

            {/* <p>Completed Goals: {completedGoals}/{totalGoals}</p>
            <ProgressBar completed={completedGoals} total={totalGoals} /> */}

        </div>
    );
};

export default RightMenu;
