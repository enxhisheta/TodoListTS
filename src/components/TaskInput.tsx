import { useEffect, useRef, memo } from "react";
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
  editMode = false,
  currentText = "",
}) => {
  const newTaskRef = useRef<string>(currentText);

  useEffect(() => {
    if (editMode && currentText) {
      newTaskRef.current = currentText;
    } else {
      newTaskRef.current = "";
    }
  }, [editMode, currentText]);

  const handleAdd = () => {
    const taskValue = newTaskRef.current.trim();
    if (taskValue) {
      if (editMode && onSaveTask) {
        onSaveTask(1, taskValue);
      } else {
        onAddTask(taskValue);
      }
      newTaskRef.current = "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    newTaskRef.current = e.target.value;
  };

  console.log("TaskInput rendered");

  return (
    <div>
      <input
        type="text"
        defaultValue={currentText}
        onChange={handleChange}
        placeholder={editMode ? "Edit task" : "Add a new task"}
      />
      <Button onClick={handleAdd}>{editMode ? "Save Task" : "Add Task"}</Button>
    </div>
  );
};

export const MemoizedTaskInput = memo(TaskInput, (prevProps, nextProps) => {
  return (
    prevProps.editMode === nextProps.editMode &&
    prevProps.currentText === nextProps.currentText &&
    prevProps.onAddTask === nextProps.onAddTask &&
    prevProps.onSaveTask === nextProps.onSaveTask
  );
});
