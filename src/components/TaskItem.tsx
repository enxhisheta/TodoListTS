import { Button } from "./Button";
import { useState, memo } from "react";

interface Task {
  id: number;
  title: string;
  isEditing: boolean;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onEditTask: (id: number) => void;
  onRemoveTask: (id: number) => void;
  onSaveTask: (id: number, text: string) => void;
  onToggleCompletion: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onEditTask,
  onRemoveTask,
  onSaveTask,
  onToggleCompletion,
}) => {
  const [editedText, setEditedText] = useState(task.title);

  const handleSave = () => {
    onSaveTask(task.id, editedText);
  };

  return (
    <li>
      {task.isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <Button onClick={handleSave}>Save</Button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleCompletion(task.id)}
          />{" "}
          <span>{task.title}</span>
          <Button onClick={() => onEditTask(task.id)}>Edit</Button>
          <Button onClick={() => onRemoveTask(task.id)}>Remove</Button>
        </>
      )}
    </li>
  );
};

export const MemoizedTaskItem = memo(TaskItem, (prevProps, nextProps) => {
  return (
    prevProps.task.id === nextProps.task.id &&
    prevProps.task.title === nextProps.task.title &&
    prevProps.task.isEditing === nextProps.task.isEditing &&
    prevProps.task.completed === nextProps.task.completed
  );
});
