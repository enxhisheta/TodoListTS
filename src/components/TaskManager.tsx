import React, { useState, useEffect, useCallback } from "react";
import TaskList from "./TaskList";
import TaskInput from "./TaskInput";
import TaskCount from "./TaskCount";

interface Task {
  id: number;
  title: string;
  isEditing: boolean;
  completed: boolean;
}

const API_URL = "http://localhost:8080/todos";

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [remainingCount, setRemainingCount] = useState(0);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Task[] = await response.json();
        setTasks(data);
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
      setTasks((prevTasks) => [...prevTasks, createdTask]);
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
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error removing task:", error);
    }
  }, []);

  const handleEditTask = useCallback((id: number) => {
    setEditTaskId(id);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isEditing: true } : task
      )
    );
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

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, title: text, isEditing: false } : task
        )
      );
      setEditTaskId(null);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  }, []);

  const handleToggleCompletion = useCallback((id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }, []);

  return (
    <div className="task-manager">
      <h2>To-Do List</h2>
      <TaskCount title="Completed Tasks" count={completedCount} />
      <TaskCount title="Remaining Tasks" count={remainingCount} />
      <TaskInput
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
  );
};

export default TaskManager;
