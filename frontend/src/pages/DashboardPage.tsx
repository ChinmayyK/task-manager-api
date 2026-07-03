import { useQuery } from '@tanstack/react-query';
import { getTasks } from '@/api/tasks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/loading-spinner';
import { CheckCircle2, Clock, ListTodo } from 'lucide-react';
import { motion } from 'framer-motion';

export function DashboardPage() {
  const { data: tasks, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  const total = tasks?.length || 0;
  const completed = tasks?.filter((t) => t.status === 'completed').length || 0;
  const pending = tasks?.filter((t) => t.status === 'pending').length || 0;

  const stats = [
    { title: 'Total Tasks', value: total, icon: ListTodo, color: 'text-blue-500' },
    { title: 'Completed', value: completed, icon: CheckCircle2, color: 'text-green-500' },
    { title: 'Pending', value: pending, icon: Clock, color: 'text-amber-500' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in-50">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
