import React, { useState, useEffect } from 'react';
import Checkbox from '../Checkbox';
import Trash from '../Trash';
import HabitExpanded from './HabitExpanded';
import Slider from '../Slider';

export default function Habit({ habit, onComplete, onIncomplete, onTrash, onEdit, onReset, onNext, onAchieve }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [dynamicCompletedAmount, setDynamicCompletedAmount] = useState(habit.dynamicCompletedAmount || 0);
    const [showModal, setShowModal] = useState(false);

    const tolerance = 0.0001;
    let isSliderCompleted = Math.abs(dynamicCompletedAmount - habit.dynamicAmount) < tolerance;

    useEffect(() => {
        const checkHabitCompletion = () => {
            if (habit.lastCompleted) {
                const now = new Date();
                const day = 24 * 60 * 60 * 1000; // milliseconds in a day
                const lastCompleted = new Date(habit.lastCompleted);
                let resetStreak = false;
                let resetAppearance = false;

                const getStartOfNextPeriod = (date, frequencyDays) => {
                    const nextPeriod = new Date(date);
                    nextPeriod.setDate(nextPeriod.getDate() + frequencyDays);
                    nextPeriod.setHours(0, 0, 0, 0); // set to start of the day
                    return nextPeriod;
                };

                if (habit.frequency === 'daily') {
                    const nextDay = getStartOfNextPeriod(lastCompleted, 1);
                    const dayAfterNext = getStartOfNextPeriod(lastCompleted, 2);

                    if (now >= dayAfterNext) {
                        resetStreak = true;
                    } else if (now >= nextDay) {
                        resetAppearance = true;
                    }
                } else if (habit.frequency === 'weekly') {
                    const nextWeek = getStartOfNextPeriod(lastCompleted, 7);
                    const weekAfterNext = getStartOfNextPeriod(lastCompleted, 14);

                    if (now >= weekAfterNext) {
                        resetStreak = true;
                    } else if (now >= nextWeek) {
                        resetAppearance = true;
                    }
                } else if (habit.frequency === 'monthly') {
                    const nextMonth = new Date(lastCompleted);
                    nextMonth.setMonth(nextMonth.getMonth() + 1);
                    nextMonth.setHours(0, 0, 0, 0);

                    const monthAfterNext = new Date(lastCompleted);
                    monthAfterNext.setMonth(monthAfterNext.getMonth() + 2);
                    monthAfterNext.setHours(0, 0, 0, 0);

                    if (now >= monthAfterNext) {
                        resetStreak = true;
                    } else if (now >= nextMonth) {
                        resetAppearance = true;
                    }
                } else if (habit.frequency.startsWith('Every ')) {
                    const [, customFrequencyNumber, customFrequencyUnit] = habit.frequency.split(' ');
                    const unitMultiplier = {
                        day: 1,
                        days: 1,
                        week: 7,
                        weeks: 7,
                        month: 30,
                        months: 30,
                    };

                    const frequencyDays = customFrequencyNumber * unitMultiplier[customFrequencyUnit];
                    const nextPeriod = getStartOfNextPeriod(lastCompleted, frequencyDays);
                    const periodAfterNext = getStartOfNextPeriod(lastCompleted, 2 * frequencyDays);

                    if (now >= periodAfterNext) {
                        resetStreak = true;
                    } else if (now >= nextPeriod) {
                        resetAppearance = true;
                    }
                }

                // Check if lastCompleted is the same as endDate
                if (habit.endDate !== 'Indefinitely') {

                    const endDate = new Date(habit.endDate);
                    if (
                        lastCompleted.getFullYear() === endDate.getFullYear() &&
                        lastCompleted.getMonth() === endDate.getMonth() &&
                        lastCompleted.getDate() === endDate.getDate()
                    ) {
                        onAchieve();
                        const modalShownBefore = localStorage.getItem('modalShown');
                        if (!modalShownBefore && habit.achieved) {
                            setShowModal(true);
                            localStorage.setItem('modalShown', true);
                        }
                    }
                }

                if (resetStreak) {
                    onReset();
                }

                if (resetAppearance) {
                    onNext();
                }
            }
        };
        checkHabitCompletion();
    }, [habit]); // Only habit as dependency to avoid infinite warnings

    const handleExpand = () => {
        setIsExpanded(true);
    };

    const handleCollapse = () => {
        setIsExpanded(false);
    };
    const handleSliderChange = (event) => {
        const value = parseInt(event.target.value);
        setDynamicCompletedAmount(value);
        habit.dynamicCompletedAmount = value;
    };

    const handleSliderComplete = () => {
        if (isSliderCompleted) {
            if (habit.streak !== undefined) {
                onComplete();
            }
        } else {
            if (habit.streak !== undefined && habit.streak > 0) {
                onIncomplete();
            }
        }
    };

    if (isExpanded) {
        return <HabitExpanded habit={habit} onEdit={onEdit} onClose={handleCollapse} />;
    }

    return (
        <>
            {(habit.type === 'Dynamic') && (
                <li className={'habit ' + (habit.habitDone ? 'done' : '')}>
                    <div className="streak-bubble">{habit.streak}</div> {/* Streak bubble */}
                    <Slider
                        habit={habit}
                        onToggle={onComplete}
                        onChange={handleSliderChange}
                        checkCompletion={handleSliderComplete}
                        dynamicCompletedAmount={dynamicCompletedAmount}
                    />
                    <span className="habit-name" onClick={handleExpand}>
                        {habit.emoji} {habit.title}
                    </span>
                    <Trash onClick={onTrash} />
                </li>
            )}
            {(habit.type !== 'Dynamic') && (
                <li className={'habit ' + (habit.habitDone ? 'done' : '')}>
                    <div className="streak-bubble">{habit.streak}</div> {/* Streak bubble */}
                    <Checkbox habit={habit} checked={habit.habitDone} onComplete={onComplete} onIncomplete={onIncomplete} />
                    <span className="habit-name" onClick={handleExpand}>
                        {habit.emoji} {habit.title}
                    </span>
                    <Trash onClick={onTrash} />
                </li>
            )}
            {(habit.achieved && showModal) && (
                <div>
                    <h2>Congratulations on completing your habit!!!</h2>
                    <button onClick={() => setShowModal(false)}>Close</button>
                </div>
            )}
        </>

    );

}
