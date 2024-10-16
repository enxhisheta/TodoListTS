import { TaskManager } from "./TaskManager";
import "./TodoList.css";

const TodoList: React.FC = () => {
  return (
    <div className="container">
      <TaskManager />
    </div>
  );
};

export { TodoList };
