import { Button } from '@/components/global-styled';
import { Task } from '@/types/task';
import { format, isPast, isToday } from 'date-fns';
import { Calendar, Edit2, Flag, Trash2 } from 'lucide-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask, toggleTaskComplete } from '../store/task-slice';
import {
  PriorityBadge,
  Tag,
  TagContainer,
  TaskActions,
  TaskCard,
  TaskContent,
  TaskMeta,
  TaskText,
  TaskTitle,
} from './styled';

interface TodoItemProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export const TaskItem: React.FC<TodoItemProps> = ({ task, onEdit }) => {
  const dispatch = useDispatch();
  const isValidDate = task.dueDate && !isNaN(new Date(task.dueDate).getTime());
  const isOverdue = isValidDate && !task.completed && isPast(new Date(task.dueDate)) &&!isToday(new Date(task.dueDate)); // prettier-ignore

  return (
    <TaskCard
      $priority={task.priority}
      $isOverdue={isOverdue ? true : false}
      $completed={task.completed}
    >
      <TaskContent>
        <TaskTitle>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => dispatch(toggleTaskComplete(task.id))}
          />
          <TaskText $completed={task.completed}>{task.title}</TaskText>
        </TaskTitle>

        <TaskMeta>
          <span>
            <Calendar size={14} />
            {isValidDate
              ? format(new Date(task.dueDate), 'MMM d, yyyy')
              : 'No due date'}
          </span>
          <PriorityBadge $priority={task.priority} $completed={task.completed}>
            <Flag size={14} />
            {task.priority}
          </PriorityBadge>
        </TaskMeta>

        {task.tags.length > 0 && (
          <TagContainer>
            {task.tags.map((tag, index) => (
              <Tag key={index} $completed={task.completed}>
                {tag}
              </Tag>
            ))}
          </TagContainer>
        )}
      </TaskContent>

      <TaskActions $completed={task.completed}>
        <Button onClick={() => onEdit(task)} $variant="primary">
          <Edit2 size={16} />
          Edit
        </Button>
        <Button $variant="danger" onClick={() => dispatch(deleteTask(task.id))}>
          <Trash2 size={16} />
          Delete
        </Button>
      </TaskActions>
    </TaskCard>
  );
};
