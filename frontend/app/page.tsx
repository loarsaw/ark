"use client";
import { axiosInstance } from "@/utils/axiosIntance";
import React, { useState } from "react";

const TaskPage = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Buy groceries", completed: false },
    { id: 2, title: "Finish React project", completed: true },
    { id: 3, title: "Call Alice", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
   axiosInstance.post()
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Task List</h2>

        <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter new task"
            className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </form>

        <ul className="space-y-3">
          {tasks.length === 0 ? (
            <li className="text-center text-gray-500">No tasks available</li>
          ) : (
            tasks.map((task) => (
              <li
                key={task.id}
                className={`flex items-center justify-between px-4 py-2 rounded-lg border border-gray-200 shadow-sm ${
                  task.completed ? "bg-green-100" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5 text-blue-500"
                  />
                  <span
                    className={`text-lg ${
                      task.completed ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {task.title}
                  </span>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TaskPage;
