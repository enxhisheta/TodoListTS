import { useState, useEffect } from "react";
import Button from "./Button";

interface TaskInputProps {
  onAddTask: (text: string) => void;
  onSaveTask?: (id: number, text: string) => void;
  editMode?: boolean;
  currentText?: string;
}

const TaskInput: React.FC<TaskInputProps> = ({
  onAddTask,
  onSaveTask,
  editMode,
  currentText,
}) => {
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    if (editMode && currentText) {
      setNewTask(currentText);
    } else {
      setNewTask("");
    }
  }, [editMode, currentText]);

  const handleAdd = () => {
    if (newTask.trim()) {
      if (editMode && onSaveTask) {
        onSaveTask(1, newTask);
      } else {
        onAddTask(newTask);
      }
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
      <Button onClick={handleAdd}>{editMode ? "Save Task" : "Add Task"}</Button>
    </div>
  );
};

export default TaskInput;
