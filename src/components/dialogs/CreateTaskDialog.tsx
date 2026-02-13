import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Task } from '@/types/dashboard';

import { getStoredTasks, saveTasks } from '@/lib/storage';

const schema = z.object({
    title: z.string().min(1, "Task title is required"),
    dueDate: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface CreateTaskDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    defaultTitle?: string;
}

export const CreateTaskDialog: React.FC<CreateTaskDialogProps> = ({ open, onOpenChange, defaultTitle }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { title: defaultTitle || '' }
    });

    // Reset form when defaultTitle changes or dialog opens
    React.useEffect(() => {
        if (open) reset({ title: defaultTitle || '' });
    }, [open, defaultTitle, reset]);

    const onSubmit = (data: FormValues) => {
        const newTask: Task = {
            id: Date.now().toString(),
            title: data.title,
            status: 'Todo',
            dueDate: data.dueDate
        };

        const existing = getStoredTasks();
        saveTasks([newTask, ...existing]);

        reset();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Task</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            placeholder="Task title"
                            {...register('title')}
                        />
                        {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium">Due Date</label>
                        <Input type="date" {...register('dueDate')} />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Create Task</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
