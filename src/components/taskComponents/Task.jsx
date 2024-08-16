import Checkbox from "../Checkbox";
import { useState } from "react";
import Trash from "../Trash";

export default function Task({ name, taskDone, onToggle, onTrash, onRename }) {

  const [editMode, setEditMode] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setEditMode(false);
  }

  return (
    <li className={'task ' + (taskDone ? 'done' : '')}>
      <Checkbox checked={taskDone} onToggle={() => onToggle(!taskDone)} />
      {!editMode && (
        <span className="task-name" onClick={() => setEditMode(prev => !prev)}>{name}</span>
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