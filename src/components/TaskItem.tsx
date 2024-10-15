import InputField from "./InputField";
import Button from "./Button";

interface Task {
  id: number;
  text: string;
  isEditing: boolean;
}

interface TaskItemProps {
  task: Task;
  onEditTask: (id: number) => void;
  onRemoveTask: (id: number) => void;
  onSaveTask: (id: number, text: string) => void;
  editText: string;
  setEditText: (text: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onEditTask,
  onRemoveTask,
  onSaveTask,
  editText,
  setEditText,
}) => {
  return (
    <li>
      {task.isEditing ? (
        <>
          <InputField
            value={editText}
            onChange={setEditText}
            placeholder="Edit task"
          />
          <Button onClick={() => onSaveTask(task.id, editText)}>Save</Button>
        </>
      ) : (
        <>
          <span>{task.text}</span>
          <Button onClick={() => onEditTask(task.id)}>Edit</Button>
          <Button onClick={() => onRemoveTask(task.id)}>Remove</Button>
        </>
      )}
    </li>
  );
};

export default TaskItem;
