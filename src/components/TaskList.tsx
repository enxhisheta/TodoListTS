import Button from "./Button";
import InputField from "./InputField";

interface Task {
  id: number;
  text: string;
  isEditing: boolean;
}

interface TaskListProps {
  tasks: Task[];
  handleEditTask: (id: number) => void;
  handleRemoveTask: (id: number) => void;
  handleSaveTask: (id: number) => void;
  editText: string;
  setEditText: (text: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  handleEditTask,
  handleRemoveTask,
  handleSaveTask,
  editText,
  setEditText,
}) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.isEditing ? (
            <>
              <InputField
                value={editText}
                onChange={setEditText}
                placeholder="Edit task"
              />
              <Button onClick={() => handleSaveTask(task.id)}>Save</Button>
            </>
          ) : (
            <>
              <span>{task.text}</span>
              <Button className="edit" onClick={() => handleEditTask(task.id)}>
                Edit
              </Button>
              <Button
                className="remove"
                onClick={() => handleRemoveTask(task.id)}
              >
                Remove
              </Button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
