import React, { useState, useEffect } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import HabitConfig from '../habitComponents/HabitConfig';
import Steps from '../goalComponents/Steps';


const GoalConfig = ({ initialGoal, initialSteps, editableGoal, onSave, onClose, addStep, removeStep, updateStepDone, renameStep }) => {

    const [isEmojiMenuOpen, setIsEmojiMenuOpen] = useState(false);
    const [isTypeMenuOpen, setIsTypeMenuOpen] = useState(false);
    const [isHabGoalOpen, setIsHabGoalOpen] = useState(false);
    const [endDate, setEndDate] = useState('');

    if (!initialGoal) {
        const initialGoalState = {
            emoji: '✅',
            title: '',
            habGoal: '',
            type: '', // Static | Dynamic
            multiple: '', // Single | Steps
            steps: steps,
            endDate: 'Indefinitely',
            goalDone: false,
            dynamicAmount: 0,
            dynamicAction: '',
            dynamicUnit: '',
            dynamicCompletedAmount: 0,
        };
        initialGoal = initialGoalState;
    }
    const [goal, setGoal] = useState(editableGoal ? editableGoal : initialGoal);

    useEffect(() => {
        if (editableGoal && editableGoal.endDate) {
            setEndDate(editableGoal.endDate);
        }
    }, [editableGoal]);

    const handleEmojiClick = () => setIsEmojiMenuOpen(!isEmojiMenuOpen);

    const handleEmojiSelect = (emoji) => {
        setGoal({ ...goal, emoji: emoji.native });
        setIsEmojiMenuOpen(false);
    };

    const handleTitleChange = (e) => {
        setGoal({ ...goal, title: e.target.value });
    };
    const handleTitleChangeStep = (e) => {
        setStep({ ...steps, title: e.target.value });
    };
    const handleAddStep = (e) => {
        setStep(prev => {
            return [...prev, { title: e.target.value }];
        });
    };

    const handleTypeSelect = (type) => {
        setGoal({ ...goal, type });
        setIsTypeMenuOpen(false);
    };
    const handleHabGoalSelect = (habGoal) => {
        setGoal({ ...goal, habGoal });
        setIsHabGoalOpen(false);
    };

    const handleendDateChange = (e) => {
        const date = e.target.value;
        setEndDate(date);
        setGoal({ ...goal, endDate: date ? date : 'Indefinitely' });
    };

    const handleSave = () => {
        onSave(goal);
        setGoal(initialGoal);
        setEndDate('Indefinitely');
    };
    const handleNext = () => {
        onSave(goal);
        setGoal(initialGoal);
        setEndDate('Indefinitely');
    };
    const handleClose = () => {
        onClose();

    };

    return (
        <div className="goal-config">
            <button className="close-button" onClick={handleClose}>Close</button>
            <div className="field">
                <label>Choose between Goal and Habit:</label>
                <div className="dropdown">
                    <button onClick={() => setIsHabGoalOpen(!isHabGoalOpen)}>
                        {goal.habGoal || 'Select'}
                    </button>
                    {isHabGoalOpen && (
                        <div className="dropdown-menu">
                            <div onClick={() => handleHabGoalSelect('Goal')}>Goal</div>
                            <div onClick={() => handleHabGoalSelect('Habit')}>Habit</div>
                        </div>
                    )}
                </div>
            </div>
            {goal.habGoal === 'Habit' && (
                <>
                    <HabitConfig onSave={onSave} onClose={onClose} />
                </>
            )}
            {goal.habGoal === 'Goal' && (
                <>
                    <div className='habit-config'>

                        <div className="field">
                            <label>Emoji:</label>
                            <button className="emoji-button" onClick={handleEmojiClick}>
                                {goal.emoji}
                            </button>
                            {isEmojiMenuOpen && (
                                <div className="emoji-picker">
                                    <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                                </div>
                            )}
                        </div>

                        <div className="field">
                            <label>Title:</label>
                            <input
                                type="text"
                                value={goal.title}
                                onChange={handleTitleChange}
                            />
                        </div>
                        <div className="field">
                            <label>Type:</label>
                            <div className="dropdown">
                                <button onClick={() => setIsTypeMenuOpen(!isTypeMenuOpen)}>
                                    {goal.type || 'Select'}
                                </button>
                                {isTypeMenuOpen && (
                                    <div className="dropdown-menu">
                                        <a style={{ padding: '5px 5px 15px 0' }} onClick={() => handleTypeSelect('Static')}>Static</a>
                                        <a style={{ padding: '5px 5px 15 0' }} onClick={() => handleTypeSelect('Dynamic')}>Dynamic</a>
                                    </div>
                                )}
                            </div>
                        </div>
                        {goal.type === 'Dynamic' && (
                            <div className="field">
                                <label>Action:</label>
                                <input
                                    type="text"
                                    value={goal.dynamicAction}
                                    onChange={(e) => setGoal({ ...goal, dynamicAction: e.target.value })}
                                />
                                <label>Amount:</label>
                                <input
                                    type="number"
                                    value={goal.dynamicAmount}
                                    onChange={(e) => setGoal({ ...goal, dynamicAmount: e.target.value })}
                                />
                                <label>Unit:</label>
                                <input
                                    type="text"
                                    value={goal.dynamicUnit}
                                    onChange={(e) => setGoal({ ...goal, dynamicUnit: e.target.value })}
                                />
                            </div>
                        )}



                        <div className="field">
                            <label>End Date:</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={handleendDateChange}
                                placeholder="Indefinitely"
                            />
                        </div>
                        <div>
                            <label>Now its time to break it to steps!</label>
                            <Steps goalSteps={initialSteps} addStep={addStep} removeStep={removeStep} updateStepDone={updateStepDone} renameStep={renameStep} />
                        </div>
                        {/* <div className="field">
                            <label>Steps:</label>
                            <input
                                type="number"
                                value={goal.dynamicAmount}
                                onChange={(e) => setGoal({ ...goal, dynamicAmount: e.target.value })}
                            />
                        </div> */}

                        <button className="save-button" onClick={handleSave}>Save</button>
                        <button className="save-button" onClick={handleNext}>Next</button>
                    </div>
                </>
            )}


        </div>
    );
};

export default GoalConfig;
