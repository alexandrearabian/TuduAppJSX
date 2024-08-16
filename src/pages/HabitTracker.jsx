import React, { useEffect, useState } from 'react';
import Habit from '../components/habitComponents/Habit';
import MotivationalMessage from '../components/MotivationalMessage'
import HabitCreation from '../components/habitComponents/HabitCreation';
import { getData, setData, clearData, removeData } from '../functions/LocalStorageFunctions';

function HabitTracker({ isStep, Step, updateBalance }) {

    let keyHabits = '';
    const [habits, setHabits] = useState(isStep ? (getData(keyHabits = `{'linkedHabits'${Step}}`) || []) : (getData(keyHabits = 'habits') || []));
    let currentBalance = getData('balance');

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

    useEffect(() => {
        setData(keyHabits, habits);
        currentBalance = getData('balance');

    }, [habits]);

    const addHabit = (habit) => {
        setHabits((prev) => [...prev, habit]);
    };

    const removeHabit = (indexToRemove) => {
        setHabits((prev) => prev.filter((habitObject, index) => index !== indexToRemove));
    };

    const editHabit = (index, updatedHabit) => {
        setHabits((prev) => {
            const newHabits = [...prev];
            newHabits[index] = updatedHabit;
            return newHabits;
        });
    };

    const completeHabit = (habitIndex) => {
        updateBalance(100);

        setHabits((prev) => {
            const newHabits = [...prev];
            newHabits[habitIndex].habitDone = true;
            newHabits[habitIndex].streak += 1;
            newHabits[habitIndex].lastCompleted = new Date().toISOString();
            return newHabits;
        });
    };
    const incompleteHabit = (habitIndex) => {
        updateBalance(-100);

        setHabits((prev) => {
            const newHabits = [...prev];
            newHabits[habitIndex].habitDone = false;
            newHabits[habitIndex].streak -= 1;
            newHabits[habitIndex].lastCompleted = null;
            return newHabits;
        });
    };

    const resetStreak = (habitIndex) => {
        setHabits((prev) => {
            const newHabits = [...prev];
            newHabits[habitIndex].streak = 0;
            newHabits[habitIndex].habitDone = false;
            return newHabits;
        });
    };
    const resetAppearence = (habitIndex) => {
        setHabits((prev) => {
            const newHabits = [...prev];
            newHabits[habitIndex].habitDone = false;
            newHabits[habitIndex].dynamicCompletedAmount = 0;
            return newHabits;
        });
    };

    const finishHabit = (habitIndex) => {
        setHabits((prev) => {
            const newHabits = [...prev];
            newHabits[habitIndex].achieved = true;
            return newHabits;
        });
    }

    return (
        <div style={{
            marginTop: '180px'
        }}>
            <MotivationalMessage things={habits} thingDone="habitDone" />
            <HabitCreation initialHabit={initialHabitState} onAddHabit={addHabit} />
            <div className="taskSection">
                <ol className="taskList">
                    {habits.map((habit, index) => (
                        <Habit
                            key={index}
                            habit={habit}
                            onComplete={() => completeHabit(index)}
                            onIncomplete={() => incompleteHabit(index)}
                            onEdit={(updatedHabit) => editHabit(index, updatedHabit)}
                            onReset={() => resetStreak(index)}
                            onNext={() => resetAppearence(index)}
                            onTrash={() => removeHabit(index)}
                            onAchieve={() => finishHabit(index)}

                        />
                    ))}
                </ol>
            </div>
        </div>

    );
}

export default HabitTracker;

