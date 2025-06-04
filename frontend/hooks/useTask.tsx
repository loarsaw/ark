import { NewTaskForm, Task } from "@/types/types";
import { axiosInstance } from "@/utils/axiosIntance";
import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useRouter } from "next/navigation";

export const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, token, user } = useAuth();
  const router = useRouter();
  const [depsUpdated, setDepsUpdate] = useState(() => Date.now());

  const getAuthHeaders = () => ({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    if (!isAuthenticated) router.push("/login");
  }, [isAuthenticated, router]);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    if (user?.uid) {
      try {
        const { data } = await axiosInstance.get<{ tasks: Task[] }>(
          `/tasks?ownerId=${user.uid}`,
          getAuthHeaders()
        );
        setTasks(data.tasks);
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch tasks.");
      } finally {
        setLoading(false);
      }
    }
  };

  const createTask = async (data: NewTaskForm) => {
    try {
      await axiosInstance.post<Task>(
        "/task",
        {
          ...data,
          ownerId: "abc",
        },
        getAuthHeaders()
      );
      setDepsUpdate(Date.now());
    } catch (err: any) {
      console.error(err);
      setError("Failed to add task.");
    }
  };

  const updateTask = async (data: Task) => {
    try {
      if (data.taskId == null) return;
      await axiosInstance.put<Task>(
        `/update-task`,
        {
          taskId: data.taskId,
          title: data.title,
          status: data.status,
        },
        getAuthHeaders()
      );
      setDepsUpdate(Date.now());
    } catch (err: any) {
      console.error(err);
      setError("Failed to update task.");
    }
  };

  const toggleTask = async (id: string, status: string) => {
    try {
      await axiosInstance.put(
        "/update-task",
        {
          taskId: id,
          status: status === "completed" ? "in-progress" : "completed",
        },
        getAuthHeaders()
      );
      setDepsUpdate(Date.now());
    } catch (err) {
      console.error(err);
      setError("Failed to toggle task.");
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axiosInstance.delete(`/tasks/${id}`, getAuthHeaders());
      setDepsUpdate(Date.now());
    } catch (err: any) {
      console.error(err);
      setError("Failed to delete task.");
    }
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [depsUpdated, token]);

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
