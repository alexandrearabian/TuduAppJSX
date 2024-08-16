import { useState } from "react";

export default function StepField({ onAdd }) {
  const [stepName, setStepName] = useState('');

  function handleSubmit(ev) {
    ev.preventDefault();
    onAdd(stepName);
    setStepName('');
  }

  return (
    <form className="stepField" onSubmit={handleSubmit}>
      <input
        type="text"
        value={stepName}
        onChange={ev => setStepName(ev.target.value)}
        placeholder="Add Step..."
      />
    </form>
  );
}