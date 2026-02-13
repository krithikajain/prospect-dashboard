import type { Note, Task } from '@/types/dashboard';


const TASKS_KEY = 'prospect_dashboard_tasks';
const NOTES_KEY = 'prospect_dashboard_notes';

export const getStoredTasks = (): Task[] => {
    try {
        const stored = localStorage.getItem(TASKS_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Failed to parse tasks", e);
        return [];
    }
};

export const saveTasks = (tasks: Task[]) => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const getStoredNotes = (): Note[] => {
    try {
        const stored = localStorage.getItem(NOTES_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Failed to parse notes", e);
        return [];
    }
};

export const saveNotes = (notes: Note[]) => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
};
