import { useState } from "react";
import ToDoList from "../../pages/ToDoList";
import HabitTracker from "../../pages/HabitTracker";

const AddHabitTasks = ({ Goal, Step }) => {

    const [thing, setThing] = useState('');

    const handleTask = () => {
        setThing('Task');
    };
    const handleHabit = () => {
        setThing('Habit');
    };


    return (

        <div>
            <button onClick={handleTask}>Task</button>
            <button onClick={handleHabit}>Habit</button>
            {(thing == 'Task') &&

                <ToDoList isStep={true} Step={Step.id} />
            }
            {(thing == 'Habit') &&

                <HabitTracker isStep={true} Step={Step.id} />
            }
        </div>
    );
};

export default AddHabitTasks;