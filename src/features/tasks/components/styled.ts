import { colors } from '@/components/global-styled';
import { Priority } from '@/types/task';
import styled from 'styled-components';

const priorityColors = {
  high: colors.error.main,
  medium: colors.warning.main,
  low: colors.success.main,
};

export type PriorityColorKey = keyof typeof priorityColors;

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
  }
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 2.5rem;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background: linear-gradient(
      90deg,
      ${colors.primary[600]},
      ${colors.primary[400]}
    );
    border-radius: 2px;
  }
`;

export const Title = styled.h1`
  font-size: 2.25rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
  background: linear-gradient(
    135deg,
    ${colors.gray[800]} 0%,
    ${colors.primary[600]} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 1.875rem;
  }
`;

export const TaskList = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }

  & > * {
    transition: all 0.3s ease;
  }
`;

interface TaskCardProps {
  $priority: Priority;
  $isOverdue: boolean;
  $completed: boolean;
}

export const TaskCard = styled.div<TaskCardProps>`
  display: flex;
  flex-direction: column;
  background: ${(props) => (props.$completed ? colors.gray[50] : 'white')};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid
    ${(props) => (props.$completed ? colors.gray[200] : colors.gray[200])};
  animation: fadeIn 0.3s ease-out;
  opacity: ${(props) => (props.$completed ? 0.8 : 1)};
  transform: ${(props) => (props.$completed ? 'scale(0.98)' : 'scale(1)')};

  ${(props) => {
    const priorityColor = priorityColors[props.$priority as PriorityColorKey];
    return `
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      
      &:before {
        content: '';
        height: 3px;
        background: ${props.$completed ? colors.gray[300] : priorityColor};
        display: block;
        opacity: ${props.$completed ? 0.5 : 1};
      }
    `;
  }}

  ${(props) =>
    props.$isOverdue &&
    !props.$completed &&
    `
    background: ${colors.error.light};
    border-color: ${colors.error.light};
  `}

  &:hover {
    transform: ${(props) =>
      props.$completed ? 'scale(0.98)' : 'translateY(-2px)'};
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
`;

export const TaskContent = styled.div`
  padding: 1rem;
  flex: 1;
`;

export const TaskTitle = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;

  input[type='checkbox'] {
    width: 1.125rem;
    height: 1.125rem;
    border-radius: 4px;
    border: 2px solid ${colors.gray[300]};
    cursor: pointer;
    appearance: none;
    background: white;
    position: relative;
    transition: all 0.2s ease;
    margin-top: 0.25rem;

    &:checked {
      background: ${colors.primary[500]};
      border-color: ${colors.primary[500]};

      &:after {
        content: '';
        position: absolute;
        left: 4px;
        top: 1px;
        width: 6px;
        height: 10px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

    &:hover {
      border-color: ${colors.primary[400]};
    }
  }
`;

interface TaskTextProps {
  $completed: boolean;
}

export const TaskText = styled.span<TaskTextProps>`
  font-size: 0.938rem;
  color: ${(props) => (props.$completed ? colors.gray[400] : colors.gray[700])};
  text-decoration: ${(props) => (props.$completed ? 'line-through' : 'none')};
  font-weight: 500;
  line-height: 1.5;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

export const TaskMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.813rem;
  color: ${colors.gray[500]};
  margin-bottom: 0.75rem;

  span {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
  }
`;

interface PriorityBadgeProps {
  $priority: Priority;
  $completed: boolean;
}

export const PriorityBadge = styled.span<PriorityBadgeProps>`
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.2s ease;

  ${(props) => {
    const color = props.$completed
      ? colors.gray[400]
      : priorityColors[props.$priority as PriorityColorKey];
    return `
      background: ${color}15;
      color: ${color};
      border: 1px solid ${color}30;
      opacity: ${props.$completed ? 0.8 : 1};
    `;
  }}
`;

interface TagProps {
  $completed?: boolean;
}

export const Tag = styled.span<TagProps>`
  padding: 0.25rem 0.5rem;
  background: ${(props) =>
    props.$completed ? colors.gray[100] : colors.gray[100]};
  border-radius: 12px;
  font-size: 0.75rem;
  color: ${(props) => (props.$completed ? colors.gray[500] : colors.gray[600])};
  font-weight: 500;
  transition: all 0.2s ease;
  border: 1px solid
    ${(props) => (props.$completed ? colors.gray[200] : colors.gray[200])};
  opacity: ${(props) => (props.$completed ? 0.8 : 1)};

  &:hover {
    background: ${colors.gray[200]};
  }
`;

export const TagContainer = styled.div`
  display: flex;
  gap: 0.375rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
`;

interface TaskActionsProps {
  $completed: boolean;
}

export const TaskActions = styled.div<TaskActionsProps>`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: ${(props) =>
    props.$completed ? colors.gray[100] : colors.gray[50]};
  border-top: 1px solid
    ${(props) => (props.$completed ? colors.gray[200] : colors.gray[200])};
  opacity: ${(props) => (props.$completed ? 0.8 : 1)};
`;

export const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid ${colors.primary[100]};

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  background: white;
  border-radius: 12px;
  border: 2px dashed ${colors.gray[200]};
  margin: 2rem 0;
  animation: fadeIn 0.3s ease-out;

  svg {
    color: ${colors.gray[400]};
    margin-bottom: 1rem;
  }

  h3 {
    color: ${colors.gray[700]};
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  p {
    color: ${colors.gray[500]};
    font-size: 0.875rem;
    max-width: 400px;
    margin: 0 auto;
    line-height: 1.5;
  }
`;

export const FilterBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  background: ${colors.primary[50]};
  color: ${colors.primary[700]};
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-left: 0.5rem;
`;

export const EmptyStateIcon = styled.div`
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  background: ${colors.primary[50]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${colors.primary[500]};
    margin: 0;
  }
`;

export const EmptyStateAction = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  background: ${colors.primary[50]};
  color: ${colors.primary[700]};
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${colors.primary[100]};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  width: 100%;
`;
