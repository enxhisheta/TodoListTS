import { useState } from "react";
import InputField from "./InputField";
import Button from "./Button";
import TaskList from "./TaskList";
import "./TodoList.css";

interface Task {
  id: number;
  text: string;
  isEditing: boolean;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editText, setEditText] = useState<string>("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      const task = { id: Date.now(), text: newTask, isEditing: false };
      setTasks([...tasks, task]);
      setNewTask("");
    }
  };

  const handleRemoveTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isEditing: true } : task
    );
    setTasks(updatedTasks);
  };

  const handleSaveTask = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, text: editText, isEditing: false } : task
    );
    setTasks(updatedTasks);
    setEditText("");
  };

  return (
    <div className="container">
      <h2>To-Do List</h2>
      <InputField
        value={newTask}
        onChange={setNewTask}
        placeholder="Add a new task"
      />
      <Button onClick={handleAddTask}>Add Task</Button>

      <TaskList
        tasks={tasks}
        handleEditTask={handleEditTask}
        handleRemoveTask={handleRemoveTask}
        handleSaveTask={handleSaveTask}
        editText={editText}
        setEditText={setEditText}
      />
    </div>
  );
};

export default TodoList;
