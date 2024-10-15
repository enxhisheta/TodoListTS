import { useState } from "react";
import Button from "./Button";

interface TaskInputProps {
  onAddTask: (text: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [newTask, setNewTask] = useState<string>("");

  const handleAdd = () => {
    if (newTask.trim()) {
      onAddTask(newTask);
      setNewTask("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <Button onClick={handleAdd}>Add Task</Button>
    </div>
  );
};

export default TaskInput;
