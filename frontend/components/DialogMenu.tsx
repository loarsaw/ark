import { Task } from "@/types/types";

export const DropdownMenu = ({
  taskId,
  task,
  activeDropdown,
  setActiveDropdown,
  toggleTaskStatus,
  setEditingTask,
  setIsEditDialogOpen,
  deleteTask,
}: {
  taskId: string;
  task: Task;
  activeDropdown: string | null;
  setActiveDropdown: (id: string | null) => void;
  toggleTaskStatus: (id: string, status: string) => void;
  setEditingTask: (task: Task) => void;
  setIsEditDialogOpen: (open: boolean) => void;
  deleteTask: (id: string) => void;
}) => {
  return (
    <div className="relative text-black">
      <button
        onClick={() =>
          setActiveDropdown(activeDropdown === taskId ? null : taskId)
        }
        className="p-2 hover:bg-gray-100 rounded-md"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {activeDropdown === taskId && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
          <button
            onClick={() => {
              toggleTaskStatus(taskId, task.status);
              setActiveDropdown(activeDropdown === taskId ? null : taskId);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
          >
            {task.status === "in-progress" ? (
              <>
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Mark Complete
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                Mark In Progress
              </>
            )}
          </button>
          <button
            onClick={() => {
              setEditingTask(task);
              setIsEditDialogOpen(true);
              setActiveDropdown(null);
            }}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            Edit
          </button>
          <button
            onClick={() => deleteTask(taskId)}
            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600 flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zM8 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v4a1 1 0 11-2 0V8z"
                clipRule="evenodd"
              />
            </svg>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
