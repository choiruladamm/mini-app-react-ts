import { Button, Form, Input, Select } from '@/components/global-styled';
import { Priority } from '@/types/task';
import { AlertCircle, Plus } from 'lucide-react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addTask } from '../store/task-slice';

const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
`;

export const TaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [tags, setTags] = useState('');
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');

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

    const newTask = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      priority,
      dueDate: dueDate || new Date().toISOString().split('T')[0],
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      createdAt: new Date().toISOString(),
    };

    dispatch(addTask(newTask));
    setTitle('');
    setDueDate('');
    setPriority('medium');
    setTags('');
    setTouched(false);
    setError('');
  };

  return (
    <Form onSubmit={handleSubmit} className="fade-in">
      <FormGroup className="full-width">
        <Input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          style={{ borderColor: error ? '#dc2626' : undefined }}
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
      <Button
        type="submit"
        className="full-width"
        disabled={!!error || !title.trim()}
        style={{
          opacity: !title.trim() || !!error ? 0.7 : 1,
          cursor: !title.trim() || !!error ? 'not-allowed' : 'pointer',
        }}
      >
        <Plus size={18} />
        Add Task
      </Button>
    </Form>
  );
};
