import { MemoizedTaskItem } from "./TaskItem";

interface Task {
  id: number;
  title: string;
  isEditing: boolean;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onEditTask: (id: number) => void;
  onRemoveTask: (id: number) => void;
  onSaveTask: (id: number, text: string) => void;
  onToggleCompletion: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEditTask,
  onRemoveTask,
  onSaveTask,
  onToggleCompletion,
}) => {
  return (
    <ul>
      {tasks.map((task) => (
        <MemoizedTaskItem
          key={task.id}
          task={task}
          onEditTask={onEditTask}
          onRemoveTask={onRemoveTask}
          onSaveTask={onSaveTask}
          onToggleCompletion={onToggleCompletion}
        />
      ))}
    </ul>
  );
};

export { TaskList };
