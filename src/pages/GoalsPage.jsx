import React, { useEffect, useState } from 'react';
import Goal from '../components/goalComponents/Goal';
import MotivationalMessage from '../components/MotivationalMessage'
import GoalCreation from '../components/goalComponents/GoalCreation';
import { getData, removeData, setData } from '../functions/LocalStorageFunctions';
import { auth, db } from '../authentication/FirebaseConfig';
import { getCollection, setDocument } from '../functions/FireStorageFunctions';
import TaskSection from './TaskSection'

function GoalsPage() {
    //     const [goals, setGoals] = useState(JSON.parse(localStorage.getItem('goals')) || []);
    //     const [steps, setSteps] = useState(getData('steps') || []);
    //     const user = auth.currentUser;

    //     const initialGoalState = {
    //         emoji: '✅',
    //         title: '',
    //         habGoal: '',
    //         type: '', // Static | Dynamic
    //         multiple: '', // Single | Steps
    //         steps: steps,
    //         endDate: 'Indefinitely',
    //         goalDone: false,
    //         dynamicAmount: 0,
    //         dynamicAction: '',
    //         dynamicUnit: '',
    //         dynamicCompletedAmount: 0,
    //     };

    //     useEffect(() => {
    //         localStorage.setItem('goals', JSON.stringify(goals));
    //     }, [goals]);

    //     const addGoal = (goal) => {
    //         setGoals((prev) => [...prev, goal]);
    //     };

    //     const removeGoal = (indexToRemove) => {
    //         setGoals((prev) => prev.filter((goalObject, index) => index !== indexToRemove));
    //     };

    //     const editGoal = (index, updatedGoal) => {
    //         setGoals((prev) => {
    //             const newGoals = [...prev];
    //             newGoals[index] = updatedGoal;
    //             return newGoals;
    //         });
    //     };

    //     const completeGoal = (goalIndex) => {
    //         setGoals((prev) => {
    //             const newGoals = [...prev];
    //             newGoals[goalIndex].goalDone = true;
    //             newGoals[goalIndex].streak += 1;
    //             newGoals[goalIndex].lastCompleted = new Date().toISOString();
    //             return newGoals;
    //         });
    //     };
    //     const incompleteGoal = (goalIndex) => {
    //         setGoals((prev) => {
    //             const newGoals = [...prev];
    //             newGoals[goalIndex].goalDone = false;
    //             newGoals[goalIndex].streak -= 1;
    //             newGoals[goalIndex].lastCompleted = null;
    //             return newGoals;
    //         });
    //     };

    //     const resetStreak = (goalIndex) => {
    //         setGoals((prev) => {
    //             const newGoals = [...prev];
    //             newGoals[goalIndex].streak = 0;
    //             newGoals[goalIndex].goalDone = false;
    //             return newGoals;
    //         });
    //     };
    //     const resetAppearence = (goalIndex) => {
    //         setGoals((prev) => {
    //             const newGoals = [...prev];
    //             newGoals[goalIndex].goalDone = false;
    //             newGoals[goalIndex].dynamicCompletedAmount = 0;
    //             return newGoals;
    //         });
    //     };

    //     const finishGoal = (goalIndex) => {
    //         setGoals((prev) => {
    //             const newGoals = [...prev];
    //             newGoals[goalIndex].achieved = true;
    //             return newGoals;
    //         });
    //     }

    //     function addStep(name) {
    //         setDocument("steps", {
    //             name: name,
    //             stepDone: false,
    //             tasks: [],
    //             habits: [],
    //             // uid: user.uid,
    //             // uid: 1,
    //         });

    //         setSteps(prev => {
    //             return [...prev, { name: name, stepDone: false }];
    //         });
    //     }

    //     function removeStep(indexToRemove) {

    //         // removeData("steps",)
    //         setSteps(prev => {
    //             const aux = prev.filter((stepObject, index) => index !== indexToRemove);
    //             return aux;
    //         });
    //     }

    //     function updateStepDone(stepIndex, newStepDone, id) {
    //         // const stepDocRef = doc(db, "steps", id);
    //         // updateDoc(stepDocRef, { stepDone: newStepDone });
    //         if (newStepDone === true) {
    //             updateBalance(10);
    //         }
    //         else {
    //             updateBalance(-10);
    //         }

    //         setSteps(prev => {
    //             const newSteps = [...prev];
    //             newSteps[stepIndex].stepDone = newStepDone;
    //             return newSteps;
    //         });
    //     }
    //     function renameStep(index, newName) {
    //         setSteps(prev => {
    //             const newSteps = [...prev];
    //             newSteps[index].name = newName;
    //             return newSteps;
    //         })
    //     }


    //     return (
    //         <main>
    //             <MotivationalMessage things={goals} thingDone="goalDone" />
    //             <div className="goalSection">
    //                 <GoalCreation initialGoal={initialGoalState} initialSteps={steps} onAddGoal={addGoal} addStep={addStep} removeStep={removeStep} updateStepDone={updateStepDone} renameStep={renameStep} />
    //                 <ol className="goalList">
    //                     {goals.map((goal, index) => (
    //                         <Goal
    //                             key={index}
    //                             goal={goal}
    //                             onComplete={() => completeGoal(index)}
    //                             onIncomplete={() => incompleteGoal(index)}
    //                             onEdit={(updatedGoal) => editGoal(index, updatedGoal)}
    //                             onReset={() => resetStreak(index)}
    //                             onNext={() => resetAppearence(index)}
    //                             onTrash={() => removeGoal(index)}
    //                             onAchieve={() => finishGoal(index)}

    //                         />
    //                     ))}
    //                 </ol>
    //             </div>
    //         </main>
    //     );
    return (


        <TaskSection />
    );
}

export default GoalsPage;

