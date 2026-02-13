import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const schema = z.object({
    title: z.string().min(1, "Event title is required"),
    attendees: z.string().email("Invalid email").or(z.string().min(1, "Attendees required")),
    description: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface SendInviteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    defaultEmail?: string;
}

export const SendInviteDialog: React.FC<SendInviteDialogProps> = ({ open, onOpenChange, defaultEmail }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: { attendees: defaultEmail || '' }
    });

    const onSubmit = (data: FormValues) => {
        console.log("Sending invite:", data);
        alert(`Invite sent to ${data.attendees}`);
        reset();
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Send Invite</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            placeholder="Event Title"
                            {...register('title')}
                        />
                        {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Input
                            placeholder="Attendees (Email)"
                            defaultValue={defaultEmail}
                            {...register('attendees')}
                        />
                        {errors.attendees && <p className="text-xs text-red-500">{errors.attendees.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Textarea
                            placeholder="Meeting Agenda / Notes"
                            {...register('description')}
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Send Invite</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
