import React, { useState, useEffect } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

const HabitConfig = ({ initialHabit, editableHabit, onSave, onClose }) => {

    const [isEmojiMenuOpen, setIsEmojiMenuOpen] = useState(false);
    const [isTypeMenuOpen, setIsTypeMenuOpen] = useState(false);
    const [isFrequencyMenuOpen, setIsFrequencyMenuOpen] = useState(false);
    const [endDate, setEndDate] = useState('');
    const [isCustomFrequencyMenuOpen, setIsCustomFrequencyMenuOpen] = useState(false);
    const [customFrequencyNumber, setCustomFrequencyNumber] = useState(1);
    const [customFrequencyUnit, setCustomFrequencyUnit] = useState('days');
    if (!initialHabit) {
        const initialHabitState = {
            emoji: '✅',
            title: '',
            type: '',
            frequency: '',
            endDate: 'Indefinitely',
            habitDone: false,
            streak: 0,
            dynamicAmount: 0,
            dynamicAction: '',
            dynamicUnit: '',
            dynamicCompletedAmount: 0,
            lastCompleted: null,
            achieved: false,
        };
        initialHabit = initialHabitState;
    }
    const [habit, setHabit] = useState(editableHabit ? editableHabit : initialHabit);


    useEffect(() => {
        if (editableHabit && editableHabit.endDate) {
            setEndDate(editableHabit.endDate);
        }
    }, [editableHabit]);

    const handleCustomFrequencySelect = () => {
        setHabit({ ...habit, frequency: `Every ${customFrequencyNumber} ${customFrequencyUnit}` });
        setIsFrequencyMenuOpen(false);
        setIsCustomFrequencyMenuOpen(false);
    };

    const handleEmojiClick = () => setIsEmojiMenuOpen(!isEmojiMenuOpen);

    const handleEmojiSelect = (emoji) => {
        setHabit({ ...habit, emoji: emoji.native });
        setIsEmojiMenuOpen(false);
    };

    const handleTitleChange = (e) => {
        setHabit({ ...habit, title: e.target.value });
    };

    const handleTypeSelect = (type) => {
        setHabit({ ...habit, type });
        setIsTypeMenuOpen(false);
    };

    const handleFrequencySelect = (frequency) => {
        setHabit({ ...habit, frequency });
        setIsFrequencyMenuOpen(false);
    };

    const handleendDateChange = (e) => {
        const date = e.target.value;
        setEndDate(date);
        setHabit({ ...habit, endDate: date ? date : 'Indefinitely' });
    };

    const handleSave = () => {
        onSave(habit);
        setHabit(initialHabit);
        setEndDate('Indefinitely');
    };
    const handleClose = () => {
        onClose();

    };

    return (
        <div className="habit-config">

            <div className="field">
                <label>Emoji:</label>
                <button className="emoji-button" onClick={handleEmojiClick}>
                    {habit.emoji}
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
                    value={habit.title}
                    onChange={handleTitleChange}
                />
            </div>

            <div className="field">
                <label>Type:</label>
                <div className="dropdown">
                    <button onClick={() => setIsTypeMenuOpen(!isTypeMenuOpen)}>
                        {habit.type || 'Select'}
                    </button>
                    {isTypeMenuOpen && (
                        <div className="dropdown-menu">
                            <a style={{ padding: '5px 5px 15px 0' }} onClick={() => handleTypeSelect('Static')}>Static</a>
                            <a style={{ padding: '5px 5px 15 0' }} onClick={() => handleTypeSelect('Dynamic')}>Dynamic</a>
                        </div>
                    )}
                </div>
            </div>
            {habit.type === 'Dynamic' && (
                <div className="field">
                    <label>Action:</label>
                    <input
                        type="text"
                        value={habit.dynamicAction}
                        onChange={(e) => setHabit({ ...habit, dynamicAction: e.target.value })}
                    />
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={habit.dynamicAmount}
                        onChange={(e) => setHabit({ ...habit, dynamicAmount: e.target.value })}
                    />
                    <label>Unit:</label>
                    <input
                        type="text"
                        value={habit.dynamicUnit}
                        onChange={(e) => setHabit({ ...habit, dynamicUnit: e.target.value })}
                    />
                </div>
            )}

            <div className="field">
                <label>Frequency:</label>
                <div>
                    <button onClick={() => setIsFrequencyMenuOpen(!isFrequencyMenuOpen)}>
                        {habit.frequency || 'Select frequency'}
                    </button>
                    {isFrequencyMenuOpen && (
                        <div className="dropdown-menu">
                            <a onClick={() => handleFrequencySelect('daily')}>Daily</a>
                            <a onClick={() => handleFrequencySelect('weekly')}>Weekly</a>
                            <a onClick={() => handleFrequencySelect('monthly')}>Monthly</a>
                            <a onClick={() => setIsCustomFrequencyMenuOpen(!isCustomFrequencyMenuOpen)}>Custom</a>
                        </div>
                    )}
                    {isCustomFrequencyMenuOpen && (
                        <div className="custom-frequency-menu">
                            <input
                                type="number"
                                value={customFrequencyNumber}
                                onChange={(e) => setCustomFrequencyNumber(e.target.value)}
                                min="1"
                            />
                            <select
                                value={customFrequencyUnit}
                                onChange={(e) => setCustomFrequencyUnit(e.target.value)}
                            >
                                <option value="days">days</option>
                                <option value="weeks">weeks</option>
                                <option value="months">months</option>
                            </select>
                            <button onClick={handleCustomFrequencySelect}>Set</button>
                        </div>
                    )}
                </div>
            </div>

            <div className="field">
                <label>End Date:</label>
                <input
                    type="date"
                    value={endDate}
                    onChange={handleendDateChange}
                    placeholder="Indefinitely"
                    style={{
                        border: 'none'
                    }}
                />
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '1em',
            }}>

                <button style={{ padding: '1em', fontSize: '14px' }} className="save-button" onClick={handleSave}>Save</button>
                <button style={{ padding: '1em', fontSize: '14px' }} className="close-button" onClick={handleClose}>Close</button>
            </div>
        </div>
    );
};

export default HabitConfig;
