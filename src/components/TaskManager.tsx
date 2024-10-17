import { useReducer, useEffect, useCallback, useState } from "react";
import { TaskList } from "./TaskList";
import { Input } from "./Input";
import { TaskCount } from "./TaskCount";
import "./TodoList.css";

interface Task {
  id: number;
  title: string;
  isEditing: boolean;
  completed: boolean;
}

type Action =
  | { type: "ADD_TASK"; task: Task }
  | { type: "REMOVE_TASK"; id: number }
  | { type: "TOGGLE_TASK"; id: number }
  | { type: "SET_TASKS"; tasks: Task[] }
  | { type: "EDIT_TASK"; id: number }
  | { type: "SAVE_TASK"; id: number; title: string };

const reducer = (state: Task[], action: Action): Task[] => {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.task];
    case "REMOVE_TASK":
      return state.filter((task) => task.id !== action.id);
    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.id ? { ...task, completed: !task.completed } : task
      );
    case "SET_TASKS":
      return action.tasks;
    case "EDIT_TASK":
      return state.map((task) =>
        task.id === action.id ? { ...task, isEditing: true } : task
      );
    case "SAVE_TASK":
      return state.map((task) =>
        task.id === action.id
          ? { ...task, title: action.title, isEditing: false }
          : task
      );
    default:
      throw new Error("Unknown action type");
  }
};

const API_URL = "http://localhost:8080/todos";

const TaskManager: React.FC = () => {
  const [tasks, dispatch] = useReducer(reducer, []);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [remainingCount, setRemainingCount] = useState(0);

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Task[] = await response.json();
        dispatch({ type: "SET_TASKS", tasks: data });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const completed = tasks.filter((task) => task.completed).length;
    const remaining = tasks.length - completed;

    setCompletedCount(completed);
    setRemainingCount(remaining);
  }, [tasks]);

  const handleAddTask = useCallback(async (text: string) => {
    const newTask = { title: text, isEditing: false, completed: false };
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const createdTask = await response.json();
      dispatch({ type: "ADD_TASK", task: createdTask });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }, []);

  const handleRemoveTask = useCallback(async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      dispatch({ type: "REMOVE_TASK", id });
    } catch (error) {
      console.error("Error removing task:", error);
    }
  }, []);

  const handleEditTask = useCallback((id: number) => {
    setEditTaskId(id);
    dispatch({ type: "EDIT_TASK", id });
  }, []);

  const handleSaveTask = useCallback(async (id: number, text: string) => {
    const updatedTask = { title: text, isEditing: false, completed: false };
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      dispatch({ type: "SAVE_TASK", id, title: text });
      setEditTaskId(null);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  }, []);

  const handleToggleCompletion = useCallback((id: number) => {
    dispatch({ type: "TOGGLE_TASK", id });
  }, []);

  return (
    <div className="container">
      <div className="task-manager">
        <h2>To-Do List</h2>
        <TaskCount title="Completed Tasks" count={completedCount} />
        <TaskCount title="Remaining Tasks" count={remainingCount} />
        <Input
          onAddTask={handleAddTask}
          editMode={editTaskId !== null}
          currentText={
            editTaskId !== null
              ? tasks.find((task) => task.id === editTaskId)?.title
              : ""
          }
          onSaveTask={handleSaveTask}
        />
        <TaskList
          tasks={tasks}
          onEditTask={handleEditTask}
          onRemoveTask={handleRemoveTask}
          onSaveTask={handleSaveTask}
          onToggleCompletion={handleToggleCompletion}
        />
      </div>
    </div>
  );
};

export { TaskManager };
