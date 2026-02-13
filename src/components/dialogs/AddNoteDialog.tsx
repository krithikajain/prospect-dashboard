import React from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import type { Note } from '@/types/dashboard';

import { getStoredNotes, saveNotes } from '@/lib/storage';

const schema = z.object({
    content: z.string().min(1, "Note cannot be empty"),
    tags: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface AddNoteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const AddNoteDialog: React.FC<AddNoteDialogProps> = ({ open, onOpenChange }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema)
    });

    const onSubmit = (data: FormValues) => {
        const newNote: Note = {
            id: Date.now().toString(),
            content: data.content,
            tags: data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
            timestamp: new Date().toISOString(),
            author: 'You'
        };

        const existing = getStoredNotes();
        saveNotes([newNote, ...existing]);

        reset();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Note</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Textarea
                            placeholder="Enter your note here..."
                            {...register('content')}
                            className="min-h-[100px]"
                        />
                        {errors.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Input
                            placeholder="Tags (comma separated, e.g. Call, Pain, Budget)"
                            {...register('tags')}
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save Note</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
