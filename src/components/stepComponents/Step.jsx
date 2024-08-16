import Checkbox from "../Checkbox";
import { useState } from "react";
import Trash from "../Trash";

export default function Step({ name, stepDone, onToggle, onTrash, onRename }) {

  const [editMode, setEditMode] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setEditMode(false);
  }

  return (
    <li className={'step ' + (stepDone ? 'done' : '')}>
      <Checkbox checked={stepDone} onToggle={() => onToggle(!stepDone)} />
      {!editMode && (
        <span className="step-name" onClick={() => setEditMode(prev => !prev)}>{name}</span>
      )}
      {editMode && (
        <form onSubmit={ev => { handleSubmit(ev) }}>
          <input type="text" value={name}
            onChange={ev => onRename(ev.target.value)} />
        </form>
      )}
      <Trash onClick={onTrash} />
    </li>
  );
}