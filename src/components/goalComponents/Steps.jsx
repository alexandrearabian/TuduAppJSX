
import StepField from "../stepComponents/StepField";
import Step from "../stepComponents/Step";
import { getData, removeData, setData } from '../../functions/LocalStorageFunctions';
import { useEffect, useState } from "react";
import MotivationalMessage from '../MotivationalMessage';
import { auth, db } from '../../authentication/FirebaseConfig';
import { getCollection, setDocument } from '../../functions/FireStorageFunctions';
import { updateDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

function Steps({ goalSteps, updateBalance, addStep, removeStep, updateStepDone, renameStep }) {
    const user = auth.currentUser;
    const [steps, setSteps] = useState(goalSteps);
    // let currentBalance = getData('balance');

    // useEffect(() => {
    //     setData(keySteps, steps);
    //     currentBalance = getData('balance');
    // }, [steps]);

    // function addStep(name) {
    //     console.log(user)
    //     setDocument("steps", {
    //         name: name,
    //         stepDone: false,
    //         tasks: [],
    //         habits: [],
    //         // uid: user.uid,
    //         // uid: 1,
    //     });

    //     setSteps(prev => {
    //         return [...prev, { name: name, stepDone: false }];
    //     });
    // }

    // function removeStep(indexToRemove) {

    //     removeData("steps",)
    //     setSteps(prev => {
    //         const aux = prev.filter((stepObject, index) => index !== indexToRemove);
    //         return aux;
    //     });
    // }

    // function updateStepDone(stepIndex, newStepDone, id) {
    //     // const stepDocRef = doc(db, "steps", id);
    //     // updateDoc(stepDocRef, { stepDone: newStepDone });
    //     if (newStepDone === true) {
    //         updateBalance(10);
    //     }
    //     else {
    //         updateBalance(-10);
    //     }

    //     setSteps(prev => {
    //         const newSteps = [...prev];
    //         newSteps[stepIndex].stepDone = newStepDone;
    //         return newSteps;
    //     });
    // }
    // function renameStep(index, newName) {
    //     setSteps(prev => {
    //         const newSteps = [...prev];
    //         newSteps[index].name = newName;
    //         return newSteps;
    //     })
    // }

    return (
        <div>
            <StepField onAdd={addStep} />
            <div className='stepSection'>
                <ol className='stepList'>
                    {steps.map((step, index) => (
                        <Step key={index}{...step}
                            onRename={newName => renameStep(index, newName)}
                            onTrash={() => removeStep(index)}
                            onToggle={stepDone => updateStepDone(index, stepDone)} />
                    ))}
                </ol>
            </div>

        </div>
    );
}

export default Steps;