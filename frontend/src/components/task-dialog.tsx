import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask, updateTask } from '@/api/tasks';
import type { Task } from '@/types';
import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['pending', 'in_progress', 'completed']),
  dueDate: z.string().optional(),
  attachment: z.any().optional(),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | null;
}

export function TaskDialog({ open, onOpenChange, task }: TaskDialogProps) {
  const queryClient = useQueryClient();
  const isEditing = !!task;

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      status: 'pending',
    },
  });

  useEffect(() => {
    if (task) {
      setValue('title', task.title);
      setValue('description', task.description || '');
      setValue('status', task.status);
      setValue('dueDate', task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : '');
    } else {
      reset();
    }
  }, [task, setValue, reset, open]);

  const mutation = useMutation({
    mutationFn: async (data: TaskFormValues) => {
      const formData = new FormData();
      formData.append('title', data.title);
      if (data.description) formData.append('description', data.description);
      formData.append('status', data.status);
      if (data.dueDate) formData.append('dueDate', new Date(data.dueDate).toISOString());
      
      const fileInput = document.getElementById('attachment') as HTMLInputElement;
      if (fileInput?.files?.[0]) {
        formData.append('attachment', fileInput.files[0]);
      }

      if (isEditing) {
        return updateTask({ id: task.id, data: formData });
      }
      return createTask(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success(isEditing ? 'Task updated' : 'Task created');
      onOpenChange(false);
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Something went wrong');
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Task' : 'Create Task'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...register('title')} />
            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register('description')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select onValueChange={(val) => setValue('status', val as any)} defaultValue={task?.status || 'pending'}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input id="dueDate" type="datetime-local" {...register('dueDate')} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attachment">Attachment</Label>
            <Input id="attachment" type="file" />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
