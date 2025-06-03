

export interface Task {
    taskId: string;
    title: string;
    status: "in-progress" | "completed";
}

export interface NewTaskForm {
    title: string;
    status: "in-progress" | "completed";
}

export interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export interface DropdownMenuProps {
    taskId: string;
    task: Task;
}