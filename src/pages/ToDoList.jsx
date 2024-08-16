import '../App.css';
import TaskField from "../components/taskComponents/TaskField";
import Task from "../components/taskComponents/Task";
import { getData, removeData, setData } from '../functions/LocalStorageFunctions';
import { useEffect, useState } from "react";
import MotivationalMessage from '../components/MotivationalMessage';
import { auth, db } from '../authentication/FirebaseConfig';
import { getCollection, setDocument } from '../functions/FireStorageFunctions';
import { updateDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

function ToDoList({ isStep, stepTasks, updateBalance }) {
    const user = auth.currentUser;
    let keyTasks = '';
    const [tasks, setTasks] = useState(isStep ? (getData(keyTasks = stepTasks) || []) : (getData(keyTasks = 'tasks') || []));
    let currentBalance = getData('balance');

    useEffect(() => {
        setData(keyTasks, tasks);
        currentBalance = getData('balance');
    }, [tasks]);

    function addTask(name) {
        console.log(user)
        setDocument("tasks", {
            name: name,
            taskDone: false,
            // uid: user.uid,
            // uid: 1,
        });

        setTasks(prev => {
            return [...prev, { name: name, taskDone: false }];
        });
    }

    function removeTask(indexToRemove) {

        removeData("tasks",)
        setTasks(prev => {
            const aux = prev.filter((taskObject, index) => index !== indexToRemove);
            return aux;
        });
    }

    function updateTaskDone(taskIndex, newTaskDone, id) {
        // const taskDocRef = doc(db, "tasks", id);
        // updateDoc(taskDocRef, { taskDone: newTaskDone });
        if (newTaskDone === true) {
            updateBalance(10);
        }
        else {
            updateBalance(-10);
        }

        setTasks(prev => {
            const newTasks = [...prev];
            newTasks[taskIndex].taskDone = newTaskDone;
            return newTasks;
        });
    }
    function renameTask(index, newName) {
        setTasks(prev => {
            const newTasks = [...prev];
            newTasks[index].name = newName;
            return newTasks;
        })
    }

    return (
        <div style={{
            marginTop: '180px'
        }}>
            <MotivationalMessage things={tasks} thingDone="taskDone" />
            <TaskField onAdd={addTask} />
            <div className='taskSection'>
                <ol className='taskList'>
                    {tasks.map((task, index) => (
                        <Task key={index}{...task}
                            onRename={newName => renameTask(index, newName)}
                            onTrash={() => removeTask(index)}
                            onToggle={taskDone => updateTaskDone(index, taskDone)} />
                    ))}
                </ol>
            </div>

        </div>
    );
}

export default ToDoList;