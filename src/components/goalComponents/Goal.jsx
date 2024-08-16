import React, { useState, useEffect } from 'react';
import Checkbox from '../Checkbox';
import Trash from '../Trash';
import GoalExpanded from './GoalExpanded';
import Slider from '../Slider';

export default function Goal({ goal, onComplete, onIncomplete, onTrash, onEdit, onReset, onNext, onAchieve }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [dynamicCompletedAmount, setDynamicCompletedAmount] = useState(goal.dynamicCompletedAmount || 0);
    const [showModal, setShowModal] = useState(false);

    const tolerance = 0.0001;
    let isSliderCompleted = Math.abs(dynamicCompletedAmount - goal.dynamicAmount) < tolerance;

    useEffect(() => {
        const checkGoalCompletion = () => {
            if (goal.lastCompleted) {
                const now = new Date();
                const day = 24 * 60 * 60 * 1000; // milliseconds in a day
                const lastCompleted = new Date(goal.lastCompleted);
                let resetStreak = false;
                let resetAppearance = false;

                const getStartOfNextPeriod = (date, frequencyDays) => {
                    const nextPeriod = new Date(date);
                    nextPeriod.setDate(nextPeriod.getDate() + frequencyDays);
                    nextPeriod.setHours(0, 0, 0, 0); // set to start of the day
                    return nextPeriod;
                };

                if (goal.frequency === 'daily') {
                    const nextDay = getStartOfNextPeriod(lastCompleted, 1);
                    const dayAfterNext = getStartOfNextPeriod(lastCompleted, 2);

                    if (now >= dayAfterNext) {
                        resetStreak = true;
                    } else if (now >= nextDay) {
                        resetAppearance = true;
                    }
                } else if (goal.frequency === 'weekly') {
                    const nextWeek = getStartOfNextPeriod(lastCompleted, 7);
                    const weekAfterNext = getStartOfNextPeriod(lastCompleted, 14);

                    if (now >= weekAfterNext) {
                        resetStreak = true;
                    } else if (now >= nextWeek) {
                        resetAppearance = true;
                    }
                } else if (goal.frequency === 'monthly') {
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
                } else if (goal.frequency.startsWith('Every ')) {
                    const [, customFrequencyNumber, customFrequencyUnit] = goal.frequency.split(' ');
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
                if (goal.endDate !== 'Indefinitely') {

                    const endDate = new Date(goal.endDate);
                    if (
                        lastCompleted.getFullYear() === endDate.getFullYear() &&
                        lastCompleted.getMonth() === endDate.getMonth() &&
                        lastCompleted.getDate() === endDate.getDate()
                    ) {
                        onAchieve();
                        const modalShownBefore = localStorage.getItem('modalShown');
                        if (!modalShownBefore && goal.achieved) {
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
        checkGoalCompletion();
    }, [goal]); // Only goal as dependency to avoid infinite warnings

    const handleExpand = () => {
        setIsExpanded(true);
    };

    const handleCollapse = () => {
        setIsExpanded(false);
    };
    const handleSliderChange = (event) => {
        const value = parseInt(event.target.value);
        setDynamicCompletedAmount(value);
        goal.dynamicCompletedAmount = value;
    };

    const handleSliderComplete = () => {
        if (isSliderCompleted) {
            if (goal.streak !== undefined) {
                onComplete();
            }
        } else {
            if (goal.streak !== undefined && goal.streak > 0) {
                onIncomplete();
            }
        }
    };

    if (isExpanded) {
        return <GoalExpanded goal={goal} onEdit={onEdit} onClose={handleCollapse} />;
    }

    return (
        <>
            {(goal.type === 'Dynamic') &&
                <li className={'habit ' + (goal.goalDone ? 'done' : '')}>
                    <Slider
                        habit={goal}
                        onToggle={onComplete}
                        onChange={handleSliderChange}
                        checkCompletion={handleSliderComplete}
                        dynamicCompletedAmount={dynamicCompletedAmount}
                    />
                    <span className="goal-name" onClick={handleExpand}>
                        {goal.emoji} {goal.title}
                    </span>
                    <Trash onClick={onTrash} />
                </li>
            }{(goal.type !== 'Dynamic') &&
                <li className={'habit ' + (goal.goalDone ? 'done' : '')}>
                    <Checkbox goal={goal} checked={goal.goalDone} onComplete={onComplete} onIncomplete={onIncomplete} />
                    <span className="habit-name" onClick={handleExpand}>
                        {goal.emoji} {goal.title}
                    </span>
                    <Trash onClick={onTrash} />
                </li>
            }
            {(goal.achieved && showModal) &&
                < div >
                    <h2>Congratulations on completing your goal!!!</h2>
                    <button onClick={() => setShowModal(false)}>Close</button>
                </div >
            }
        </>
    );

}
