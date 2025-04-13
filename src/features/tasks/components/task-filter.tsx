import { Select } from '@/components/global-styled';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectFilter,
  selectSortBy,
  selectSortOrder,
} from '../store/selectors';
import { setFilter, setSortBy, setSortOrder } from '../store/task-slice';
import { FilterContainer } from './styled';

export const TaskFilter: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const sortBy = useSelector(selectSortBy);
  const sortOrder = useSelector(selectSortOrder);

  return (
    <FilterContainer>
      <Select
        value={filter}
        onChange={(e) =>
          dispatch(setFilter(e.target.value as 'all' | 'active' | 'completed'))
        }
      >
        <option value="all">All Tasks</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </Select>

      <Select
        value={sortBy}
        onChange={(e) =>
          dispatch(
            setSortBy(e.target.value as 'priority' | 'dueDate' | 'createdAt')
          )
        }
      >
        <option value="createdAt">Sort by Created Date</option>
        <option value="dueDate">Sort by Due Date</option>
        <option value="priority">Sort by Priority</option>
      </Select>

      <Select
        value={sortOrder}
        onChange={(e) =>
          dispatch(setSortOrder(e.target.value as 'asc' | 'desc'))
        }
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </Select>
    </FilterContainer>
  );
};
