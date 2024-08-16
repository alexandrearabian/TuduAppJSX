import { useState } from "react";

export default function TaskField({ onAdd }) {
  const [taskName, setTaskName] = useState('');

  function handleSubmit(ev) {
    ev.preventDefault();
    onAdd(taskName);
    setTaskName('');
  }

  return (
    <form className="taskField" onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskName}
        onChange={ev => setTaskName(ev.target.value)}
        placeholder="Add Task..."
      />
    </form>
  );
}