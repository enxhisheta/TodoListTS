import React, { useState, useEffect, useCallback } from "react";
import TaskList from "./TaskList";
import TaskInput from "./TaskInput";

interface Task {
  id: number;
  text: string;
  isEditing: boolean;
}

const API_URL = "http://localhost:8080/todos";

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editText, setEditText] = useState<string>("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = useCallback(async (text: string) => {
    const newTask = { text, isEditing: false };
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
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isEditing: true } : task
      )
    );
  }, []);

  const handleSaveTask = useCallback(async (id: number, text: string) => {
    const updatedTask = { text, isEditing: false };
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
          task.id === id ? { ...task, text, isEditing: false } : task
        )
      );
      setEditText("");
    } catch (error) {
      console.error("Error saving task:", error);
    }
  }, []);

  return (
    <div className="task-manager">
      <h2>To-Do List</h2>
      <TaskInput onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onEditTask={handleEditTask}
        onRemoveTask={handleRemoveTask}
        onSaveTask={handleSaveTask}
        editText={editText}
        setEditText={setEditText}
      />
    </div>
  );
};

export default TaskManager;
