import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, deleteTask } from '@/api/tasks';
import type { Task } from '@/types';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Trash2, Edit, Plus, FileText } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/loading-spinner';
import { EmptyState } from '@/components/empty-state';
import { TaskDialog } from '@/components/task-dialog';

export function TasksPage() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Task deleted successfully');
    },
    onError: () => toast.error('Failed to delete task'),
  });

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setEditingTask(null);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return <Badge className="bg-green-500 hover:bg-green-600">Completed</Badge>;
      case 'in_progress': return <Badge className="bg-blue-500 hover:bg-blue-600">In Progress</Badge>;
      default: return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in-50">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">Your Tasks</h2>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>

      {!tasks || tasks.length === 0 ? (
        <EmptyState
          icon={<FileText className="h-10 w-10 text-muted-foreground" />}
          title="No tasks found"
          description="You haven't created any tasks yet."
          action={<Button onClick={handleCreate}>Create your first task</Button>}
        />
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell>
                    {task.dueDate ? format(new Date(task.dueDate), 'MMM d, yyyy') : 'No date'}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(task)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this task?')) {
                          deleteMutation.mutate(task.id);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <TaskDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        task={editingTask} 
      />
    </div>
  );
}
