import { Button, Form, Input, Select } from '@/components/global-styled';
import { Priority, Task } from '@/types/task';
import { AlertCircle, Save } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../store/task-slice';
import { ErrorMessage, FormGroup } from './styled';

interface EditTaskFormProps {
  task: Task;
  onClose: () => void;
}

export const EditTaskForm: React.FC<EditTaskFormProps> = ({
  task,
  onClose,
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(task.title);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [priority, setPriority] = useState<Priority>(task.priority);
  const [tags, setTags] = useState(task.tags.join(', '));
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setTitle(task.title);
    setDueDate(task.dueDate);
    setPriority(task.priority);
    setTags(task.tags.join(', '));
  }, [task]);

  const validateTitle = (value: string) => {
    if (!value.trim()) {
      return 'Task title is required';
    }
    if (value.trim().length < 3) {
      return 'Task title must be at least 3 characters';
    }
    if (value.trim().length > 100) {
      return 'Task title must be less than 100 characters';
    }
    return '';
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (touched) {
      setError(validateTitle(newTitle));
    }
  };

  const handleTitleBlur = () => {
    setTouched(true);
    setError(validateTitle(title));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    const titleError = validateTitle(title);
    if (titleError) {
      setError(titleError);
      return;
    }

    const updatedTask = {
      ...task,
      title: title.trim(),
      dueDate,
      priority,
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    };

    dispatch(updateTask(updatedTask));
    onClose();
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="fade-in"
      style={{
        margin: 0,
        border: 'none',
        padding: 0,
        background: 'transparent',
      }}
    >
      <FormGroup className="full-width">
        <Input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          style={{ borderColor: error ? '#dc2626' : undefined }}
          autoFocus
        />
        {error && touched && (
          <ErrorMessage>
            <AlertCircle size={16} />
            {error}
          </ErrorMessage>
        )}
      </FormGroup>
      <Input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <Select
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </Select>
      <Input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="full-width"
      />
      <div
        className="full-width"
        style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}
      >
        <Button
          type="button"
          onClick={onClose}
          style={{ flex: 1 }}
          $variant="secondary"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          style={{ flex: 1 }}
          disabled={!!error || !title.trim()}
        >
          <Save size={18} />
          Save Changes
        </Button>
      </div>
    </Form>
  );
};
