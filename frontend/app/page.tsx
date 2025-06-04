"use client";

import { Dialog } from "@/components/Dialog";
import { DropdownMenu } from "@/components/DialogMenu";
import { useAuth } from "@/hooks/useAuth";
import { useTask } from "@/hooks/useTask";
import { NewTaskForm, Task } from "@/types/types";
import { useState, useCallback, useMemo } from "react";

const TaskManager: React.FC = () => {
  const { tasks, createTask, deleteTask, updateTask, toggleTask } = useTask();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTask, setNewTask] = useState<NewTaskForm>({
    title: "",
    status: "in-progress",
  });
  const [user] = useState<string>("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { logout } = useAuth();
  const inProgressTasks = useMemo(
    () => tasks.filter((task) => task.status === "in-progress"),
    [tasks]
  );
  const completedTasks = useMemo(() => {
    return tasks.filter((task) => task.status === "completed");
  }, [tasks]);

  const handleNewTaskTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewTask((prev) => ({ ...prev, title: e.target.value }));
    },
    []
  );

  const handleEditTaskTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (editingTask) {
        setEditingTask({ ...editingTask, title: e.target.value });
      }
    },
    [editingTask]
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeEdit = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditingTask((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: value,
      } as Task;
    });
  };

  console.log(editingTask, "hi");

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-black">Task Manager</h1>
            <p className="text-black">Welcome back, {user}!</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              New Task
            </button>
            <button
              onClick={() => {
                logout();
              }}
              className="border hover:cursor-pointer border-gray-300 hover:bg-gray-50 text-black px-4 py-2 rounded-md flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                  clipRule="evenodd"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-black">In Progress</p>
                <p className="text-2xl font-bold">{inProgressTasks.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-black">Completed</p>
                <p className="text-2xl font-bold">
                  {completedTasks && completedTasks.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                T
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-black">Total Tasks</p>
                <p className="text-2xl font-bold">{tasks.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl text-black font-semibold mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-blue-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              In Progress ({inProgressTasks.length})
            </h2>
            <div className="space-y-4">
              {inProgressTasks.map((task) => (
                <div
                  key={task.taskId}
                  className="bg-white rounded-lg shadow border-l-4 border-l-blue-500"
                >
                  <div className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{task.title}</h3>
                        <span className="inline-block bg-gray-100 text-black text-xs px-2 py-1 rounded-full mt-1">
                          In Progress
                        </span>
                      </div>
                      <DropdownMenu
                        taskId={task.taskId}
                        task={task}
                        activeDropdown={activeDropdown}
                        setActiveDropdown={setActiveDropdown}
                        toggleTaskStatus={toggleTask}
                        setEditingTask={setEditingTask}
                        setIsEditDialogOpen={setIsEditDialogOpen}
                        deleteTask={deleteTask}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {inProgressTasks.length === 0 && (
                <div className="bg-white rounded-lg shadow border-2 border-dashed border-gray-300">
                  <div className="p-8 text-center text-black">
                    No tasks in progress. Create a new task to get started!
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-xl text-black font-semibold mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Completed ({completedTasks.length})
            </h2>
            <div className="space-y-4">
              {completedTasks.map((task) => (
                <div
                  key={task.taskId}
                  className="bg-white rounded-lg shadow border-l-4 border-l-green-500 opacity-75"
                >
                  <div className="p-4 pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold line-through">
                          {task.title}
                        </h3>
                        <span className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full mt-1">
                          Completed
                        </span>
                      </div>
                      {activeDropdown == task.taskId && (
                        <DropdownMenu
                          taskId={task.taskId}
                          task={task}
                          activeDropdown={activeDropdown}
                          setActiveDropdown={setActiveDropdown}
                          toggleTaskStatus={toggleTask}
                          setEditingTask={setEditingTask}
                          setIsEditDialogOpen={setIsEditDialogOpen}
                          deleteTask={deleteTask}
                        />
                      )}
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <p className="text-black line-through">{task.status}</p>
                  </div>
                </div>
              ))}
              {completedTasks.length === 0 && (
                <div className="bg-white rounded-lg shadow border-2 border-dashed border-gray-300">
                  <div className="p-8 text-center text-black">
                    No completed tasks yet. Complete some tasks to see them
                    here!
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Dialog
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
          title="Create New Task"
        >
          <div className="space-y-4 text-black">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={newTask.title}
                onChange={handleNewTaskTitleChange}
                placeholder="Enter task title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Status</label>
              <select
                name="status"
                value={newTask.status}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              >
                <option value="" disabled>
                  Select status
                </option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <button
              onClick={() => {
                createTask(newTask).then(() => {
                  setNewTask({
                    status: "in-progress",
                    title: "",
                  });
                  setIsCreateDialogOpen(false);
                });
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
            >
              Create Task
            </button>
          </div>
        </Dialog>

        <Dialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          title="Edit Task"
        >
          {editingTask && (
            <div className=" text-black space-y-4">
              <div>
                <label className="block mb-1 font-medium">Title</label>
                <input
                  name="status"
                  value={editingTask.title}
                  onChange={handleEditTaskTitleChange}
                  className="border px-2 py-1 rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Status</label>
                <select
                  name="status"
                  value={editingTask.status}
                  onChange={handleChangeEdit}
                  className="border px-2 py-1 rounded w-full"
                >
                  <option value="" disabled>
                    Select status
                  </option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <button
                onClick={() => {
                  updateTask(editingTask).then(() => {
                    setIsEditDialogOpen(false);
                    setEditingTask({
                      status: "in-progress",
                      taskId: "",
                      title: "",
                    });
                  });
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
              >
                Update Task
              </button>
            </div>
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default TaskManager;
