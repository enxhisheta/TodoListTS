import { useState, useEffect, memo, useCallback } from "react";
import { Button } from "./Button";

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

  const handleAdd = useCallback(() => {
    //useCallback to avoid unnecessary re-renders
    if (newTask.trim()) {
      if (editMode && onSaveTask) {
        onSaveTask(1, newTask); // Placeholder for task ID
      } else {
        onAddTask(newTask);
      }
      setNewTask("");
    }
  }, [newTask, editMode, onAddTask, onSaveTask]);

  console.log("TaskInput rendered");

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

// Memoized TaskInput to avoid unnecessary re-renders
export const MemoizedTaskInput = memo(TaskInput, (prevProps, nextProps) => {
  return (
    prevProps.editMode === nextProps.editMode &&
    prevProps.currentText === nextProps.currentText
  );
});
