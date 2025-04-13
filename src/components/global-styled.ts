import styled, { createGlobalStyle, css } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  background: linear-gradient(135deg, #f0f9ff 0%,rgb(239, 239, 239) 100%);
  color: #1e293b;
  min-height: 100vh;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-out;
}
`;

export const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
  },
  success: {
    light: '#dcfce7',
    main: '#10b981',
    dark: '#059669',
  },
  warning: {
    light: '#fef3c7',
    main: '#f59e0b',
    dark: '#d97706',
  },
  error: {
    light: '#fee2e2',
    main: '#ef4444',
    dark: '#dc2626',
  },
};

const inputStyles = css`
  padding: 0.5rem 0.75rem;
  border: 1px solid ${colors.gray[200]};
  border-radius: 8px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  background: ${colors.gray[50]};
  width: 100%;

  &:focus {
    outline: none;
    border-color: ${colors.primary[500]};
    background: white;
    box-shadow: 0 0 0 3px ${colors.primary[100]};
  }

  &::placeholder {
    color: ${colors.gray[400]};
  }

  &:disabled {
    background: ${colors.gray[100]};
    cursor: not-allowed;
  }
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  background: white;
  padding: 1.25rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
  border: 1px solid ${colors.primary[100]};

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }

  .full-width {
    grid-column: 1 / -1;
  }
`;

export const Input = styled.input`
  ${inputStyles}
`;

export const Select = styled.select`
  ${inputStyles}
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2394a3b8'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1em;
  padding-right: 2.5rem;
`;

interface ButtonProps {
  $variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
}

export const Button = styled.button<ButtonProps>`
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;

  ${(props) => {
    switch (props.$variant) {
      case 'danger':
        return `
          background: ${colors.error.light};
          color: ${colors.error.dark};
          &:hover {
            background: ${colors.error.light};
            filter: brightness(0.95);
          }
        `;
      case 'secondary':
        return `
          background: ${colors.gray[100]};
          color: ${colors.gray[700]};
          &:hover {
            background: ${colors.gray[200]};
          }
        `;
      default:
        return `
          background: ${colors.primary[500]};
          color: white;
          &:hover {
            background: ${colors.primary[600]};
          }
        `;
    }
  }}

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    background: ${colors.gray[300]};
    cursor: not-allowed;
    &:hover {
      background: ${colors.gray[300]};
    }
  }
`;
