import { Modal, SiteHead } from '@/components';
import { Task } from '@/types/task';
import { ClipboardList, ListFilter } from 'lucide-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { EditTaskForm, TaskFilter, TaskForm, TaskItem } from '../components';
import {
  Container,
  EmptyState,
  EmptyStateIcon,
  FilterBadge,
  Header,
  TaskList,
  Title
} from '../components/styled';
import {
  selectFilter,
  selectSortedTasks,
  selectTasksCount,
} from '../store/selectors';

const TaskPage: React.FC = () => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const filter = useSelector(selectFilter);
  const tasks = useSelector(selectSortedTasks);
  const { total } = useSelector(selectTasksCount);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleCloseModal = () => {
    setEditingTask(null);
  };

  const renderEmptyState = () => {
    if (total === 0) {
      return (
        <EmptyState>
          <EmptyStateIcon>
            <ClipboardList size={32} />
          </EmptyStateIcon>
          <h3>No tasks yet</h3>
          <p>
            Ready to get organized? Start by adding your first task using the
            form above.
          </p>
        </EmptyState>
      );
    }

    if (tasks.length === 0) {
      return (
        <EmptyState>
          <EmptyStateIcon>
            <ListFilter size={32} />
          </EmptyStateIcon>
          <h3>No matching tasks</h3>
          <p>
            No tasks match your current filter:
            <FilterBadge>
              {filter === 'all'
                ? 'All Tasks'
                : filter === 'active'
                ? 'Active'
                : 'Completed'}
            </FilterBadge>
          </p>
        </EmptyState>
      );
    }

    return null;
  };

  return (
    <SiteHead title='Task Management'>
      <Container>
        <Header>
          <Title>Task Management</Title>
        </Header>

        <TaskForm />
        <TaskFilter />

        {renderEmptyState()}

        {tasks.length > 0 && (
          <TaskList>
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} onEdit={handleEdit} />
            ))}
          </TaskList>
        )}

        <Modal
          title="Edit Task"
          isOpen={!!editingTask}
          onClose={handleCloseModal}
        >
          {editingTask && (
            <EditTaskForm task={editingTask} onClose={handleCloseModal} />
          )}
        </Modal>
      </Container>
    </SiteHead>
  );
};

export default TaskPage;
