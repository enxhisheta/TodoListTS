import TaskItem from "./TaskItem";

interface Task {
  id: number;
  text: string;
  isEditing: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onEditTask: (id: number) => void;
  onRemoveTask: (id: number) => void;
  onSaveTask: (id: number, text: string) => void;
  editText: string;
  setEditText: (text: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEditTask,
  onRemoveTask,
  onSaveTask,
  editText,
  setEditText,
}) => {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEditTask={onEditTask}
          onRemoveTask={onRemoveTask}
          onSaveTask={onSaveTask}
          editText={editText}
          setEditText={setEditText}
        />
      ))}
    </ul>
  );
};

export default TaskList;
