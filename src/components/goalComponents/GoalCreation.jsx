import React, { useState } from 'react';
import GoalConfig from './GoalConfig';

const GoalCreation = ({ initialGoal, initialSteps, onAddGoal, addStep, removeStep, updateStepDone, renameStep }) => {
    const [isGoalConfigOpen, setIsGoalConfigOpen] = useState(false);

    const handleOpenGoalConfig = () => {
        setIsGoalConfigOpen(true);
    };

    const handleCloseGoalConfig = () => {
        setIsGoalConfigOpen(false);
    };

    return (
        <div>
            {isGoalConfigOpen ? (
                <GoalConfig initialGoal={initialGoal} initialSteps={initialSteps} addStep={addStep} removeStep={removeStep} updateStepDone={updateStepDone} renameStep={renameStep} onSave={onAddGoal} onClose={handleCloseGoalConfig} />
            ) : (
                <button className="habit-field" onClick={handleOpenGoalConfig}>
                    Add a Goal
                </button>
            )}
        </div>
    );
};

export default GoalCreation;
