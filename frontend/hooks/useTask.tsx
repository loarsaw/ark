import { NewTaskForm, Task } from "@/types/types";
import { axiosInstance } from "@/utils/axiosIntance";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useRouter } from "next/navigation";

export const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [depsUpdated, setDepsUpdate] = useState(() => Date.now());
  useEffect(() => {
    // if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated]);
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axiosInstance.get<Task[]>("/tasks?ownerId=abc");
      setTasks(data.tasks);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (data: NewTaskForm) => {
    try {
      await axiosInstance.post<Task>("/task", {
        ...data,
        ownerId: "abc",
      });
      setDepsUpdate(Date.now());
    } catch (err: any) {
      console.error(err);
      setError("Failed to add task.");
    }
  };

  const updateTask = async (data: Task) => {
    try {
      if (data.taskId == null) return;
      await axiosInstance.put<Task>(`/update-task`, {
        taskId: data.taskId,
        title: data.title,
        status: data.status,
      });
      setDepsUpdate(Date.now());
    } catch (err: any) {
      console.error(err);
      setError("Failed to update task.");
    }
  };
  async function toggleTask(id: string, task: string) {
    axiosInstance
      .put("/update-task", {
        taskId: id,
        status: task == "completed" ? "in-progress" : "completed",
      })
      .then(() => {
        setDepsUpdate(Date.now());
      });
  }
  const deleteTask = async (id: number) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`);
      setDepsUpdate(Date.now());
    } catch (err: any) {
      console.error(err);
      setError("Failed to delete task.");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [depsUpdated]);

  return {
    tasks,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
  };
};
